"use client";

import Link from "next/link";
import DocsSidebar from "@/components/docs/DocsSidebar";
import {
  CheckCircle,
  ArrowRight,
  User,
  TrendingUp,
  Shield,
  Zap,
  AlertCircle,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const steps = [
  {
    title: "Create Your Account",
    description: "Sign up for Curensi and verify your email address",
    icon: User,
    completed: false,
    action: "Sign up",
    href: "/auth/signup",
  },
  {
    title: "Choose Your Plan",
    description: "Select the subscription tier that matches your trading needs",
    icon: Shield,
    completed: false,
    action: "View Plans",
    href: "/pricing",
  },
  {
    title: "Set Up Exchange Accounts",
    description: "Create accounts on OKX and KuCoin Futures for trading",
    icon: Zap,
    completed: false,
    action: "Learn More",
    href: "/docs/funding-rate",
  },
  {
    title: "Understand Funding Rates",
    description: "Learn how funding rates work and what to look for",
    icon: BookOpen,
    completed: false,
    action: "Read Guide",
    href: "/docs/funding-rate-arbitrage",
  },
  {
    title: "Start Trading",
    description:
      "Execute your first arbitrage trades with proper risk management",
    icon: TrendingUp,
    completed: false,
    action: "Start Strategy",
    href: "/docs/basic-strategy",
  },
];

const requirements = [
  {
    title: "Minimum Capital",
    items: [
      "Start with $100-500 for learning",
      "$1,000+ recommended for meaningful returns",
      "Never invest more than you can afford to lose",
    ],
  },
  {
    title: "Exchange Accounts",
    items: [
      "Binance Futures account",
      "OKX Futures account",
      "KuCoin Futures account",
      "Verify identity on all exchanges",
    ],
  },
  {
    title: "Basic Knowledge",
    items: [
      "Understanding of crypto markets",
      "Basic trading terminology",
      "Risk management principles",
    ],
  },
];

const quickTips = [
  {
    icon: CheckCircle,
    title: "Start Small",
    description:
      "Begin with tiny positions to learn the mechanics without risking significant capital",
  },
  {
    icon: CheckCircle,
    title: "Practice First",
    description:
      "Many exchanges offer testnets where you can practice without real money",
  },
  {
    icon: CheckCircle,
    title: "Track Everything",
    description:
      "Keep detailed records of your trades to learn from mistakes and successes",
  },
  {
    icon: CheckCircle,
    title: "Stay Updated",
    description:
      "Funding rates change frequently - check Curensi regularly for opportunities",
  },
];

const commonMistakes = [
  {
    title: "Ignoring Position Sizes",
    description:
      "Not maintaining equal spot and futures positions, creating directional exposure",
  },
  {
    title: "Forgetting Fees",
    description:
      "Not accounting for trading fees, funding payments, and withdrawal costs",
  },
  {
    title: "Poor Risk Management",
    description: "Not using proper position sizing or stop-loss mechanisms",
  },
  {
    title: "Chasing High Rates",
    description:
      "Focusing only on the highest funding rates without considering exchange risk",
  },
];

export default function GettingStartedPage() {
  return (
    <>
      <main>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold">
                Getting Started with Curensi
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Your complete guide to setting up your account and executing your
              first funding rate arbitrage trades.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Your Journey to Arbitrage Success
            </h2>
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 left-6 md:left-8"></div>
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className="relative flex items-start gap-4 md:gap-6"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              What You'll Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {req.title}
                  </h3>
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

          {/* Quick Tips */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Pro Tips for Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={index}
                    className="bg-green-50 rounded-xl p-6 border border-green-200"
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="mb-16">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Common Mistakes to Avoid
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commonMistakes.map((mistake, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-red-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {mistake.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {mistake.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Now that you understand the basics, it's time to learn about
              funding rates and start your first arbitrage strategy.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/docs/funding-rate"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Learn About Funding Rates
                <BookOpen className="w-5 h-5" />
              </Link>
              <Link
                href="/docs/basic-strategy"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                View Basic Strategy
                <TrendingUp className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Additional Resources
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/docs/funding-rate-arbitrage"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Funding Rate Arbitrage Guide
              </Link>
              <a
                href="https://www.binance.com/en/support/faq/perpetual-futures-360007462592"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Binance Futures Guide
              </a>
              <a
                href="https://help.okx.com/en-us/support-categories/perpetual-swap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                OKX Perpetuals Help
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
