import { https } from 'firebase-functions/v2';
import * as functions from 'firebase-functions';
import * as ccxt from 'ccxt';
import cors from 'cors';

const corsHandler = cors({ origin: true });

// Simple test function to check CCXT connectivity
export const testCCXT = https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      console.log('Testing CCXT connectivity...');

      // Test just one exchange with minimal requests
      const exchange = new (ccxt as any).binanceusdm();

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

      } catch (exchangeError) {
        console.error('❌ Exchange error:', exchangeError.message);
        res.status(500).json({
          success: false,
          error: 'Exchange connection failed',
          details: exchangeError.message
        });
      }

    } catch (error) {
      console.error('❌ General error:', error);
      res.status(500).json({
        success: false,
        error: 'Test failed',
        details: error.message
      });
    }
  });
});