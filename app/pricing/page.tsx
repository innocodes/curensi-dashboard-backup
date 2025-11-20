'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { usePaystack } from '@/hooks/usePaystack';
import Footer from '@/components/layout/Footer';
import {
  Check,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Brain,
  Users,
  ArrowLeft,
} from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    priceUnit: null,
    description: 'Essential funding rate data and analysis',
    features: [
      'Funding rate data from OKX & KuCoin Futures',
      'Basic arbitrage opportunity analysis',
      'Data refresh every 5 minutes',
      'Top 10 opportunities view',
      'Email support',
    ],
    limitations: [
      'Unlimited opportunities',
      'Real-time data updates',
      'Z-score statistical analysis',
      'Historical rate tracking',
      'Advanced arbitrage analytics',
      'API access (Coming Soon)',
      'Opportunity notifications',
      'Custom alerts (Coming Soon)',
      'Data export (Coming Soon)',
    ],
    cta: 'Get Started',
    popular: false,
    planId: 'free',
  },
  {
    name: 'Pro',
    price: '$29',
    priceUnit: 'month',
    description: 'Advanced arbitrage analysis & detection',
    features: [
      'Funding rate data from OKX & KuCoin Futures',
      'Advanced arbitrage opportunity analysis',
      'Data refresh every minute',
      'Unlimited opportunities view',
      'Z-score statistical analysis',
      'Statistical arbitrage detection',
      'Real-time opportunity scoring',
      'Email support',
      'Limited historical rate tracking',
      'Priority email support',
    ],
    limitations: [
      'API access (Coming Soon)',
      'Opportunity notifications (Coming Soon)',
      'Custom alerts (Coming Soon)',
      'Data export (Coming Soon)',
    ],
    cta: 'Start Free Trial',
    popular: true,
    planId: 'pro',
  },
  {
    name: 'Premium',
    price: '$79',
    priceUnit: 'month',
    description: 'Complete arbitrage analysis platform access',
    features: [
      'Everything in Pro',
      'Funding rate data from OKX & KuCoin Futures',
      'Real-time data updates',
      'Unlimited opportunities view',
      'Advanced Z-score statistical analysis',
      'Statistical arbitrage detection',
      'Advanced arbitrage analytics',
      'Extended historical rate tracking',
      'Priority email support',
      'Early access to new features',
    ],
    limitations: [
      'API access (Coming Soon)',
      'Opportunity notifications (Coming Soon)',
      'Custom alerts (Coming Soon)',
      'Data export (Coming Soon)',
    ],
    cta: 'Start Free Trial',
    popular: false,
    planId: 'premium',
  },
];

const features = [
  {
    name: 'Real-time Rates',
    description: 'Live funding rates from OKX and KuCoin Futures updated every minute',
    icon: Zap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Market Neutral',
    description: 'Cash and carry strategies that profit regardless of market direction',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Smart Analysis',
    description: 'AI-powered Z-score analysis identifies statistically significant opportunities',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Historical Data',
    description: 'Track funding rate trends over time to identify patterns and optimal entry points',
    icon: BarChart3,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

export default function PricingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { initializePayment } = usePaystack();

  // Redirect to dashboard if already on a paid plan
  useEffect(() => {
    if (!loading && user) {
      // You could check user's subscription status here
      // For now, allow access to pricing page
    }
  }, [user, loading]);

  const handlePlanSelect = async (planId: string) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (planId === 'free') {
      router.push('/dashboard');
      return;
    }

    setSelectedPlan(planId);
    setIsLoading(true);

    try {
      // Initialize Paystack payment using Firebase Functions
      const result = await initializePayment(planId);

      if (result.success && result.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = result.authorization_url;
      } else {
        console.error('Payment initialization failed:', result);
        alert('Unable to initialize payment. Please try again.');
      }
    } catch (error) {
      console.error('Error selecting plan:', error);
      alert('Unable to process your request. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-xl font-bold text-gray-900">
                Curensi
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Trading Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Start free and upgrade as you grow. Access real-time funding rate
            arbitrage opportunities across major crypto exchanges.
          </p>

          {/* Status indicators */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live rates from OKX & KuCoin Futures
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Updated every minute
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              AI-powered analysis
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border-2 ${
                plan.popular
                  ? 'border-primary-500 shadow-lg scale-105'
                  : 'border-gray-200'
              } p-8 relative transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.priceUnit && (
                    <span className="text-gray-600">/{plan.priceUnit}</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}

                {plan.limitations.map((limitation, limitIndex) => (
                  <div
                    key={limitIndex}
                    className="flex items-center gap-3 opacity-60"
                  >
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {limitation}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePlanSelect(plan.planId)}
                disabled={isLoading && selectedPlan === plan.planId}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50'
                }`}
              >
                {isLoading && selectedPlan === plan.planId ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Curensi?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div
                    className={`p-3 rounded-lg ${feature.bgColor} flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                What is funding rate arbitrage?
              </h3>
              <p className="text-sm text-gray-600">
                A market-neutral strategy where you buy spot and short perpetual futures
                to profit from funding rate payments, regardless of price direction.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                How often are rates updated?
              </h3>
              <p className="text-sm text-gray-600">
                Free users get updates every 5 minutes. Pro and Premium users receive
                real-time updates every minute.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-sm text-gray-600">
                Yes, you can cancel your subscription at any time. Your access will
                continue until the end of your billing period.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                What exchanges do you support?
              </h3>
              <p className="text-sm text-gray-600">
                We currently support OKX and KuCoin Futures with more exchanges
                coming soon for Premium users.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Arbitrage Journey?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of traders earning market-neutral yields
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}