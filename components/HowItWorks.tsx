'use client';

import { useState } from 'react';

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-700 text-sm font-medium transition"
      >
        How it works?
      </button>

      {isVisible && (
        <div
          className="absolute left-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50 w-80"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  How Tax Loss Harvesting Works
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-xs">
              <p className="leading-relaxed font-medium">
                Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.
              </p>

              <ul className="space-y-2 ml-2">
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">•</span>
                  <span>Does not apply to derivatives or futures—handled separately.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">•</span>
                  <span>Prices from CoinGecko may differ from your exchange.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">•</span>
                  <span>Only realized losses count toward harvesting.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
