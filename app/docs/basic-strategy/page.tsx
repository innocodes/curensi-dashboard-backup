"use client";

import Link from "next/link";
import DocsHeader from "@/components/docs/DocsHeader";
import { ArrowRight, TrendingUp, Calculator, AlertTriangle, Play, DollarSign, TrendingDown, CheckCircle } from "lucide-react";

const tradeSteps = [
  {
    title: "Calculate Your Entry Costs",
    description: "Use our Net Profit Calculator to factor in fees and basis spread",
    icon: Calculator,
  },
  {
    title: "Set Your Position Size",
    description: "Use 1x leverage and ensure equal spot and futures positions",
    icon: TrendingUp,
  },
  {
    title: "Execute the Trade",
    description: "Buy spot and short futures simultaneously within seconds",
    icon: Play,
  },
  {
    title: "Monitor & Maintain",
    description: "Watch funding rates and liquidation levels, rebalance if needed",
    icon: AlertTriangle,
  },
];

const tradeExample = [
  {
    stage: "Entry",
    action: "Buy $5,000 Spot + Short $5,000 Perp",
    cost: "-0.12% Fees",
    impact: "-$12.00 (Loss)",
  },
  {
    stage: "Spread",
    action: "Perp price was $0.50 lower than Spot",
    cost: "-0.05% Basis",
    impact: "-$5.00 (Loss)",
  },
  {
    stage: "Day 1",
    action: "Collect Funding (3x payments)",
    cost: "+0.12% Yield",
    impact: "+$12.00",
  },
  {
    stage: "Day 2",
    action: "Collect Funding (3x payments)",
    cost: "+0.12% Yield",
    impact: "+$12.00",
  },
  {
    stage: "Exit",
    action: "Close both positions",
    cost: "-0.12% Fees",
    impact: "-$12.00 (Loss)",
  },
];

const optimizationTips = [
  {
    title: "The Compounding Loop",
    description: "Funding fees are paid in USDT directly to your Futures wallet. Reinvest weekly to maximize compound returns.",
    icon: Calculator,
    color: "purple",
  },
  {
    title: "The 'Spread Hunter' Entry",
    description: "Use limit orders instead of market orders to save on fees. Makers pay 0.02% vs Takers pay 0.05%.",
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Fee Tier Hacking",
    description: "Hold BNB for 25% fee discounts. Upgrade to VIP tiers for better rates on high-volume trading.",
    icon: TrendingUp,
    color: "blue",
  },
];

