'use client';

import { CalculatedGains } from '@/lib/types';

interface AfterHarvestingCardProps {
  gains: CalculatedGains | null;
  savings: number;
  showSavings: boolean;
}

export function AfterHarvestingCard({
  gains,
  savings,
  showSavings,
}: AfterHarvestingCardProps) {
  if (!gains) {
    return <div className="text-gray-400">Loading...</div>;
  }

  return (
    <div className="bg-blue-600 dark:bg-blue-100 rounded-lg p-6 text-white dark:text-gray-900">
      <h3 className="text-lg font-semibold mb-6">After Harvesting</h3>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Short-term */}
        <div>
          <h4 className="text-xs text-blue-100 dark:text-blue-900 uppercase tracking-wide mb-4">
            Short-term
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-blue-100 dark:text-blue-900">Profits</span>
              <span className="text-sm font-semibold">
                ₹ {gains.stcg.profits.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-100 dark:text-blue-900">Losses</span>
              <span className="text-sm font-semibold">
                - ₹ {gains.stcg.losses.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-blue-500 dark:border-blue-300">
              <div className="flex justify-between">
                <span className="text-sm text-blue-100 dark:text-blue-900">Net Capital Gains</span>
                <span className="text-sm font-semibold">
                  ₹ {gains.netShortTerm.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Long-term */}
        <div>
          <h4 className="text-xs text-blue-100 dark:text-blue-900 uppercase tracking-wide mb-4">
            Long-term
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-blue-100 dark:text-blue-900">Profits</span>
              <span className="text-sm font-semibold">
                ₹ {gains.ltcg.profits.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-100 dark:text-blue-900">Losses</span>
              <span className="text-sm font-semibold">
                - ₹ {gains.ltcg.losses.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-blue-500 dark:border-blue-300">
              <div className="flex justify-between">
                <span className="text-sm text-blue-100 dark:text-blue-900">Net Capital Gains</span>
                <span className="text-sm font-semibold">
                  ₹ {gains.netLongTerm.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Effective Capital Gains */}
      <div className="pt-4 border-t border-blue-500 dark:border-blue-300 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-100 dark:text-blue-900">Effective Capital Gains:</span>
          <span
            className={`text-lg font-bold ${
              gains.realizedCapitalGains < 0 ? 'text-red-300' : 'text-white'
            }`}
          >
            {gains.realizedCapitalGains < 0 ? '- ' : ''}₹
            {Math.abs(gains.realizedCapitalGains).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Savings Message */}
      {showSavings && savings > 0 && (
        <div className="bg-blue-500 dark:bg-blue-200 rounded-lg p-3 flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-semibold text-white dark:text-blue-900">
            You are going to save upto ₹ {savings.toLocaleString('en-IN')}
          </span>
        </div>
      )}
    </div>
  );
}
