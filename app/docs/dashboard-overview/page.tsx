'use client';

import Link from 'next/link';
import DocsHeader from '@/components/docs/DocsHeader';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Info,
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const dashboardSections = [
  {
    title: "Main Metrics Panel",
    description: "Overview of current market conditions and opportunities",
    icon: BarChart3,
    features: [
      "Total available opportunities",
      "Average funding rates across exchanges",
      "Market sentiment indicators",
      "Last update timestamp"
    ]
  },
  {
    title: "Funding Rates Table",
    description: "Detailed breakdown of arbitrage opportunities",
    icon: TrendingUp,
    features: [
      "Real-time funding rates",
      "APR calculations",
      "Exchange filtering",
      "Symbol sorting and searching"
    ]
  },
  {
    title: "Refresh Controls",
    description: "Manage data updates and frequency",
    icon: Clock,
    features: [
      "Manual refresh button",
      "Auto-refresh settings",
      "Connection status indicator",
      "Data source information"
    ]
  }
];

const metricsExplained = [
  {
    metric: "Funding Rate",
    description: "The percentage paid between long and short positions every 8 hours",
    icon: TrendingUp,
    example: "0.1% = 0.1% paid from longs to shorts every 8 hours"
  },
  {
    metric: "APR (Annual Percentage Rate)",
    description: "Projected yearly return based on current funding rates",
    icon: BarChart3,
    example: "36% APR = 0.1% × 3 payments/day × 365 days"
  },
  {
    metric: "Mark Price",
    description: "Current market price of the perpetual futures contract",
    icon: Eye,
    example: "$44,000 BTC mark price for futures contract"
  },
  {
    metric: "Next Funding Time",
    description: "Countdown until the next funding payment",
    icon: Clock,
    example: "2h 15m until next 8-hour funding period ends"
  }
];

const usingTheDashboard = [
  {
    step: "1. Monitor Opportunities",
    description: "Look for high positive funding rates where you can earn from long positions",
    tips: [
      "Focus on rates above 0.05% for meaningful returns",
      "Watch for negative rates (short positions get paid)",
      "Compare rates across different exchanges"
    ]
  },
  {
    step: "2. Filter and Sort",
    description: "Use filters to find opportunities that match your criteria",
    tips: [
      "Filter by preferred exchanges",
      "Sort by highest APR first",
      "Hide low-yield opportunities",
      "Focus on symbols you understand"
    ]
  },
  {
    step: "3. Check Timing",
    description: "Understand when funding payments occur",
    tips: [
      "Funding happens every 8 hours",
      "Times vary by exchange",
      "Enter positions before funding time",
      "Consider overnight position costs"
    ]
  },
  {
    step: "4. Execute Strategy",
    description: "Use the data to execute your arbitrage trades",
    tips: [
      "Maintain equal spot and futures positions",
      "Consider trading fees in your calculations",
      "Monitor for sudden rate changes",
      "Have clear entry and exit criteria"
    ]
  }
];

const bestPractices = [
  {
    icon: CheckCircle,
    title: "Regular Updates",
    description: "Check the dashboard frequently as funding rates change throughout the day"
  },
  {
    icon: CheckCircle,
    title: "Multiple Exchanges",
    description: "Compare rates across different exchanges to find the best opportunities"
  },
  {
    icon: CheckCircle,
    title: "Risk Management",
    description: "Never commit more than you can afford to lose on a single trade"
  },
  {
    icon: CheckCircle,
    title: "Documentation",
    description: "Keep track of your trades to learn from patterns and improve your strategy"
  }
];

const limitations = [
  {
    icon: AlertCircle,
    title: "No Historical Data",
    description: "Current plans don't include historical funding rate data - this is a feature for future development"
  },
  {
    icon: AlertCircle,
    title: "No Alerts System",
    description: "Email and push notifications for rate changes are planned but not yet implemented"
  },
  {
    icon: AlertCircle,
    title: "Limited to OKX & KuCoin",
    description: "Currently only supports OKX and KuCoin Futures due to API limitations"
  },
  {
    icon: AlertCircle,
    title: "No API Access",
    description: "Programmatic access to funding rate data is a future Premium feature"
  }
];

export default function DashboardOverviewPage() {
  return (
    <>
      <DocsHeader
        title="Dashboard Overview: Your Trading Command Center"
        subtitle="Master the Curensi dashboard to identify profitable funding rate opportunities, track market conditions, and execute successful arbitrage strategies."
        icon={BarChart3}
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
        showCTA={true}
        ctaText="Access Dashboard"
        ctaLink="/dashboard"
        ctaVariant="secondary"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Sections */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Understanding the Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Metrics Explained */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Metrics Explained</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metricsExplained.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{metric.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Example</span>
                    </div>
                    <p className="text-sm text-gray-600">{metric.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Using the Dashboard */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How to Use the Dashboard Effectively</h2>
          <div className="space-y-8">
            {usingTheDashboard.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.step}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Pro Tips</span>
                  </div>
                  <ul className="space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-blue-800">• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestPractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <div key={index} className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{practice.title}</h3>
                      <p className="text-sm text-gray-600">{practice.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Limitations */}
        <div className="mb-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Current Limitations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {limitations.map((limitation, index) => {
                const Icon = limitation.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-4 border border-yellow-200">
                    <div className="flex gap-3">
                      <Icon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{limitation.title}</h3>
                        <p className="text-sm text-gray-600">{limitation.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Data Refresh Information */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900">Understanding Data Refresh</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Free Plan</h4>
              <p className="text-gray-600 text-sm">Data refreshes every 5 minutes</p>
              <p className="text-gray-500 text-xs mt-1">Suitable for monitoring major opportunities</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Pro & Premium Plans</h4>
              <p className="text-gray-600 text-sm">Data refreshes every minute</p>
              <p className="text-gray-500 text-xs mt-1">Recommended for active traders</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}