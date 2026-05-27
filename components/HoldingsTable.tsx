'use client';

import { useCallback, useMemo, useState } from 'react';
import { Holding } from '@/lib/types';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedHoldings: Set<string>;
  onToggleHolding: (key: string) => void;
  onSelectAll: (select: boolean) => void;
}

const ITEMS_PER_PAGE = 5;

type SortColumn = 'short-term' | 'long-term' | null;
type SortDirection = 'asc' | 'desc';

export function HoldingsTable({
  holdings,
  selectedHoldings,
  onToggleHolding,
  onSelectAll,
}: HoldingsTableProps) {
  const [showAll, setShowAll] = useState(false);
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedHoldings = useMemo(() => {
    let sorted = [...holdings];
    
    if (sortColumn === 'short-term') {
      sorted.sort((a, b) => {
        const aVal = a.stcg.gain;
        const bVal = b.stcg.gain;
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    } else if (sortColumn === 'long-term') {
      sorted.sort((a, b) => {
        const aVal = a.ltcg.gain;
        const bVal = b.ltcg.gain;
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }
    
    return sorted;
  }, [holdings, sortColumn, sortDirection]);

  const displayedHoldings = useMemo(
    () => (showAll ? sortedHoldings : sortedHoldings.slice(0, ITEMS_PER_PAGE)),
    [sortedHoldings, showAll]
  );

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return '↕️';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const allDisplayedSelected = useMemo(
    () =>
      displayedHoldings.length > 0 &&
      displayedHoldings.every((holding, index) => {
        const key = `${holding.coin}-${holdings.indexOf(holding)}`;
        return selectedHoldings.has(key);
      }),
    [displayedHoldings, selectedHoldings, holdings]
  );

  const handleHeaderCheckbox = useCallback(
    (checked: boolean) => {
      if (checked) {
        // Select all displayed holdings
        displayedHoldings.forEach((holding, displayIndex) => {
          const actualIndex = holdings.indexOf(holding);
          const key = `${holding.coin}-${actualIndex}`;
          if (!selectedHoldings.has(key)) {
            onToggleHolding(key);
          }
        });
      } else {
        // Deselect all displayed holdings
        displayedHoldings.forEach((holding, displayIndex) => {
          const actualIndex = holdings.indexOf(holding);
          const key = `${holding.coin}-${actualIndex}`;
          if (selectedHoldings.has(key)) {
            onToggleHolding(key);
          }
        });
      }
    },
    [displayedHoldings, selectedHoldings, onToggleHolding, holdings]
  );

  const getHoldingKey = (holding: Holding, index: number) => {
    const actualIndex = holdings.indexOf(holding);
    return `${holding.coin}-${actualIndex}`;
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-white dark:text-gray-900 mb-4">Holdings</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300 dark:text-gray-700">
          <thead>
            <tr className="border-b border-slate-700 dark:border-gray-300">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={allDisplayedSelected}
                  onChange={(e) => handleHeaderCheckbox(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  aria-label="Select all visible holdings"
                />
              </th>
              <th className="text-left py-3 px-4 font-semibold">Asset</th>
              <th className="text-left py-3 px-4 font-semibold">Holdings</th>
              <th className="text-left py-3 px-4 font-semibold">
                Current Market Value
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('short-term')}
                  className="flex items-center gap-1 hover:text-blue-400 dark:hover:text-blue-600 transition"
                  title="Sort by Short-term gains"
                >
                  Short-term
                  <span className="text-xs">{getSortIcon('short-term')}</span>
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('long-term')}
                  className="flex items-center gap-1 hover:text-blue-400 dark:hover:text-blue-600 transition"
                  title="Sort by Long-term gains"
                >
                  Long-Term
                  <span className="text-xs">{getSortIcon('long-term')}</span>
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {displayedHoldings.map((holding, displayIndex) => {
              const actualIndex = holdings.indexOf(holding);
              const key = getHoldingKey(holding, displayIndex);
              const isSelected = selectedHoldings.has(key);

              return (
                <tr
                  key={key}
                  className="border-b border-slate-700 dark:border-gray-300 hover:bg-slate-800/50 dark:hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleHolding(key)}
                      className="w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{holding.logo}</span>
                      <div>
                        <p className="font-semibold text-white dark:text-gray-900">{holding.coinName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-600">{holding.coin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-white dark:text-gray-900">
                      {holding.totalHoldings.toFixed(4)} {holding.coin}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-600">
                      ₹ {holding.averageBuyPrice.toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    ₹ {(holding.totalHoldings * holding.currentPrice).toLocaleString('en-IN', {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <div
                      className={`font-semibold ${
                        holding.stcg.gain >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {holding.stcg.gain >= 0 ? '+' : ''}₹
                      {holding.stcg.gain.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500">
                      {holding.stcg.balance.toFixed(4)} {holding.coin}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <div
                      className={`font-semibold ${
                        holding.ltcg.gain >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {holding.ltcg.gain >= 0 ? '+' : ''}₹
                      {holding.ltcg.gain.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500">
                      {holding.ltcg.balance.toFixed(4)} {holding.coin}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-gray-400">-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > ITEMS_PER_PAGE && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-700 text-sm mt-4 font-semibold transition"
        >
          {showAll ? 'View less' : 'View all'}
        </button>
      )}
    </div>
  );
}
