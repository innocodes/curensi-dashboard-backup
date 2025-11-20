'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPercentage, formatNumber, formatTimestamp, getAPRColor, cn } from '@/lib/utils';
import { FundingRate } from '@/lib/types';
import Button from '@/components/ui/Button';
import { TrendingUp, TrendingDown, RefreshCw, Star, ExternalLink } from 'lucide-react';

interface FundingRateTableProps {
  data: FundingRate[];
  loading: boolean;
  onRefresh: () => void;
  userTier?: 'free' | 'pro' | 'premium';
}

export default function FundingRateTable({
  data,
  loading,
  onRefresh,
  userTier = 'free'
}: FundingRateTableProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof FundingRate>('apr');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter data based on user tier
  const getFilteredData = () => {
    if (userTier === 'free') {
      return data.slice(0, 10); // Free users see top 10
    }
    return data; // Pro and Premium see all
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

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Fetching funding rates from exchanges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Funding Rates</h2>
          <p className="text-gray-600 mt-1">
            Showing {sortedData.length} opportunities across major exchanges
          </p>
        </div>
        <Button
          onClick={onRefresh}
          loading={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          Refresh
        </Button>
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
              <p className="text-sm text-gray-600">Positive Yields</p>
              <p className="text-2xl font-bold text-primary-600">
                {sortedData.filter(r => r.apr > 0).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">
                {sortedData.length > 0 ? Math.round((sortedData.filter(r => r.apr > 0).length / sortedData.length) * 100) : 0}%
              </span>
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
              <p className="text-sm text-gray-600">Avg. Positive APR</p>
              <p className="text-2xl font-bold text-primary-600">
                {(() => {
                  const positiveRates = sortedData.filter(r => r.apr > 0);
                  if (positiveRates.length === 0) return '0%';
                  const avg = positiveRates.reduce((sum, r) => sum + r.apr, 0) / positiveRates.length;
                  return formatPercentage(avg);
                })()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary-500" />
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
              <p className="text-sm text-gray-600">Negative Yields</p>
              <p className="text-2xl font-bold text-danger-600">
                {sortedData.filter(r => r.apr < 0).length}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-danger-500" />
          </div>
        </motion.div>
      </div>

      {/* Data Table */}
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
                {userTier !== 'free' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mark Price
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {sortedData.map((rate, index) => (
                  <motion.tr
                    key={`${rate.exchange}-${rate.symbol}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
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
                    {userTier !== 'free' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.markPrice ? formatNumber(rate.markPrice) : 'N/A'}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
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
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {userTier === 'free' && data.length > 10 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upgrade to Pro for Full Access
          </h3>
          <p className="text-gray-600 mb-4">
            See all {data.length} funding opportunities and unlock advanced features
          </p>
          <Button variant="primary">
            Upgrade to Pro
          </Button>
        </div>
      )}
    </div>
  );
}