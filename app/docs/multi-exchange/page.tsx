"use client";

import Link from "next/link";
import DocsHeader from "@/components/docs/DocsHeader";
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Shield,
  Calculator,
  ArrowRight
} from "lucide-react";

const strategyConcept = [
  {
    title: "Standard Cash & Carry",
    description: "Done on one exchange - buy spot, short futures on same platform",
    status: "Basic",
    complexity: "Low"
  },
  {
    title: "Cross-Exchange Arbitrage",
    description: "Exploits rate differences between different exchanges",
    status: "Advanced",
    complexity: "High"
  }
];

const exampleScenario = [
  {
    exchange: "Binance",
    fundingRate: "0.01%",
    position: "Long SOL-Perp",
    cost: "Pay 0.01% every 8 hours",
    color: "blue"
  },
  {
    exchange: "Gate.io",
    fundingRate: "0.15%",
    position: "Short SOL-Perp",
    payout: "Earn 0.15% every 8 hours",
    color: "green"
  }
];

const risks = [
  {
    title: "Liquidation Risk × 2",
    description: "You have two liquidation prices to watch. If SOL moons, your Gate.io short gets liquidated. If SOL dumps, your Binance long gets liquidated.",
    icon: AlertTriangle,
    severity: "High",
    solution: "Curensi Alerts warn you if price approaches your liquidation zone."
  },
  {
    title: "Rebalancing Complexity",
    description: "You may need to move USDT from Binance to Gate.io to top up margin as prices move.",
    icon: Shield,
    severity: "Medium",
    solution: "Curensi Dashboard monitors both funding rates in real-time so you know when to exit."
  }
];

const whaleFeatures = [
  {
    title: "Dual Exchange Monitor",
    description: "Track funding rates across multiple exchanges simultaneously in real-time",
    icon: TrendingUp
  },
  {
    title: "Liquidity Bridge",
    description: "Smart alerts for when to transfer funds between exchanges to maintain optimal positions",
    icon: ArrowRight
  },
  {
    title: "Cross-Exchange Calculator",
    description: "Calculate net profit after fees, transfer costs, and funding rate differentials",
    icon: Calculator
  }
];

export default function MultiExchangePage() {
  return (
    <>
      <DocsHeader
        title="Advanced Strategy: Cross-Exchange Arbitrage"
        subtitle="Warning: This strategy is for advanced users. Learn how to exploit funding rate differences between exchanges for maximum returns - but with increased complexity."
        icon={Users}
        gradient="bg-gradient-to-r from-purple-600 to-indigo-600"
        showCTA={true}
        ctaText="Upgrade to Whale Plan"
        ctaLink="/pricing"
        ctaVariant="primary"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Warning Banner */}
        <div className="mb-16">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-bold text-yellow-800">Advanced Strategy Warning</h3>
            </div>
            <p className="text-yellow-700">
              This strategy requires managing margin on two different exchanges and is operationally complex.
              Recommended for portfolios <strong>greater than $10,000</strong> with significant trading experience.
            </p>
          </div>
        </div>

        {/* Strategy Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">The Concept: Beyond Single Exchange</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategyConcept.map((strategy, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${
                    strategy.complexity === 'Low' ? 'bg-green-100' : 'bg-red-100'
                  } rounded-lg flex items-center justify-center`}>
                    <Users className={`w-6 h-6 ${
                      strategy.complexity === 'Low' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{strategy.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      strategy.status === 'Basic'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {strategy.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Math */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cross-Exchange Example</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-4">Scenario: Rate Differential Opportunity</h3>
            <p className="text-blue-800 mb-4">
              You notice SOL has different funding rates across exchanges:
            </p>

            <div className="space-y-4">
              {exampleScenario.map((exchange, index) => (
                <div key={index} className={`bg-white rounded-lg p-4 border ${
                  exchange.color === 'blue' ? 'border-blue-200' : 'border-green-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${
                        exchange.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                      } rounded-lg flex items-center justify-center`}>
                        <TrendingUp className={`w-4 h-4 ${
                          exchange.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                      </div>
                      <h4 className="font-semibold text-gray-900">{exchange.exchange}</h4>
                    </div>
                    <span className={`font-bold ${
                      exchange.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {exchange.fundingRate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{exchange.position}</p>
                  <p className="text-sm font-medium">{exchange.cost || exchange.payout}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-100 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-green-800 mb-2">Net Profit:</h4>
              <p className="text-green-700">
                0.15% (earn) - 0.01% (pay) = <strong>0.14% every 8 hours</strong>
              </p>
              <p className="text-green-600 text-sm mt-1">
                ~153% APR (compounded) after fees
              </p>
            </div>
          </div>
        </div>

        {/* The Risks */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">The Risks (Why You Need Curensi Pro)</h2>
          <div className="space-y-6">
            {risks.map((risk, index) => {
              const Icon = risk.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${
                      risk.severity === 'High' ? 'bg-red-100' : 'bg-yellow-100'
                    } rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${
                        risk.severity === 'High' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{risk.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{risk.description}</p>
                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Solution:</strong> {risk.solution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Who This Is For */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Who Is This Strategy For?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  Ideal Candidates
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Portfolios &gt; $10,000</li>
                  <li>• Experience with multiple exchanges</li>
                  <li>• Comfortable with operational complexity</li>
                  <li>• Can monitor positions frequently</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 text-xs">✗</span>
                  </div>
                  Should Avoid
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Beginners to funding arbitrage</li>
                  <li>• Small portfolios (&lt; $1,000)</li>
                  <li>• Prefer set-and-forget strategies</li>
                  <li>• Not comfortable managing multiple platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Whale Features */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">🐳 Whale Tier: Cross-Exchange Tools</h2>
            <p className="text-purple-100 mb-8">
              Managing cross-exchange arbitrage manually is operationally intensive.
              Our Whale tier provides specialized tools to make it profitable and manageable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whaleFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <Icon className="w-8 h-8 text-white mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-purple-100 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Set Up Multiple Exchange Accounts</h3>
                <p className="text-gray-600 text-sm">Verify identity and fund accounts on at least 2-3 exchanges</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Monitor Rate Differentials</h3>
                <p className="text-gray-600 text-sm">Use Curensi Pro to track funding rates across exchanges</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Execute Opposite Positions</h3>
                <p className="text-gray-600 text-sm">Long on low-rate exchange, short on high-rate exchange</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Monitor and Rebalance</h3>
                <p className="text-gray-600 text-sm">Watch both positions and transfer margin as needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white text-center">
          <Users className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready for Cross-Exchange Arbitrage?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Advanced strategies require advanced tools. Upgrade to Whale tier for cross-exchange monitoring,
            dual-position management, and professional arbitrage opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing">
              <div className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Upgrade to Whale Plan
                <Users className="w-5 h-5" />
              </div>
            </Link>
            <Link href="/docs/basic-strategy">
              <div className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                Master Basic Strategy First
                <Calculator className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <p className="text-purple-200 text-sm mt-6">
            ✅ Cross-exchange monitor • ✅ Dual position alerts • ✅ Transfer optimization • ✅ Priority support
          </p>
        </div>
      </div>
    </>
  );
}