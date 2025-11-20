import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Curensi</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Market-neutral yield generation through intelligent funding rate
              arbitrage.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              {/* <li>
                <Link href="/profile" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Account
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <span className="text-gray-500 text-sm">
                  Tutorials (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/policies"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Policies
                </Link>
              </li>
              {/* <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li> */}
              <li>
                <a
                  href="mailto:support@curensi.com"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Curensi. All rights reserved. Trading
              involves risk. Trade responsibly.
            </p>
            <div className="flex items-center gap-4">
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-sm">Discord</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-sm">Twitter</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
