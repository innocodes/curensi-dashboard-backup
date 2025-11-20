import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import { FileText, ArrowLeft, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TermsOfServicePage() {
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Terms of Service</h1>
              <p className="text-blue-100">Terms and conditions for using Curensi services</p>
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

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using Curensi, you agree to be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What Curensi Provides</h3>
                  <p className="text-gray-700">
                    Curensi is an information and analysis platform that provides funding rate data,
                    arbitrage opportunity analysis, and market insights for cryptocurrency trading. We do not
                    execute trades or provide investment advice.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• You must be 18 years or older to use our services</li>
              <li>• You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>• You must provide accurate and current information when creating an account</li>
              <li>• You agree not to use our services for any illegal or unauthorized purposes</li>
              <li>• You acknowledge that trading cryptocurrencies involves significant risk</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Services</h2>
            <p className="text-gray-600 mb-6">
              Curensi offers subscription-based access to our premium features. By subscribing, you agree to:
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• Pay all applicable fees and taxes for your subscription</li>
              <li>• Provide accurate payment information</li>
              <li>• Maintain updated payment methods for recurring subscriptions</li>
              <li>• Cancel subscriptions at least 24 hours before the next billing cycle</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              Curensi and its content, features, and functionality are owned by Curensi and are protected by
              copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute,
              or create derivative works without our express written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
                  <p className="text-gray-700">
                    Curensi provides information and analysis tools only. We are not responsible for any
                    trading decisions you make or any losses you may incur. Cryptocurrency trading involves
                    substantial risk of loss and is not suitable for all investors.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-600 mb-6">
              We strive to maintain high service availability but cannot guarantee uninterrupted access.
              Service may be temporarily unavailable for maintenance, updates, or technical issues.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-600 mb-6">
              We may terminate or suspend your account at our discretion, with or without cause, including
              violation of these terms. You may also terminate your account at any time through your account settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
              Continued use of our services constitutes acceptance of any modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-6">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">Email: support@curensi.com</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}