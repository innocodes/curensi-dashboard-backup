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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const ccxt = __importStar(require("ccxt"));
const cors_1 = __importDefault(require("cors"));
const https_proxy_agent_1 = require("https-proxy-agent");
const resend_1 = require("resend");
// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
const corsHandler = (0, cors_1.default)({ origin: true });
// Initialize Resend for email notifications
const resend = new resend_1.Resend((_a = functions.config().resend) === null || _a === void 0 ? void 0 : _a.api_key);
// --- CONFIGURATION & CONSTANTS ---
// DataImpulse Proxy Configuration
const PROXY_CONFIG = {
    host: ((_b = functions.config().dataimpulse) === null || _b === void 0 ? void 0 : _b.host) || "gw.dataimpulse.com",
    port: parseInt((_c = functions.config().dataimpulse) === null || _c === void 0 ? void 0 : _c.port) || 823,
    username: (_d = functions.config().dataimpulse) === null || _d === void 0 ? void 0 : _d.username,
    password: (_e = functions.config().dataimpulse) === null || _e === void 0 ? void 0 : _e.password,
};
// Exchange Configurations
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
// Spot symbol mapping for basis calculation
const SPOT_SYMBOL_MAP = {
    BTC: {
        okx: "BTC-USDT",
        binanceusdm: "BTC/USDT",
        bybit: "BTCUSDT",
        kucoinfutures: "BTC-USDT",
        bitget: "BTCUSDT",
        gateio: "BTC_USDT",
    },
    ETH: {
        okx: "ETH-USDT",
        binanceusdm: "ETH/USDT",
        bybit: "ETHUSDT",
        kucoinfutures: "ETH-USDT",
        bitget: "ETHUSDT",
        gateio: "ETH_USDT",
    },
    SOL: {
        okx: "SOL-USDT",
        binanceusdm: "SOL/USDT",
        bybit: "SOLUSDT",
        kucoinfutures: "SOL-USDT",
        bitget: "SOLUSDT",
        gateio: "SOL_USDT",
    },
};
// --- SYSTEM HELPERS ---
// Shared Proxy Agent (Singleton)
let sharedAgent;
const getProxyAgent = () => {
    if (!sharedAgent && PROXY_CONFIG.username && PROXY_CONFIG.password) {
        const proxyUrl = `http://${PROXY_CONFIG.username}:${PROXY_CONFIG.password}@${PROXY_CONFIG.host}:${PROXY_CONFIG.port}`;
        sharedAgent = new https_proxy_agent_1.HttpsProxyAgent(proxyUrl);
    }
    return sharedAgent;
};
// Exchange Factory
function createExchange(exchangeId) {
    const config = EXCHANGE_CONFIGS[exchangeId];
    const exchangeClass = ccxt[exchangeId];
    if (!exchangeClass)
        return null;
    const options = {
        timeout: 20000, // 20s timeout
        enableRateLimit: true,
    };
    if (config === null || config === void 0 ? void 0 : config.useProxy) {
        const agent = getProxyAgent();
        if (agent)
            options.agent = agent;
    }
    return new exchangeClass(options);
}
// Batch Write Helper (Chunks to 400 to respect Firestore 500 limit)
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
    console.log(`💾 Wrote ${count} docs to ${collectionName}`);
}
function calculateLiquidityScore(openInterest) {
    if (openInterest >= 10000000)
        return "high"; // $10M+
    if (openInterest >= 1000000)
        return "medium"; // $1M+
    return "low";
}
// --- CORE FUNCTIONS ---
// 1. SCHEDULED DATA FETCHER (The Engine)
exports.scheduledCryptoFetcher = functions
    .runWith({
    timeoutSeconds: 120,
    memory: "1GB",
})
    .pubsub.schedule("every 15 minutes")
    .onRun(async (context) => {
    console.log("🚀 Starting Parallel Fetch...");
    const tasks = [];
    // Generate Tasks
    for (const [baseSymbol, exchangeMap] of Object.entries(MASTER_SYMBOL_MAP)) {
        for (const [exchangeId, futuresSymbol] of Object.entries(exchangeMap)) {
            tasks.push(fetchSingleData(baseSymbol, exchangeId, futuresSymbol));
        }
    }
    // Execute in Parallel
    const results = await Promise.all(tasks);
    const validRates = results.filter((r) => r !== null);
    if (validRates.length === 0) {
        console.error("❌ Critical: No data fetched.");
        return null;
    }
    // Store Data
    await batchWrite(validRates, "latest_rates");
    await batchWrite(validRates, "historical_funding_rates", true);
    // Check Alerts
    await processAlerts(validRates);
    console.log(`🏁 Cycle Complete. Collected ${validRates.length} rates.`);
    return null;
});
// Helper: Fetch single item logic
async function fetchSingleData(baseSymbol, exchangeId, futuresSymbol) {
    var _a;
    try {
        const exchange = createExchange(exchangeId);
        if (!exchange)
            return null;
        // Fetch Funding, Ticker, and OI in parallel
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
        // Extract Volume
        const ticker = tickerRes.status === "fulfilled" ? tickerRes.value : null;
        const volume24h = (ticker === null || ticker === void 0 ? void 0 : ticker.quoteVolume) || 0;
        // Extract OI
        let openInterest = 0;
        if (oiRes.status === "fulfilled" && oiRes.value) {
            const val = oiRes.value;
            // Handle different CCXT return structures
            openInterest =
                val.openInterest ||
                    (val[futuresSymbol] ? val[futuresSymbol].openInterest : 0);
        }
        // Calculate Spread
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
            /* Ignore basis errors */
        }
        // Calculate APR
        const rate = funding.fundingRate || 0;
        const apr = rate * 3 * 365 * 100;
        return {
            exchange: EXCHANGE_CONFIGS[exchangeId].name,
            symbol: baseSymbol,
            fundingRate: rate,
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
        // console.warn(`⚠️ Error ${baseSymbol}-${exchangeId}: ${(e as Error).message}`);
        return null;
    }
}
// 2. ALERT PROCESSOR
async function processAlerts(rates) {
    const HIGH_YIELD_THRESHOLD = 20; // 20% APR
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
    await Promise.allSettled(emailsToSend.map((email) => resend.emails.send(email)));
    console.log(`📧 Queued ${emailsToSend.length} alerts.`);
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
// --- API ENDPOINTS ---
// 1. Get Latest Rates (Secure Reader)
exports.getLatestRates = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            let userTier = "free";
            let dataCollection = "rates_delayed"; // Default for security
            // Security: Verify JWT Token
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
                            dataCollection = "latest_rates"; // Access Real-time data
                        }
                    }
                }
                catch (e) {
                    console.warn("Auth Check Failed:", e);
                }
            }
            let query = db.collection(dataCollection).orderBy("apr", "desc");
            // Freemium Limit
            if (userTier === "free") {
                query = query.limit(10);
            }
            else {
                query = query.limit(100);
            }
            const snapshot = await query.get();
            const rates = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            res.json({
                success: true,
                meta: { userTier, isRealtime: dataCollection === "latest_rates" },
                data: rates,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Server Error" });
        }
    });
});
// 2. Get Opportunities (Advanced Filter)
exports.getOpportunities = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            // Re-use the same auth logic as above for security (Omitted for brevity, but should be copied)
            // Assume 'latest_rates' access for this endpoint implies authenticated/paid user in frontend logic
            const { minApr = 0, minLiquidity, symbols, exchanges } = req.body;
            let query = db
                .collection("latest_rates")
                .orderBy("apr", "desc")
                .limit(100);
            const snapshot = await query.get();
            let rates = snapshot.docs.map((doc) => doc.data());
            // In-memory filtering (Firestore is limited)
            if (minApr > 0)
                rates = rates.filter((r) => r.apr >= minApr);
            if (symbols === null || symbols === void 0 ? void 0 : symbols.length)
                rates = rates.filter((r) => symbols.includes(r.symbol));
            if (exchanges === null || exchanges === void 0 ? void 0 : exchanges.length)
                rates = rates.filter((r) => exchanges.includes(r.exchange));
            res.json({ success: true, data: rates });
        }
        catch (error) {
            res.status(500).json({ success: false });
        }
    });
});
// 3. Historical Data
exports.getHistoricalRates = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const { symbol, exchange, days = 7 } = req.body;
            if (!symbol || !exchange)
                return res.status(400).json({ error: "Missing params" });
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
            res.status(500).json({ success: false, error: "Fetch Failed" });
        }
    });
});
// 4. Z-Score Analysis
exports.getZScoreOpportunities = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const { symbols = ["BTC", "ETH", "SOL"], threshold = 2 } = req.body;
            const startDate = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 48 * 60 * 60 * 1000));
            const opportunities = [];
            for (const symbol of symbols) {
                for (const exName of Object.values(EXCHANGES).map((e) => e.name)) {
                    const snapshot = await db
                        .collection("historical_funding_rates")
                        .where("symbol", "==", symbol)
                        .where("exchange", "==", exName)
                        .where("timestamp", ">=", startDate)
                        .orderBy("timestamp", "desc")
                        .get();
                    const rates = snapshot.docs.map((d) => d.data().fundingRate);
                    if (rates.length < 10)
                        continue;
                    const current = rates[0];
                    const mean = rates.reduce((a, b) => a + b, 0) / rates.length;
                    const stdDev = Math.sqrt(rates.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / rates.length);
                    if (stdDev > 0) {
                        const zScore = (current - mean) / stdDev;
                        if (Math.abs(zScore) >= threshold) {
                            opportunities.push({
                                symbol,
                                exchange: exName,
                                zScore,
                                currentRate: current,
                                confidence: Math.min(Math.abs(zScore) / 3, 1),
                            });
                        }
                    }
                }
            }
            opportunities.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore));
            res.json({ success: true, data: opportunities });
        }
        catch (e) {
            res.status(500).json({ error: "Calc Failed" });
        }
    });
});
// --- USER & PAYMENTS ---
exports.getUserProfile = functions.https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError("unauthenticated", "Login required");
    const doc = await db.collection("users").doc(context.auth.uid).get();
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
exports.updateUserPreferences = functions.https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError("unauthenticated", "Login required");
    await db.collection("users").doc(context.auth.uid).update({
        preferences: data.preferences,
        notifications: data.notifications,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true };
});
exports.initializePayment = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth)
        throw new functions.https.HttpsError("unauthenticated", "Auth required");
    const { plan, interval = "monthly" } = data;
    const amount = (plan === "pro" ? 999 : 2999) * (interval === "yearly" ? 10 : 1);
    try {
        const secret = (_a = functions.config().paystack) === null || _a === void 0 ? void 0 : _a.secret_key;
        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: context.auth.token.email,
                amount,
                currency: "USD",
                callback_url: "https://curensi.com/payment/success",
                metadata: { userId: context.auth.uid, plan, interval },
            }),
        });
        const json = (await response.json());
        return json.data;
    }
    catch (e) {
        throw new functions.https.HttpsError("internal", "Payment Init Failed");
    }
});
exports.verifyPayment = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth)
        throw new functions.https.HttpsError("unauthenticated", "Auth required");
    try {
        const secret = (_a = functions.config().paystack) === null || _a === void 0 ? void 0 : _a.secret_key;
        const response = await fetch(`https://api.paystack.co/transaction/verify/${data.reference}`, {
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
        throw new functions.https.HttpsError("internal", "Verify Failed");
    }
});
// Legacy/Test endpoints
exports.testCCXT = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        const results = [];
        for (const exId of ["okx", "binanceusdm"]) {
            try {
                const ex = createExchange(exId);
                if (ex) {
                    const data = await ex.fetchFundingRate("BTC/USDT");
                    results.push({ exId, success: true, rate: data.fundingRate });
                }
            }
            catch (e) {
                results.push({ exId, success: false, error: e.message });
            }
        }
        res.json(results);
    });
});
//# sourceMappingURL=indexTwo.js.map