'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

interface DocsHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  ctaVariant?: 'primary' | 'secondary';
}

export default function DocsHeader({
  title,
  subtitle,
  icon: Icon,
  gradient,
  showCTA = false,
  ctaText = "View Pricing Plans",
  ctaLink = "/pricing",
  ctaVariant = 'primary'
}: DocsHeaderProps) {
  return (
    <div className={`${gradient} text-white relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {title}
            </h1>
            <p className="text-lg text-white/90 mt-2 max-w-3xl">
              {subtitle}
            </p>
          </div>
          {showCTA && (
            <div className="hidden lg:block">
              <Link href={ctaLink}>
                <Button variant={ctaVariant} size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-white/20">
                  {ctaText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile CTA */}
        {showCTA && (
          <div className="lg:hidden mt-6">
            <Link href={ctaLink}>
              <Button variant={ctaVariant} size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-white/20 w-full">
                {ctaText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}