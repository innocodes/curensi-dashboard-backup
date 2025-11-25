"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import OptimizedFundingRateTable from "@/components/dashboard/OptimizedFundingRateTable";
import ZScoreAnalysis from "@/components/dashboard/ZScoreAnalysis";
import HistoricalChart from "@/components/dashboard/HistoricalChart";
import ProfitCalculator from "@/components/dashboard/ProfitCalculator";
import {
  FundingRate,
  ZScoreOpportunity,
  HistoricalFundingRate,
} from "@/lib/types";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  doc,
  getDoc
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function OptimizedDashboard() {
  const { user, userProfile } = useAuth();
  const [fundingRates, setFundingRates] = useState<FundingRate[]>([]);
  const [zScoreOpportunities, setZScoreOpportunities] = useState<
    ZScoreOpportunity[]
  >([]);
  const [historicalData, setHistoricalData] = useState<
    Record<string, HistoricalFundingRate[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "rates" | "analysis" | "historical" | "calculator"
  >("rates");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    minApr: 0,
    minLiquidity: 'medium' as 'low' | 'medium' | 'high',
    symbols: [] as string[],
    exchanges: [] as string[]
  });

  const db = getFirestore();
  const functions = getFunctions();

  // Tier-based data fetching with real-time updates
  useEffect(() => {
    if (!user) return;

    setLoading(true);

    // Determine collection based on user tier
    const dataCollection = userProfile?.subscriptionTier !== 'free'
      ? 'rates_realtime'
      : 'rates_delayed';

    console.log(`🔍 Fetching data from ${dataCollection} for ${userProfile?.subscriptionTier || 'free'} user`);

    // Apply filters if set (use filtered endpoint for better performance)
    if (filters.minApr > 0 || filters.minLiquidity !== 'low' ||
        filters.symbols.length > 0 || filters.exchanges.length > 0) {
      fetchFilteredOpportunities();
      return;
    }

    // Real-time listener for tier-appropriate data
    const ratesQuery = query(
      collection(db, dataCollection),
      orderBy('apr', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(ratesQuery, (snapshot) => {
      const rates = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          exchange: data.exchange,
          symbol: data.symbol,
          fundingRate: data.fundingRate,
          apr: data.apr,
          markPrice: data.markPrice,
          nextFundingTime: data.nextFundingTime,
          timestamp: data.timestamp?.toDate() || new Date(),
          openInterest: data.openInterest,
          basisSpread: data.basisSpread,
          spotPrice: data.spotPrice,
          liquidityScore: data.liquidityScore,
          volume24h: data.volume24h,
          dataTier: data.dataTier,
        };
      });

      // Apply free tier limitations
      let filteredRates = rates;
      if (userProfile?.subscriptionTier === 'free') {
        const allowedSymbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];
        filteredRates = rates.filter(rate => allowedSymbols.includes(rate.symbol));
        // Limit to top 10 opportunities
        filteredRates = filteredRates.slice(0, 10);
      }

      setFundingRates(filteredRates);
      setLastUpdated(new Date());
      setLoading(false);

      const dataAge = filteredRates.length > 0 && filteredRates[0].timestamp
        ? Date.now() - filteredRates[0].timestamp.getTime()
        : 0;
      const dataAgeMinutes = Math.floor(dataAge / (1000 * 60));

      console.log(`📊 ${dataCollection} update: ${filteredRates.length} rates loaded (${dataAgeMinutes} min old)`);
    }, (error) => {
      console.error(`❌ Error listening to ${dataCollection}:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, userProfile, filters]);

  // Fetch filtered opportunities
  const fetchFilteredOpportunities = async () => {
    try {
      setLoading(true);
      const getOpportunities = httpsCallable(functions, "getOpportunities");
      const result = await getOpportunities(filters);

      const data = result.data as { success: boolean; data: any[] };
      if (data.success) {
        const rates = data.data.map((rate: any) => ({
          id: rate.id,
          exchange: rate.exchange,
          symbol: rate.symbol,
          fundingRate: rate.fundingRate,
          apr: rate.apr,
          markPrice: rate.markPrice,
          nextFundingTime: rate.nextFundingTime,
          timestamp: rate.timestamp?.toDate() || new Date(),
          openInterest: rate.openInterest,
          basisSpread: rate.basisSpread,
          spotPrice: rate.spotPrice,
          liquidityScore: rate.liquidityScore,
          volume24h: rate.volume24h,
        }));

        setFundingRates(rates);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching filtered opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchZScoreOpportunities = async () => {
    if (userProfile?.subscriptionTier === "free") return;

    try {
      const getZScoreOpportunities = httpsCallable(
        functions,
        "getZScoreOpportunities"
      );
      const result = await getZScoreOpportunities({
        symbols: userProfile?.preferences.defaultSymbols || [
          "BTC-USDT-SWAP",
          "ETH-USDT-SWAP",
          "BTC/USDT:USDT",
          "ETH/USDT:USDT",
        ],
        threshold: 2,
      });

      const zScoreResult = result.data as { success: boolean; data: any[] };
      if (zScoreResult.success) {
        setZScoreOpportunities(zScoreResult.data);
      }
    } catch (error) {
      console.error("Error fetching Z-score opportunities:", error);
    }
  };

  const fetchHistoricalData = async (symbol: string, exchange: string) => {
    const key = `${symbol}_${exchange}`;
    if (historicalData[key]) {
      return historicalData[key];
    }

    try {
      const getHistoricalRates = httpsCallable(functions, "getHistoricalRates");
      const result = await getHistoricalRates({
        symbol,
        exchange,
        days: userProfile?.subscriptionTier === "premium" ? 30 : 7,
      });

      const historicalResult = result.data as { success: boolean; data: any[] };
      if (historicalResult.success) {
        const formattedData = historicalResult.data.map((item: any) => ({
          ...item,
          timestamp: item.timestamp?.toDate() || new Date(),
        }));

        setHistoricalData((prev) => ({
          ...prev,
          [key]: formattedData,
        }));

        return formattedData;
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
      return [];
    }

    return [];
  };

  // Fetch Z-score data periodically
  useEffect(() => {
    if (user && userProfile?.subscriptionTier !== "free") {
      fetchZScoreOpportunities();

      const interval = setInterval(fetchZScoreOpportunities, 5 * 60 * 1000); // Every 5 minutes
      return () => clearInterval(interval);
    }
  }, [user, userProfile]);

  const tabs = [
    { id: "rates", name: "Live Rates", icon: "📊" },
    { id: "analysis", name: "Z-Score Analysis", icon: "🧠" },
    { id: "historical", name: "Historical Data", icon: "📈" },
    { id: "calculator", name: "Profit Calculator", icon: "💰" },
  ];

  // Filter tabs based on user tier
  const availableTabs = tabs.filter((tab) => {
    if (tab.id === "analysis" && userProfile?.subscriptionTier === "free")
      return true;
    if (tab.id === "historical" && userProfile?.subscriptionTier === "free")
      return true;
    if (tab.id === "calculator" && userProfile?.subscriptionTier === "free")
      return false; // Calculator is for paid users only
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl text-gray-700">
                {userProfile?.subscriptionTier === 'free'
                  ? 'Sample arbitrage opportunities across major exchanges'
                  : 'Real-time arbitrage opportunities across major exchanges'
                }
              </p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-4">
                    {/* Data freshness indicator */}
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        userProfile?.subscriptionTier === 'free'
                          ? 'bg-yellow-500' // Delayed data
                          : 'bg-green-500 animate-pulse' // Real-time data
                      }`}></span>
                      {userProfile?.subscriptionTier === 'free' ? (
                        <span className="text-yellow-600 font-medium">1-hour delayed data</span>
                      ) : (
                        <span className="text-green-600 font-medium">Real-time data</span>
                      )}
                    </span>

                    {/* Update time */}
                    <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>

                    {/* Data tier badge */}
                    {userProfile?.subscriptionTier !== 'free' && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                        {userProfile?.subscriptionTier === 'pro' ? 'Pro' : 'Whale'}
                      </span>
                    )}

                    {/* Free tier limitations */}
                    {userProfile?.subscriptionTier === 'free' && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Limited: Top 5 coins only
                      </span>
                    )}
                  </span>
                </p>
              )}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={filters.minLiquidity}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  minLiquidity: e.target.value as 'low' | 'medium' | 'high'
                }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="low">All Liquidity</option>
                <option value="medium">Medium+ Liquidity</option>
                <option value="high">High Liquidity Only</option>
              </select>

              <input
                type="number"
                placeholder="Min APR %"
                value={filters.minApr || ''}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  minApr: parseFloat(e.target.value) || 0
                }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-24"
              />

              <button
                onClick={() => setFilters({
                  minApr: 0,
                  minLiquidity: 'medium',
                  symbols: [],
                  exchanges: []
                })}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "rates" && (
            <OptimizedFundingRateTable
              data={fundingRates}
              loading={loading}
              userTier={userProfile?.subscriptionTier}
              filters={filters}
              onFiltersChange={setFilters}
            />
          )}

          {activeTab === "analysis" && (
            <ZScoreAnalysis
              opportunities={zScoreOpportunities}
              loading={loading}
              onRefresh={fetchZScoreOpportunities}
              onHistoricalData={fetchHistoricalData}
              userTier={userProfile?.subscriptionTier}
            />
          )}

          {activeTab === "historical" && (
            <HistoricalChart
              symbol="BTC"
              exchange="OKX"
              data={historicalData["BTC_OKX"] || []}
              loading={loading}
              onRefresh={() => fetchHistoricalData("BTC", "OKX")}
              userTier={userProfile?.subscriptionTier}
            />
          )}

          {activeTab === "calculator" && userProfile?.subscriptionTier !== "free" && (
            <ProfitCalculator
              rates={fundingRates}
              userTier={userProfile?.subscriptionTier}
            />
          )}
        </div>
      </div>
    </div>
  );
}