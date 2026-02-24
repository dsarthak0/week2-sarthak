
 
import  { lazy, useState } from 'react';
//            

import { stocks, trades,} from './data/stockdata'


// ── Types (UNCHANGED) ────────────────────────────────────────────────
import type { Stock, Trade } from './types/stock.types';
 
// ── Boundary wrapper (EAGER import — NOT lazy) ───────────────────────
import SuspenseBoundary from './boundaries/SuspenseBoundary';

import { 
  MockPositions, 
  sampleHoldings, 
  getProcessedHoldings, 
  getProcessedPositions 
} from './data/sampleData';
import TableSkeleton    from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton     from './skeletons/FormSkeleton';
// import PortfolioPieChart from './features/piechart/portfoliopiechart';
import PriceTicker from './features/horizontalticker';

const prices = [
  { symbol: "BTC", price: "₹28,00,000", change: "▲2.3%" },
  { symbol: "ETH", price: "₹1,90,000", change: "▼0.5%" },
  { symbol: "SOL", price: "₹5,500", change: "▲1.2%" },
  { symbol: "XRP", price: "₹70", change: "▼0.8%" },
  { symbol: "ADA", price: "₹120", change: "▲0.9%" },
];


 
const LiveQuotesFeature = lazy(function() {
  return import('./features/quotes/livequotesfeature');
});
 
const PortfolioFeature = lazy(function() {
  return import('./features/portfolio/PortfolioFeature');
});
 
const PositionsFeature = lazy(function() {
  return import('./features/positions/PositionFeature');
});
 
const HoldingsFeature = lazy(function() {
  return import('./features/holdings/HoldingsFeature');
});
 
const TradeFeature = lazy(function() {
  return import('./features/trades/tradefeature');
});





type NewTradeInput = Omit<Trade, 'id' | 'date'>;
 
function App() {
  const processedPositions = getProcessedPositions(MockPositions);
  const processedHoldings = getProcessedHoldings(sampleHoldings);

  const [selectedStock,  setSelectedStock]  = useState<Stock | null>(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [sectorFilter,   setSectorFilter]   = useState('');
  const [tradeHistory,   setTradeHistory]   = useState<Trade[]>(trades);

  const filteredStocks = stocks.filter(stock => {
    const queryLower = searchQuery.toLowerCase();
    const symbolMatches = stock.symbol.toLowerCase().includes(queryLower);
    const nameMatches   = stock.name.toLowerCase().includes(queryLower);
    const searchMatches = symbolMatches || nameMatches;
    const noFilter      = sectorFilter === '';
    const sectorMatches = noFilter || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });

  function handleNewTrade(input: NewTradeInput): void {
    const newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(prev => [newTrade, ...prev]);
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>

      {/* ── FEATURE 1: Live Quotes ── */}
      <SuspenseBoundary
        fallback={
          <>
            <CardGridSkeleton count={filteredStocks.length || 3} />
            <TableSkeleton rows={5} cols={6} title="Live Quotes" />
          </>
        }
      >
        <LiveQuotesFeature
          stocks={filteredStocks}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          onSearch={setSearchQuery}
          onFilterChange={setSectorFilter}
        />
      </SuspenseBoundary>

      {/* ── FEATURE 2: Portfolio Summary ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}
      >
        <PortfolioFeature availableStocks={stocks} />
      </SuspenseBoundary>

      {/* ── FEATURE 3: Positions ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}
      >
        <PositionsFeature positions={processedPositions}/>
      </SuspenseBoundary>

      {/* ── FEATURE 4: Holdings ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}
      >
        <HoldingsFeature holdings={processedHoldings}  />
      </SuspenseBoundary>

      {/* ── FEATURE 5: Trade History + Form ── */}
      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature
          tradeHistory={tradeHistory}
          stocks={stocks}
          selectedStock={selectedStock}
          onSubmitTrade={handleNewTrade}
        />
        <PriceTicker prices={prices} speed={1}/>
      </SuspenseBoundary>

      {/* ── PIE CHART (ONLY ONCE, outside SuspenseBoundary) ── */}
      {/* <PortfolioPieChart holdings={sampleHoldings}/> */}
    </div>
  );
}
export default App;