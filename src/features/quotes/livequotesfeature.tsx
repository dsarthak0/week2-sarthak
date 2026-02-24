import React from 'react';
import type { Stock } from '../../types/stock.types';
import StockCard from '../../components/Stockcard';
import SearchBar from '../../components/SearchBar';
import useVirtualList from '../../hooks/useVirtualList';

// Configuration for Virtualization
const ROW_HEIGHT = 44;
const VISIBLE_ROWS = 12;
const CONTAINER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;

interface LiveQuotesFeatureProps {
  stocks: Stock[];
  selectedStock: Stock | null;
  onSelectStock: (stock: Stock) => void;
  onSearch: (query: string) => void;
  onFilterChange: (sector: string) => void;
}

const LiveQuotesFeature: React.FC<LiveQuotesFeatureProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
  onSearch,
  onFilterChange,
}) => {
  // Virtualization Hook logic
  const { 
    visibleItems, 
    containerRef, 
    spacerAbove, 
    spacerBelow, 
    startIndex 
  } = useVirtualList(stocks, { 
    rowHeight: ROW_HEIGHT, 
    visiblerows: VISIBLE_ROWS, 
    overscan: 3 
  });

  return (
    <>
      <SearchBar
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        placeholder="Search by symbol or name..."
      />

      {/* StockCard Grid - Keeping the 3-column layout from snippet 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {stocks.slice(0, 3).map((stock) => (
          <StockCard
            key={stock.id}
            stock={stock}
            isSelected={selectedStock?.id === stock.id}
            onSelect={onSelectStock}
          />
        ))}
      </div>

      <h2 style={{ color: '#1E40AF', display: 'flex', alignItems: 'baseline' }}>
        Live Quotes
        <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
          {visibleItems.length} of {stocks.length} rows in DOM
        </span>
      </h2>

      {/* Virtualized Table Container */}
      <div 
        ref={containerRef} 
        style={{ 
          height: CONTAINER_HEIGHT, 
          overflowY: 'auto', 
          border: '1px solid #E5E7EB', 
          borderRadius: 6 
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <tr style={{ background: '#1E3A8A', color: '#fff' }}>
              <th style={{ padding: '10px 8px', textAlign: 'left' }}>Symbol</th>
              <th style={{ padding: '10px 8px', textAlign: 'left' }}>Company</th>
              <th style={{ padding: '10px 8px', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '10px 8px', textAlign: 'left' }}>Change %</th>
              <th style={{ padding: '10px 8px', textAlign: 'left' }}>Volume</th>
              <th style={{ padding: '10px 8px', textAlign: 'left' }}>Sector</th>
            </tr>
          </thead>

          <tbody>
            {/* Top Spacer */}
            {spacerAbove > 0 && (
              <tr><td colSpan={6} style={{ height: spacerAbove, padding: 0 }} /></tr>
            )}

            {/* Rendered Visible Rows */}
            {visibleItems.map((stock, indexInSlice) => {
              const actualRowNumber = startIndex + indexInSlice;
              const isPositive = stock.changePct >= 0;

              return (
                <tr 
                  key={stock.id} 
                  onClick={() => onSelectStock(stock)}
                  style={{ 
                    height: ROW_HEIGHT, 
                    background: actualRowNumber % 2 === 0 ? '#ffffff' : '#F8FAFC', 
                    cursor: 'pointer', 
                    borderBottom: '1px solid #E5E7EB' 
                  }}
                >
                  <td style={{ padding: '0 8px', fontSize: 14, fontWeight: 'bold' }}>{stock.symbol}</td>
                  <td style={{ padding: '0 8px', fontSize: 14 }}>{stock.name}</td>
                  <td style={{ padding: '0 8px', fontSize: 14 }}>
                    ${stock.price.toFixed(2)}
                  </td>
                  <td style={{ 
                    padding: '0 8px', 
                    fontSize: 14, 
                    color: isPositive ? '#166534' : '#991B1B', 
                    fontWeight: 'bold' 
                  }}>
                    {isPositive ? '+' : ''}{stock.changePct.toFixed(2)}%
                  </td>
                  <td style={{ padding: '0 8px', fontSize: 14 }}>
                    {stock.volume.toLocaleString()}
                  </td>
                  <td style={{ padding: '0 8px', fontSize: 14 }}>{stock.sector}</td>
                </tr>
              );
            })}

            {/* Bottom Spacer */}
            {spacerBelow > 0 && (
              <tr><td colSpan={6} style={{ height: spacerBelow, padding: 0 }} /></tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 6 }}>
        {stocks.length} total stocks — Performance optimized with virtualization.
      </p>
    </>
  );
};

export default LiveQuotesFeature;