export default function BasicStrategyPage() {
  return (
    <>
      <DocsHeader
        title="Execution Guide: Your First Cash & Carry Trade"
        subtitle="Step-by-step guide to executing profitable funding rate arbitrage trades with proper risk management"
        icon={TrendingUp}
        gradient="bg-gradient-to-r from-green-600 to-teal-600"
        showCTA={true}
        ctaText="Upgrade to Pro Plan"
        ctaLink="/pricing"
        ctaVariant="primary"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              The Cash & Carry Strategy
            </h2>
            <p className="text-gray-700 leading-relaxed text-center">
              Execute a market-neutral arbitrage trade to capture funding fees while minimizing price exposure.
              The key is <span className="font-bold text-blue-600">hedging your price risk</span> while collecting systematic funding payments.
            </p>
          </div>
        </div>

        {/* Trade Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Step-by-Step Execution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradeSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The Math */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Part 1: The Math (Read This First)</h2>
          <p className="text-gray-600 mb-6">
            Most beginners lose money because they ignore Entry Costs. You are not just earning yield; you are fighting fees.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Scenario Example</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>You have $10,000 USDT to deploy on Solana (SOL)</strong><br />
              Funding Rate: 0.04% (per 8 hours)<br />
              Exchange: Bybit
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/Profit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tradeExample.map((trade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{trade.stage}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{trade.action}</td>
                    <td className="px-4 py-3 text-sm">{trade.cost}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${
                      trade.impact.includes('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trade.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-800 mb-3">The Verdict:</h3>
            <div className="space-y-2 text-green-700">
              <p>• <strong>Days to Break Even:</strong> 2.5 Days</p>
              <p>• <strong>Profit after 30 Days:</strong> $329.00 (Net)</p>
              <p>• <strong>APY:</strong> ~39.5% Risk-Free</p>
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <p className="text-sm text-green-700">
                <strong>🚀 Curensi Pro Advantage:</strong> Don't do this math manually.
                Our "Net Profit Calculator" instantly factors in Taker Fees and Bid/Ask Spread to tell you exactly how many days you must hold to break even.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Detailed Instructions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Part 2: Step-by-Step Execution</h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">Step 1</span>
                Funding & Transfer
              </h3>
              <p className="text-gray-600 mb-4">Deposit USDT (Tether) into your chosen exchange.</p>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Bybit Users:</h4>
                  <p className="text-gray-600">Transfer funds to "Unified Trading Account"</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Binance Users:</h4>
                  <p className="text-gray-600">Transfer 50% to "Fiat & Spot" and 50% to "USDⓈ-M Futures"</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">Step 2</span>
                The "Sync" Entry
              </h3>
              <p className="text-gray-600 mb-4">
                Speed is critical. If you buy Spot and wait 1 minute to Short, the price might move 1%, leaving you unhedged.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Short (Futures Tab):</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Margin Mode: Select "Isolated" or "Cross"</li>
                    <li>• Leverage: Set to 1x (Do not skip this!)</li>
                    <li>• Order Type: Market (for speed)</li>
                    <li>• Size: 50% of your total capital</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Long (Spot Tab):</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Order Type: Market</li>
                    <li>• Size: The remaining 50% of your capital</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Execute:</strong> Click "Buy Spot" then immediately "Sell Short"
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">Step 3</span>
                Monitoring & Maintenance
              </h3>
              <p className="text-gray-600 mb-4">
                You are now live. You do not care if SOL goes to $500 or $5. You only care about the Funding Rate.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-green-800">Green Rate:</span>
                    <p className="text-sm text-green-600">You get paid. Do nothing.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-red-50 rounded-lg p-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-red-800">Red Rate (Negative):</span>
                    <p className="text-sm text-red-600">You PAY the fee. If the rate stays negative for &gt;24 hours, close the trade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              The "Rebalance" Trap
            </h3>
            <p className="text-gray-700 mb-4">
              If SOL price doubles, your Spot position doubles in value, but your Short position is losing money and approaching liquidation.
            </p>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <p className="text-gray-700">
                <strong>Action:</strong> You must move USDT from your Spot wallet to your Futures wallet to lower your leverage back to 1x.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                <strong>Auto-Alerts:</strong> Curensi sends you an SMS when your leverage hits 1.5x, so you never get liquidated while sleeping.
              </p>
            </div>
          </div>
        </div>

        {/* Optimization Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Optimization: Turning 30% into 50%</h2>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-8">
            <p className="text-purple-800 mb-6">
              <strong>Amateurs take the yield and spend it. Professionals compound it.</strong>
            </p>
            <div className="space-y-6">
              {optimizationTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 border border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 ${tip.color === 'purple' ? 'bg-purple-100' : tip.color === 'green' ? 'bg-green-100' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${tip.color === 'purple' ? 'text-purple-600' : tip.color === 'green' ? 'text-green-600' : 'text-blue-600'}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white text-center">
          <Calculator className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Execute Your First Trade?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Upgrade to Pro for real-time data, advanced calculators, and instant notifications when high-APR opportunities appear.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing">
              <div className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Upgrade to Pro Plan
                <Calculator className="w-5 h-5" />
              </div>
            </Link>
            <Link href="/dashboard">
              <div className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                View Current Rates
                <TrendingUp className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <p className="text-green-200 text-sm mt-6">
            ✅ Real-time data • ✅ Advanced calculators • ✅ Email notifications • ✅ No free trial
          </p>
        </div>
      </div>
    </>
  );
}