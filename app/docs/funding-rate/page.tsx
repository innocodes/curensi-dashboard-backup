'use client';

import Link from 'next/link';
import DocsHeader from '@/components/docs/DocsHeader';
import {
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Info,
  Zap,
  Users,
  Shield
} from 'lucide-react';

const fundingBasics = [
  {
    title: "What Are Funding Rates?",
    description: "Funding rates are periodic payments between long and short position holders in perpetual futures markets to keep the futures price tethered to the underlying asset's spot price.",
    icon: DollarSign,
    keyPoints: [
      "Payments occur every 8 hours on most exchanges",
      "Positive rates: Longs pay shorts",
      "Negative rates: Shorts pay longs",
      "Rates vary by exchange and market conditions"
    ]
  },
  {
    title: "Why Do They Exist?",
    description: "Funding rates prevent perpetual futures prices from diverging significantly from spot prices by incentivizing traders to take positions that bring prices back into alignment.",
    icon: TrendingUp,
    keyPoints: [
      "Maintains price stability",
      "Reflects market sentiment",
      "Balances long and short positions",
      "Compensates for price risk"
    ]
  },
  {
    title: "How Rates Are Calculated",
    description: "Each exchange uses its own methodology, but generally considers the difference between perpetual futures price and the underlying spot price, along with market depth and volatility.",
    icon: BarChart3,
    keyPoints: [
      "Based on price divergence (basis)",
      "Market sentiment factor",
      "Exchange-specific formulas",
      "Updated in real-time"
    ]
  }
];

const supportedExchanges = [
  {
    name: "OKX",
    fundingTimes: ["02:00 UTC", "10:00 UTC", "18:00 UTC"],
    supportedPairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT", "XRP/USDT"],
    notes: "Currently most reliable for arbitrage"
  },
  {
    name: "KuCoin Futures",
    fundingTimes: ["00:00 UTC", "08:00 UTC", "16:00 UTC"],
    supportedPairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT", "XRP/USDT"],
    notes: "Good liquidity and competitive rates"
  },
  {
    name: "Currently Limited",
    fundingTimes: "N/A",
    supportedPairs: "N/A",
    notes: "Additional exchanges will be supported in future updates"
  }
];

const rateTypes = [
  {
    type: "Positive Funding Rate",
    description: "When perpetual futures trade at a premium to spot price",
    whoPays: "Long positions pay short positions",
    arbitrageStrategy: "Buy spot, Short futures",
    example: "0.1% rate: Longs pay 0.1% to shorts every 8 hours",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    type: "Negative Funding Rate",
    description: "When perpetual futures trade at a discount to spot price",
    whoPays: "Short positions pay long positions",
    arbitrageStrategy: "Short spot, Long futures",
    example: "-0.1% rate: Shorts pay 0.1% to longs every 8 hours",
    color: "text-red-600",
    bgColor: "bg-red-100"
  }
];

const aprCalculation = {
  description: "Annual Percentage Rate helps normalize funding rates for comparison",
  formula: "APR = Funding Rate × 3 payments/day × 365 days",
  examples: [
    { rate: "0.01%", apr: "10.95%", description: "Low but consistent returns" },
    { rate: "0.05%", apr: "54.75%", description: "Good arbitrage opportunity" },
    { rate: "0.10%", apr: "109.5%", description: "Excellent arbitrage opportunity" },
    { rate: "0.20%", apr: "219%", description: "Rare but highly profitable" }
  ]
};

const exchangeRequirements = [
  {
    exchange: "OKX",
    requirements: [
      "Complete identity verification (KYC)",
      "Enable futures trading",
      "Transfer USDT to futures account",
      "Understand position sizing rules"
    ],
    links: [
      { text: "OKX Verification Guide", url: "#" },
      { text: "Futures Trading Tutorial", url: "#" }
    ]
  },
  {
    exchange: "KuCoin Futures",
    requirements: [
      "Complete identity verification",
      "Activate futures trading",
      "Transfer funds to futures account",
      "Review margin requirements"
    ],
    links: [
      { text: "KuCoin Verification", url: "#" },
      { text: "Futures Setup Guide", url: "#" }
    ]
  }
];

