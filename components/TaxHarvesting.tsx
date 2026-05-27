'use client';

import { useHarvesting } from '@/context/HarvestingContext';
import { useTheme } from '@/context/ThemeContext';
import { PreHarvestingCard } from './PreHarvestingCard';
import { AfterHarvestingCard } from './AfterHarvestingCard';
import { HoldingsTable } from './HoldingsTable';
import { InfoBanner } from './InfoBanner';
import { HowItWorks } from './HowItWorks';

export function TaxHarvesting() {
  const { theme, toggleTheme } = useTheme();
  const {
    preHarvesting,
    postHarvesting,
    holdings,
    selectedHoldings,
    savings,
    loading,
    error,
    toggleHolding,
    selectAllHoldings,
  } = useHarvesting();

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 dark:bg-white text-white dark:text-gray-900 transition-colors p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-900/30 dark:bg-red-50 border border-red-700 dark:border-red-300 rounded-lg p-4">
            <p className="text-red-300 dark:text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const showSavingsMessage =
    preHarvesting &&
    postHarvesting &&
    preHarvesting.realizedCapitalGains > postHarvesting.realizedCapitalGains;

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-white text-white dark:text-gray-900 transition-colors p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Tax Harvesting</h1>
            <HowItWorks />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-800 dark:bg-gray-200 hover:bg-slate-700 dark:hover:bg-gray-300 transition"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1hm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm.707 5.657a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM9 17a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-4.536-.464a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm2.828 2.828a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM4.929 4.929a1 1 0 001.414-1.414L5.636 2.808a1 1 0 00-1.414 1.414l.707.707z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Info Banner */}
        <InfoBanner />

        {/* Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pre-Harvesting Card */}
          <div>
            {loading ? (
              <div className="bg-slate-900 rounded-lg p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block">
                    <svg
                      className="animate-spin h-8 w-8 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 mt-3">Loading data...</p>
                </div>
              </div>
            ) : (
              <PreHarvestingCard gains={preHarvesting} />
            )}
          </div>

          {/* After-Harvesting Card */}
          <div>
            <AfterHarvestingCard
              gains={postHarvesting}
              savings={savings}
              showSavings={showSavingsMessage}
            />
          </div>
        </div>

        {/* Holdings Table */}
        {!loading && (
          <HoldingsTable
            holdings={holdings}
            selectedHoldings={selectedHoldings}
            onToggleHolding={toggleHolding}
            onSelectAll={selectAllHoldings}
          />
        )}
      </div>
    </div>
  );
}
