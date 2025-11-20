import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from 'date-fns';
import { ZScoreOpportunity, FundingRate } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatTimestamp(date: Date): string {
  return format(date, 'MMM dd, HH:mm');
}

export function calculateAPR(fundingRate: number): number {
  // Funding rates are typically for 8 hours (3x per day)
  const dailyRate = fundingRate * 3;
  const apr = dailyRate * 365 * 100;
  return apr;
}

export function calculateZScore(
  currentRate: number,
  historicalRates: number[]
): number {
  if (historicalRates.length < 2) return 0;

  const mean = historicalRates.reduce((sum, rate) => sum + rate, 0) / historicalRates.length;
  const variance = historicalRates.reduce((sum, rate) => sum + Math.pow(rate - mean, 2), 0) / historicalRates.length;
  const standardDeviation = Math.sqrt(variance);

  if (standardDeviation === 0) return 0;

  return (currentRate - mean) / standardDeviation;
}

export function identifyOpportunities(
  currentRates: FundingRate[],
  historicalRates: Record<string, number[]>,
  zScoreThreshold = 2
): ZScoreOpportunity[] {
  const opportunities: ZScoreOpportunity[] = [];

  currentRates.forEach((rate) => {
    const key = `${rate.symbol}_${rate.exchange}`;
    const historical = historicalRates[key] || [];

    if (historical.length >= 10) { // Need sufficient historical data
      const zScore = calculateZScore(rate.fundingRate, historical);

      if (Math.abs(zScore) >= zScoreThreshold) {
        opportunities.push({
          symbol: rate.symbol,
          exchange: rate.exchange,
          currentRate: rate.fundingRate,
          zScore,
          isSignificant: Math.abs(zScore) >= 3,
          confidence: Math.min(Math.abs(zScore) / 3, 1),
        });
      }
    }
  });

  return opportunities.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore));
}

export function getAPRColor(apr: number): string {
  if (apr > 50) return 'text-green-600';
  if (apr > 20) return 'text-green-500';
  if (apr > 10) return 'text-green-400';
  if (apr > 0) return 'text-primary-500';
  if (apr > -10) return 'text-red-400';
  if (apr > -20) return 'text-red-500';
  return 'text-red-600';
}

export function getZScoreColor(zScore: number): string {
  const absScore = Math.abs(zScore);
  if (absScore >= 3) return 'text-purple-600';
  if (absScore >= 2.5) return 'text-purple-500';
  if (absScore >= 2) return 'text-purple-400';
  return 'text-gray-500';
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}