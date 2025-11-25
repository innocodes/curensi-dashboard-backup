'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { paystackService } from '@/lib/paystack';
import Button from '@/components/ui/Button';
import { Check, X, Crown, Zap, BarChart3, Lock, Star, Calculator } from 'lucide-react';

interface PricingPlansProps {
  currentTier?: 'free' | 'pro' | 'premium';
  onSubscribe?: (plan: string) => void;
}

export default function PricingPlans({ currentTier = 'free', onSubscribe }: PricingPlansProps) {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started with crypto arbitrage',
      icon: Lock,
      badge: 'Great for Beginners',
      targetAudience: 'Ideal for learning and monitoring',
      features: [
        { name: 'Top 5 coins only (BTC, ETH, SOL, XRP, DOGE)', included: true },
        { name: 'Delayed data updates (1 hour delay)', included: true },
        { name: 'Manual refresh button (rate limited)', included: true },
        { name: 'Basic opportunity view', included: true },
        { name: 'Email support', included: true },
        { name: 'See live rates (but delayed)', included: true },
        { name: 'Real-time data updates', included: false },
        { name: 'Email notifications', included: false },
        { name: 'Historical data tracking', included: false },
        { name: 'Advanced profit calculator', included: false },
        { name: 'Unlimited coin access', included: false },
        { name: 'Liquidity filtering', included: false },
      ],
      cta: currentTier === 'free' ? 'Current Plan' : 'Get Started',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      yearlyPrice: '$99',
      priceUnit: 'month',
      description: 'The no-brainer choice for serious retail traders',
      icon: Zap,
      badge: 'Most Popular',
      targetAudience: 'Perfect for $1k-$10k portfolios',
      savings: 'Save $20/year',
      features: [
        { name: 'Unlimited coins (200+ perp pairs)', included: true },
        { name: 'Real-time data updates (1-5 minutes)', included: true },
        { name: 'Email alerts for high-APR opportunities', included: true },
        { name: 'Liquidity filters (<$1M volume filter)', included: true },
        { name: 'Advanced profit calculator', included: true },
        { name: 'Historical rate tracking (7 days)', included: true },
        { name: 'All features from Free tier', included: true },
        { name: 'Instant SMS/Telegram alerts', included: false },
        { name: '30-day historical charts', included: false },
        { name: 'Z-score anomaly detection', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
      ],
      cta: currentTier === 'pro' ? 'Current Plan' : 'Start Pro Trial',
      popular: true
    },
    {
      id: 'premium',
      name: 'Whale',
      price: '$29.99',
      yearlyPrice: '$290',
      priceUnit: 'month',
      description: 'Professional tools for traders who mean business',
      icon: Crown,
      badge: 'For Professionals',
      targetAudience: 'Perfect for >$10k portfolios',
      savings: 'Save $70/year',
      features: [
        { name: 'Everything in Pro tier', included: true },
        { name: 'Instant alerts (SMS/Telegram/Discord)', included: true },
        { name: '30-day historical charts & analysis', included: true },
        { name: 'Z-score anomaly detection (3-sigma)', included: true },
        { name: 'Advanced spread/basis monitoring', included: true },
        { name: 'Read-only API access', included: true },
        { name: 'Priority support (1-hour response)', included: true },
        { name: 'Custom alert configurations', included: true },
        { name: 'Unlimited historical data', included: true },
        { name: 'Advanced analytics dashboard', included: true },
        { name: 'Early access to new features', included: true },
      ],
      cta: currentTier === 'premium' ? 'Current Plan' : 'Start Whale Trial',
      popular: false
    }
  ];

  const handleSubscribe = async (planId: string, interval: 'monthly' | 'yearly' = 'monthly') => {
    if (!user) {
      onSubscribe?.(planId);
      return;
    }

    if (currentTier === planId) {
      return;
    }

    setLoading(planId);

    try {
      const planKey = `${planId}_${interval}`;
      const planData = paystackService.getSubscriptionPlans()[planKey as keyof ReturnType<typeof paystackService.getSubscriptionPlans>];

      if (!planData) {
        throw new Error('Plan not found');
      }

      // Initialize Paystack transaction
      const reference = paystackService.generateReference('SUB');
      const callbackUrl = `${window.location.origin}/billing/success?reference=${reference}`;

      const response = await paystackService.initializeTransaction({
        amount: planData.amount,
        email: user.email || '',
        reference,
        callback_url: callbackUrl,
        metadata: {
          userId: user.uid,
          planId,
          interval,
          tier: planData.tier,
          subscriptionType: 'subscription'
        },
        plan: planData.tier // Pass plan code for recurring payments
      });

      if (response.status && response.data.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error('Failed to initialize payment');
      }

    } catch (error: any) {
      console.error('Subscription error:', error);
      alert(error.message || 'Failed to process subscription. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm font-medium ${billingInterval === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              billingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${billingInterval === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
          Yearly
        </span>
        {billingInterval === 'yearly' && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            Save 20%
          </span>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentTier === plan.id;
          const displayPrice = billingInterval === 'yearly' && plan.yearlyPrice ? plan.yearlyPrice : plan.price;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 ${
                plan.popular ? 'border-primary-500 shadow-lg' : 'border-gray-200'
              } ${isCurrentPlan ? 'ring-2 ring-primary-200' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${
                    plan.id === 'free' ? 'bg-gray-100' :
                    plan.id === 'pro' ? 'bg-primary-100' : 'bg-purple-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      plan.id === 'free' ? 'text-gray-600' :
                      plan.id === 'pro' ? 'text-primary-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{plan.targetAudience}</p>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{displayPrice}</span>
                    {plan.priceUnit && billingInterval === 'monthly' && (
                      <span className="text-gray-600">/{plan.priceUnit}</span>
                    )}
                    {billingInterval === 'yearly' && (
                      <span className="text-gray-600">/year</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                  {plan.savings && billingInterval === 'yearly' && (
                    <p className="text-green-600 text-sm font-medium mt-2">{plan.savings}</p>
                  )}
                </div>

                {/* ROI Example for paid plans */}
                {plan.id !== 'free' && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-primary-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {plan.id === 'pro' ? '$1K' : '$50K'} Portfolio Example
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Potential APR (20%):</span>
                        <span className="font-medium text-green-600">
                          {plan.id === 'pro' ? '+$200/yr' : '+$10K/yr'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plan Cost:</span>
                        <span className="font-medium text-red-600">
                          {billingInterval === 'yearly'
                            ? (plan.id === 'pro' ? '-$99/yr' : '-$290/yr')
                            : (plan.id === 'pro' ? '-$120/yr' : '-$360/yr')
                          }
                        </span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Net Profit:</span>
                        <span className="text-green-600">
                          {billingInterval === 'yearly'
                            ? (plan.id === 'pro' ? '$101' : '$9,710')
                            : (plan.id === 'pro' ? '$80' : '$9,640')
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feature.included
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        {feature.included ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <X className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.id, billingInterval)}
                  disabled={isCurrentPlan || loading === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } ${loading === plan.id ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {loading === plan.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      {!isCurrentPlan && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </>
                  )}
                </button>

                {/* Current plan badge */}
                {isCurrentPlan && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Star className="w-3 h-3 mr-1" />
                      Your Current Plan
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}