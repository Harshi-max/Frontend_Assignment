'use client';

import { CalculatedGains } from '@/lib/types';

interface PreHarvestingCardProps {
  gains: CalculatedGains | null;
}

export function PreHarvestingCard({ gains }: PreHarvestingCardProps) {
  if (!gains) {
    return <div className="text-gray-400">Loading...</div>;
  }

  return (
    <div className="bg-slate-900 dark:bg-gray-100 rounded-lg p-6 text-white dark:text-gray-900">
      <h3 className="text-lg font-semibold mb-6">Pre Harvesting</h3>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Short-term */}
        <div>
          <h4 className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wide mb-4">
            Short-term
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300 dark:text-gray-700">Profits</span>
              <span className="text-sm font-semibold">₹ {gains.stcg.profits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300 dark:text-gray-700">Losses</span>
              <span className="text-sm font-semibold text-red-400 dark:text-red-600">
                - ₹ {gains.stcg.losses.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-700 dark:border-gray-300">
              <div className="flex justify-between">
                <span className="text-sm text-gray-300 dark:text-gray-700">Net Capital Gains</span>
                <span
                  className={`text-sm font-semibold ${
                    gains.netShortTerm >= 0 ? 'text-green-400 dark:text-green-600' : 'text-red-400 dark:text-red-600'
                  }`}
                >
                  ₹ {gains.netShortTerm.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Long-term */}
        <div>
          <h4 className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wide mb-4">
            Long-term
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300 dark:text-gray-700">Profits</span>
              <span className="text-sm font-semibold">₹ {gains.ltcg.profits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300 dark:text-gray-700">Losses</span>
              <span className="text-sm font-semibold text-red-400 dark:text-red-600">
                - ₹ {gains.ltcg.losses.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-700 dark:border-gray-300">
              <div className="flex justify-between">
                <span className="text-sm text-gray-300 dark:text-gray-700">Net Capital Gains</span>
                <span
                  className={`text-sm font-semibold ${
                    gains.netLongTerm >= 0 ? 'text-green-400 dark:text-green-600' : 'text-red-400 dark:text-red-600'
                  }`}
                >
                  ₹ {gains.netLongTerm.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Realised Capital Gains */}
      <div className="pt-4 border-t border-slate-700 dark:border-gray-300">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300 dark:text-gray-700">Realised Capital Gains:</span>
          <span
            className={`text-lg font-bold ${
              gains.realizedCapitalGains >= 0 ? 'text-white dark:text-gray-900' : 'text-red-400 dark:text-red-600'
            }`}
          >
            ₹{gains.realizedCapitalGains.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
