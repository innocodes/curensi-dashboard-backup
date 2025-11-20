'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import PricingPlans from '@/components/billing/PricingPlans';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { paystackService } from '@/lib/paystack';
import { useSearchParams } from 'next/navigation';
import { BillingHistory } from '@/lib/types';

function BillingPageContent() {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const functions = getFunctions();

  useEffect(() => {
    if (reference) {
      // Handle successful payment
      verifyPayment(reference);
    }

    if (user) {
      fetchBillingHistory();
    }
  }, [reference, user]);

  const verifyPayment = async (paymentReference: string) => {
    setLoading(true);
    try {
      const verification = await paystackService.verifyTransaction(paymentReference);

      if (verification.status && verification.data.status === 'success') {
        // Payment successful - refresh user profile
        await refreshUserProfile();

        // Show success message
        alert('Payment successful! Your subscription has been activated.');

        // Clear URL parameters
        window.history.replaceState({}, document.title, '/billing');
      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBillingHistory = async () => {
    try {
      // This would be a Firebase function to fetch user's billing history
      const getBillingHistory = httpsCallable(functions, 'getBillingHistory');
      const result = await getBillingHistory();

      const data = result.data as { success: boolean; history: BillingHistory[] };
      if (data.success) {
        setBillingHistory(data.history);
      }
    } catch (error) {
      console.error('Error fetching billing history:', error);
    }
  };

  const handleCancelSubscription = async () => {
    if (!userProfile?.paystackSubscriptionCode) return;

    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      return;
    }

    try {
      const cancelSubscription = httpsCallable(functions, 'cancelSubscription');
      const result = await cancelSubscription({
        subscriptionCode: userProfile.paystackSubscriptionCode
      });

      const cancelResult = result.data as { success: boolean };
      if (cancelResult.success) {
        await refreshUserProfile();
        alert('Subscription cancelled successfully.');
      } else {
        alert('Failed to cancel subscription. Please contact support.');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription. Please contact support.');
    }
  };

  const formatCurrency = (amount: number, currency: string = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
    }).format(amount / 100); // Convert from kobo
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-8">Please sign in to access billing information.</p>
            <a href="/auth" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Billing & Plans</h1>
          <p className="text-xl text-gray-600">
            Manage your subscription and billing information
          </p>
        </div>

        {/* Current Subscription Status */}
        {userProfile && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Current Subscription</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                userProfile.subscriptionTier === 'premium' ? 'bg-purple-100 text-purple-800' :
                userProfile.subscriptionTier === 'pro' ? 'bg-primary-100 text-primary-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {userProfile.subscriptionTier.charAt(0).toUpperCase() + userProfile.subscriptionTier.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-lg font-semibold text-gray-900">
                  {userProfile.subscriptionStatus.charAt(0).toUpperCase() + userProfile.subscriptionStatus.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Next Billing Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {userProfile.subscriptionEndsAt
                    ? formatDate(userProfile.subscriptionEndsAt.toString())
                    : 'N/A'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Actions</p>
                {userProfile.subscriptionTier !== 'free' && userProfile.subscriptionStatus === 'active' && (
                  <button
                    onClick={handleCancelSubscription}
                    className="text-danger-600 hover:text-danger-700 font-medium text-sm"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Plan</h2>
          <PricingPlans
            currentTier={userProfile?.subscriptionTier}
            onSubscribe={() => {}}
          />
        </div>

        {/* Billing History */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Billing History</h2>

          {billingHistory.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {billingHistory.map((payment: any, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(payment.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.description || 'Subscription Payment'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            payment.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.reference}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No billing history</h3>
              <p className="text-gray-500">Your billing history will appear here once you make your first payment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <BillingPageContent />
    </Suspense>
  );
}