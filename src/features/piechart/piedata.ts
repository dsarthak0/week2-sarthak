// src/utils/portfolio.ts

import type { Holdings } from "../../types/stock.types";

export interface AllocationData {
  name: string;
  value: number;
}

export const calculateAllocation = (
  holdings: Holdings[]
): AllocationData[] => {
  return holdings.map((holding) => ({
    name: holding.symbol,
    value: holding.currentvalue,
  }));
};