'use client';

import {
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calculator
} from 'lucide-react';

const optimizationStrategies = [
  {
    title: "Rate Selection",
    description: "Focus on opportunities with the highest risk-adjusted returns",
    icon: Target,
    tips: [
      "Minimum threshold: 0.05% for meaningful returns",
      "Consider exchange reliability alongside rate",
      "Prioritize stable, high rates over volatile extreme rates",
      "Monitor rate persistence patterns"
    ]
  },
  {
    title: "Timing Optimization",
    description: "Maximize returns through strategic entry and exit timing",
    icon: Clock,
    tips: [
      "Enter positions 30-60 minutes before funding",
      "Monitor for sudden rate changes",
      "Consider market volatility when timing entries",
      "Exit quickly if rates turn unfavorable"
    ]
  },
  {
    title: "Cost Minimization",
    description: "Reduce fees and expenses to increase net profits",
    icon: Calculator,
    tips: [
      "Choose exchanges with lowest trading fees",
      "Minimize transfer costs between exchanges",
      "Consider maker vs taker fee differences",
      "Factor in all costs in ROI calculations"
    ]
  }
];

const advancedTechniques = [
  {
    technique: "Tiered Position Sizing",
    description: "Adjust position sizes based on funding rate levels",
    basic: "Fixed position size regardless of rate",
    optimized: "Larger positions for higher rates, smaller for marginal rates",
    benefit: "Higher risk-adjusted returns"
  },
  {
    technique: "Duration-Based Filtering",
    description: "Hold positions for optimal number of funding periods",
    basic: "Always hold for exactly one funding period",
    optimized: "Extend holding for exceptionally stable high rates",
    benefit: "Maximize return on excellent opportunities"
  },
  {
    technique: "Cross-Exchange Rate Comparison",
    description: "Trade on the exchange offering the best rates",
    basic: "Trade on preferred exchange only",
    optimized: "Compare all available exchanges for each opportunity",
    benefit: "Access to the best rates available"
  }
];

const performanceMetrics = [
  {
    metric: "Win Rate",
    description: "Percentage of profitable trades",
    good: ">95%",
    excellent: ">98%"
  },
  {
    metric: "Average Monthly Return",
    description: "Consistent monthly performance",
    good: "2-5%",
    excellent: ">5%"
  },
  {
    metric: "Maximum Drawdown",
    description: "Worst loss from peak",
    good: "<5%",
    excellent: "<2%"
  },
  {
    metric: "Sharpe Ratio",
    description: "Risk-adjusted returns",
    good: ">1.5",
    excellent: ">2.0"
  }
];

export default function OptimizationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Optimizing Returns</h1>
          </div>
          <p className="text-xl text-green-100">
            Advanced strategies to maximize your funding rate arbitrage profits.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Core Optimization Strategies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Core Optimization Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {optimizationStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{strategy.title}</h3>
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced Techniques */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Advanced Techniques</h2>
          <div className="space-y-6">
            {advancedTechniques.map((technique, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-blue-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{technique.technique}</h3>
                <p className="text-gray-700 mb-4">{technique.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Basic Approach</h4>
                    <p className="text-sm text-gray-700">{technique.basic}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Optimized Approach</h4>
                    <p className="text-sm text-gray-700">{technique.optimized}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Benefit</h4>
                    <p className="text-sm text-green-700 font-medium">{technique.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Performance Metrics to Track</h2>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{metric.metric}</h3>
                  <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Good:</span>
                      <span className="text-blue-600 ml-1">{metric.good}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Excellent:</span>
                      <span className="text-green-600 ml-1 font-medium">{metric.excellent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optimization Checklist */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Pre-Trade Optimization Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Rate Analysis</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Rate above minimum threshold (0.05%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Rate stability confirmed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Next funding time optimal</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Cost Efficiency</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Trading fees calculated</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Transfer costs minimized</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Net profit margin acceptable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Important: Platform Limitations</h3>
              <p className="text-gray-700">
                Currently, optimization opportunities are limited by the number of supported exchanges (OKX and KuCoin Futures only).
                As Curensi adds support for additional exchanges, optimization strategies will become significantly more powerful.
              </p>
              <p className="text-gray-600 mt-2 text-sm">
                Focus on mastering basic arbitrage mechanics first, then implement optimization techniques as the platform expands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}