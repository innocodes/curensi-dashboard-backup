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
exports.debugEnv = exports.testCCXT = exports.testNewArchitecture = exports.getSubscription = exports.verifyPayment = exports.initializePayment = exports.updateUserPreferences = exports.getUserProfile = exports.getZScoreOpportunities = exports.getHistoricalRates = exports.getOpportunities = exports.getLatestRates = exports.scheduledCryptoFetcher = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const admin = __importStar(require("firebase-admin"));
const ccxt = __importStar(require("ccxt"));
const https_proxy_agent_1 = require("https-proxy-agent");
const resend_1 = require("resend");
// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
// Initialize Resend
// Ensure you have set this env var in your .env file or Google Cloud console
const resend = process.env.RESEND_API_KEY
    ? new resend_1.Resend(process.env.RESEND_API_KEY)
    : null;
// --- CONFIGURATION & CONSTANTS ---
const PROXY_CONFIG = {
    host: process.env.DATAIMPULSE_HOST || "gateway.us.dataimpulse.io",
    port: parseInt(process.env.DATAIMPULSE_PORT || "10001"),
    username: process.env.DATAIMPULSE_USERNAME,
    password: process.env.DATAIMPULSE_PASSWORD,
};
const EXCHANGE_CONFIGS = {
    okx: { name: "OKX", useProxy: false },
    binanceusdm: { name: "Binance", useProxy: true },
    bybit: { name: "Bybit", useProxy: true },
    kucoinfutures: { name: "KuCoin Futures", useProxy: false },
    bitget: { name: "Bitget", useProxy: true },
    gateio: { name: "Gate.io", useProxy: true },
    deribit: { name: "Deribit", useProxy: false },
};
// Master Symbol Map
const MASTER_SYMBOL_MAP = {
    BTC: {
        okx: "BTC-USDT-SWAP",
        binanceusdm: "BTC/USDT:USDT",
        bybit: "BTCUSDT",
        kucoinfutures: "BTC/USDT:USDT",
        bitget: "BTCUSDT",
        gateio: "BTC_USDT",
        deribit: "BTC-PERPETUAL",
    },
    ETH: {
        okx: "ETH-USDT-SWAP",
        binanceusdm: "ETH/USDT:USDT",
        bybit: "ETHUSDT",
        kucoinfutures: "ETH/USDT:USDT",
        bitget: "ETHUSDT",
        gateio: "ETH_USDT",
        deribit: "ETH-PERPETUAL",
    },
    SOL: {
        okx: "SOL-USDT-SWAP",
        binanceusdm: "SOL/USDT:USDT",
        bybit: "SOLUSDT",
        kucoinfutures: "SOL/USDT:USDT",
        bitget: "SOLUSDT",
        gateio: "SOL_USDT",
    },
    XRP: {
        okx: "XRP-USDT-SWAP",
        binanceusdm: "XRP/USDT:USDT",
        bybit: "XRPUSDT",
        kucoinfutures: "XRP/USDT:USDT",
        bitget: "XRPUSDT",
        gateio: "XRP_USDT",
    },
    DOGE: {
        okx: "DOGE-USDT-SWAP",
        binanceusdm: "DOGE/USDT:USDT",
        bybit: "DOGEUSDT",
        kucoinfutures: "DOGE/USDT:USDT",
        bitget: "DOGEUSDT",
        gateio: "DOGE_USDT",
    },
    ADA: {
        okx: "ADA-USDT-SWAP",
        binanceusdm: "ADA/USDT:USDT",
        bybit: "ADAUSDT",
        kucoinfutures: "ADA/USDT:USDT",
        bitget: "ADAUSDT",
        gateio: "ADA_USDT",
    },
};
const SPOT_SYMBOL_MAP = {
    BTC: {
        okx: "BTC-USDT",
        binance: "BTC/USDT",
        bybit: "BTCUSDT",
        kucoin: "BTC-USDT",
        bitget: "BTCUSDT",
        gateio: "BTC_USDT",
    },
    ETH: {
        okx: "ETH-USDT",
        binance: "ETH/USDT",
        bybit: "ETHUSDT",
        kucoin: "ETH-USDT",
        bitget: "ETHUSDT",
        gateio: "ETH_USDT",
    },
    SOL: {
        okx: "SOL-USDT",
        binance: "SOL/USDT",
        bybit: "SOLUSDT",
        kucoin: "SOL-USDT",
        bitget: "SOLUSDT",
        gateio: "SOL_USDT",
    },
};
// --- SYSTEM HELPERS ---
// Shared Proxy Agent
let sharedAgent;
const getProxyAgent = () => {
    if (!sharedAgent && PROXY_CONFIG.username && PROXY_CONFIG.password) {
        const proxyUrl = `http://${PROXY_CONFIG.username}:${PROXY_CONFIG.password}@${PROXY_CONFIG.host}:${PROXY_CONFIG.port}`;
        logger.info(`Creating proxy agent with config: host=${PROXY_CONFIG.host}, port=${PROXY_CONFIG.port}`);
        sharedAgent = new https_proxy_agent_1.HttpsProxyAgent(proxyUrl);
        logger.info("Proxy agent created successfully");
    }
    else if (!PROXY_CONFIG.username || !PROXY_CONFIG.password) {
        logger.warn("Proxy credentials not configured - DataImpulse credentials missing");
    }
    return sharedAgent;
};
// Exchange Factory
function createExchange(exchangeId) {
    const config = EXCHANGE_CONFIGS[exchangeId];
    const exchangeClass = ccxt[exchangeId];
    if (!exchangeClass) {
        logger.error(`Exchange class not found: ${exchangeId}`);
        return null;
    }
    const options = {
        timeout: 20000,
        enableRateLimit: true,
    };
    if (config === null || config === void 0 ? void 0 : config.useProxy) {
        const agent = getProxyAgent();
        if (agent) {
            options.agent = agent;
            logger.info(`Proxy enabled for ${exchangeId}`);
        }
        else {
            logger.warn(`Proxy configured for ${exchangeId} but agent not available - credentials may be missing`);
        }
    }
    try {
        const exchange = new exchangeClass(options);
        logger.info(`Exchange ${exchangeId} created successfully`);
        return exchange;
    }
    catch (error) {
        logger.error(`Failed to create exchange ${exchangeId}:`, error);
        return null;
    }
}
// Batch Write Helper
async function batchWrite(data, collectionName, addTimestamp = false) {
    const chunkSize = 400;
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }
    let count = 0;
    for (const chunk of chunks) {
        const batch = db.batch();
        const collectionRef = db.collection(collectionName);
        chunk.forEach((item) => {
            const docRef = collectionRef.doc();
            if (addTimestamp)
                item.storedAt = admin.firestore.FieldValue.serverTimestamp();
            batch.set(docRef, item);
        });
        await batch.commit();
        count += chunk.length;
    }
    logger.info(`💾 Batch Write: ${count} docs to ${collectionName}`);
}
function calculateLiquidityScore(openInterest) {
    if (openInterest >= 10000000)
        return "high";
    if (openInterest >= 1000000)
        return "medium";
    return "low";
}
// --- CORE FUNCTIONS ---
// 1. SCHEDULED DATA FETCHER (V2 Scheduler)
exports.scheduledCryptoFetcher = (0, scheduler_1.onSchedule)({
    schedule: "every 15 minutes",
    timeoutSeconds: 120,
    memory: "1GiB",
    // V2 uses .env files or params, ensure secrets/env vars are accessible
}, async (event) => {
    logger.info("🚀 Starting Parallel Fetch...");
    const tasks = [];
    for (const [baseSymbol, exchangeMap] of Object.entries(MASTER_SYMBOL_MAP)) {
        for (const [exchangeId, futuresSymbol] of Object.entries(exchangeMap)) {
            tasks.push(fetchSingleData(baseSymbol, exchangeId, futuresSymbol));
        }
    }
    const results = await Promise.all(tasks);
    const validRates = results.filter((r) => r !== null);
    if (validRates.length === 0) {
        logger.error("❌ Critical: No data fetched.");
        return;
    }
    await batchWrite(validRates, "latest_rates");
    await batchWrite(validRates, "historical_funding_rates", true);
    await processAlerts(validRates);
    logger.info(`🏁 Cycle Complete. Collected ${validRates.length} rates.`);
});
async function fetchSingleData(baseSymbol, exchangeId, futuresSymbol) {
    var _a;
    try {
        const exchange = createExchange(exchangeId);
        if (!exchange)
            return null;
        const [fundingRes, tickerRes, oiRes] = await Promise.allSettled([
            exchange.fetchFundingRate(futuresSymbol),
            exchange.fetchTicker(futuresSymbol),
            exchange.fetchOpenInterest
                ? exchange.fetchOpenInterest(futuresSymbol)
                : Promise.resolve(null),
        ]);
        if (fundingRes.status === "rejected" || !fundingRes.value)
            return null;
        const funding = fundingRes.value;
        const ticker = tickerRes.status === "fulfilled" ? tickerRes.value : null;
        const volume24h = (ticker === null || ticker === void 0 ? void 0 : ticker.quoteVolume) || 0;
        let openInterest = 0;
        if (oiRes.status === "fulfilled" && oiRes.value) {
            const val = oiRes.value;
            openInterest =
                val.openInterest ||
                    (val[futuresSymbol] ? val[futuresSymbol].openInterest : 0);
        }
        if (openInterest > 0 && openInterest < 100000)
            return null;
        let basisSpread = 0;
        let spotPrice = 0;
        try {
            const spotSymbol = (_a = SPOT_SYMBOL_MAP[baseSymbol]) === null || _a === void 0 ? void 0 : _a[exchangeId];
            if (spotSymbol) {
                const spotTicker = await exchange.fetchTicker(spotSymbol);
                spotPrice = spotTicker.last || 0;
                if (spotPrice > 0 && funding.markPrice) {
                    basisSpread = ((funding.markPrice - spotPrice) / spotPrice) * 100;
                }
            }
        }
        catch (e) {
            /* Basis is optional */
        }
        const apr = (funding.fundingRate || 0) * 3 * 365 * 100;
        return {
            exchange: EXCHANGE_CONFIGS[exchangeId].name,
            symbol: baseSymbol,
            fundingRate: funding.fundingRate || 0,
            apr,
            markPrice: funding.markPrice || 0,
            nextFundingTime: funding.nextFundingTime,
            timestamp: admin.firestore.Timestamp.now(),
            openInterest,
            basisSpread,
            spotPrice,
            liquidityScore: calculateLiquidityScore(openInterest),
            volume24h,
        };
    }
    catch (e) {
        return null;
    }
}
async function processAlerts(rates) {
    const HIGH_YIELD_THRESHOLD = 20;
    const opportunities = rates.filter((r) => r.apr > HIGH_YIELD_THRESHOLD && r.liquidityScore !== "low");
    if (opportunities.length === 0)
        return;
    const snapshot = await db
        .collection("users")
        .where("subscriptionStatus", "==", "active")
        .where("notifications.email", "==", true)
        .get();
    if (snapshot.empty)
        return;
    const emailsToSend = [];
    const topOps = opportunities.slice(0, 5);
    const emailHtml = generateEmailTemplate(topOps);
    snapshot.docs.forEach((doc) => {
        const user = doc.data();
        if (user.email) {
            emailsToSend.push({
                from: "Curensi Alerts <alerts@curensi.com>",
                to: [user.email],
                subject: `🚀 High Yield Alert: ${opportunities.length} Opportunities`,
                html: emailHtml,
            });
        }
    });
    if (resend && emailsToSend.length > 0) {
        await Promise.allSettled(emailsToSend.map((email) => resend.emails.send(email)));
        logger.info(`📧 Queued ${emailsToSend.length} alerts.`);
    }
    else if (emailsToSend.length > 0) {
        logger.warn(`⚠️ Resend not configured. ${emailsToSend.length} alerts not sent.`);
    }
}
function generateEmailTemplate(ops) {
    const rows = ops
        .map((o) => `
    <tr>
        <td style="padding:8px">${o.symbol}</td>
        <td style="padding:8px">${o.exchange}</td>
        <td style="padding:8px; color:green"><b>${o.apr.toFixed(2)}%</b></td>
        <td style="padding:8px">${o.liquidityScore}</td>
    </tr>
  `)
        .join("");
    return `
    <div style="font-family: sans-serif;">
        <h2>🚀 High Yield Alert</h2>
        <p>The following opportunities have spiked above 20% APR:</p>
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <tr style="background: #f0f0f0; text-align: left;">
                <th>Coin</th><th>Exchange</th><th>APR</th><th>Liquidity</th>
            </tr>
            ${rows}
        </table>
        <p><a href="https://curensi.com" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Opportunities</a></p>
    </div>
  `;
}
// --- API ENDPOINTS (V2 onRequest) ---
// 1. Get Latest Rates
exports.getLatestRates = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        let userTier = "free";
        let dataCollection = "latest_rates"; // Try to get real-time data first
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const idToken = authHeader.split("Bearer ")[1];
            try {
                const decodedToken = await admin.auth().verifyIdToken(idToken);
                const userDoc = await db
                    .collection("users")
                    .doc(decodedToken.uid)
                    .get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    if ((userData === null || userData === void 0 ? void 0 : userData.subscriptionStatus) === "active" &&
                        ["pro", "premium"].includes(userData === null || userData === void 0 ? void 0 : userData.subscriptionTier)) {
                        userTier = userData.subscriptionTier;
                    }
                }
            }
            catch (e) {
                logger.warn("Auth Check Failed:", e);
            }
        }
        // Try to get from latest_rates first, fallback to historical if empty
        let query = db.collection(dataCollection).orderBy("apr", "desc");
        if (userTier === "free") {
            query = query.limit(10);
        }
        else {
            query = query.limit(100);
        }
        const snapshot = await query.get();
        let rates = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        // If no real-time data, try to get recent historical data
        if (rates.length === 0) {
            logger.info("No real-time data found, trying historical data");
            const historicalQuery = db
                .collection("historical_funding_rates")
                .orderBy("timestamp", "desc")
                .limit(userTier === "free" ? 10 : 100);
            const historicalSnapshot = await historicalQuery.get();
            rates = historicalSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        }
        // If still no data, create sample data for testing
        if (rates.length === 0) {
            logger.info("No data found, creating sample data");
            rates = [];
        }
        res.json({
            success: true,
            meta: {
                userTier,
                isRealtime: dataCollection === "latest_rates" && rates.length > 0,
                dataPoints: rates.length,
            },
            data: rates,
        });
    }
    catch (error) {
        logger.error("getLatestRates error:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});
// 2. Get Opportunities
exports.getOpportunities = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        // Support both GET query params and POST body
        const minApr = parseFloat(req.body.minApr || req.query.minApr || "0");
        const symbols = req.body.symbols || req.query.symbols;
        const exchanges = req.body.exchanges || req.query.exchanges;
        let query = db.collection("latest_rates").orderBy("apr", "desc").limit(100);
        const snapshot = await query.get();
        let rates = snapshot.docs.map((doc) => doc.data());
        // If no real-time data, try historical data
        if (rates.length === 0) {
            const historicalQuery = db
                .collection("historical_funding_rates")
                .orderBy("timestamp", "desc")
                .limit(100);
            const historicalSnapshot = await historicalQuery.get();
            rates = historicalSnapshot.docs.map((doc) => doc.data());
        }
        // Apply filters
        if (minApr > 0)
            rates = rates.filter((r) => r.apr >= minApr);
        if (symbols) {
            const symbolArray = Array.isArray(symbols) ? symbols : [symbols];
            rates = rates.filter((r) => symbolArray.includes(r.symbol));
        }
        if (exchanges) {
            const exchangeArray = Array.isArray(exchanges) ? exchanges : [exchanges];
            rates = rates.filter((r) => exchangeArray.includes(r.exchange));
        }
        res.json({
            success: true,
            meta: {
                totalOpportunities: rates.length,
                filters: { minApr, symbols, exchanges },
            },
            data: rates,
        });
    }
    catch (error) {
        logger.error("getOpportunities error:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});
// 3. Historical Data
exports.getHistoricalRates = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        // Support both GET query params and POST body
        const symbol = req.body.symbol || req.query.symbol;
        const exchange = req.body.exchange || req.query.exchange;
        const days = parseInt(req.body.days || req.query.days || "7");
        if (!symbol || !exchange) {
            res
                .status(400)
                .json({ error: "Missing params: symbol and exchange are required" });
            return;
        }
        const startDate = admin.firestore.Timestamp.fromDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
        const snapshot = await db
            .collection("historical_funding_rates")
            .where("symbol", "==", symbol)
            .where("exchange", "==", exchange)
            .where("timestamp", ">=", startDate)
            .orderBy("timestamp", "asc")
            .get();
        res.json({ success: true, data: snapshot.docs.map((d) => d.data()) });
    }
    catch (error) {
        logger.error("getHistoricalRates error:", error);
        res.status(500).json({ success: false, error: "Fetch Failed" });
    }
});
// 4. Z-Score Analysis
exports.getZScoreOpportunities = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        // Support both GET query params and POST body
        const symbols = req.body.symbols ||
            req.query.symbols || ["BTC", "ETH", "SOL"];
        const threshold = parseFloat(req.body.threshold || req.query.threshold || "2");
        const symbolArray = Array.isArray(symbols) ? symbols : [symbols];
        const startDate = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 48 * 60 * 60 * 1000));
        const opportunities = [];
        for (const symbol of symbolArray) {
            for (const exName of Object.values(EXCHANGE_CONFIGS).map((e) => e.name)) {
                try {
                    const snapshot = await db
                        .collection("historical_funding_rates")
                        .where("symbol", "==", symbol)
                        .where("exchange", "==", exName)
                        .where("timestamp", ">=", startDate)
                        .orderBy("timestamp", "desc")
                        .get();
                    if (snapshot.empty)
                        continue;
                    const rates = snapshot.docs.map((d) => {
                        const data = d.data();
                        return data.fundingRate || 0;
                    });
                    if (rates.length < 10)
                        continue;
                    const current = rates[0];
                    const mean = rates.reduce((a, b) => a + b, 0) / rates.length;
                    const variance = rates.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
                        rates.length;
                    const stdDev = Math.sqrt(variance);
                    if (stdDev > 0) {
                        const zScore = (current - mean) / stdDev;
                        if (Math.abs(zScore) >= threshold) {
                            opportunities.push({
                                symbol,
                                exchange: exName,
                                zScore,
                                currentRate: current,
                                confidence: Math.min(Math.abs(zScore) / 3, 1),
                                dataPoints: rates.length,
                            });
                        }
                    }
                }
                catch (ex) {
                    logger.warn(`Z-Score calculation failed for ${symbol} on ${exName}:`, ex);
                    continue;
                }
            }
        }
        opportunities.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore));
        res.json({ success: true, data: opportunities });
    }
    catch (e) {
        logger.error("getZScoreOpportunities error:", e);
        res
            .status(500)
            .json({ error: "Calc Failed", details: e.message });
    }
});
// --- CALLABLE FUNCTIONS (V2 onCall) ---
exports.getUserProfile = (0, https_1.onCall)(async (request) => {
    if (!request.auth)
        throw new https_1.HttpsError("unauthenticated", "Login required");
    const doc = await db.collection("users").doc(request.auth.uid).get();
    if (!doc.exists) {
        const profile = {
            subscriptionTier: "free",
            subscriptionStatus: "active",
            notifications: { email: false, threshold: 20 },
            preferences: {
                defaultSymbols: ["BTC", "ETH"],
                preferredExchanges: ["Binance"],
            },
        };
        await doc.ref.set(profile);
        return profile;
    }
    return doc.data();
});
exports.updateUserPreferences = (0, https_1.onCall)(async (request) => {
    if (!request.auth)
        throw new https_1.HttpsError("unauthenticated", "Login required");
    await db.collection("users").doc(request.auth.uid).update({
        preferences: request.data.preferences,
        notifications: request.data.notifications,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true };
});
exports.initializePayment = (0, https_1.onCall)(async (request) => {
    if (!request.auth)
        throw new https_1.HttpsError("unauthenticated", "Auth required");
    const { plan, interval = "monthly" } = request.data;
    const amount = (plan === "pro" ? 999 : 2999) * (interval === "yearly" ? 10 : 1);
    try {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: request.auth.token.email,
                amount,
                currency: "USD",
                callback_url: "https://curensi.com/payment/success",
                metadata: { userId: request.auth.uid, plan, interval },
            }),
        });
        const json = (await response.json());
        return json.data;
    }
    catch (e) {
        throw new https_1.HttpsError("internal", "Payment Init Failed");
    }
});
exports.verifyPayment = (0, https_1.onCall)(async (request) => {
    if (!request.auth)
        throw new https_1.HttpsError("unauthenticated", "Auth required");
    try {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        const response = await fetch(`https://api.paystack.co/transaction/verify/${request.data.reference}`, {
            headers: { Authorization: `Bearer ${secret}` },
        });
        const json = (await response.json());
        if (json.status && json.data.status === "success") {
            const meta = json.data.metadata;
            const expiry = new Date();
            expiry.setMonth(expiry.getMonth() + (meta.interval === "yearly" ? 12 : 1));
            await db
                .collection("users")
                .doc(meta.userId)
                .update({
                subscriptionTier: meta.plan,
                subscriptionStatus: "active",
                subscriptionEndDate: admin.firestore.Timestamp.fromDate(expiry),
            });
            return { success: true };
        }
        return { success: false };
    }
    catch (e) {
        throw new https_1.HttpsError("internal", "Verify Failed");
    }
});
exports.getSubscription = (0, https_1.onCall)(async (request) => {
    if (!request.auth)
        throw new https_1.HttpsError("unauthenticated", "Auth required");
    const userDoc = await db.collection("users").doc(request.auth.uid).get();
    const userData = userDoc.data() || {};
    if (userData.subscriptionEndDate &&
        userData.subscriptionEndDate.toDate() < new Date()) {
        await userDoc.ref.update({
            subscriptionTier: "free",
            subscriptionStatus: "expired",
        });
        return { plan: "free", status: "expired" };
    }
    return {
        plan: userData.subscriptionTier || "free",
        status: userData.subscriptionStatus || "active",
    };
});
// --- TEST ENDPOINTS ---
exports.testNewArchitecture = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        const exchange = createExchange("binanceusdm");
        if (!exchange)
            throw new Error("Init failed");
        const funding = await exchange.fetchFundingRate("BTC/USDT:USDT");
        res.json({ success: true, rate: funding.fundingRate });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.testCCXT = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        // Test proxy and exchange connectivity
        const proxyAgent = getProxyAgent();
        const proxyStatus = proxyAgent ? "Configured" : "Not configured";
        // Test a basic exchange connection
        const exchange = createExchange("binanceusdm");
        if (!exchange) {
            res.json({
                status: "Exchange creation failed",
                proxyStatus,
                error: "DataImpulse credentials may be missing",
            });
            return;
        }
        // Test basic connectivity
        try {
            const markets = await exchange.loadMarkets();
            res.json({
                status: "Success",
                proxyStatus,
                exchangeId: "binanceusdm",
                marketsLoaded: Object.keys(markets).length,
                message: "CCXT and proxy working correctly",
            });
        }
        catch (marketError) {
            res.json({
                status: "Proxy/Exchange error",
                proxyStatus,
                error: marketError.message,
            });
        }
    }
    catch (error) {
        logger.error("testCCXT error:", error);
        res.json({
            status: "Test failed",
            error: error.message,
        });
    }
});
// Debug endpoint to check environment variables
exports.debugEnv = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        const envVars = {
            DATAIMPULSE_HOST: process.env.DATAIMPULSE_HOST || "NOT_SET",
            DATAIMPULSE_PORT: process.env.DATAIMPULSE_PORT || "NOT_SET",
            DATAIMPULSE_USERNAME: process.env.DATAIMPULSE_USERNAME ? "SET" : "NOT_SET",
            DATAIMPULSE_PASSWORD: process.env.DATAIMPULSE_PASSWORD ? "SET" : "NOT_SET",
            RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT_SET",
            PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY ? "SET" : "NOT_SET",
        };
        const proxyConfig = {
            host: PROXY_CONFIG.host,
            port: PROXY_CONFIG.port,
            username: PROXY_CONFIG.username ? "SET" : "NOT_SET",
            password: PROXY_CONFIG.password ? "SET" : "NOT_SET",
        };
        res.json({
            status: "Environment variables debug",
            environmentVariables: envVars,
            proxyConfiguration: proxyConfig,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        logger.error("debugEnv error:", error);
        res.status(500).json({
            status: "Debug failed",
            error: error.message,
        });
    }
});
//# sourceMappingURL=index.js.map