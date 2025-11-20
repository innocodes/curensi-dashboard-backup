import axios from 'axios';
import { SubscriptionPlan } from './types';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export interface PaystackCustomer {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  metadata?: Record<string, any>;
}

export interface PaystackPlan {
  name: string;
  amount: number; // in kobo (10000 = ₦100)
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
  description?: string;
  currency?: string;
}

export interface PaystackSubscription {
  customer: string; // customer code or email
  plan: string; // plan code
  start_date?: string;
  authorization?: string; // authorization code for charging customer
}

export interface PaystackResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaystackTransaction {
  reference: string;
  amount: number;
  currency: string;
  status: string;
  paid_at?: string;
  metadata?: Record<string, any>;
}

class PaystackService {
  private headers = {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  };

  async createCustomer(customerData: PaystackCustomer): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/customer`,
        customerData,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create customer');
    }
  }

  async createPlan(planData: PaystackPlan): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/plan`,
        planData,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create plan');
    }
  }

  async createSubscription(subscriptionData: PaystackSubscription): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/subscription`,
        subscriptionData,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create subscription');
    }
  }

  async initializeTransaction(params: {
    amount: number;
    email: string;
    reference?: string;
    callback_url?: string;
    metadata?: Record<string, any>;
    plan?: string; // for subscription
    channels?: string[];
    split_code?: string;
    subaccount?: string;
    transaction_charge?: number;
    bearer?: string;
  }): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        params,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to initialize transaction');
    }
  }

  async verifyTransaction(reference: string): Promise<PaystackResponse<PaystackTransaction>> {
    try {
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to verify transaction');
    }
  }

  async getSubscription(subscriptionId: string): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/subscription/${subscriptionId}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get subscription');
    }
  }

  async disableSubscription(subscriptionId: string, code: string): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/subscription/disable`,
        { code, token: subscriptionId },
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to disable subscription');
    }
  }

  async enableSubscription(subscriptionId: string, code: string): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/subscription/enable`,
        { code, token: subscriptionId },
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to enable subscription');
    }
  }

  generateEmailSubscriptionLink(subscriptionId: string): string {
    return `https://paystack.co/pay/${subscriptionId}`;
  }

  // Convert naira to kobo for Paystack
  convertToKobo(amount: number): number {
    return Math.round(amount * 100);
  }

  // Generate unique reference
  generateReference(prefix: string = 'TRX'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${random}`;
  }

  // Plan definitions
  getSubscriptionPlans(): { [key: string]: Omit<PaystackPlan, 'name'> & { name: string, tier: string } } {
    return {
      pro_monthly: {
        name: 'Pro Monthly',
        amount: this.convertToKobo(2900), // $29 converted to local currency
        interval: 'monthly',
        description: 'Access to unlimited funding opportunities and Z-score analysis',
        tier: 'pro'
      },
      pro_yearly: {
        name: 'Pro Yearly',
        amount: this.convertToKobo(29000), // $290 (2 months free)
        interval: 'yearly',
        description: 'Annual access to Pro features with 2 months free',
        tier: 'pro'
      },
      premium_monthly: {
        name: 'Premium Monthly',
        amount: this.convertToKobo(7900), // $79 converted to local currency
        interval: 'monthly',
        description: 'Advanced analytics, API access, and priority support',
        tier: 'premium'
      },
      premium_yearly: {
        name: 'Premium Yearly',
        amount: this.convertToKobo(79000), // $790 (2 months free)
        interval: 'yearly',
        description: 'Annual access to Premium features with 2 months free',
        tier: 'premium'
      }
    };
  }

  async createSubscriptionPlans(): Promise<void> {
    const plans = this.getSubscriptionPlans();

    for (const [key, plan] of Object.entries(plans)) {
      try {
        // Check if plan already exists
        const existingPlans = await this.getPlans();
        const existing = existingPlans.data.find((p: any) => p.name === plan.name);

        if (!existing) {
          await this.createPlan({
            name: plan.name,
            amount: plan.amount,
            interval: plan.interval,
            description: plan.description,
            currency: 'NGN' // or your preferred currency
          });
          console.log(`Created plan: ${plan.name}`);
        }
      } catch (error) {
        console.error(`Failed to create plan ${plan.name}:`, error);
      }
    }
  }

  async getPlans(): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/plan`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get plans');
    }
  }

  async getCustomers(): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/customer`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get customers');
    }
  }
}

export const paystackService = new PaystackService();

export default paystackService;