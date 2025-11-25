"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePaystackPlans = exports.handlePaystackWebhook = void 0;
const v2_1 = require("firebase-functions/v2");
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const axios_1 = __importDefault(require("axios"));
const db = admin.firestore();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';
exports.handlePaystackWebhook = v2_1.https.onRequest(async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
    }
    // Verify webhook signature
    const hash = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
    if (!hash || !secret) {
        console.error('Missing webhook signature or secret');
        res.status(400).send('Missing signature or secret');
        return;
    }
    // Verify the webhook is from Paystack
    const crypto = require('crypto');
    const calculatedHash = crypto.createHmac('sha512', secret)
        .update(JSON.stringify(req.body))
        .digest('hex');
    if (hash !== calculatedHash) {
        console.error('Invalid webhook signature');
        res.status(401).send('Invalid signature');
        return;
    }
    try {
        const event = req.body;
        console.log('Paystack webhook event:', event.event);
        switch (event.event) {
            case 'charge.success':
                await handleChargeSuccess(event.data);
                break;
            case 'subscription.create':
                await handleSubscriptionCreate(event.data);
                break;
            case 'subscription.disable':
                await handleSubscriptionDisable(event.data);
                break;
            case 'invoice.create':
                await handleInvoiceCreate(event.data);
                break;
            case 'invoice.payment_failed':
                await handleInvoicePaymentFailed(event.data);
                break;
            case 'invoice.payment_succeeded':
                await handleInvoicePaymentSucceeded(event.data);
                break;
            default:
                console.log(`Unhandled event type: ${event.event}`);
        }
        res.status(200).send('Webhook processed successfully');
    }
    catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Internal server error');
    }
});
async function handleChargeSuccess(data) {
    var _a, _b;
    const { customer, metadata, reference, amount, paid_at } = data;
    if (!(metadata === null || metadata === void 0 ? void 0 : metadata.userId)) {
        console.error('No userId in charge metadata');
        return;
    }
    try {
        // Update user's subscription if this is a subscription payment
        if (metadata === null || metadata === void 0 ? void 0 : metadata.subscriptionType) {
            await db.collection('users').doc(metadata.userId).update({
                subscriptionTier: metadata.tier,
                subscriptionStatus: 'active',
                subscriptionEndsAt: admin.firestore.Timestamp.fromDate(new Date(paid_at)),
                paystackCustomerCode: customer.customer_code,
                paystackSubscriptionCode: (_a = data.subscription) === null || _a === void 0 ? void 0 : _a.subscription_code,
                updatedAt: admin.firestore.Timestamp.now()
            });
            // Create subscription record
            await db.collection('subscriptions').add({
                userId: metadata.userId,
                type: metadata.subscriptionType,
                tier: metadata.tier,
                amount: amount,
                currency: data.currency,
                reference: reference,
                paystackCustomerCode: customer.customer_code,
                paystackSubscriptionCode: (_b = data.subscription) === null || _b === void 0 ? void 0 : _b.subscription_code,
                status: 'active',
                createdAt: admin.firestore.Timestamp.fromDate(new Date(paid_at)),
                updatedAt: admin.firestore.Timestamp.now()
            });
            console.log(`Subscription activated for user ${metadata.userId}`);
        }
        // Record payment
        await db.collection('payments').add({
            userId: metadata.userId,
            amount: amount,
            currency: data.currency,
            reference: reference,
            status: 'success',
            paystackData: data,
            createdAt: admin.firestore.Timestamp.fromDate(new Date(paid_at))
        });
    }
    catch (error) {
        console.error('Error handling charge success:', error);
    }
}
async function handleSubscriptionCreate(data) {
    const { customer, subscription_code } = data;
    try {
        // Find user by customer code
        const usersSnapshot = await db.collection('users')
            .where('paystackCustomerCode', '==', customer.customer_code)
            .get();
        if (usersSnapshot.empty) {
            console.error('No user found with customer code:', customer.customer_code);
            return;
        }
        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id;
        // Update subscription info
        await db.collection('users').doc(userId).update({
            paystackSubscriptionCode: subscription_code,
            updatedAt: admin.firestore.Timestamp.now()
        });
        console.log(`Subscription created for user ${userId}`);
    }
    catch (error) {
        console.error('Error handling subscription create:', error);
    }
}
async function handleSubscriptionDisable(data) {
    const { subscription_code } = data;
    try {
        // Find user by subscription code
        const usersSnapshot = await db.collection('users')
            .where('paystackSubscriptionCode', '==', subscription_code)
            .get();
        if (usersSnapshot.empty) {
            console.error('No user found with subscription code:', subscription_code);
            return;
        }
        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id;
        // Update subscription status
        await db.collection('users').doc(userId).update({
            subscriptionStatus: 'cancelled',
            updatedAt: admin.firestore.Timestamp.now()
        });
        console.log(`Subscription disabled for user ${userId}`);
    }
    catch (error) {
        console.error('Error handling subscription disable:', error);
    }
}
async function handleInvoiceCreate(data) {
    console.log('Invoice created:', data.reference);
    // You can send email notifications here
}
async function handleInvoicePaymentFailed(data) {
    const { customer } = data;
    try {
        // Find user by customer code
        const usersSnapshot = await db.collection('users')
            .where('paystackCustomerCode', '==', customer.customer_code)
            .get();
        if (usersSnapshot.empty) {
            console.error('No user found with customer code:', customer.customer_code);
            return;
        }
        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id;
        // Update subscription status
        await db.collection('users').doc(userId).update({
            subscriptionStatus: 'expired',
            updatedAt: admin.firestore.Timestamp.now()
        });
        // Send notification about failed payment
        await db.collection('notifications').add({
            userId: userId,
            type: 'payment_failed',
            title: 'Payment Failed',
            message: 'Your subscription payment failed. Please update your payment method.',
            read: false,
            createdAt: admin.firestore.Timestamp.now()
        });
        console.log(`Payment failed notification sent to user ${userId}`);
    }
    catch (error) {
        console.error('Error handling payment failed:', error);
    }
}
async function handleInvoicePaymentSucceeded(data) {
    const { customer } = data;
    try {
        // Find user by customer code
        const usersSnapshot = await db.collection('users')
            .where('paystackCustomerCode', '==', customer.customer_code)
            .get();
        if (usersSnapshot.empty) {
            console.error('No user found with customer code:', customer.customer_code);
            return;
        }
        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id;
        // Update subscription status and extend end date
        await db.collection('users').doc(userId).update({
            subscriptionStatus: 'active',
            subscriptionEndsAt: admin.firestore.Timestamp.fromDate(new Date(data.paid_at)),
            updatedAt: admin.firestore.Timestamp.now()
        });
        console.log(`Recurring payment successful for user ${userId}`);
    }
    catch (error) {
        console.error('Error handling recurring payment success:', error);
    }
}
// Initialize Paystack plans
exports.initializePaystackPlans = v2_1.https.onCall(async (request) => {
    var _a, _b, _c;
    if (!((_a = request.auth) === null || _a === void 0 ? void 0 : _a.token.admin)) {
        throw new functions.https.HttpsError('permission-denied', 'Admin access required');
    }
    const plans = [
        {
            name: 'Pro Monthly',
            amount: 290000, // ₦2,900 in kobo
            interval: 'monthly',
            description: 'Access to unlimited funding opportunities and Z-score analysis',
            currency: 'NGN'
        },
        {
            name: 'Pro Yearly',
            amount: 2900000, // ₦29,000 in kobo (2 months free)
            interval: 'yearly',
            description: 'Annual access to Pro features with 2 months free',
            currency: 'NGN'
        },
        {
            name: 'Premium Monthly',
            amount: 790000, // ₦7,900 in kobo
            interval: 'monthly',
            description: 'Advanced analytics, API access, and priority support',
            currency: 'NGN'
        },
        {
            name: 'Premium Yearly',
            amount: 7900000, // ₦79,000 in kobo (2 months free)
            interval: 'yearly',
            description: 'Annual access to Premium features with 2 months free',
            currency: 'NGN'
        }
    ];
    const results = [];
    for (const plan of plans) {
        try {
            const response = await axios_1.default.post(`${PAYSTACK_BASE_URL}/plan`, plan, {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                }
            });
            results.push({
                plan: plan.name,
                success: true,
                data: response.data
            });
        }
        catch (error) {
            results.push({
                plan: plan.name,
                success: false,
                error: ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error.message
            });
        }
    }
    return { results };
});
//# sourceMappingURL=paystack.js.map