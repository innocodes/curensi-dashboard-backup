import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import { AlertCircle, ArrowLeft, Calendar, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/policies"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Policies
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Disclaimer</h1>
              <p className="text-red-100">Important risk information and limitations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Calendar className="w-4 h-4" />
            Last updated: {new Date().toLocaleDateString()}
          </div>

          {/* Critical Notice */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-900 mb-3">IMPORTANT: READ CAREFULLY</h2>
                <p className="text-red-800 font-medium">
                  This disclaimer contains critical information about risks associated with cryptocurrency trading
                  and the limitations of Curensi's services. You must read and understand this before using our platform.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Investment Advice</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Curensi Is Not a Financial Advisor</h3>
                  <p className="text-gray-700">
                    Curensi provides data analysis and market information only. We do not provide investment advice,
                    financial recommendations, or trading strategies. All content on our platform is for informational
                    purposes only.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trading Risks</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">High Risk Warning</h3>
                  <p className="text-gray-700">
                    Cryptocurrency trading and funding rate arbitrage involve substantial risk of financial loss.
                    You may lose your entire investment. Past performance is not indicative of future results.
                  </p>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• Market volatility can result in rapid and significant losses</li>
              <li>• Funding rates can change suddenly and unpredictably</li>
              <li>• Technical issues on exchanges may prevent timely trade execution</li>
              <li>• Regulatory changes may affect trading conditions</li>
              <li>• Exchange counterparty risk exists at all times</li>
              <li>• Smart contract and platform security risks apply</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Guarantee of Profitability</h2>
            <p className="text-gray-600 mb-6">
              Curensi does not guarantee that you will profit from using our data or analysis. Historical performance,
              statistical analysis, and opportunity detection do not guarantee future results. All trading decisions
              are your sole responsibility.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Limitations</h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• Data may be delayed, inaccurate, or incomplete</li>
              <li>• Technical issues may affect service availability</li>
              <li>• We are not responsible for exchange platform failures</li>
              <li>• Internet connectivity issues may affect service</li>
              <li>• Third-party data sources may be unreliable</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Do Your Own Research</h2>
            <p className="text-gray-600 mb-6">
              You must conduct your own research and due diligence before making any trading decisions.
              Consult with qualified financial professionals if you need investment advice.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Warranty</h2>
            <p className="text-gray-600 mb-6">
              Curensi provides its services "as is" without any warranties, express or implied. We do not guarantee
              the accuracy, completeness, or reliability of any information provided.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              To the maximum extent permitted by law, Curensi shall not be liable for any direct, indirect,
              incidental, special, or consequential damages arising from your use of our services or trading
              activities.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Acknowledgment</h2>
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <p className="text-gray-700 font-medium">
                By using Curensi, you acknowledge and agree that:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li>• You understand the risks involved in cryptocurrency trading</li>
                <li>• You are trading at your own risk and with your own funds</li>
                <li>• Curensi is not responsible for your trading decisions or losses</li>
                <li>• You will not hold Curensi liable for any financial losses</li>
                <li>• You have read and understood this disclaimer completely</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Advice</h2>
            <p className="text-gray-600 mb-6">
              This disclaimer does not constitute financial, legal, or tax advice. Consult with appropriate
              professionals for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}