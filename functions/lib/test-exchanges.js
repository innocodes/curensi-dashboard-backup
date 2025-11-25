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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCCXT = void 0;
const v2_1 = require("firebase-functions/v2");
const ccxt = __importStar(require("ccxt"));
const cors_1 = __importDefault(require("cors"));
const corsHandler = (0, cors_1.default)({ origin: true });
// Simple test function to check CCXT connectivity
exports.testCCXT = v2_1.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        try {
            console.log('Testing CCXT connectivity...');
            // Test just one exchange with minimal requests
            const exchange = new ccxt.binanceusdm();
            // Try to fetch just one funding rate
            try {
                const fundingData = await exchange.fetchFundingRate('BTC/USDT:USDT');
                console.log('✅ CCXT Success! Data:', {
                    exchange: 'Binance',
                    symbol: 'BTC/USDT:USDT',
                    fundingRate: fundingData.fundingRate,
                    timestamp: new Date().toISOString()
                });
                res.json({
                    success: true,
                    message: 'CCXT working successfully',
                    data: {
                        exchange: 'Binance',
                        symbol: 'BTC/USDT:USDT',
                        fundingRate: fundingData.fundingRate,
                        markPrice: fundingData.markPrice,
                        apr: (fundingData.fundingRate * 3 * 365 * 100)
                    }
                });
            }
            catch (exchangeError) {
                console.error('❌ Exchange error:', exchangeError.message);
                res.status(500).json({
                    success: false,
                    error: 'Exchange connection failed',
                    details: exchangeError.message
                });
            }
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
//# sourceMappingURL=test-exchanges.js.map