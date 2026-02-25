 import type { Stock, Trade } from '../types/stock.types.ts'
 
export const stocks: Stock[] = [
  
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 189.30, change: 2.15, changePct: 1.15, volume: 54_200_000, marketCap: 2_950_000_000_000, sector: 'Technology' },
  { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -0.95, changePct: -0.67, volume: 22_300_000, marketCap: 1_770_000_000_000, sector: 'Technology' },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 4.20, changePct: 1.12, volume: 19_600_000, marketCap: 2_810_000_000_000, sector: 'Technology' },
  { id: '4', symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -7.30, changePct: -2.85, volume: 98_700_000, marketCap: 791_000_000_000, sector: 'Automotive' },
  { id: '5', symbol: 'JPM', name: 'JPMorgan Chase', price: 196.40, change: 1.05, changePct: 0.54, volume: 8_900_000, marketCap: 568_000_000_000, sector: 'Finance' },
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 726.13, change: 15.40, changePct: 2.16, volume: 42_500_000, marketCap: 1_790_000_000_000, sector: 'Technology' },
  { id: '7', symbol: 'BAC', name: 'Bank of America', price: 34.12, change: -0.22, changePct: -0.64, volume: 35_100_000, marketCap: 268_000_000_000, sector: 'Finance' },
  { id: '8', symbol: 'F', name: 'Ford Motor Co.', price: 12.15, change: 0.10, changePct: 0.83, volume: 51_000_000, marketCap: 48_000_000_000, sector: 'Automotive' },
  { id: '9', symbol: 'V', name: 'Visa Inc.', price: 278.45, change: 1.80, changePct: 0.65, volume: 6_200_000, marketCap: 570_000_000_000, sector: 'Finance' },
  { id: '10', symbol: 'AMD', name: 'AMD Inc.', price: 174.20, change: -2.10, changePct: -1.19, volume: 65_000_000, marketCap: 281_000_000_000, sector: 'Technology' },
  { id: '11', symbol: 'TM', name: 'Toyota Motor', price: 232.10, change: 3.45, changePct: 1.51, volume: 2_100_000, marketCap: 314_000_000_000, sector: 'Automotive' },
  { id: '12', symbol: 'GS', name: 'Goldman Sachs', price: 385.60, change: -4.15, changePct: -1.06, volume: 2_800_000, marketCap: 128_000_000_000, sector: 'Finance' },
  { id: '13', symbol: 'INTC', name: 'Intel Corp.', price: 43.50, change: 0.45, changePct: 1.05, volume: 38_000_000, marketCap: 184_000_000_000, sector: 'Technology' },
  { id: '14', symbol: 'GM', name: 'General Motors', price: 39.80, change: -0.55, changePct: -1.36, volume: 15_400_000, marketCap: 52_000_000_000, sector: 'Automotive' },
  { id: '15', symbol: 'MS', name: 'Morgan Stanley', price: 86.25, change: 0.90, changePct: 1.05, volume: 7_500_000, marketCap: 142_000_000_000, sector: 'Finance' },
  { id: '16', symbol: 'CRM', name: 'Salesforce Inc.', price: 292.10, change: 5.20, changePct: 1.81, volume: 5_900_000, marketCap: 283_000_000_000, sector: 'Technology' },
  { id: '17', symbol: 'HMC', name: 'Honda Motor Co.', price: 34.90, change: 0.30, changePct: 0.87, volume: 1_200_000, marketCap: 58_000_000_000, sector: 'Automotive' },
  { id: '18', symbol: 'WFC', name: 'Wells Fargo', price: 55.40, change: -0.15, changePct: -0.27, volume: 18_200_000, marketCap: 198_000_000_000, sector: 'Finance' },
  { id: '19', symbol: 'ORCL', name: 'Oracle Corp.', price: 112.50, change: 1.15, changePct: 1.03, volume: 10_800_000, marketCap: 308_000_000_000, sector: 'Technology' },
  { id: '20', symbol: 'STLA', name: 'Stellantis N.V.', price: 25.40, change: 0.65, changePct: 2.63, volume: 4_800_000, marketCap: 76_000_000_000, sector: 'Automotive' }
];
 
export const trades: Trade[] = [
  { id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY',
    quantity: 10, price: 175.00, date: '2024-01-15' },
  { id: 't2', stockId: '3', symbol: 'MSFT', type: 'BUY',
    quantity: 5,  price: 360.00, date: '2024-02-20' },
  { id: 't3', stockId: '4', symbol: 'TSLA', type: 'SELL',
    quantity: 8,  price: 265.00, date: '2024-03-10' },
];