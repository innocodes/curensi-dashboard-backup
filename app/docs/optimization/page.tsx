"use client";

import Link from "next/link";
import DocsHeader from "@/components/docs/DocsHeader";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

const optimizationTechniques = [
  {
    title: "The Compounding Loop",
    description: "Funding fees are paid in USDT directly to your Futures wallet. Reinvest weekly to maximize compound returns.",
    icon: Calculator,
    color: "purple",
    benefit: "+$1,000 extra profit per year",
    example: {
      simple: "$10,000 at 40% APR (Simple) = $14,000 after 1 year",
      compound: "$10,000 at 40% APR (Weekly Compounding) = $14,918 after 1 year"
    }
  },
  {
    title: "The 'Spread Hunter' Entry",
    description: "Use limit orders instead of market orders to save on fees. Makers pay 0.02% vs Takers pay 0.05%.",
    icon: DollarSign,
    color: "green",
    benefit: "3 days of free yield per trade",
    example: {
      simple: "Taker Fee: 0.05% (You pay this)",
      compound: "Maker Fee: 0.02% (You save 0.03%)"
    }
  },
  {
    title: "Fee Tier Hacking",
    description: "Hold BNB for 25% fee discounts. Upgrade to VIP tiers for better rates on high-volume trading.",
    icon: TrendingUp,
    color: "blue",
    benefit: "15% increase in net profit",
    example: {
      simple: "Standard fees: 0.05%",
      compound: "VIP fees: 0.03% with BNB discount"
    }
  }
];

const opportunities = [
  {
    title: "New Listings",
    description: "Coins listed in the last 7 days often have wild funding rates.",
    icon: Zap,
    example: "New tokens typically show 100-200% APR for first week",
    strategy: "Use Curensi 'New Listing' filter to spot these before the crowd"
  },
  {
    title: "Hated Coins",
    description: "Coins with bad news often have massive negative funding (great for Long-Arb strategies).",
    icon: TrendingUp,
    example: "Negative funding rates can reach -0.1% to -0.2%",
    strategy: "Reverse arbitrage: Long spot, Short futures when funding is negative"
  },
  {
    title: "Meme Coins",
    description: "DOGE, SHIB, and PEPE often sustain 100%+ APRs for weeks during bull runs.",
    icon: Target,
    example: "Meme coin funding rates can exceed 200% during hype cycles",
    strategy: "High-risk, high-reward - use smaller position sizes"
  }
];

const whaleFeatures = [
  {
    title: "Compound Calculator",
    description: "Tells you exact date and amount to re-invest to maximize gas fees vs yield",
    icon: Calculator
  },
  {
    title: "Liquidity Monitor",
    description: "Ensures there's enough volume to fill your orders without slippage",
    icon: DollarSign
  },
  {
    title: "New Listing Alert",
    description: "Instant notifications when high-yield opportunities appear",
    icon: Zap
  }
];

export default function OptimizationPage() {
  return (
    <>
      <DocsHeader
        title="Optimization: Turning 30% into 50%"
        subtitle="Amateurs take the yield and spend it. Professionals compound it. Master the advanced techniques that separate profitable traders from gamblers."
        icon={Target}
        gradient="bg-gradient-to-r from-purple-600 to-pink-600"
        showCTA={true}
        ctaText="Upgrade to Whale Plan"
        ctaLink="/pricing"
        ctaVariant="primary"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Core Philosophy */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8">
            <p className="text-purple-800 text-lg leading-relaxed text-center font-semibold">
              The difference between 30% and 50% APY isn't luck - it's discipline.
              While amateurs spend their funding profits, professionals reinvest them systematically.
            </p>
          </div>
        </div>

        {/* Optimization Techniques */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">The 3 Optimization Pillars</h2>
          <div className="space-y-8">
            {optimizationTechniques.map((technique, index) => {
              const Icon = technique.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${
                      technique.color === 'purple' ? 'bg-purple-100' :
                      technique.color === 'green' ? 'bg-green-100' :
                      'bg-blue-100'
                    } rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${
                        technique.color === 'purple' ? 'text-purple-600' :
                        technique.color === 'green' ? 'text-green-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{technique.title}</h3>
                      <p className="text-sm text-gray-600">{technique.benefit}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{technique.description}</p>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Standard:</span>
                        <p className="text-gray-900">{technique.example.simple}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Optimized:</span>
                        <p className="text-green-600 font-medium">{technique.example.compound}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hunting Inefficiencies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Hunting Market Inefficiencies</h2>
          <p className="text-gray-600 mb-6">
            The best rates are often found where others aren't looking. Here's where professionals hunt:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>
                  <div className="bg-purple-50 rounded p-3 mb-3">
                    <p className="text-sm font-medium text-purple-800">{opportunity.example}</p>
                  </div>
                  <p className="text-xs text-purple-600">{opportunity.strategy}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Whale Features */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">🐳 Whale Tier Optimization Tools</h2>
            <p className="text-blue-100 mb-8">
              Professional traders don't optimize manually. They use specialized tools that give them an edge over retail traders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whaleFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <Icon className="w-8 h-8 text-white mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-blue-100 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The Math */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">The Optimization Math</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">30%</span>
                  </div>
                  Amateur Approach
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Takes profits as spending money</li>
                  <li>• Uses market orders (0.05% fees)</li>
                  <li>• Chases obvious high rates</li>
                  <li>• Ignores compound opportunities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">50%</span>
                  </div>
                  Professional Approach
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Reinvests profits weekly</li>
                  <li>• Uses limit orders (0.02% fees)</li>
                  <li>• Hunts inefficiencies early</li>
                  <li>• Maximizes compound returns</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-green-800 font-semibold">
                  Starting with $10,000: <span className="text-2xl font-bold">$13,000 vs $16,000</span> after one year
                </p>
                <p className="text-green-600 text-sm mt-1">
                  That's an extra $3,000 just by optimizing your approach
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <Target className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Returns?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Stop leaving money on the table. Upgrade to Whale tier for professional optimization tools,
            compound calculators, and exclusive access to market inefficiencies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing">
              <div className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Upgrade to Whale Plan
                <Target className="w-5 h-5" />
              </div>
            </Link>
            <Link href="/docs/basic-strategy">
              <div className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                Master Basics First
                <Calculator className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <p className="text-purple-200 text-sm mt-6">
            ✅ Compound calculator • ✅ Liquidity monitoring • ✅ Real-time alerts • ✅ Priority support
          </p>
        </div>
      </div>
    </>
  );
}