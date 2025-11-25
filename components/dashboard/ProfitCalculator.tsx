'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatPercentage, formatCurrency, cn } from '@/lib/utils';
import { FundingRate } from '@/lib/types';
import Button from '@/components/ui/Button';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Info,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface ProfitCalculatorProps {
  rates: FundingRate[];
  userTier?: 'free' | 'pro' | 'premium';
}

interface CalculationResult {
  dailyFunding: number;
  totalFunding: number;
  tradingFees: number;
  netProfit: number;
  roi: number;
  breakEvenDays: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function ProfitCalculator({ rates, userTier = 'pro' }: ProfitCalculatorProps) {
  const [principal, setPrincipal] = useState(10000);
  const [holdingDays, setHoldingDays] = useState(7);
  const [selectedRate, setSelectedRate] = useState<FundingRate | null>(null);
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [tradingFeeRate] = useState(0.001); // 0.1% per trade

  useEffect(() => {
    if (rates.length > 0 && !selectedRate) {
      // Auto-select the best opportunity
      const bestRate = rates.find(r => r.liquidityScore === 'high' && r.apr > 0) || rates[0];
      setSelectedRate(bestRate);
    }
  }, [rates, selectedRate]);

  useEffect(() => {
    if (selectedRate) {
      calculateProfit();
    }
  }, [principal, holdingDays, selectedRate]);

  const calculateProfit = () => {
    if (!selectedRate) return;

    const dailyRate = selectedRate.fundingRate * 3; // 3 funding payments per day
    const totalFundingRate = dailyRate * holdingDays;
    const totalFunding = principal * totalFundingRate;

    // Trading fees: entry + exit = 2 trades
    const tradingFees = principal * tradingFeeRate * 2;

    // Basis spread cost (if negative)
    let basisCost = 0;
    if (selectedRate.basisSpread !== undefined && selectedRate.basisSpread < 0) {
      basisCost = principal * Math.abs(selectedRate.basisSpread) / 100;
    }

    const netProfit = totalFunding - tradingFees - basisCost;
    const roi = (netProfit / principal) * 100;

    // Calculate break-even days
    let breakEvenDays = 0;
    const dailyNet = (dailyRate * principal) - (tradingFees / holdingDays) - (basisCost / holdingDays);
    if (dailyNet > 0) {
      breakEvenDays = (tradingFees + basisCost) / (dailyRate * principal);
    }

    // Risk assessment
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (selectedRate.liquidityScore === 'low') riskLevel = 'high';
    else if (selectedRate.liquidityScore === 'medium' || Math.abs(selectedRate.basisSpread || 0) > 0.5) riskLevel = 'medium';
    else if (selectedRate.apr < 10) riskLevel = 'medium';

    setCalculation({
      dailyFunding: dailyRate * principal,
      totalFunding,
      tradingFees: tradingFees + basisCost,
      netProfit,
      roi,
      breakEvenDays,
      riskLevel
    });
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const topRates = rates
    .filter(r => r.liquidityScore !== 'low')
    .sort((a, b) => b.apr - a.apr)
    .slice(0, 5);

  if (userTier === 'free') {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-xl">
        <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Profit Calculator
        </h3>
        <p className="text-gray-600 mb-6">
          This advanced calculator is available for Pro and Premium users only.
        </p>
        <Button variant="primary">
          Upgrade to Pro - $29/month
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Profit Calculator
        </h2>
        <p className="text-gray-600 mt-1">
          Calculate potential returns from cash & carry arbitrage strategies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Inputs */}
        <div className="lg:col-span-1 space-y-6">
          {/* Principal Input */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Investment Principal
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Math.max(100, parseInt(e.target.value) || 0))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="100"
                step="100"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[1000, 5000, 10000, 25000].map(amount => (
                <button
                  key={amount}
                  onClick={() => setPrincipal(amount)}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  ${amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Holding Period */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Holding Period
            </label>
            <div className="relative">
              <input
                type="number"
                value={holdingDays}
                onChange={(e) => setHoldingDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full pr-12 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="1"
                step="1"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                days
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              {[1, 7, 14, 30].map(days => (
                <button
                  key={days}
                  onClick={() => setHoldingDays(days)}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>

          {/* Opportunity Selection */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Opportunity
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {topRates.map((rate, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRate(rate)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-colors",
                    selectedRate === rate
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">
                        {rate.symbol} on {rate.exchange}
                      </div>
                      <div className="text-xs text-gray-500">
                        Liquidity: {rate.liquidityScore}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-600">
                        {formatPercentage(rate.apr)}
                      </div>
                      {rate.basisSpread !== undefined && (
                        <div className={cn(
                          "text-xs",
                          rate.basisSpread < -0.1 ? "text-red-600" : "text-green-600"
                        )}>
                          Spread: {formatPercentage(rate.basisSpread)}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {calculation && selectedRate && (
            <>
              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary-500 to-blue-600 p-6 rounded-xl text-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Projected Return</h3>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    getRiskLevelColor(calculation.riskLevel)
                  )}>
                    {calculation.riskLevel.toUpperCase()} RISK
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-primary-100 text-sm">Net Profit</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(calculation.netProfit)}
                    </p>
                    <p className="text-primary-100 text-sm">
                      {formatPercentage(calculation.roi)}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-100 text-sm">Daily Funding</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(calculation.dailyFunding)}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-100 text-sm">Total Costs</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(calculation.tradingFees)}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-100 text-sm">Break Even</p>
                    <p className="text-xl font-semibold">
                      {calculation.breakEvenDays > 0 && calculation.breakEvenDays < 100
                        ? `${calculation.breakEvenDays.toFixed(1)} days`
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Detailed Breakdown */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Profit Breakdown
                </h3>

                <div className="space-y-4">
                  {/* Funding Income */}
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Funding Income</p>
                        <p className="text-sm text-gray-600">
                          {formatPercentage(selectedRate.fundingRate * 100, 4)} rate × 3 payments/day × {holdingDays} days
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      +{formatCurrency(calculation.totalFunding)}
                    </p>
                  </div>

                  {/* Trading Costs */}
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Trading Costs</p>
                        <p className="text-sm text-gray-600">
                          Entry + exit fees ({formatPercentage(tradingFeeRate * 100)} each)
                          {selectedRate.basisSpread !== undefined && selectedRate.basisSpread < 0 && (
                            <span> + basis spread</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-red-600">
                      -{formatCurrency(calculation.tradingFees)}
                    </p>
                  </div>

                  {/* Net Result */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Net Result</p>
                        <p className="text-sm text-gray-600">
                          {calculation.netProfit > 0 ? 'Profit' : 'Loss'} over {holdingDays} days
                        </p>
                      </div>
                    </div>
                    <p className={cn(
                      "text-lg font-bold",
                      calculation.netProfit > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {calculation.netProfit > 0 ? '+' : ''}{formatCurrency(calculation.netProfit)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Risk Analysis & Recommendations
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={cn(
                    "p-4 rounded-lg border",
                    calculation.riskLevel === 'low' ? 'bg-green-50 border-green-200' :
                    calculation.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      {calculation.riskLevel === 'low' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {calculation.riskLevel === 'medium' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                      {calculation.riskLevel === 'high' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                      <h4 className="font-medium text-gray-900">
                        {calculation.riskLevel === 'low' ? 'Low Risk Opportunity' :
                         calculation.riskLevel === 'medium' ? 'Medium Risk' :
                         'High Risk - Caution Advised'}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {calculation.riskLevel === 'low' && 'High liquidity with reasonable spread. Good entry opportunity.'}
                      {calculation.riskLevel === 'medium' && 'Moderate liquidity or entry cost. Monitor market conditions.'}
                      {calculation.riskLevel === 'high' && 'Low liquidity or high entry cost. Consider waiting for better conditions.'}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-gray-900">Strategy Tips</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Monitor funding rate changes before entry</li>
                      <li>• Consider market volatility and liquidation risks</li>
                      <li>• Have exit strategy ready for adverse moves</li>
                      <li>• Start with smaller position sizes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {!calculation && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Select an opportunity to see profit calculations
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}