'use client';

import Link from 'next/link';
import {
  BookOpen,
  TrendingUp,
  Calculator,
  Shield,
  Zap,
  BarChart3,
  Code,
  Users,
  ArrowRight,
  FileText,
  BookMarked,
  Lightbulb
} from 'lucide-react';

const docSections = [
  {
    title: "Getting Started",
    description: "Learn the fundamentals of funding rate arbitrage and how to use Curensi",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    docs: [
      {
        title: "What is Funding Rate Arbitrage?",
        description: "Complete beginner's guide to understanding market-neutral crypto trading",
        href: "/docs/funding-rate-arbitrage",
        icon: Calculator
      },
      {
        title: "Getting Started with Curensi",
        description: "Set up your account and start discovering arbitrage opportunities",
        href: "/docs/getting-started",
        icon: Zap
      }
    ]
  },
  {
    title: "Platform Features",
    description: "Learn how to use Curensi's powerful features and tools",
    icon: BarChart3,
    color: "text-green-600",
    bgColor: "bg-green-100",
    docs: [
      {
        title: "Dashboard Overview",
        description: "Navigate the main dashboard and understand key metrics",
        href: "/docs/dashboard",
        icon: FileText
      },
      {
        title: "Live Funding Rates",
        description: "Understanding and using real-time funding rate data",
        href: "/docs/funding-rates",
        icon: BarChart3
      }
    ]
  },
  {
    title: "Trading Strategies",
    description: "Advanced strategies and risk management techniques",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    docs: [
      {
        title: "Basic Arbitrage Strategy",
        description: "Step-by-step guide to executing your first arbitrage trade",
        href: "/docs/basic-strategy",
        icon: BookMarked
      },
      {
        title: "Risk Management",
        description: "Essential risk management practices for arbitrage trading",
        href: "/docs/risk-management",
        icon: Shield
      },
      {
        title: "Multi-Exchange Strategies",
        description: "Advanced strategies across multiple exchanges",
        href: "/docs/multi-exchange",
        icon: Users
      },
      {
        title: "Optimizing Returns",
        description: "Maximize your arbitrage profits with advanced techniques",
        href: "/docs/optimization",
        icon: TrendingUp
      }
    ]
  },
  ];

const quickStart = [
  {
    title: "Create Your Account",
    description: "Sign up for a free Curensi account to get started",
    href: "/auth/signup",
    action: "Sign Up"
  },
  {
    title: "Read the Basics",
    description: "Understand how funding rate arbitrage works",
    href: "/docs/funding-rate-arbitrage",
    action: "Learn More"
  },
  {
    title: "Choose a Plan",
    description: "Select the right subscription for your trading needs",
    href: "/pricing",
    action: "View Plans"
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold">Documentation</h1>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Complete guide to funding rate arbitrage and using Curensi's intelligent market-neutral trading platform.
          </p>

          {/* Quick Start */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStart.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm mb-4">{item.description}</p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-white hover:text-blue-200 font-medium text-sm"
                >
                  {item.action}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Documentation Sections */}
        <div className="space-y-16">
          {docSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <div key={sectionIndex}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-lg ${section.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{section.title}</h2>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.docs.map((doc, docIndex) => {
                    const DocIcon = doc.icon;
                    return (
                      <Link
                        key={docIndex}
                        href={doc.href}
                        className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-200 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                            <DocIcon className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {doc.description}
                            </p>
                            <span className="text-primary-600 text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              Read more
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Additional Help?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Our team is here to help you succeed with funding rate arbitrage.
              Get in touch with us for personalized support and guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Join our Discord community to connect with other traders
              </p>
              <span className="text-gray-400 text-sm font-medium">
                Join Discord (Coming Soon)
              </span>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600 mb-4">
                Step-by-step video guides for common trading strategies
              </p>
              <span className="text-gray-400 text-sm font-medium">
                Watch Videos (Coming Soon)
              </span>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get personalized help from our expert support team
              </p>
              <a href="mailto:support@curensi.com" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}