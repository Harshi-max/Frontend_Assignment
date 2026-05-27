'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchCapitalGainsData,
  fetchHoldingsData,
  CapitalGainsData,
} from '@/lib/api';
import {
  Holding,
  CapitalGainsState,
  CalculatedGains,
  HarvestingContextType,
} from '@/lib/types';
import {
  calculateGains,
  calculatePostHarvestingGains,
  calculateSavings,
} from '@/lib/calculations';

const HarvestingContext = createContext<HarvestingContextType | undefined>(undefined);

export function HarvestingProvider({ children }: { children: React.ReactNode }) {
  const [capitalGains, setCapitalGains] = useState<CapitalGainsState | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedHoldings, setSelectedHoldings] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [preHarvesting, setPreHarvesting] = useState<CalculatedGains | null>(null);
  const [postHarvesting, setPostHarvesting] = useState<CalculatedGains | null>(null);
  const [savings, setSavings] = useState(0);

  // Load data from APIs
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [gainsData, holdingsData] = await Promise.all([
          fetchCapitalGainsData(),
          fetchHoldingsData(),
        ]);

        setCapitalGains(gainsData);
        setHoldings(holdingsData);

        // Calculate pre-harvesting gains
        const preCalc = calculateGains(gainsData);
        setPreHarvesting(preCalc);

        // Initialize post-harvesting with same data
        setPostHarvesting(preCalc);
        setError(null);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update post-harvesting gains and savings when selection changes
  useEffect(() => {
    if (capitalGains && preHarvesting) {
      const postCalc = calculatePostHarvestingGains(
        capitalGains,
        selectedHoldings,
        holdings
      );
      setPostHarvesting(postCalc);

      const savingsAmount = calculateSavings(
        preHarvesting.realizedCapitalGains,
        postCalc.realizedCapitalGains
      );
      setSavings(savingsAmount);
    }
  }, [selectedHoldings, capitalGains, holdings, preHarvesting]);

  const toggleHolding = (key: string) => {
    setSelectedHoldings((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const selectAllHoldings = (select: boolean) => {
    if (select) {
      const allKeys = holdings.map((_, index) => `${holdings[index].coin}-${index}`);
      setSelectedHoldings(new Set(allKeys));
    } else {
      setSelectedHoldings(new Set());
    }
  };

  return (
    <HarvestingContext.Provider
      value={{
        capitalGains,
        holdings,
        selectedHoldings,
        loading,
        error,
        preHarvesting,
        postHarvesting,
        savings,
        toggleHolding,
        selectAllHoldings,
      }}
    >
      {children}
    </HarvestingContext.Provider>
  );
}

export function useHarvesting() {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error('useHarvesting must be used within HarvestingProvider');
  }
  return context;
}
