"use client";

import Link from "next/link";
import DocsHeader from "@/components/docs/DocsHeader";
import { CheckCircle, ArrowRight, TrendingUp, Shield, AlertTriangle, Calculator, Zap } from "lucide-react";

const steps = [
  {
    title: "Create Your Free Account",
    description: "Get instant access to sample funding rates and learn the platform with no credit card required",
    icon: Shield,
    status: "ready",
    action: "Sign Up Free",
    href: "/auth/signup",
  },
  {
    title: "Choose Your Trading Plan",
    description: "Select Pro ($9.99/mo) for real-time data or Whale ($29.99/mo) for professional features",
    icon: Calculator,
    status: "upgrade",
    action: "View Plans",
    href: "/pricing",
  },
  {
    title: "Set Up Exchange Accounts",
    description: "Create accounts on OKX, KuCoin, Binance, and other supported exchanges for trading",
    icon: Zap,
    status: "external",
    action: "Exchange Setup",
    href: "/docs/exchange-setup",
  },
  {
    title: "Execute Your First Trade",
    description: "Apply the Cash & Carry strategy with our step-by-step guide",
    icon: TrendingUp,
    status: "learn",
    action: "Learn Strategy",
    href: "/docs/basic-strategy",
  },
];

const goldenRules = [
  {
    title: "Never Guess, Always Calculate",
    description: "A high funding rate is useless if the entry spread eats your profit. Curensi's Net Profit Calculator instantly checks Spot vs. Futures price spread to ensure profitable entries.",
    icon: Calculator,
    color: "blue",
  },
  {
    title: "Leverage Kills Returns",
    description: "This strategy is designed to be low-risk. Use 1x leverage (maximum 2x). High leverage turns a market-neutral strategy into a gamble.",
    icon: AlertTriangle,
    color: "red",
  },
  {
    title: "Liquidity is King",
    description: "Never chase 200% APR on a coin with $50K volume. Our scanner automatically hides 'Ghost Coins' with low liquidity to protect your capital.",
    icon: Shield,
    color: "green",
  },
];

const requirements = [
  {
    title: "Starting Capital",
    items: [
      "Free tier: Perfect for learning with sample data (no cost)",
      "Pro tier: Start with $1,000+ for meaningful returns",
      "Whale tier: $10,000+ for professional trading",
      "Never invest more than you can afford to lose",
    ],
  },
  {
    title: "Exchange Access",
    items: [
      "OKX (Great liquidity, low fees)",
      "KuCoin Futures (Altcoin opportunities)",
      "Binance (Largest market)",
      "Bybit, Bitget, Gate.io (High-yield plays)",
      "Verify identity on all exchanges",
    ],
  },
  {
    title: "Essential Knowledge",
    items: [
      "Understanding of Spot vs Futures markets",
      "Basic risk management principles",
      "How funding rates work (we'll teach you)",
      "The importance of position sizing",
    ],
  },
];

export default function GettingStartedPage() {
  return (
    <>
      <DocsHeader
        title="The Curensi Master Playbook"
        subtitle="Your complete blueprint for generating consistent, market-neutral yield using the same strategies employed by hedge funds"
        icon={Calculator}
        gradient="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        showCTA={true}
        ctaText="Choose Your Plan"
        ctaLink="/pricing"
        ctaVariant="secondary"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* What is Funding Rate Arbitrage */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What is "Funding Rate Arbitrage"?</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                In simple terms: <strong>You get paid to balance the market.</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Cryptocurrency markets are divided into two worlds:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Spot Market</h4>
                  <p className="text-gray-600">Buying actual coins (e.g., owning 1 BTC)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Futures Market</h4>
                  <p className="text-gray-600">Betting on the price of coins (e.g., a Contract for 1 BTC)</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                These two prices should be identical, but they rarely are. When the market is bullish, everyone wants Futures contracts to get leverage. The price of Futures goes higher than Spot.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>To fix this, exchanges force Futures buyers to pay a fee to Futures sellers every 8 hours. This fee is the Funding Rate.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* The Strategy */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Strategy</h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
            <p className="text-gray-700 leading-relaxed mb-6 text-center font-semibold text-lg">
              We don't gamble on price. We take a <span className="text-blue-600 font-bold">Delta Neutral</span> position:
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-green-600 font-bold mb-2">Buy $10,000 of SOL</div>
                <div className="text-gray-600 text-sm">(Spot Market)</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-red-600 font-bold mb-2">Short $10,000 of SOL</div>
                <div className="text-gray-600 text-sm">(Futures Market)</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-center mb-4">
                <h4 className="font-bold text-gray-900 mb-2">Result:</h4>
                <p className="text-gray-600">If SOL goes up 10%, your Spot makes $1,000, but your Short loses $1,000. <span className="font-bold text-green-600">Net Change: $0</span></p>
              </div>
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  <span className="text-2xl font-bold text-blue-600">BUT:</span> Because you are Shorting, you collect the Funding Rate fee every 8 hours.
                </p>
                <p className="text-gray-900 font-semibold mt-2">
                  This is how professionals generate <span className="text-blue-600 font-bold">15% - 50% APR</span> with minimal market risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Three Golden Rules */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Three Golden Rules</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Memorize these rules before executing your first trade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goldenRules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <div key={index} className="relative">
                  <div className={`bg-${rule.color}-50 border-2 border-${rule.color}-200 rounded-xl p-8 h-full`}>
                    <div className={`w-12 h-12 bg-${rule.color}-100 rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className={`w-6 h-6 text-${rule.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Rule {index + 1}: {rule.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Start Path */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Your Journey to Arbitrage Success</h2>
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 left-6 md:left-8"></div>
            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex items-start gap-4 md:gap-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      step.status === 'ready'
                        ? 'bg-green-500 text-white'
                        : step.status === 'upgrade'
                        ? 'bg-blue-500 text-white'
                        : step.status === 'external'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <Link
                        href={step.href}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {step.action}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What You'll Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">{req.title}</h3>
                <ul className="space-y-3">
                  {req.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What Success Looks Like
              </h2>
              <p className="text-gray-600">
                Professional traders typically achieve these metrics with proper strategy execution
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15-50%</div>
                <div className="text-sm text-gray-600">Annual Percentage Rate</div>
                <div className="text-xs text-gray-500 mt-1">Risk-adjusted returns</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">&lt;5%</div>
                <div className="text-sm text-gray-600">Maximum Drawdown</div>
                <div className="text-xs text-gray-500 mt-1">With proper hedging</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Trade Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">Following our rules</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <TrendingUp className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Start Earning Market-Neutral Yields?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of traders using Curensi to generate consistent returns regardless of market direction. Start with our free tier to see sample opportunities, then upgrade when you're ready for real-time data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing">
              <div className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Choose Your Plan
                <Calculator className="w-5 h-5" />
              </div>
            </Link>
            <Link href="/dashboard">
              <div className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                View Sample Rates
                <TrendingUp className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            ✅ No credit card required for free tier • ✅ Cancel anytime • ✅ Upgrade when ready
          </p>
        </div>
      </div>
    </>
  );
}