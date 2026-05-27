'use client';

import { useState } from 'react';

interface InfoBannerProps {
  onClose?: () => void;
}

export function InfoBanner({ onClose }: InfoBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const disclaimers = [
    'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
    'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
    'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
    'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
    'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
  ];

  return (
    <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <svg
            className="w-5 h-5 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left hover:opacity-80 transition"
          >
            <h3 className="text-sm font-semibold text-blue-300">
              Important Notes &amp; Disclaimers
            </h3>
            <svg
              className={`w-5 h-5 text-blue-400 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {isExpanded && (
            <ul className="mt-3 space-y-2 text-sm text-blue-100">
              {disclaimers.map((disclaimer, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  <span>{disclaimer}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
