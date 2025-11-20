'use client';

import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calculator,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  DollarSign,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from 'lucide-react';

const strategySteps = [
  {
    step: "1",
    title: "Find Funding Opportunity",
    description: "Use Curensi to identify high funding rates on supported exchanges",
    icon: BarChart3,
    details: [
      "Look for rates above 0.05% for meaningful returns",
      "Compare rates across OKX and KuCoin Futures",
      "Check the time until next funding payment",
      "Verify symbol liquidity and trading volume"
    ]
  },
  {
    step: "2",
    title: "Calculate Position Size",
    description: "Determine the appropriate trade size based on your capital and risk tolerance",
    icon: Calculator,
    details: [
      "Never risk more than 1-2% of total capital per trade",
      "Consider trading fees in your calculations",
      "Account for potential slippage on entry/exit",
      "Maintain adequate margin for futures positions"
    ]
  },
  {
    step: "3",
    title: "Execute Market-Neutral Position",
    description: "Simultaneously open spot and futures positions in opposite directions",
    icon: TrendingUp,
    details: [
      "For positive rates: Buy spot, Short futures",
      "For negative rates: Short spot, Long futures",
      "Ensure position values are approximately equal",
      "Enter both positions quickly to minimize price risk"
    ]
  },
  {
    step: "4",
    title: "Monitor and Collect",
    description: "Hold positions through the funding period and collect your payment",
    icon: DollarSign,
    details: [
      "Monitor both positions for any significant divergence",
      "Be ready to close if funding rates turn against you",
      "Collect funding payment at the next funding time",
      "Close positions after receiving funding if desired"
    ]
  }
];

const positiveRateExample = [
  {
    scenario: "Initial Setup",
    spotPosition: "$10,000 BTC purchased",
    futuresPosition: "$10,000 BTC futures shorted",
    totalExposure: "$20,000 total position (fully hedged)",
    fundingExpected: "+$30 funding payment expected"
  },
  {
    scenario: "BTC Price +10%",
    spotPnL: "+$1,000 profit",
    futuresPnL: "-$1,000 loss",
    netTradingPnL: "$0 (market neutral)",
    fundingReceived: "+$30 collected",
    netResult: "+$30 profit"
  },
  {
    scenario: "BTC Price -10%",
    spotPnL: "-$1,000 loss",
    futuresPnL: "+$1,000 profit",
    netTradingPnL: "$0 (market neutral)",
    fundingReceived: "+$30 collected",
    netResult: "+$30 profit"
  }
];

const negativeRateExample = [
  {
    scenario: "Initial Setup",
    spotPosition: "$10,000 BTC shorted",
    futuresPosition: "$10,000 BTC futures bought",
    totalExposure: "$20,000 total position (fully hedged)",
    fundingExpected: "+$30 funding payment expected"
  },
  {
    scenario: "BTC Price +10%",
    spotPnL: "-$1,000 loss",
    futuresPnL: "+$1,000 profit",
    netTradingPnL: "$0 (market neutral)",
    fundingReceived: "+$30 collected",
    netResult: "+$30 profit"
  },
  {
    scenario: "BTC Price -10%",
    spotPnL: "+$1,000 profit",
    futuresPnL: "-$1,000 loss",
    netTradingPnL: "$0 (market neutral)",
    fundingReceived: "+$30 collected",
    netResult: "+$30 profit"
  }
];

