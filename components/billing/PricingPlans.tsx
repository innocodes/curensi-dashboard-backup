'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { paystackService } from '@/lib/paystack';
import Button from '@/components/ui/Button';
import { Check, X, Crown, Zap, BarChart3, Lock } from 'lucide-react';

interface PricingPlansProps {
  currentTier?: 'free' | 'pro' | 'premium';
  onSubscribe?: (plan: string) => void;
}

export default function PricingPlans({ currentTier = 'free', onSubscribe }: PricingPlansProps) {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: 'Essential funding rate data and analysis',
      icon: Lock,
      features: [
        { name: 'Funding rate data from OKX & KuCoin Futures', included: true },
        { name: 'Basic arbitrage opportunity analysis', included: true },
        { name: 'Data refresh every 5 minutes', included: true },
        { name: 'Top 10 opportunities view', included: true },
        { name: 'Email support', included: true },
        { name: 'Unlimited opportunities', included: false },
        { name: 'Real-time data updates', included: false },
        { name: 'Z-score statistical analysis', included: false },
        { name: 'Historical rate tracking', included: false },
        { name: 'Advanced arbitrage analytics', included: false },
        { name: 'API access (Coming Soon)', included: false },
        { name: 'Opportunity notifications', included: false },
        { name: 'Custom alerts (Coming Soon)', included: false },
        { name: 'Data export (Coming Soon)', included: false },
      ],
      cta: currentTier === 'free' ? 'Current Plan' : 'Downgrade',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$29',
      priceUnit: 'month',
      description: 'Advanced arbitrage analysis & detection',
      icon: Zap,
      features: [
        { name: 'Funding rate data from OKX & KuCoin Futures', included: true },
        { name: 'Advanced arbitrage opportunity analysis', included: true },
        { name: 'Data refresh every minute', included: true },
        { name: 'Unlimited opportunities view', included: true },
        { name: 'Z-score statistical analysis', included: true },
        { name: 'Statistical arbitrage detection', included: true },
        { name: 'Real-time opportunity scoring', included: true },
        { name: 'Email support', included: true },
        { name: 'Limited historical rate tracking', included: true },
        { name: 'Priority email support', included: true },
        { name: 'API access (Coming Soon)', included: false },
        { name: 'Opportunity notifications (Coming Soon)', included: false },
        { name: 'Custom alerts (Coming Soon)', included: false },
        { name: 'Data export (Coming Soon)', included: false },
      ],
      cta: currentTier === 'pro' ? 'Current Plan' : 'Start Free Trial',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$79',
      priceUnit: 'month',
      description: 'Complete arbitrage analysis platform access',
      icon: Crown,
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Funding rate data from OKX & KuCoin Futures', included: true },
        { name: 'Real-time data updates', included: true },
        { name: 'Unlimited opportunities view', included: true },
        { name: 'Advanced Z-score statistical analysis', included: true },
        { name: 'Statistical arbitrage detection', included: true },
        { name: 'Advanced arbitrage analytics', included: true },
        { name: 'Extended historical rate tracking', included: true },
        { name: 'Priority email support', included: true },
        { name: 'API access (Coming Soon)', included: false },
        { name: 'Opportunity notifications (Coming Soon)', included: false },
        { name: 'Custom alerts (Coming Soon)', included: false },
        { name: 'Data export (Coming Soon)', included: false },
        { name: 'Early access to new features', included: true },
      ],
      cta: currentTier === 'premium' ? 'Current Plan' : 'Start Free Trial',
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => {
        const Icon = plan.icon;
        const isCurrentPlan = currentTier === plan.id;

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
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
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
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.priceUnit && (
                    <span className="text-gray-600">/{plan.priceUnit}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

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
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {feature.name}
                    </span>
                    {feature.included && (
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    )}
                    {!feature.included && (
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan.id)}
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

              {/* Yearly option for paid plans */}
              {plan.id !== 'free' && !isCurrentPlan && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => handleSubscribe(plan.id, 'yearly')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Save 20% with yearly billing →
                  </button>
                </div>
              )}

              {/* Current plan badge */}
              {isCurrentPlan && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Your Current Plan
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}