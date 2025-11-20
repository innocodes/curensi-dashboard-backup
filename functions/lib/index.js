"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const ccxt = require("ccxt");
const cors = require("cors");
// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });
// Simple test function to check CCXT connectivity
exports.testCCXT = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            console.log('Testing CCXT connectivity with multiple exchanges...');
            const exchangesToTest = [
                { id: 'binanceusdm', name: 'Binance', symbol: 'BTC/USDT:USDT' },
                { id: 'bybit', name: 'Bybit', symbol: 'BTC/USDT:USDT' },
                { id: 'okx', name: 'OKX', symbol: 'BTC-USDT-SWAP' },
                { id: 'huobi', name: 'Huobi', symbol: 'BTC/USDT' },
                { id: 'kucoinfutures', name: 'KuCoin Futures', symbol: 'BTC/USDT:USDT' }
            ];
            const results = [];
            for (const exInfo of exchangesToTest) {
                try {
                    console.log(`Testing ${exInfo.name}...`);
                    const exchange = new ccxt[exInfo.id]();
                    // Test with minimal requests
                    const fundingData = await exchange.fetchFundingRate(exInfo.symbol);
                    console.log(`✅ ${exInfo.name} Success!`, {
                        symbol: exInfo.symbol,
                        fundingRate: fundingData.fundingRate,
                        timestamp: new Date().toISOString()
                    });
                    results.push({
                        exchange: exInfo.name,
                        success: true,
                        symbol: exInfo.symbol,
                        fundingRate: fundingData.fundingRate,
                        markPrice: fundingData.markPrice,
                        apr: (fundingData.fundingRate * 3 * 365 * 100),
                        error: null
                    });
                }
                catch (exchangeError) {
                    console.error(`❌ ${exInfo.name} Error:`, exchangeError.message);
                    results.push({
                        exchange: exInfo.name,
                        success: false,
                        symbol: exInfo.symbol,
                        fundingRate: null,
                        markPrice: null,
                        apr: null,
                        error: exchangeError.message
                    });
                }
            }
            const successfulExchanges = results.filter(r => r.success);
            res.json({
                success: successfulExchanges.length > 0,
                message: `Tested ${exchangesToTest.length} exchanges, ${successfulExchanges.length} successful`,
                data: results,
                workingExchanges: successfulExchanges.map(r => ({
                    exchange: r.exchange,
                    symbol: r.symbol,
                    fundingRate: r.fundingRate,
                    apr: r.apr
                }))
            });
        }
        catch (error) {
            console.error('❌ General error:', error);
            res.status(500).json({
                success: false,
                error: 'Test failed',
                details: error.message
            });
        }
    });
});
// Configuration (working exchanges only)
const EXCHANGES = {
    okx: 'OKX',
    kucoinfutures: 'KuCoin Futures',
    // Blocked exchanges due to Firebase Functions IP restrictions:
    // binanceusdm: 'Binance', // Geographic restriction
    // bybit: 'Bybit', // CloudFront blocking
    // gateio: 'Gate.io' // Not tested yet
};
const DEFAULT_SYMBOLS = [
    'BTC-USDT-SWAP', // OKX format
    'ETH-USDT-SWAP', // OKX format
    'SOL-USDT-SWAP', // OKX format
    'XRP-USDT-SWAP', // OKX format
    'BTC/USDT:USDT', // KuCoin format
    'ETH/USDT:USDT', // KuCoin format
    'SOL/USDT:USDT', // KuCoin format
    'XRP/USDT:USDT' // KuCoin format
];
// Get current funding rates from all exchanges
exports.getFundingRates = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const symbols = req.body.symbols || DEFAULT_SYMBOLS;
            const exchanges = req.body.exchanges || Object.keys(EXCHANGES);
            const allRates = [];
            for (const exId of exchanges) {
                if (!EXCHANGES[exId])
                    continue;
                try {
                    const exchange = new ccxt[exId]();
                    await exchange.loadMarkets();
                    for (const symbol of symbols) {
                        try {
                            if (!exchange.markets[symbol])
                                continue;
                            const fundingData = await exchange.fetchFundingRate(symbol);
                            if ((fundingData === null || fundingData === void 0 ? void 0 : fundingData.fundingRate) !== null && (fundingData === null || fundingData === void 0 ? void 0 : fundingData.fundingRate) !== undefined) {
                                const rate = fundingData.fundingRate;
                                const dailyRate = rate * 3; // 3 funding payments per day
                                const apr = (dailyRate * 365) * 100;
                                // Normalize symbol names for display
                                let normalizedSymbol = symbol;
                                if (exId === 'okx') {
                                    normalizedSymbol = symbol.replace('-USDT-SWAP', '');
                                }
                                else if (exId === 'kucoinfutures') {
                                    normalizedSymbol = symbol.replace('/USDT:USDT', '');
                                }
                                allRates.push({
                                    exchange: EXCHANGES[exId],
                                    symbol: normalizedSymbol,
                                    fundingRate: rate,
                                    apr,
                                    markPrice: fundingData.markPrice,
                                    nextFundingTime: fundingData.nextFundingTime,
                                    timestamp: admin.firestore.Timestamp.now()
                                });
                            }
                        }
                        catch (symbolError) {
                            console.warn(`Failed to fetch ${symbol} from ${exId}:`, symbolError);
                            continue;
                        }
                    }
                }
                catch (exchangeError) {
                    console.warn(`Failed to connect to ${exId}:`, exchangeError);
                    continue;
                }
            }
            // Sort by APR (highest first)
            allRates.sort((a, b) => b.apr - a.apr);
            // TODO: Temporarily disabled historical data storage
            // await storeHistoricalRates(allRates);
            res.json({ success: true, data: allRates });
        }
        catch (error) {
            console.error('Error fetching funding rates:', error);
            res.status(500).json({
                success: false,
                error: { code: 'FETCH_ERROR', message: 'Failed to fetch funding rates' }
            });
        }
    });
});
// Store historical funding rates in Firestore
async function storeHistoricalRates(rates) {
    const batch = db.batch();
    const historicalRef = db.collection('historical_funding_rates');
    // Clean old data (keep only last 7 days for free users, 30 days for paid users)
    const cutoffDate = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    try {
        const oldDocs = await historicalRef.where('timestamp', '<', cutoffDate).limit(100).get();
        oldDocs.forEach(doc => batch.delete(doc.ref));
    }
    catch (error) {
        console.warn('Failed to clean old historical data:', error);
    }
    // Add new data
    rates.forEach(rate => {
        const docRef = historicalRef.doc();
        batch.set(docRef, rate);
    });
    await batch.commit();
}
// Get historical funding rates with Z-score analysis
exports.getHistoricalRates = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const { symbol, exchange, days = 7 } = req.body;
            if (!symbol || !exchange) {
                return res.status(400).json({
                    success: false,
                    error: { code: 'MISSING_PARAMS', message: 'Symbol and exchange are required' }
                });
            }
            const startDate = admin.firestore.Timestamp.fromDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
            const snapshot = await db.collection('historical_funding_rates')
                .where('symbol', '==', symbol)
                .where('exchange', '==', exchange)
                .where('timestamp', '>=', startDate)
                .orderBy('timestamp', 'desc')
                .get();
            const rates = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            res.json({ success: true, data: rates });
        }
        catch (error) {
            console.error('Error fetching historical rates:', error);
            res.status(500).json({
                success: false,
                error: { code: 'FETCH_ERROR', message: 'Failed to fetch historical rates' }
            });
        }
    });
});
// Calculate Z-score opportunities
exports.getZScoreOpportunities = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const { symbols = DEFAULT_SYMBOLS, threshold = 2 } = req.body;
            // Get recent historical data (last 48 hours)
            const startDate = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 48 * 60 * 60 * 1000));
            const historicalData = {};
            // Fetch historical rates for all symbol/exchange combinations
            for (const symbol of symbols) {
                for (const exName of Object.values(EXCHANGES)) {
                    const key = `${symbol}_${exName}`;
                    const snapshot = await db.collection('historical_funding_rates')
                        .where('symbol', '==', symbol)
                        .where('exchange', '==', exName)
                        .where('timestamp', '>=', startDate)
                        .orderBy('timestamp', 'desc')
                        .get();
                    historicalData[key] = snapshot.docs.map(doc => doc.data().fundingRate);
                }
            }
            // Get current rates
            const currentRatesResponse = await fetchCurrentRates(symbols);
            if (!currentRatesResponse.success) {
                throw new Error('Failed to fetch current rates');
            }
            // Calculate Z-scores
            const opportunities = [];
            for (const rate of currentRatesResponse.data || []) {
                const key = `${rate.symbol}_${rate.exchange}`;
                const historical = historicalData[key] || [];
                if (historical.length >= 10) {
                    const mean = historical.reduce((sum, r) => sum + r, 0) / historical.length;
                    const variance = historical.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / historical.length;
                    const stdDev = Math.sqrt(variance);
                    if (stdDev > 0) {
                        const zScore = (rate.fundingRate - mean) / stdDev;
                        if (Math.abs(zScore) >= threshold) {
                            opportunities.push({
                                symbol: rate.symbol,
                                exchange: rate.exchange,
                                currentRate: rate.fundingRate,
                                apr: rate.apr,
                                zScore,
                                isSignificant: Math.abs(zScore) >= 3,
                                confidence: Math.min(Math.abs(zScore) / 3, 1)
                            });
                        }
                    }
                }
            }
            // Sort by absolute Z-score
            opportunities.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore));
            res.json({ success: true, data: opportunities });
        }
        catch (error) {
            console.error('Error calculating Z-scores:', error);
            res.status(500).json({
                success: false,
                error: { code: 'CALCULATION_ERROR', message: 'Failed to calculate Z-score opportunities' }
            });
        }
    });
});
// Helper function to fetch current rates (extracted for reuse)
async function fetchCurrentRates(symbols) {
    try {
        const allRates = [];
        for (const [exId, exName] of Object.entries(EXCHANGES)) {
            try {
                const exchange = new ccxt[exId]();
                await exchange.loadMarkets();
                for (const symbol of symbols) {
                    try {
                        if (!exchange.markets[symbol])
                            continue;
                        const fundingData = await exchange.fetchFundingRate(symbol);
                        if ((fundingData === null || fundingData === void 0 ? void 0 : fundingData.fundingRate) !== null && (fundingData === null || fundingData === void 0 ? void 0 : fundingData.fundingRate) !== undefined) {
                            const rate = fundingData.fundingRate;
                            const dailyRate = rate * 3;
                            const apr = (dailyRate * 365) * 100;
                            // Normalize symbol names for display
                            let normalizedSymbol = symbol;
                            if (exId === 'okx') {
                                normalizedSymbol = symbol.replace('-USDT-SWAP', '');
                            }
                            else if (exId === 'kucoinfutures') {
                                normalizedSymbol = symbol.replace('/USDT:USDT', '');
                            }
                            allRates.push({
                                exchange: exName,
                                symbol: normalizedSymbol,
                                fundingRate: rate,
                                apr,
                                markPrice: fundingData.markPrice,
                                nextFundingTime: fundingData.nextFundingTime,
                                timestamp: admin.firestore.Timestamp.now()
                            });
                        }
                    }
                    catch (symbolError) {
                        continue;
                    }
                }
            }
            catch (exchangeError) {
                continue;
            }
        }
        return { success: true, data: allRates };
    }
    catch (error) {
        return { success: false, error };
    }
}
// Get user profile and check subscription
exports.getUserProfile = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    try {
        const userDoc = await db.collection('users').doc(context.auth.uid).get();
        if (!userDoc.exists) {
            // Create default profile
            const defaultProfile = {
                subscriptionTier: 'free',
                subscriptionStatus: 'active',
                notifications: {
                    email: false,
                    threshold: 20
                },
                preferences: {
                    defaultSymbols: ['BTC', 'ETH', 'SOL', 'XRP'], // Normalized symbol names
                    preferredExchanges: Object.values(EXCHANGES)
                }
            };
            await db.collection('users').doc(context.auth.uid).set(defaultProfile);
            return defaultProfile;
        }
        return userDoc.data();
    }
    catch (error) {
        console.error('Error getting user profile:', error);
        throw new functions.https.HttpsError('internal', 'Failed to get user profile');
    }
});
// Update user preferences
exports.updateUserPreferences = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    try {
        const { preferences } = data;
        await db.collection('users').doc(context.auth.uid).update({
            'preferences': preferences,
            'updatedAt': admin.firestore.Timestamp.now()
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error updating preferences:', error);
        throw new functions.https.HttpsError('internal', 'Failed to update preferences');
    }
});
// Scheduled function to check for funding rate alerts (temporarily disabled)
// exports.checkFundingRateAlerts = functions.pubsub
//   .schedule('every 15 minutes')
//   .onRun(async (context) => {
/* try {
  // Get all users with notifications enabled
  const usersSnapshot = await db.collection('users')
    .where('notifications.email', '==', true)
    .where('subscriptionStatus', '==', 'active')
    .get();

  const currentRatesResponse = await fetchCurrentRates(DEFAULT_SYMBOLS);
  if (!currentRatesResponse.success) return;

  const currentRates = currentRatesResponse.data || [];

  for (const userDoc of usersSnapshot.docs) {
    const user = userDoc.data() as UserProfile;

    // Check if any rates exceed user's threshold
    const alertRates = currentRates.filter(rate =>
      rate.apr >= user.notifications.threshold &&
      user.preferences.defaultSymbols.includes(rate.symbol) &&
      user.preferences.preferredExchanges.includes(rate.exchange)
    );

    if (alertRates.length > 0) {
      // Send notification (you would integrate with email service here)
      console.log(`Alert for user ${userDoc.id}: ${alertRates.length} opportunities found`);

      // Store notification in Firestore
      await db.collection('notifications').add({
        userId: userDoc.id,
        type: 'funding_rate_alert',
        title: 'High Funding Rate Alert',
        message: `${alertRates.length} funding rate opportunities above your ${user.notifications.threshold}% threshold`,
        data: alertRates,
        read: false,
        createdAt: admin.firestore.Timestamp.now()
      });
    }
  }
} catch (error) {
  console.error('Error in scheduled alert check:', error);
}
*/ 
//# sourceMappingURL=index.js.map