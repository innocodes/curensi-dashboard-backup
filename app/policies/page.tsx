import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import {
  FileText,
  Shield,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Users,
  Mail
} from 'lucide-react';

const policies = [
  {
    title: 'Privacy Policy',
    description: 'Learn how we collect, use, and protect your personal information',
    icon: Shield,
    href: '/policies/privacy-policy',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Terms of Service',
    description: 'Terms and conditions governing your use of Curensi services',
    icon: FileText,
    href: '/policies/terms-of-service',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Disclaimer',
    description: 'Important information about risks and limitations of our service',
    icon: AlertCircle,
    href: '/policies/disclaimer',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
];

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Policies</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Legal Policies</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Important information about your rights and responsibilities when using Curensi
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {policies.map((policy, index) => {
            const Icon = policy.icon;
            return (
              <Link
                key={index}
                href={policy.href}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${policy.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${policy.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {policy.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {policy.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help Understanding?</h3>
              <p className="text-gray-700 mb-4">
                Our legal documents are written to be clear and comprehensive. If you have any questions
                about our policies or how they apply to your use of Curensi, please don't hesitate to reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:support@curensi.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're here to help. Our support team is available to answer any questions you may have
            about our policies or the Curensi platform.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="mailto:support@curensi.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Mail className="w-5 h-5" />
              support@curensi.com
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}