"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import FundingRateTable from "@/components/dashboard/FundingRateTable";
import ZScoreAnalysis from "@/components/dashboard/ZScoreAnalysis";
import HistoricalChart from "@/components/dashboard/HistoricalChart";
import {
  FundingRate,
  ZScoreOpportunity,
  HistoricalFundingRate,
} from "@/lib/types";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const [fundingRates, setFundingRates] = useState<FundingRate[]>([]);
  const [zScoreOpportunities, setZScoreOpportunities] = useState<
    ZScoreOpportunity[]
  >([]);
  const [historicalData, setHistoricalData] = useState<
    Record<string, HistoricalFundingRate[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "rates" | "analysis" | "historical"
  >("rates");

  const functions = getFunctions();

  const fetchFundingRates = async () => {
    console.log("🚀 fetchFundingRates called!");
    console.log("👤 User profile:", userProfile);

    setLoading(true);
    try {
      console.log("📞 Calling Firebase function...");
      const getFundingRates = httpsCallable(functions, "getFundingRates");

      const payload = {
        symbols: userProfile?.preferences.defaultSymbols || [
          "BTC-USDT-SWAP",
          "ETH-USDT-SWAP",
          "BTC/USDT:USDT",
          "ETH/USDT:USDT",
        ],
        exchanges: userProfile?.preferences.preferredExchanges || [
          "OKX",
          "KuCoin Futures",
        ],
      };
      console.log("📤 Payload:", payload);

      const result = await getFundingRates(payload);
      console.log("📥 Raw Firebase result:", result);

      if (result.data && (result.data.success || Array.isArray(result.data))) {
        console.log("✅ Success! Processing data...");
        const dataArray = result.data.success ? result.data.data : result.data;
        const rates = dataArray.map((rate: any) => ({
          ...rate,
          timestamp: rate.timestamp?._seconds
            ? new Date(rate.timestamp._seconds * 1000)
            : new Date(),
        }));
        console.log("📊 Processed funding rates:", rates);
        console.log("📊 Setting fundingRates state to:", rates.length, "items");
        setFundingRates(rates);
      } else {
        console.error("❌ Firebase function returned no success:", result.data);
      }
    } catch (error) {
      console.error("Error fetching funding rates:", error);
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

      if (result.data.success) {
        setZScoreOpportunities(result.data.data);
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

      if (result.data.success) {
        const formattedData = result.data.data.map((item: any) => ({
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

  useEffect(() => {
    if (user) {
      fetchFundingRates();
      fetchZScoreOpportunities();

      // Set up auto-refresh based on user tier
      const interval =
        userProfile?.subscriptionTier === "free" ? 5 * 60 * 1000 : 60 * 1000; // 5 min for free, 1 min for paid

      const refreshInterval = setInterval(() => {
        fetchFundingRates();
        fetchZScoreOpportunities();
      }, interval);

      return () => clearInterval(refreshInterval);
    }
  }, [user, userProfile]);

  const tabs = [
    { id: "rates", name: "Live Rates", icon: "📊" },
    { id: "analysis", name: "Z-Score Analysis", icon: "🧠" },
    { id: "historical", name: "Historical Data", icon: "📈" },
  ];

  // Filter tabs based on user tier
  const availableTabs = tabs.filter((tab) => {
    if (tab.id === "analysis" && userProfile?.subscriptionTier === "free")
      return true;
    if (tab.id === "historical" && userProfile?.subscriptionTier === "free")
      return true;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Curensi Dashboard
          </h1> */}
          <p className="text-2xl text-gray-700">
            Real-time arbitrage opportunities across major exchanges
          </p>
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
            <FundingRateTable
              data={fundingRates}
              loading={loading}
              onRefresh={fetchFundingRates}
              userTier={userProfile?.subscriptionTier}
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
        </div>
      </div>
    </div>
  );
}
