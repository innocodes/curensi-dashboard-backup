"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { usePaystack } from "@/hooks/usePaystack";
import Footer from "@/components/layout/Footer";
import {
  Check,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Brain,
  Bell,
  Calculator,
  AlertTriangle,
  Crown,
  Star,
  ArrowLeft,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    priceUnit: null,
    description: "Perfect for getting started with crypto arbitrage",
    features: [
      "Top 5 coins only (BTC, ETH, SOL, XRP, DOGE)",
      "Delayed data updates (1 hour delay)",
      "Manual refresh button (rate limited)",
      "Basic opportunity view",
      "Email support",
      "See live rates (but delayed)",
    ],
    limitations: [
      "No real-time alerts",
      "No email notifications",
      "No historical data",
      "No advanced filters",
      "No profit calculator",
      "No unlimited coin access",
    ],
    cta: "Get Started",
    popular: false,
    planId: "free",
    badge: "Great for Beginners",
    targetAudience: "Perfect for learning about arbitrage",
  },
  {
    name: "Pro",
    price: "$9.99",
    yearlyPrice: "$99",
    priceUnit: "month",
    description: "The no-brainer choice for serious retail traders",
    features: [
      "Unlimited coins (200+ perp pairs)",
      "Real-time data updates (1-5 minutes)",
      "Email alerts for high-APR opportunities",
      "Liquidity filters (<$1M volume filter)",
      "Advanced profit calculator",
      "Historical rate tracking (7 days)",
      "All features from Free tier",
    ],
    limitations: [
      "No instant SMS/Telegram alerts",
      "No 30-day historical charts",
      "No Z-score anomaly detection",
      "No API access",
    ],
    cta: "Start Pro Trial",
    popular: true,
    planId: "pro",
    badge: "Most Popular",
    targetAudience: "Ideal for $1k-$10k portfolios",
    savings: "Save $20 with yearly billing",
  },
  {
    name: "Whale",
    price: "$29.99",
    yearlyPrice: "$290",
    priceUnit: "month",
    description: "Professional tools for traders who mean business",
    features: [
      "Everything in Pro tier",
      "Instant alerts (SMS/Telegram/Discord)",
      "30-day historical charts & analysis",
      "Z-score anomaly detection (3-sigma)",
      "Advanced spread/basis monitoring",
      "Read-only API access",
      "Priority support with 1-hour response",
      "Custom alert configurations",
    ],
    limitations: [],
    cta: "Start Whale Trial",
    popular: false,
    planId: "whale",
    badge: "For Professionals",
    targetAudience: "Perfect for >$10k portfolios",
    savings: "Save $70 with yearly billing",
  },
];

const roiExamples = [
  {
    portfolio: "$1,000",
    apr: "20%",
    annualProfit: "$200",
    planCost: "$120",
    netProfit: "$80",
    tier: "Pro",
  },
  {
    portfolio: "$50,000",
    apr: "20%",
    annualProfit: "$10,000",
    planCost: "$360",
    netProfit: "$9,640",
    tier: "Whale",
  },
];

const features = [
  {
    name: "Real-time Data Pipeline",
    description:
      "Our advanced architecture fetches data every 15 minutes via proxy infrastructure",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Smart Liquidity Filtering",
    description:
      "Automatically filter out low-liquidity coins to prevent slippage and ensure trade safety",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Profit Maximization",
    description:
      "Advanced calculators show net profit after fees and basis spreads",
    icon: Calculator,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    name: "Email Notifications",
    description:
      "Get notified instantly when high-APR opportunities match your criteria",
    icon: Bell,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export default function PricingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<
    "monthly" | "yearly"
  >("monthly");
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
      router.push("/auth/login");
      return;
    }

    if (planId === "free") {
      router.push("/dashboard");
      return;
    }

    setSelectedPlan(planId);
    setIsLoading(true);

    try {
      // Map plan IDs to the expected values
      const planMapping: Record<string, string> = {
        pro: "pro",
        whale: "premium", // Map whale to premium for backend compatibility
      };

      const backendPlanId = planMapping[planId] || planId;

      // Initialize Paystack payment using Firebase Functions
      const result = await initializePayment(backendPlanId);

      if (result.success && result.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = result.authorization_url;
      } else {
        console.error("Payment initialization failed:", result);
        alert("Unable to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Error selecting plan:", error);
      alert("Unable to process your request. Please try again.");
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
          {/* <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
              Trusted by 1000+ traders
            </span>
          </div> */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Arbitrage Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From curious beginners to professional traders. Start free and
            upgrade as your portfolio grows.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${
                selectedInterval === "monthly"
                  ? "text-gray-900 font-medium"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setSelectedInterval(
                  selectedInterval === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  selectedInterval === "yearly"
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${
                selectedInterval === "yearly"
                  ? "text-gray-900 font-medium"
                  : "text-gray-500"
              }`}
            >
              Yearly
            </span>
            {selectedInterval === "yearly" && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>

          {/* Status indicators */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Real-time data from 7+ exchanges
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Protected by residential proxy
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              AI-powered opportunity detection
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const displayPrice =
              selectedInterval === "yearly" && plan.yearlyPrice
                ? plan.yearlyPrice
                : plan.price;
            const displayUnit =
              selectedInterval === "yearly" ? "year" : plan.priceUnit;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border-2 ${
                  plan.popular
                    ? "border-primary-500 shadow-lg scale-105"
                    : "border-gray-200"
                } p-8 relative transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.targetAudience}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {displayPrice}
                    </span>
                    {displayUnit && (
                      <span className="text-gray-600">/{displayUnit}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                  {plan.savings && selectedInterval === "yearly" && (
                    <p className="text-green-600 text-sm font-medium mt-2">
                      {plan.savings}
                    </p>
                  )}
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
                      <span className="text-sm text-gray-500 line-through">
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
                      ? "bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50"
                      : plan.planId === "free"
                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50"
                      : "bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
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
                      {plan.planId !== "free" && (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* ROI Calculator Section */}
        <div className="bg-white rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Math Makes Sense
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roiExamples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {example.portfolio} Portfolio
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      example.tier === "Pro"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {example.tier} Plan
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Potential Annual Return ({example.apr}):
                    </span>
                    <span className="font-medium text-green-600">
                      +{example.annualProfit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan Cost:</span>
                    <span className="font-medium text-red-600">
                      -{example.planCost}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">
                        Net Profit:
                      </span>
                      <span className="font-bold text-green-600">
                        {example.netProfit}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      ROI: {example.portfolio === "$1,000" ? "8%" : "19.3%"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Traders Choose Curensi
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
                What's the difference between plans?
              </h3>
              <p className="text-sm text-gray-600">
                Free users see delayed data for 5 coins. Pro gets real-time data
                for all coins with email alerts. Whale adds instant
                notifications and advanced analytics for professional traders.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                How often are rates updated?
              </h3>
              <p className="text-sm text-gray-600">
                Free users get 1-hour delayed updates. Pro users get real-time
                updates every 1-5 minutes. Whale users get instant notifications
                within seconds.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-sm text-gray-600">
                Yes, you can cancel anytime. Your access continues until the end
                of your billing period. No questions asked.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Which exchanges do you support?
              </h3>
              <p className="text-sm text-gray-600">
                We support OKX, KuCoin, Binance, Bybit, Bitget, Gate.io, and
                Deribit. All exchanges accessible through our proxy
                infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Arbitrage Journey Today
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
