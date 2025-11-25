'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  formatPercentage,
  formatNumber,
  formatTimestamp,
  getAPRColor,
  cn,
  formatCurrency
} from '@/lib/utils';
import { FundingRate } from '@/lib/types';
import Button from '@/components/ui/Button';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Star,
  ExternalLink,
  Filter,
  Info,
  AlertTriangle
} from 'lucide-react';

interface OptimizedFundingRateTableProps {
  data: FundingRate[];
  loading: boolean;
  userTier?: 'free' | 'pro' | 'premium';
  filters: {
    minApr: number;
    minLiquidity: 'low' | 'medium' | 'high';
    symbols: string[];
    exchanges: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export default function OptimizedFundingRateTable({
  data,
  loading,
  userTier = 'free',
  filters,
  onFiltersChange
}: OptimizedFundingRateTableProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof FundingRate>('apr');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Filter data based on user tier
  const getFilteredData = () => {
    let filteredData = [...data];

    // Apply tier-based limitations
    if (userTier === 'free') {
      // Free users only see top 5 coins and top 10 opportunities
      const allowedSymbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];
      filteredData = filteredData.filter(rate => allowedSymbols.includes(rate.symbol));
      filteredData = filteredData.slice(0, 10);
    }

    return filteredData;
  };

  const sortedData = [...getFilteredData()].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (field: keyof FundingRate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleFavorite = (symbol: string, exchange: string) => {
    const key = `${symbol}_${exchange}`;
    setFavorites(prev =>
      prev.includes(key)
        ? prev.filter(f => f !== key)
        : [...prev, key]
    );
  };

  const isFavorite = (symbol: string, exchange: string) => {
    return favorites.includes(`${symbol}_${exchange}`);
  };

  const toggleExpanded = (key: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const getLiquidityScoreColor = (score: string) => {
    switch (score) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBasisSpreadColor = (spread: number) => {
    if (spread < -0.1) return 'text-red-600';
    if (spread < 0) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading real-time funding rates...</p>
          <p className="text-sm text-gray-500 mt-2">Data streams directly from Firestore</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {userTier === 'free' ? 'Sample Funding Rates' : 'Live Funding Rates'}
          </h2>
          <p className="text-gray-600 mt-1">
            {userTier === 'free' ? (
              <span className="flex items-center gap-2">
                Showing sample opportunities (1-hour delayed data)
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  Free Tier
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Showing {sortedData.length} opportunities with real-time updates
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  userTier === 'pro' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {userTier === 'pro' ? 'Pro' : 'Whale'} Tier
                </span>
              </span>
            )}
            {userTier === 'free' && data.length > 10 && (
              <span className="ml-2 text-orange-600 block">
                Limited to top 5 coins (showing first 10 opportunities)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full ${
              userTier === 'free'
                ? 'bg-yellow-500' // Delayed data
                : 'bg-green-500 animate-pulse' // Real-time data
            }`}></div>
            {userTier === 'free' ? 'Delayed (1 hour)' : 'Live'}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Highest APR</p>
              <p className="text-2xl font-bold text-green-600">
                {sortedData[0] ? formatPercentage(sortedData[0].apr) : '0%'}
              </p>
              {sortedData[0]?.liquidityScore && (
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full mt-1 inline-block",
                  getLiquidityScoreColor(sortedData[0].liquidityScore)
                )}>
                  {sortedData[0].liquidityScore} liquidity
                </span>
              )}
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High APR Opportunities</p>
              <p className="text-2xl font-bold text-primary-600">
                {sortedData.filter(r => r.apr >= 20).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {sortedData.length > 0 ? Math.round((sortedData.filter(r => r.apr >= 20).length / sortedData.length) * 100) : 0}% of total
              </p>
            </div>
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">20%+</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Liquidity</p>
              <p className="text-2xl font-bold text-green-600">
                {sortedData.filter(r => r.liquidityScore === 'high').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">$10M+ OI</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Negative Spreads</p>
              <p className="text-2xl font-bold text-orange-600">
                {sortedData.filter(r => r.basisSpread !== undefined && r.basisSpread < -0.1).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Bad entry cost</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exchange
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('fundingRate')}>
                  <div className="flex items-center gap-1">
                    Funding Rate (8h)
                    {sortField === 'fundingRate' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('apr')}>
                  <div className="flex items-center gap-1">
                    Est. APR %
                    {sortField === 'apr' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liquidity
                </th>
                {userTier !== 'free' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basis Spread
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mark Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      24h Volume
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {sortedData.map((rate, index) => {
                  const rowKey = `${rate.exchange}-${rate.symbol}-${index}`;
                  const isExpanded = expandedRows.has(rowKey);

                  return (
                    <React.Fragment key={rowKey}>
                      <motion.tr
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => toggleExpanded(rowKey)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {rate.exchange}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {rate.symbol}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatPercentage(rate.fundingRate * 100, 4)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={cn(
                            "text-sm font-bold",
                            getAPRColor(rate.apr)
                          )}>
                            {formatPercentage(rate.apr)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full font-medium",
                            getLiquidityScoreColor(rate.liquidityScore || 'low')
                          )}>
                            {(rate.liquidityScore || 'low').toUpperCase()}
                          </span>
                        </td>
                        {userTier !== 'free' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {rate.basisSpread !== undefined ? (
                                <div className={cn(
                                  "text-sm font-medium",
                                  getBasisSpreadColor(rate.basisSpread)
                                )}>
                                  {formatPercentage(rate.basisSpread)}
                                </div>
                              ) : (
                                <span className="text-gray-400">N/A</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {rate.markPrice ? formatNumber(rate.markPrice) : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {rate.volume24h ? formatCurrency(rate.volume24h) : 'N/A'}
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => toggleFavorite(rate.symbol, rate.exchange)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Star
                                className={cn(
                                  "w-4 h-4",
                                  isFavorite(rate.symbol, rate.exchange)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-400"
                                )}
                              />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>

                      {/* Expanded Row with Additional Details */}
                      {userTier !== 'free' && isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50"
                        >
                          <td colSpan={userTier === 'pro' || userTier === 'premium' ? 9 : 6} className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Market Details</h4>
                                <div className="space-y-1">
                                  <p className="text-gray-600">
                                    Mark Price: <span className="font-medium text-gray-900">
                                      {rate.markPrice ? formatNumber(rate.markPrice) : 'N/A'}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    Spot Price: <span className="font-medium text-gray-900">
                                      {rate.spotPrice ? formatNumber(rate.spotPrice) : 'N/A'}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    Next Funding: <span className="font-medium text-gray-900">
                                      {rate.nextFundingTime ? formatTimestamp(rate.nextFundingTime) : 'N/A'}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Liquidity Analysis</h4>
                                <div className="space-y-1">
                                  <p className="text-gray-600">
                                    Open Interest: <span className="font-medium text-gray-900">
                                      {rate.openInterest ? formatCurrency(rate.openInterest) : 'N/A'}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    24h Volume: <span className="font-medium text-gray-900">
                                      {rate.volume24h ? formatCurrency(rate.volume24h) : 'N/A'}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    Liquidity Score: <span className={cn(
                                      "font-medium px-2 py-1 rounded-full text-xs",
                                      getLiquidityScoreColor(rate.liquidityScore || 'low')
                                    )}>
                                      {(rate.liquidityScore || 'low').toUpperCase()}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Risk Analysis</h4>
                                <div className="space-y-1">
                                  {rate.basisSpread !== undefined && (
                                    <div>
                                      <p className="text-gray-600">Entry Cost (Basis):</p>
                                      <p className={cn(
                                        "font-medium",
                                        getBasisSpreadColor(rate.basisSpread)
                                      )}>
                                        {formatPercentage(rate.basisSpread)}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {rate.basisSpread < -0.1
                                          ? '⚠️ High entry cost - wait for better entry'
                                          : rate.basisSpread < 0
                                          ? '⚠️ Small negative spread - break even soon'
                                          : '✅ Positive entry cost'
                                        }
                                      </p>
                                    </div>
                                  )}
                                  <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                    <p className="text-xs text-blue-700">
                                      <Info className="w-3 h-3 inline mr-1" />
                                      Cash & Carry: Buy spot, short perpetual.
                                      Positive APR minus entry cost = net profit.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {sortedData.length === 0 && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No opportunities found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or check back later
          </p>
          <Button
            onClick={() => onFiltersChange({
              minApr: 0,
              minLiquidity: 'low',
              symbols: [],
              exchanges: []
            })}
            variant="outline"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Upgrade CTA for Free Users */}
      {userTier === 'free' && data.length > 10 && (
        <div className="text-center py-8 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border-2 border-dashed border-primary-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upgrade to Pro for Full Access
          </h3>
          <p className="text-gray-600 mb-4">
            See all {data.length} funding opportunities, advanced filtering, basis spread analysis, and real-time alerts
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Real-time email alerts
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Advanced analytics
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Liquidity analysis
            </div>
          </div>
          <Button variant="primary">
            Upgrade to Pro - $29/month
          </Button>
        </div>
      )}

      {/* Info Section */}
      {userTier !== 'free' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Understanding the Data</p>
              <ul className="space-y-1 text-xs">
                <li>• <strong>APR</strong>: Annualized percentage rate based on funding payments (3x daily)</li>
                <li>• <strong>Basis Spread</strong>: Difference between perpetual and spot prices. Negative = entry cost</li>
                <li>• <strong>Liquidity Score</strong>: Based on open interest. High = $10M+, Medium = $1M+</li>
                <li>• <strong>Cash & Carry Strategy</strong>: Buy spot asset, short perpetual. Profit = Funding - Entry Cost</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}