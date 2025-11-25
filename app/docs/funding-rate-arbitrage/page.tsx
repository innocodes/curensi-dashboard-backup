"use client";

import Link from "next/link";
import DocsHeader from "@/components/docs/DocsHeader";
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  Shield,
  DollarSign,
  Calculator,
  Lightbulb,
  AlertTriangle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Understanding Perpetual Futures",
    description:
      "Unlike regular futures that expire, perpetual futures contracts never expire. To keep their price close to the real asset price, exchanges use a mechanism called funding rates.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: DollarSign,
    title: "What Are Funding Rates?",
    description:
      "Funding rates are small payments (typically 0.01% - 0.1%) exchanged between traders every 8 hours. When long positions outnumber short positions, longs pay shorts. When shorts outnumber longs, shorts pay longs.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: TrendingUp,
    title: "The Arbitrage Opportunity",
    description:
      "By simultaneously buying the actual cryptocurrency (spot) and shorting the perpetual futures, you create a market-neutral position. You collect funding payments regardless of whether the price goes up or down.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Shield,
    title: "Market Neutral Strategy",
    description:
      "Your spot and futures positions offset each other's price movements. If BTC goes up 5%, your spot position gains 5% but your futures position loses 5%. The funding payments are pure profit.",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

const exampleScenario = [
  {
    step: "Initial Setup",
    action: "Buy $10,000 worth of Bitcoin on the spot market",
    btcAmount: "0.25 BTC",
    spotPosition: "+$0",
    futuresPosition: "$0",
    fundingReceived: "$0",
    total: "$10,000",
  },
  {
    step: "Open Short Position",
    action: "Short $10,000 worth of Bitcoin perpetual futures",
    btcAmount: "0.25 BTC",
    spotPosition: "+$0",
    futuresPosition: "$0",
    fundingReceived: "$0",
    total: "$10,000",
  },
  {
    step: "After 8 Hours - BTC Price Up 10%",
    action: "Bitcoin price rises to $44,000",
    btcAmount: "0.25 BTC",
    spotPosition: "+$1,000",
    futuresPosition: "-$1,000",
    fundingReceived: "+$30",
    total: "$10,030",
  },
  {
    step: "After 8 Hours - BTC Price Down 10%",
    action: "Bitcoin price drops to $36,000",
    btcAmount: "0.25 BTC",
    spotPosition: "-$1,000",
    futuresPosition: "+$1,000",
    fundingReceived: "+$30",
    total: "$10,030",
  },
];

const nextSteps = [
  {
    title: "Start Learning",
    description: "Understand perpetual futures and funding mechanisms",
    icon: BookOpen,
    action: "Read Binance's Perpetual Futures Guide",
    link: "#",
  },
  {
    title: "Choose Exchanges",
    description: "Select crypto exchanges with perpetual futures markets",
    icon: Users,
    action: "Compare Exchange Features",
    link: "#",
  },
  {
    title: "Start Small",
    description: "Begin with small amounts to learn the mechanics",
    icon: DollarSign,
    action: "Practice with Testnet",
    link: "#",
  },
  {
    title: "Use Curensi",
    description: "Find the best funding rate opportunities automatically",
    icon: TrendingUp,
    action: "View Live Opportunities",
    link: "/pricing",
  },
];

const risks = [
  {
    icon: AlertTriangle,
    title: "Funding Rate Changes",
    description:
      "Funding rates can turn negative, meaning you might have to pay instead of receive.",
  },
  {
    icon: AlertTriangle,
    title: "Exchange Risks",
    description: "Platform security, liquidity issues, or exchange insolvency.",
  },
  {
    icon: AlertTriangle,
    title: "Technical Risks",
    description: "Network issues, liquidation risks, or margin requirements.",
  },
  {
    icon: AlertTriangle,
    title: "Market Volatility",
    description:
      "Extreme volatility can cause temporary losses or liquidations.",
  },
];

const faqs = [
  {
    question: "How much can I earn with funding rate arbitrage?",
    answer:
      "Returns typically range from 20% to 80% annually, depending on market conditions and funding rates. During high volatility periods, rates can exceed 100% APR, but they can also drop to near-zero.",
  },
  {
    question: "Do I need to be an experienced trader?",
    answer:
      "While basic trading knowledge helps, funding rate arbitrage is simpler than directional trading. You're not predicting price movements, just collecting payments. Many beginners start with small positions to learn.",
  },
  {
    question: "What's the minimum amount needed to start?",
    answer:
      "This varies by exchange, but typically you can start with $100-500. However, keep in mind that smaller positions may not be worth the effort after fees.",
  },
  {
    question: "Is this really risk-free?",
    answer:
      "No strategy is completely risk-free. While market-neutral, you face exchange risks, funding rate changes, and technical risks. Proper risk management and choosing reliable exchanges is crucial.",
  },
  {
    question: "How do I manage two positions simultaneously?",
    description:
      "You need to maintain equal value in spot and futures positions. Tools like Curensi help you track opportunities and calculate position sizes.",
  },
  {
    question: "What happens during market crashes?",
    answer:
      "Your spot position loses value while your futures position gains value. However, extreme volatility can cause temporary liquidation risks if you don't maintain proper margin.",
  },
];

