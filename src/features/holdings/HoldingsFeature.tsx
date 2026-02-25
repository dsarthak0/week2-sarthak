import React from 'react';
import type { HoldingsDisplay } from '../../types/stock.types';
import DataTable from '../../components/Datatable';
import { useInfiniteScroll } from '../../hooks/infinitescroll';
import PortfolioPieChart from '../../features/piechart/portfoliopiechart';
interface HoldingsFeatureProps {
  holdings: HoldingsDisplay[];
}

const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll<HoldingsDisplay>(holdings, 5);

  return (
    <div className="holdings-container">
      <h2 style={{ color: '#1E40AF', marginBottom: '16px' }}>Share Split By Category</h2>
          <PortfolioPieChart holdings={holdings} />
      <DataTable<HoldingsDisplay>
        data={visibleItems} 
        rowKey="symbol"
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'quantity', header: 'Total Qty', sortable: true },
          { 
            key: 'investedvalue', 
            header: 'Invested', 
            render: (val) => `$${Number(val).toLocaleString()}`
          },{ 
            key: 'currentvalue', 
            header: 'Current Value',
            render: (val) => `$${Number(val).toLocaleString()}`
          },
          { 
            key: 'returnPercentage', 
            header: 'Return %',
            render: (val) => (
              <span style={{ color: Number(val) >= 0 ? 'green' : 'red' }}>
                {val}%
              </span>
            )
          },
         
        ]}
      />

      <div ref={bottomRef} style={{ height: 1 }} />

      <div style={{ marginTop: '12px', textAlign: 'center' }}>
        {hasMore && <p style={{ color: '#6B7280' }}>Loading more holdings...</p>}
        {!hasMore && holdings.length > 0 && (
          <p style={{ color: '#9CA3AF' }}>Showing all {holdings.length} holdings</p>
        )}
      </div>
    </div>
  );
};

export default HoldingsFeature;