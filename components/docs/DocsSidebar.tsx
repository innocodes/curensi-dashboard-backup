'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BookOpen,
  BarChart3,
  TrendingUp,
  Shield,
  Users,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';

const sidebarSections = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      {
        title: "Documentation Home",
        href: "/docs",
        description: "Overview and quick start"
      },
      {
        title: "Getting Started Guide",
        href: "/docs/getting-started",
        description: "Complete onboarding process"
      },
      {
        title: "Funding Rate Arbitrage",
        href: "/docs/funding-rate-arbitrage",
        description: "Understanding the fundamentals"
      }
    ]
  },
  {
    title: "Platform Features",
    icon: BarChart3,
    items: [
      {
        title: "Dashboard Overview",
        href: "/docs/dashboard-overview",
        description: "Navigate the dashboard"
      },
      {
        title: "Live Funding Rates",
        href: "/docs/funding-rate",
        description: "Real-time rate data"
      }
    ]
  },
  {
    title: "Trading Strategies",
    icon: TrendingUp,
    items: [
      {
        title: "Basic Strategy",
        href: "/docs/basic-strategy",
        description: "Step-by-step arbitrage"
      },
      {
        title: "Risk Management",
        href: "/docs/risk-management",
        description: "Essential safety practices"
      },
      {
        title: "Multi-Exchange",
        href: "/docs/multi-exchange",
        description: "Advanced strategies"
      },
      {
        title: "Optimization",
        href: "/docs/optimization",
        description: "Maximize returns"
      }
    ]
  }
];

interface DocsSidebarProps {
  title?: string;
}

export default function DocsSidebar({ title }: DocsSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky lg:top-16 inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 h-screen lg:h-[calc(100vh-4rem)] overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:mt-0 mt-16
      `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <Link
          href="/docs"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Documentation</span>
        </Link>
      </div>

      {/* Current Page Title */}
      {title && (
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
          <h2 className="text-sm font-semibold text-blue-900 truncate">{title}</h2>
        </div>
      )}

      {/* Navigation */}
      <div className="p-4 space-y-6">
        {sidebarSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-gray-500" />
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className={`block p-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs mt-0.5 text-gray-500">{item.description}</div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500 text-center">
          <p>Need help? Contact support@curensi.com</p>
        </div>
      </div>
    </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}