export default function FundingRateArbitrageExplainer() {
  return (
    <>
      <DocsHeader
        title="What is Funding Rate Arbitrage?"
        subtitle="In simple terms: You get paid to balance the market. Learn how professionals generate 15-50% APY with market-neutral strategies that profit regardless of price direction."
        icon={Calculator}
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
        showCTA={true}
        ctaText="View Live Rates"
        ctaLink="/dashboard"
        ctaVariant="primary"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simple Analogy */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            The Simple Answer
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>
                  Funding rate arbitrage is like being the bank in crypto.
                </strong>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                You lend money to traders and collect interest payments every 8
                hours, while protecting yourself from price movements by holding
                balanced positions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works: Step by Step
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
                >
                  <div className="flex gap-4">
                    <div
                      className={`p-3 rounded-lg ${step.bgColor} flex-shrink-0`}
                    >
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simple Analogy */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            A Simple Analogy: The Rental Property
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Imagine you own two identical houses next to each other. You
                live in one (your "spot" position) and rent out the other (your
                "futures" position).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                When house prices go up 10%, your home is worth more but your
                rental property's value goes down relative to the market. When
                prices fall 10%, your home loses value but the rental property
                becomes more valuable relative to the market.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>
                  Regardless of price changes, you still collect rent every
                  month.
                </strong>
                That rent is your profit - just like funding payments in crypto
                arbitrage.
              </p>
              <p className="text-lg font-semibold text-green-600">
                The key insight: Your rental income (funding payments) doesn't
                depend on house prices (crypto prices).
              </p>
            </div>
          </div>
        </div>

        {/* Example Scenario */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Real Example: $10,000 Bitcoin Arbitrage
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Step
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Spot P&L
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Futures P&L
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                      Funding Received
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Total Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exampleScenario.map((scenario, index) => (
                    <tr
                      key={index}
                      className={`border-t border-gray-100 ${
                        index > 0 ? "hover:bg-gray-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0
                                ? "bg-blue-500 text-white"
                                : index === 1
                                ? "bg-purple-500 text-white"
                                : index === 2
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="font-medium text-sm">
                            {scenario.step}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {scenario.action}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-medium ${
                            scenario.spotPosition.startsWith("+")
                              ? "text-green-600"
                              : scenario.spotPosition.startsWith("-")
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {scenario.spotPosition.startsWith("+") && (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                          {scenario.spotPosition.startsWith("-") && (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {scenario.spotPosition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-medium ${
                            scenario.futuresPosition.startsWith("+")
                              ? "text-green-600"
                              : scenario.futuresPosition.startsWith("-")
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {scenario.futuresPosition.startsWith("+") && (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                          {scenario.futuresPosition.startsWith("-") && (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {scenario.futuresPosition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                          {scenario.fundingReceived}
                          {scenario.fundingReceived !== "$0" && (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-bold ${
                            scenario.total === "$10,030"
                              ? "text-green-600"
                              : "text-gray-900"
                          }`}
                        >
                          {scenario.total}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 border-t border-blue-200 p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Key Takeaway
                  </p>
                  <p className="text-sm text-blue-700">
                    Notice how your total value increases by $30 regardless of
                    whether Bitcoin goes up or down? That's the magic of
                    market-neutral arbitrage - you collect funding payments
                    while price movements cancel out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What You Need Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What You Need to Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Capital
              </h3>
              <p className="text-gray-600">
                Start with as little as $100-500, though $1,000+ is recommended
                for meaningful returns after fees
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Exchange Accounts
              </h3>
              <p className="text-gray-600">
                Accounts on 1-2 exchanges with perpetual futures markets
                (Binance, Bybit, OKX, KuCoin)
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Basic Knowledge
              </h3>
              <p className="text-gray-600">
                Understanding of crypto basics and willingness to learn about
                futures trading
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Your Next Steps to Start Earning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {step.description}
                  </p>
                  <Link
                    href={step.link}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                  >
                    {step.action}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risks Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Important Risks to Understand
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Risk Disclaimer
                </h3>
                <p className="text-gray-700">
                  While funding rate arbitrage is considered lower risk than
                  directional trading, it's not risk-free. Only invest what you
                  can afford to lose and consider starting with small amounts to
                  learn the mechanics.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {risks.map((risk, index) => {
              const Icon = risk.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {risk.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {risk.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Arbitrage Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of traders earning market-neutral returns with
            Curensi's intelligent funding rate discovery platform.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              View Live Opportunities
              <TrendingUp className="w-5 h-5" />
            </Link>
            <Link
              href="/docs"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Documentation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