const bestPractices = [
  {
    icon: Shield,
    title: "Start Small",
    description: "Begin with tiny positions ($100-500) to learn mechanics without significant risk",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Clock,
    title: "Timing Matters",
    description: "Enter positions before funding payments, but avoid holding through major market events",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: BarChart3,
    title: "Monitor Divergence",
    description: "Watch for significant price differences between spot and futures that could create losses",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: DollarSign,
    title: "Factor in Fees",
    description: "Include trading fees, withdrawal costs, and potential slippage in your calculations",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const commonMistakes = [
  {
    title: "Position Size Mismatch",
    description: "Not maintaining equal value between spot and futures positions creates directional exposure",
    example: "Buy $10k spot but only short $8k futures - you have $2k bullish exposure",
    solution: "Always double-check that position values match within 1-2%"
  },
  {
    title: "Ignoring Trading Fees",
    description: "Forgetting to account for exchange fees can turn profitable trades into losses",
    example: "$10k position with 0.1% fee each way = $20 in fees vs $30 funding = only $10 profit",
    solution: "Calculate all costs before entering a trade"
  },
  {
    title: "Poor Timing",
    description: "Holding positions through major price events can cause temporary losses before funding",
    example: "Entering during high volatility can lead to liquidation before funding payment",
    solution: "Monitor market conditions and have clear exit criteria"
  },
  {
    title: "Over-leveraging",
    description: "Using too much leverage increases liquidation risk even with market-neutral positions",
    example: "10x leverage means a 10% move could liquidate your futures position",
    solution: "Use low leverage (2-3x max) or no leverage"
  }
];

const riskManagement = [
  {
    level: "Conservative",
    maxPositionSize: "1% of capital",
    maxLeverage: "No leverage or 2x max",
    targetRate: ">0.05%",
    maxHoldTime: "1 funding period (8 hours)",
    description: "For beginners learning the mechanics"
  },
  {
    level: "Moderate",
    maxPositionSize: "2-3% of capital",
    maxLeverage: "3-5x leverage",
    targetRate: ">0.03%",
    maxHoldTime: "2-3 funding periods",
    description: "For experienced traders with good risk management"
  },
  {
    level: "Aggressive",
    maxPositionSize: "5%+ of capital",
    maxLeverage: "5-10x leverage",
    targetRate: ">0.01%",
    maxHoldTime: "Multiple periods",
    description: "Only for professional traders with significant experience"
  }
];

export default function BasicStrategyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Basic Arbitrage Strategy</h1>
          </div>
          <p className="text-xl text-blue-100">
            Step-by-step guide to executing your first funding rate arbitrage trade safely and profitably.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Strategy Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">The Four-Step Arbitrage Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-blue-600">{step.step}</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Positive Rate Example */}
        <div className="mb-16">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Positive Funding Rate Example</h2>
            </div>
            <p className="text-gray-700 mb-6">
              When funding rates are positive (e.g., 0.1%), you <strong>buy spot and short futures</strong>. Long positions pay short positions every 8 hours.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Market Moves UP (+10%)</h3>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="space-y-2">
                    {positiveRateExample[1] && Object.entries(positiveRateExample[1]).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/PnL/g, ' P&L')}:</span>
                        <span className={`text-sm font-medium ${
                          value.includes('+') ? 'text-green-600' : value.includes('-') ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Market Moves DOWN (-10%)</h3>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="space-y-2">
                    {positiveRateExample[2] && Object.entries(positiveRateExample[2]).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/PnL/g, ' P&L')}:</span>
                        <span className={`text-sm font-medium ${
                          value.includes('+') ? 'text-green-600' : value.includes('-') ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-600 text-white rounded-lg p-4 mt-6 text-center">
              <p className="font-bold">Net Result: $30 profit regardless of price direction</p>
            </div>
          </div>
        </div>

        {/* Negative Rate Example */}
        <div className="mb-16">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Negative Funding Rate Example</h2>
            </div>
            <p className="text-gray-700 mb-6">
              When funding rates are negative (e.g., -0.1%), you <strong>short spot and long futures</strong>. Short positions pay long positions every 8 hours.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Market Moves UP (+10%)</h3>
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <div className="space-y-2">
                    {negativeRateExample[1] && Object.entries(negativeRateExample[1]).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/PnL/g, ' P&L')}:</span>
                        <span className={`text-sm font-medium ${
                          value.includes('+') ? 'text-green-600' : value.includes('-') ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Market Moves DOWN (-10%)</h3>
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <div className="space-y-2">
                    {negativeRateExample[2] && Object.entries(negativeRateExample[2]).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/PnL/g, ' P&L')}:</span>
                        <span className={`text-sm font-medium ${
                          value.includes('+') ? 'text-green-600' : value.includes('-') ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-600 text-white rounded-lg p-4 mt-6 text-center">
              <p className="font-bold">Net Result: $30 profit regardless of price direction</p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Best Practices for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestPractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <div key={index} className={`${practice.bgColor} rounded-xl p-6 border border-opacity-20`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-10 h-10 ${practice.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${practice.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{practice.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm">{practice.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
            </div>
            <div className="space-y-6">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-yellow-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{mistake.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{mistake.description}</p>
                  <div className="bg-yellow-50 rounded p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-yellow-800 mb-1">
                          <strong>Example:</strong> {mistake.example}
                        </p>
                        <p className="text-sm text-yellow-800">
                          <strong>Solution:</strong> {mistake.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Management Levels */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Risk Management Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskManagement.map((level, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className={`font-bold text-lg mb-4 ${
                  level.level === 'Conservative' ? 'text-green-600' :
                  level.level === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {level.level}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Max Position:</span>
                    <span className="text-sm font-medium">{level.maxPositionSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Max Leverage:</span>
                    <span className="text-sm font-medium">{level.maxLeverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target Rate:</span>
                    <span className="text-sm font-medium">{level.targetRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Max Hold Time:</span>
                    <span className="text-sm font-medium">{level.maxHoldTime}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Try Your First Trade?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start with a conservative approach using small position sizes. Practice the mechanics before committing significant capital.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/dashboard"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              View Live Opportunities
              <BarChart3 className="w-5 h-5" />
            </a>
            <a
              href="/docs/risk-management"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Learn Risk Management
              <Shield className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}