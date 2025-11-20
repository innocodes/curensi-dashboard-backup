'use client';

import {
  Shield,
  AlertTriangle,
  Calculator,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Info,
  Target,
  DollarSign
} from 'lucide-react';

const riskTypes = [
  {
    type: "Market Risk",
    description: "Price volatility affecting your positions",
    icon: TrendingUp,
    severity: "Medium",
    mitigation: [
      "Use conservative position sizes",
      "Monitor market conditions constantly",
      "Have clear exit criteria",
      "Avoid trading during high volatility"
    ]
  },
  {
    type: "Exchange Risk",
    description: "Platform issues or insolvency",
    icon: Shield,
    severity: "High",
    mitigation: [
      "Use reputable exchanges only",
      "Diversify across multiple platforms",
      "Keep funds in cold storage when not trading",
      "Monitor exchange financial health"
    ]
  },
  {
    type: "Liquidation Risk",
    description: "Position closure due to insufficient margin",
    icon: AlertTriangle,
    severity: "High",
    mitigation: [
      "Use low leverage (2-3x max)",
      "Maintain adequate margin buffer",
      "Set stop-loss orders appropriately",
      "Monitor margin requirements closely"
    ]
  },
  {
    type: "Funding Rate Risk",
    description: "Rates changing before funding payment",
    icon: Calculator,
    severity: "Medium",
    mitigation: [
      "Monitor rates constantly",
      "Have minimum acceptable rate threshold",
      "Be ready to exit quickly if rates turn negative",
      "Focus on stable, high-rate opportunities"
    ]
  }
];

const positionSizing = [
  {
    capital: "$1,000",
    conservative: "$10 per trade (1%)",
    moderate: "$20-30 per trade (2-3%)",
    aggressive: "$50+ per trade (5%+)",
    recommendation: "Start with conservative sizing"
  },
  {
    capital: "$5,000",
    conservative: "$50 per trade (1%)",
    moderate: "$100-150 per trade (2-3%)",
    aggressive: "$250+ per trade (5%+)",
    recommendation: "Moderate sizing acceptable with experience"
  },
  {
    capital: "$10,000",
    conservative: "$100 per trade (1%)",
    moderate: "$200-300 per trade (2-3%)",
    aggressive: "$500+ per trade (5%+)",
    recommendation: "Professional sizing with strong risk management"
  }
];

const stopLossStrategies = [
  {
    strategy: "Funding Rate Stop",
    description: "Exit if funding rate drops below threshold",
    example: "Close positions if rate falls below 0.02%",
    useCase: "Protects against negative funding scenarios"
  },
  {
    strategy: "Time Stop",
    description: "Exit after maximum holding period",
    example: "Never hold more than 2 funding periods",
    useCase: "Limits exposure to market conditions"
  },
  {
    strategy: "Drawdown Stop",
    description: "Exit if total portfolio drops by X%",
    example: "Stop trading if portfolio down 10%",
    useCase: "Protects against consecutive losses"
  }
];

export default function RiskManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Risk Management</h1>
          </div>
          <p className="text-xl text-red-100">
            Essential risk management practices for safe and profitable funding rate arbitrage trading.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Core Risk Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Understanding Arbitrage Risks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskTypes.map((risk, index) => {
              const Icon = risk.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      risk.severity === 'High' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        risk.severity === 'High' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{risk.type}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        risk.severity === 'High'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{risk.description}</p>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Mitigation:</h4>
                    <ul className="space-y-1">
                      {risk.mitigation.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Position Sizing */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Position Sizing Guidelines</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Position Size = Risk Capital × Risk Percentage</h3>
              </div>
              <p className="text-gray-600 text-sm">Never risk more than you can afford to lose on a single trade</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-blue-200">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Total Capital</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-green-600">Conservative (1%)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-yellow-600">Moderate (2-3%)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-red-600">Aggressive (5%+)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {positionSizing.map((row, index) => (
                    <tr key={index} className="border-t border-blue-200">
                      <td className="px-4 py-3 text-sm font-medium">{row.capital}</td>
                      <td className="px-4 py-3 text-sm text-green-600">{row.conservative}</td>
                      <td className="px-4 py-3 text-sm text-yellow-600">{row.moderate}</td>
                      <td className="px-4 py-3 text-sm text-red-600">{row.aggressive}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stop-Loss Strategies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Stop-Loss Strategies</h2>
          <div className="space-y-6">
            {stopLossStrategies.map((strategy, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{strategy.strategy}</h3>
                <p className="text-gray-600 mb-3">{strategy.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm"><strong>Example:</strong> {strategy.example}</p>
                  </div>
                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-sm"><strong>Use Case:</strong> {strategy.useCase}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Procedures */}
        <div className="mb-16">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Emergency Procedures</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">1. Rapid Market Movement</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Close both positions immediately regardless of P&L</li>
                  <li>• Do not try to "wait it out" - preserve capital</li>
                  <li>• Review what caused the movement before trading again</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">2. Exchange Issues</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Document all open positions with screenshots</li>
                  <li>• Contact exchange support immediately</li>
                  <li>• Consider closing positions on alternative exchanges if possible</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">3. Consecutive Losses</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Stop trading for at least 24 hours</li>
                  <li>• Review recent trades for mistakes</li>
                  <li>• Reduce position size by 50% when resuming</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Checklist */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Pre-Trade Risk Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Position Analysis</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Funding rate above minimum threshold</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Adequate liquidity on both exchanges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Position size within risk limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Margin requirements met with buffer</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Exit Strategy</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Stop-loss parameters set</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Maximum holding time defined</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Funding rate threshold determined</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Emergency exit plan prepared</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}