const risks = [
  {
    title: "Funding Rate Volatility",
    description: "Rates can change dramatically between funding periods, potentially turning positive rates negative.",
    icon: TrendingUp,
    mitigation: "Monitor rates closely and have clear exit strategies"
  },
  {
    title: "Exchange Platform Risk",
    description: "Exchange downtime, maintenance, or insolvency can trap your funds.",
    icon: Shield,
    mitigation: "Use reputable exchanges and consider diversifying across multiple platforms"
  },
  {
    title: "Liquidation Risk",
    description: "Extreme market movements can liquidate your futures position before you can close it.",
    icon: AlertTriangle,
    mitigation: "Use conservative position sizing and maintain adequate margin"
  },
  {
    title: "Execution Risk",
    description: "Delays in opening/closing positions or slippage can reduce profits or create losses.",
    icon: Clock,
    mitigation: "Monitor market conditions and use appropriate order types"
  }
];

export default function FundingRatePage() {
  return (
    <>
      <DocsHeader
        title="Understanding Funding Rates: The Engine of Arbitrage"
        subtitle="Master the mechanics of funding rates, APR calculations, and exchange requirements. Your complete guide to setting up profitable arbitrage strategies."
        icon={BarChart3}
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
        showCTA={true}
        ctaText="View Current Rates"
        ctaLink="/dashboard"
        ctaVariant="secondary"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Funding Rate Basics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Funding Rate Fundamentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fundingBasics.map((basic, index) => {
              const Icon = basic.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{basic.title}</h3>
                  <p className="text-gray-600 mb-4">{basic.description}</p>
                  <ul className="space-y-2">
                    {basic.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rate Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Types of Funding Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rateTypes.map((type, index) => (
              <div key={index} className={`${type.bgColor} rounded-xl p-6 border border-opacity-20`}>
                <h3 className={`font-bold text-lg mb-3 ${type.color}`}>
                  {type.type}
                </h3>
                <p className="text-gray-700 mb-4">{type.description}</p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900 mb-2">
                    Who Pays: {type.whoPays}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Strategy: {type.arbitrageStrategy}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Example: {type.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* APR Calculation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Understanding APR Calculations</h2>
          <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">APR Formula</h3>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <code className="text-purple-800 font-mono">{aprCalculation.formula}</code>
              </div>
              <p className="text-gray-600 mt-2">{aprCalculation.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aprCalculation.examples.map((example, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">Rate: {example.rate}</div>
                  <div className="text-lg font-bold text-purple-600">{example.apr}</div>
                  <div className="text-xs text-gray-500 mt-1">{example.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supported Exchanges */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Supported Exchanges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportedExchanges.map((exchange, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">{exchange.name}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Funding Times</div>
                    <div className="text-sm text-gray-600">{exchange.fundingTimes}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Supported Pairs</div>
                    <div className="text-sm text-gray-600">{exchange.supportedPairs}</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-yellow-800">{exchange.notes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange Requirements */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Exchange Account Setup</h2>
          <div className="space-y-8">
            {exchangeRequirements.map((req, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{req.exchange}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {req.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Helpful Links</h4>
                    <div className="space-y-2">
                      {req.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Risks */}
        <div className="mb-16">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Important Risks to Consider</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {risks.map((risk, index) => {
                const Icon = risk.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 border border-red-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{risk.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                        <div className="bg-red-50 rounded p-3">
                          <p className="text-sm text-red-800">
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Start Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Account Setup
              </h3>
              <ul className="space-y-2 text-blue-100">
                <li>✓ Create accounts on OKX and KuCoin</li>
                <li>✓ Complete identity verification</li>
                <li>✓ Enable futures trading</li>
                <li>✓ Transfer initial funds</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Precautions
              </h3>
              <ul className="space-y-2 text-blue-100">
                <li>✓ Start with small position sizes</li>
                <li>✓ Use testnet if available</li>
                <li>✓ Keep detailed trading records</li>
                <li>✓ Monitor funding rate changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}