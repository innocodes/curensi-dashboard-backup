import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';

interface PaymentData {
  plan: string;
}

interface PaymentResponse {
  success: boolean;
  authorization_url?: string;
  reference?: string;
  access_code?: string;
}

interface VerificationData {
  reference: string;
}

interface VerificationResponse {
  success: boolean;
  status?: string;
  plan?: string;
  endDate?: string;
}

interface SubscriptionData {
  plan: string;
  status: string;
  endDate: string | null;
}

export function usePaystack() {
  const initializePayment = async (plan: string): Promise<PaymentResponse> => {
    if (!functions) {
      throw new Error('Firebase functions not initialized');
    }

    try {
      const initializePaymentFunction = httpsCallable<PaymentData, PaymentResponse>(
        functions,
        'initializePayment'
      );

      const result = await initializePaymentFunction({ plan });
      return result.data;
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  };

  const verifyPayment = async (reference: string): Promise<VerificationResponse> => {
    if (!functions) {
      throw new Error('Firebase functions not initialized');
    }

    try {
      const verifyPaymentFunction = httpsCallable<VerificationData, VerificationResponse>(
        functions,
        'verifyPayment'
      );

      const result = await verifyPaymentFunction({ reference });
      return result.data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  };

  const getSubscription = async (): Promise<SubscriptionData> => {
    if (!functions) {
      throw new Error('Firebase functions not initialized');
    }

    try {
      const getSubscriptionFunction = httpsCallable<{}, SubscriptionData>(
        functions,
        'getSubscription'
      );

      const result = await getSubscriptionFunction();
      return result.data;
    } catch (error) {
      console.error('Get subscription error:', error);
      throw error;
    }
  };

  return {
    initializePayment,
    verifyPayment,
    getSubscription,
  };
}