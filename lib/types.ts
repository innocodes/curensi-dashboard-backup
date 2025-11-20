export interface FundingRate {
  exchange: string;
  symbol: string;
  fundingRate: number;
  apr: number;
  timestamp: Date;
  markPrice?: number;
  nextFundingTime?: Date;
}

export interface HistoricalFundingRate extends FundingRate {
  id: string;
}

export interface ZScoreOpportunity {
  symbol: string;
  exchange: string;
  currentRate: number;
  zScore: number;
  isSignificant: boolean;
  confidence: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  subscriptionTier: 'free' | 'pro' | 'premium';
  subscriptionStatus: 'active' | 'cancelled' | 'expired' | 'trial';
  subscriptionEndsAt?: Date;
  notifications: {
    email: boolean;
    push: boolean;
    threshold: number; // APR threshold for notifications
  };
  preferences: {
    defaultSymbols: string[];
    preferredExchanges: string[];
    refreshInterval: number; // seconds
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: 'free' | 'pro' | 'premium';
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    symbols: number;
    exchanges: number;
    historicalDays: number;
    notifications: boolean;
    zScoreAnalysis: boolean;
    apiAccess: boolean;
  };
}

export interface Notification {
  id: string;
  userId: string;
  type: 'funding_rate_alert' | 'z_score_opportunity' | 'subscription_expiry';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ExchangeConfig {
  id: string;
  name: string;
  logo?: string;
  tradingFee: number;
  withdrawalFee?: Record<string, number>;
  hasFundingRates: boolean;
}