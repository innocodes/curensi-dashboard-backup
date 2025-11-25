"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("admin"));
// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
// Debug function to test scheduled crypto fetcher
exports.debugScheduler = functions.https.onRequest(async (req, res) => {
    var _a;
    try {
        console.log('🔍 Debug: Testing scheduled fetcher logic...');
        // Import the required functions from main index
        const { createProxyAgent, createExchange, MASTER_SYMBOL_MAP, SPOT_SYMBOL_MAP, EXCHANGE_CONFIGS } = require('./index');
        const agent = createProxyAgent();
        const allRates = [];
        const errors = [];
        // Test just one symbol and exchange
        const testSymbol = 'BTC';
        const testExchangeId = 'binanceusdm';
        const futuresSymbol = MASTER_SYMBOL_MAP[testSymbol][testExchangeId];
        console.log(`🔍 Testing ${testSymbol} on ${testExchangeId} (${futuresSymbol})`);
        try {
            const exchange = createExchange(testExchangeId);
            await exchange.loadMarkets();
            console.log('✅ Exchange loaded successfully');
            // Fetch funding rate
            const fundingData = await exchange.fetchFundingRate(futuresSymbol);
            console.log('📊 Funding data:', {
                fundingRate: fundingData.fundingRate,
                markPrice: fundingData.markPrice,
                timestamp: fundingData.timestamp
            });
            if ((fundingData === null || fundingData === void 0 ? void 0 : fundingData.fundingRate) === null || (fundingData === null || fundingData === void 0 ? void 0 : fundingData.fundingRate) === undefined) {
                console.log('❌ Funding rate is null/undefined');
                return res.json({
                    success: false,
                    error: 'Funding rate is null',
                    data: fundingData
                });
            }
            // Test OI fetch
            let openInterest = 0;
            try {
                const oiData = await exchange.fetchOpenInterest(futuresSymbol);
                openInterest = ((_a = oiData[futuresSymbol]) === null || _a === void 0 ? void 0 : _a.openInterest) || 0;
                console.log(`💰 Open Interest: $${(openInterest / 1000000).toFixed(2)}M`);
            }
            catch (oiError) {
                console.warn('Failed to fetch OI:', oiError.message);
            }
            // Check liquidity filter
            const liquidityFilter = openInterest > 0 && openInterest < 1000000;
            if (liquidityFilter) {
                console.log(`⚠️ Would be filtered out due to low liquidity: $${(openInterest / 1000000).toFixed(2)}M`);
            }
            const rateData = {
                symbol: testSymbol,
                exchange: testExchangeId,
                exchangeName: EXCHANGE_CONFIGS[testExchangeId].name,
                futuresSymbol,
                fundingRate: fundingData.fundingRate,
                markPrice: fundingData.markPrice,
                apr: fundingData.fundingRate * 3 * 365 * 100,
                timestamp: admin.firestore.Timestamp.now(),
                openInterest,
                liquidityScore: openInterest >= 10000000 ? 'high' : openInterest >= 1000000 ? 'medium' : 'low',
                volume24h: 0,
                basisSpread: 0
            };
            allRates.push(rateData);
            console.log('✅ Successfully created rate data:', rateData);
        }
        catch (error) {
            console.error(`❌ Error testing ${testExchangeId}:`, error.message);
            errors.push(error.message);
        }
        console.log(`📊 Debug complete. ${allRates.length} rates collected. ${errors.length} errors.`);
        // Try to store one test record
        if (allRates.length > 0) {
            try {
                const testDoc = Object.assign(Object.assign({}, allRates[0]), { dataTier: 'realtime', batchTimestamp: admin.firestore.Timestamp.now(), debug: true });
                await db.collection('rates_realtime').add(testDoc);
                console.log('✅ Test data stored to Firestore successfully');
                return res.json({
                    success: true,
                    message: 'Debug completed and test data stored',
                    data: allRates[0],
                    stored: true
                });
            }
            catch (firestoreError) {
                console.error('❌ Failed to store to Firestore:', firestoreError);
                return res.json({
                    success: true,
                    message: 'Data collection successful but Firestore failed',
                    data: allRates[0],
                    firestoreError: firestoreError.message,
                    stored: false
                });
            }
        }
        else {
            return res.json({
                success: false,
                message: 'No data collected',
                errors,
                data: null,
                stored: false
            });
        }
    }
    catch (error) {
        console.error('❌ Debug function error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
//# sourceMappingURL=debug-scheduler.js.map