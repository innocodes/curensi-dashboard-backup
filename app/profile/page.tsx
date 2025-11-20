'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import {
  User,
  Settings,
  Bell,
  CreditCard,
  TrendingUp,
  ArrowLeft,
  Save,
  Crown,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default function ProfilePage() {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    defaultSymbols: [] as string[],
    preferredExchanges: [] as string[],
    emailNotifications: true,
    notificationThreshold: 20
  });

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Available options
  const availableSymbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'AVAX', 'DOT', 'LINK', 'MATIC', 'ADA'];
  const availableExchanges = ['OKX', 'KuCoin Futures', 'Binance', 'Bybit', 'OKX', 'Gate.io'];

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        defaultSymbols: userProfile.preferences?.defaultSymbols || ['BTC', 'ETH', 'SOL', 'XRP'],
        preferredExchanges: userProfile.preferences?.preferredExchanges || ['OKX', 'KuCoin Futures'],
        emailNotifications: userProfile.notifications?.email ?? true,
        notificationThreshold: userProfile.notifications?.threshold || 20
      });
    }
  }, [user, userProfile]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const functions = getFunctions();
      const updateProfile = httpsCallable(functions, 'updateUserPreferences');

      await updateProfile({
        preferences: {
          defaultSymbols: formData.defaultSymbols,
          preferredExchanges: formData.preferredExchanges
        },
        notifications: {
          email: formData.emailNotifications,
          threshold: formData.notificationThreshold
        }
      });

      showMessage('success', 'Profile updated successfully!');
      await refreshUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEmailUpdate = async () => {
    if (!formData.email || formData.email === user?.email) {
      showMessage('error', 'Please enter a different email address');
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      await updateEmail(auth, formData.email);
      showMessage('success', 'Email updated successfully!');
    } catch (error) {
      console.error('Error updating email:', error);
      showMessage('error', 'Failed to update email. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('User not authenticated');
      }

      // Reauthenticate user first
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordData.newPassword);

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showMessage('success', 'Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      showMessage('error', 'Failed to update password. Please check your current password and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionBadge = () => {
    if (!userProfile) return null;

    switch (userProfile.subscriptionTier) {
      case 'premium':
        return (
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Crown className="w-4 h-4" />
            Premium Plan
          </div>
        );
      case 'pro':
        return (
          <div className="flex items-center gap-2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Crown className="w-4 h-4" />
            Pro Plan
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            Free Plan
          </div>
        );
    }
  };

  const tabs = [
    { id: 'account', name: 'Account Info', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: CreditCard },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <Link href="/auth">
            <Button variant="primary">Sign In to View Profile</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your Curensi account and preferences</p>
        </div>

        {/* Subscription Badge */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Subscription Status</h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage your subscription and access premium features
              </p>
            </div>
            {getSubscriptionBadge()}
          </div>
          <div className="mt-4">
            <Link href="/billing">
              <Button variant="outline" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Manage Billing
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Account Info Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your display name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                        <Button
                          variant="outline"
                          onClick={handleEmailUpdate}
                          disabled={loading}
                          loading={loading}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Trading Preferences</h3>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Symbols
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSymbols.map(symbol => (
                        <button
                          key={symbol}
                          onClick={() => {
                            const updated = formData.defaultSymbols.includes(symbol)
                              ? formData.defaultSymbols.filter(s => s !== symbol)
                              : [...formData.defaultSymbols, symbol];
                            setFormData({...formData, defaultSymbols: updated});
                          }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            formData.defaultSymbols.includes(symbol)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {symbol}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Exchanges
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableExchanges.map(exchange => (
                        <button
                          key={exchange}
                          onClick={() => {
                            const updated = formData.preferredExchanges.includes(exchange)
                              ? formData.preferredExchanges.filter(e => e !== exchange)
                              : [...formData.preferredExchanges, exchange];
                            setFormData({...formData, preferredExchanges: updated});
                          }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            formData.preferredExchanges.includes(exchange)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {exchange}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive alerts about funding rate opportunities</p>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, emailNotifications: !formData.emailNotifications})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.emailNotifications ? 'bg-primary-500' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alert Threshold (% APR)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={formData.notificationThreshold}
                      onChange={(e) => setFormData({...formData, notificationThreshold: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Minimum APR to trigger notifications"
                    />
                    <p className="mt-1 text-sm text-gray-600">
                      Get notified when funding rates exceed this percentage
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveProfile}
                disabled={saving}
                loading={saving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            {/* Password Update Button */}
            {activeTab === 'security' && (
              <div className="mt-4 pt-6 border-t border-gray-200 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handlePasswordUpdate}
                  disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                  loading={loading}
                >
                  Update Password
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mt-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}