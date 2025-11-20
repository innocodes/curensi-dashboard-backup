'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ZScoreOpportunity, HistoricalFundingRate } from '@/lib/types';
import { formatPercentage, getZScoreColor, cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { TrendingUp, AlertTriangle, Brain, RefreshCw, Lock } from 'lucide-react';

interface ZScoreAnalysisProps {
  opportunities: ZScoreOpportunity[];
  loading: boolean;
  onRefresh: () => void;
  onHistoricalData: (symbol: string, exchange: string) => Promise<HistoricalFundingRate[]>;
  userTier?: 'free' | 'pro' | 'premium';
}

export default function ZScoreAnalysis({
  opportunities,
  loading,
  onRefresh,
  onHistoricalData,
  userTier = 'free'
}: ZScoreAnalysisProps) {
  const [selectedOpportunity, setSelectedOpportunity] = useState<ZScoreOpportunity | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleSelectOpportunity = async (opportunity: ZScoreOpportunity) => {
    if (userTier === 'free') {
      setShowPremiumModal(true);
      return;
    }

    setSelectedOpportunity(opportunity);
    const historical = await onHistoricalData(opportunity.symbol, opportunity.exchange);

    // Transform data for chart
    const chartData = historical.map((item, index) => ({
      index,
      rate: item.fundingRate * 100,
      timestamp: new Date(item.timestamp).toLocaleDateString(),
    }));

    setHistoricalData(chartData);
  };

  const getZScoreLabel = (zScore: number) => {
    const absScore = Math.abs(zScore);
    if (absScore >= 3) return { label: 'Very Rare', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (absScore >= 2.5) return { label: 'Rare', color: 'text-purple-500', bg: 'bg-purple-50' };
    if (absScore >= 2) return { label: 'Unusual', color: 'text-purple-400', bg: 'bg-gray-50' };
    return { label: 'Normal', color: 'text-gray-500', bg: 'bg-gray-50' };
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return { label: 'High', color: 'text-green-600' };
    if (confidence >= 0.5) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'Low', color: 'text-gray-500' };
  };

  if (userTier === 'free') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Z-Score Analysis</h3>
                  <p className="text-sm text-gray-600">AI-powered statistical arbitrage opportunities</p>
                </div>
              </div>
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Unlock AI-Powered Analysis
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our Z-Score analysis identifies statistically significant funding rate opportunities
              by comparing current rates against historical patterns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">2σ+</div>
                <div className="text-sm text-gray-600">Statistical Significance</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">48h</div>
                <div className="text-sm text-gray-600">Historical Analysis</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">Real-time</div>
                <div className="text-sm text-gray-600">Opportunity Detection</div>
              </div>
            </div>

            <Button variant="primary" size="lg">
              Upgrade to Pro for Z-Score Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Z-Score Analysis</h2>
            <p className="text-gray-600">Statistically significant funding rate opportunities</p>
          </div>
        </div>
        <Button onClick={onRefresh} loading={loading}>
          <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Opportunities</p>
              <p className="text-2xl font-bold text-purple-600">{opportunities.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Very Rare (3σ+)</p>
              <p className="text-2xl font-bold text-purple-600">
                {opportunities.filter(o => Math.abs(o.zScore) >= 3).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Confidence</p>
              <p className="text-2xl font-bold text-primary-600">
                {opportunities.length > 0
                  ? Math.round(opportunities.reduce((sum, o) => sum + o.confidence, 0) / opportunities.length * 100)
                  : 0}%
              </p>
            </div>
            <Brain className="w-8 h-8 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Detected Opportunities</h3>
          <div className="space-y-3">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={`${opportunity.symbol}_${opportunity.exchange}_${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedOpportunity === opportunity
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white'
                }`}
                onClick={() => handleSelectOpportunity(opportunity)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{opportunity.symbol}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{opportunity.exchange}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getZScoreLabel(opportunity.zScore).bg} ${getZScoreLabel(opportunity.zScore).color}`}>
                    {getZScoreLabel(opportunity.zScore).label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Current Rate</p>
                    <p className="font-semibold text-gray-900">
                      {formatPercentage(opportunity.currentRate * 100, 4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Z-Score</p>
                    <p className={`font-bold ${getZScoreColor(opportunity.zScore)}`}>
                      {opportunity.zScore.toFixed(2)}σ
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Confidence</p>
                    <p className={`font-semibold ${getConfidenceLabel(opportunity.confidence).color}`}>
                      {getConfidenceLabel(opportunity.confidence).label}
                    </p>
                  </div>
                </div>

                {opportunity.currentRate && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Rate</span>
                      <span className="font-bold text-primary-600">
                        {formatPercentage(opportunity.currentRate * 365)}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {opportunities.length === 0 && !loading && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Brain className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No significant Z-score opportunities detected</p>
                <p className="text-sm text-gray-500 mt-1">Check back later for new opportunities</p>
              </div>
            )}
          </div>
        </div>

        {/* Historical Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Analysis</h3>

          {selectedOpportunity ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{selectedOpportunity.symbol}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{selectedOpportunity.exchange}</span>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="index"
                    stroke="#888"
                    fontSize={12}
                    tickFormatter={(value) => `T-${historicalData.length - value}`}
                  />
                  <YAxis
                    stroke="#888"
                    fontSize={12}
                    tickFormatter={(value) => `${value.toFixed(2)}%`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(4)}%`, 'Funding Rate']}
                    labelFormatter={(label) => `Data Point ${label + 1}`}
                  />
                  <ReferenceLine
                    y={selectedOpportunity.currentRate * 100}
                    stroke="#8b5cf6"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    label="Current"
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Analysis Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Statistical Significance</span>
                    <div className="font-semibold">
                      {Math.abs(selectedOpportunity.zScore).toFixed(2)} standard deviations
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Confidence Level</span>
                    <div className="font-semibold">
                      {Math.round(selectedOpportunity.confidence * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p>Select an opportunity to view historical analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}