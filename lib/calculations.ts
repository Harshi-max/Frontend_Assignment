import { CapitalGainsState, CalculatedGains, Holding } from './types';

export function calculateGains(capitalGains: CapitalGainsState): CalculatedGains {
  const netShortTerm = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const netLongTerm = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const realizedCapitalGains = netShortTerm + netLongTerm;

  return {
    stcg: capitalGains.stcg,
    ltcg: capitalGains.ltcg,
    netShortTerm,
    netLongTerm,
    realizedCapitalGains,
  };
}

export function calculatePostHarvestingGains(
  initialGains: CapitalGainsState,
  selectedHoldings: Set<string>,
  holdings: Holding[]
): CalculatedGains {
  // Start with a copy of initial gains
  let stcgProfits = initialGains.stcg.profits;
  let stcgLosses = initialGains.stcg.losses;
  let ltcgProfits = initialGains.ltcg.profits;
  let ltcgLosses = initialGains.ltcg.losses;

  // Process selected holdings
  selectedHoldings.forEach((key) => {
    const holding = holdings.find((h) => {
      const holdingKey = `${h.coin}-${holdings.indexOf(h)}`;
      return holdingKey === key;
    });

    if (holding) {
      // Add short-term gains
      if (holding.stcg.gain > 0) {
        stcgProfits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        stcgLosses += Math.abs(holding.stcg.gain);
      }

      // Add long-term gains
      if (holding.ltcg.gain > 0) {
        ltcgProfits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        ltcgLosses += Math.abs(holding.ltcg.gain);
      }
    }
  });

  const newCapitalGains: CapitalGainsState = {
    stcg: { profits: stcgProfits, losses: stcgLosses },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses },
  };

  return calculateGains(newCapitalGains);
}

export function calculateSavings(preHarvesting: number, postHarvesting: number): number {
  return Math.max(0, preHarvesting - postHarvesting);
}
