"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Brain,
  Users,
  CheckCircle,
  Info,
  Star,
  Activity,
  Database,
  Target,
} from "lucide-react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  const benefits = [
    {
      name: "Data-Driven Insights",
      description:
        "Access real-time funding rate data and analysis from OKX & KuCoin Futures",
      icon: Database,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Market Neutral Strategy",
      description:
        "Generate yields regardless of market direction through arbitrage analysis",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      name: "Statistical Analysis",
      description:
        "Z-score analysis identifies statistically significant arbitrage opportunities",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      name: "Real-Time Monitoring",
      description:
        "Track funding rates every minute with advanced opportunity scoring",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const platforms = [
    "OKX",
    "KuCoin Futures",
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Analyze Opportunities",
      description: "Review real-time funding rate data and Z-score analysis from supported exchanges",
    },
    {
      step: "2",
      title: "Execute on Exchange",
      description: "Trade directly on OKX or KuCoin Futures platforms using your own accounts",
    },
    {
      step: "3",
      title: "Monitor Returns",
      description: "Track your arbitrage positions and funding rate payments in real-time",
    },
  ];

  
  if (user) {
    // Redirect to dashboard if user is logged in
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Curensi</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isLogin
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  !isLogin
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Intelligence Platform for
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Funding Rate Arbitrage
              </span>
            </h1>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-blue-900 font-medium mb-1">
                    Important: Information Platform, Not a Trading Platform
                  </p>
                  <p className="text-blue-800 text-sm">
                    Curensi provides funding rate data and analysis. You execute trades directly on exchanges using your own accounts.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access real-time funding rate data, advanced Z-score analysis, and arbitrage opportunity detection.
              Make informed decisions with data-driven insights from OKX and KuCoin Futures.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Rate Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Statistical Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Real-time Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Curensi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful data analysis tools designed for intelligent funding rate arbitrage decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <Icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.name}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Curensi Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From data analysis to informed trading decisions in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth & Info Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Auth Form */}
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200">
                {/* <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Get Started Today
                </h2> */}
                {isLogin ? (
                  <LoginForm onToggleMode={() => setIsLogin(false)} />
                ) : (
                  <SignupForm onToggleMode={() => setIsLogin(true)} />
                )}
              </div>
            </div>

            {/* Right: Platform Info */}
            <div className="space-y-8">
              {/* Supported Exchanges */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Currently Supported Exchanges
                </h3>
                <div className="space-y-4">
                  {platforms.map((platform, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{platform}</h4>
                        <p className="text-sm text-gray-600">Real-time funding rate data</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-6 text-center">
                  More exchanges coming soon as we expand our data coverage.
                </p>
              </div>

              {/* Platform Capabilities */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">
                    Make Smarter Trading Decisions
                  </h3>
                </div>
                <p className="text-blue-100 mb-8">
                  Curensi empowers you with real-time data and advanced analysis to identify profitable funding rate arbitrage opportunities.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Z-score analysis for statistical significance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Real-time opportunity scoring and ranking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Historical rate tracking for pattern recognition</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Plans for Every Trader Level
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're just exploring funding rate arbitrage or you're a seasoned trader,
              we have the right data and tools to support your strategy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Beginner Friendly</h3>
                <p className="text-blue-100">
                  Start with free access to essential funding rate data and basic analysis tools
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-blue-100">
                  Professional traders get Z-score analysis and real-time opportunity detection
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">⭐</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Features</h3>
                <p className="text-blue-100">
                  Maximum data access, extended historical tracking, and early feature access
                </p>
              </div>
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              View All Pricing Plans
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
