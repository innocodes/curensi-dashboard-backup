'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { HistoricalFundingRate } from '@/lib/types';
import { formatTimestamp, formatPercentage } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { BarChart3, Calendar, Lock } from 'lucide-react';

interface HistoricalChartProps {
  symbol: string;
  exchange: string;
  data: HistoricalFundingRate[];
  loading: boolean;
  onRefresh: () => void;
  userTier?: 'free' | 'pro' | 'premium';
}

export default function HistoricalChart({
  symbol,
  exchange,
  data,
  loading,
  onRefresh,
  userTier = 'free'
}: HistoricalChartProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  // Filter data based on time range
  const getFilteredData = () => {
    const now = new Date();
    let cutoffDate: Date;

    switch (timeRange) {
      case '24h':
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // For free users, limit data
    let filteredData = data.filter(item => new Date(item.timestamp) >= cutoffDate);
    if (userTier === 'free') {
      filteredData = filteredData.slice(-20); // Last 20 data points for free users
    }

    // Transform data for chart
    return filteredData.map((item, index) => ({
      index,
      timestamp: formatTimestamp(new Date(item.timestamp)),
      fundingRate: item.fundingRate * 100,
      apr: item.apr,
      markPrice: item.markPrice,
    }));
  };

  const chartData = getFilteredData();

  const calculateStats = () => {
    if (chartData.length === 0) return { avg: 0, min: 0, max: 0, trend: 'stable' };

    const rates = chartData.map(d => d.fundingRate);
    const avg = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
    const min = Math.min(...rates);
    const max = Math.max(...rates);

    // Calculate trend
    const recentRates = rates.slice(-5);
    const olderRates = rates.slice(0, 5);
    const recentAvg = recentRates.reduce((sum, rate) => sum + rate, 0) / recentRates.length;
    const olderAvg = olderRates.reduce((sum, rate) => sum + rate, 0) / olderRates.length;

    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (recentAvg > olderAvg * 1.1) trend = 'up';
    else if (recentAvg < olderAvg * 0.9) trend = 'down';

    return { avg, min, max, trend };
  };

  const stats = calculateStats();

  if (userTier === 'free') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Historical Analysis</h3>
                <p className="text-sm text-gray-600">
                  {symbol} on {exchange}
                </p>
              </div>
            </div>
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Unlock Historical Analysis
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Track funding rate trends over time to identify patterns and make informed decisions
            about your cash and carry strategies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">30 Days</div>
              <div className="text-sm text-gray-600">Historical Data</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 mb-1">Trend Analysis</div>
              <div className="text-sm text-gray-600">Pattern Detection</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">Export</div>
              <div className="text-sm text-gray-600">Data Export</div>
            </div>
          </div>

          <Button variant="primary" size="lg">
            Upgrade to Pro for Historical Charts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Historical Analysis</h3>
              <p className="text-sm text-gray-600">
                {symbol} on {exchange}
              </p>
            </div>
          </div>
          <Button onClick={onRefresh} loading={loading} size="sm">
            Refresh
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Time Range:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['24h', '7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Chart Type:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  chartType === 'area'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  chartType === 'line'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Line
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Average Rate</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatPercentage(stats.avg / 100, 4)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Min Rate</p>
          <p className="text-lg font-semibold text-danger-600">
            {formatPercentage(stats.min / 100, 4)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Max Rate</p>
          <p className="text-lg font-semibold text-success-600">
            {formatPercentage(stats.max / 100, 4)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Trend</p>
          <div className="flex items-center justify-center gap-1">
            {stats.trend === 'up' && (
              <>
                <span className="text-lg font-semibold text-success-600">↑</span>
                <span className="text-sm text-success-600">Rising</span>
              </>
            )}
            {stats.trend === 'down' && (
              <>
                <span className="text-lg font-semibold text-danger-600">↓</span>
                <span className="text-sm text-danger-600">Falling</span>
              </>
            )}
            {stats.trend === 'stable' && (
              <>
                <span className="text-lg font-semibold text-gray-600">→</span>
                <span className="text-sm text-gray-600">Stable</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'area' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#888"
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickFormatter={(value) => `${value.toFixed(2)}%`}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'fundingRate') return [`${value.toFixed(4)}%`, 'Funding Rate'];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="fundingRate"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  fill="url(#colorFunding)"
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#888"
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickFormatter={(value) => `${value.toFixed(2)}%`}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'fundingRate') return [`${value.toFixed(4)}%`, 'Funding Rate'];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="fundingRate"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p>No historical data available</p>
              <p className="text-sm text-gray-400 mt-1">Data will appear here once available</p>
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      {userTier === 'premium' && chartData.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="p-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Recent Data Points</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600">Time</th>
                    <th className="text-right py-2 text-gray-600">Funding Rate</th>
                    <th className="text-right py-2 text-gray-600">APR</th>
                    <th className="text-right py-2 text-gray-600">Mark Price</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.slice(-10).reverse().map((point, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 text-gray-900">{point.timestamp}</td>
                      <td className="text-right text-gray-900">{formatPercentage(point.fundingRate / 100, 4)}</td>
                      <td className="text-right text-gray-900">{formatPercentage(point.apr)}</td>
                      <td className="text-right text-gray-900">
                        {point.markPrice ? point.markPrice.toFixed(2) : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}