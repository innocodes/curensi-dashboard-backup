'use client';

import {
  Users,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Shield,
  ExternalLink
} from 'lucide-react';

const benefits = [
  {
    title: "Higher Returns",
    description: "Access the best rates across all available exchanges"
  },
  {
    title: "Risk Diversification",
    description: "Spread risk across multiple platforms"
  },
  {
    title: "Liquidity Access",
    description: "More trading pairs and better order execution"
  },
  {
    title: "Arbitrage Between Exchanges",
    description: "Exploit rate differences between platforms"
  }
];

const challenges = [
  {
    title: "Capital Requirements",
    description: "Need sufficient funds on multiple exchanges"
  },
  {
    title: "Complex Management",
    description: "Track positions across different platforms"
  },
  {
    title: "Transfer Costs",
    description: "Fees for moving funds between exchanges"
  },
  {
    title: "Rate Synchronization",
    description: "Different funding times on each exchange"
  }
];

export default function MultiExchangePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Multi-Exchange Strategies</h1>
          <p className="text-xl text-purple-100">
            Advanced strategies for trading across multiple cryptocurrency exchanges.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Limitations</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Currently, Curensi only supports OKX and KuCoin Futures due to network access restrictions
            that prevent integration with Binance and Bybit APIs.
          </p>
          <p className="text-gray-600 mt-4 text-sm">
            Multi-exchange strategies will be more effective when additional exchanges are supported in future updates.
          </p>
        </div>

        {/* Current Available Exchanges */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Currently Supported Exchanges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-800 mb-4">OKX</h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Funding every 8 hours (02:00, 10:00, 18:00 UTC)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Good liquidity on major pairs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Reliable API access</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-800 mb-4">KuCoin Futures</h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Funding every 8 hours (00:00, 08:00, 16:00 UTC)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Competitive rates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Good API performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Multi-Exchange Strategies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Future Multi-Exchange Strategies</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-blue-800 mb-3">Rate Comparison Strategy</h3>
              <p className="text-gray-700 mb-3">
                Compare funding rates across exchanges and trade where rates are most favorable.
              </p>
              <div className="text-sm text-blue-600">
                Example: If OKX offers 0.15% and KuCoin offers 0.05%, execute arbitrage on OKX
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-blue-800 mb-3">Time-Based Diversification</h3>
              <p className="text-gray-700 mb-3">
                Different exchanges have different funding times - stagger positions for continuous income.
              </p>
              <div className="text-sm text-blue-600">
                Example: OKX (02:00, 10:00, 18:00 UTC) vs KuCoin (00:00, 08:00, 16:00 UTC)
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Benefits</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Challenges</h3>
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preparation */}
        <div className="bg-gray-100 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Preparing for Multi-Exchange Trading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Required Setup</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Verified accounts on multiple exchanges</li>
                <li>• Sufficient capital distribution</li>
                <li>• Portfolio tracking system</li>
                <li>• Understanding of each exchange's rules</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Risk Considerations</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Counterparty risk diversification</li>
                <li>• Transfer fees and delays</li>
                <li>• Regulatory differences</li>
                <li>• API rate limits and reliability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}