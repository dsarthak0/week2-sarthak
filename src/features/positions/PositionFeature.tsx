import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/Datatable';
import { useInfiniteScroll } from '../../hooks/infinitescroll';

// CHANGE: Remove 'holdings' from here. This component only handles positions.
interface PositionsFeatureProps {
  positions: Position[]; 
}

const PositionsFeature: React.FC<PositionsFeatureProps> = ({ positions }) => {
  // Use the 'positions' prop for the infinite scroll
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll<Position>(positions, 5);

  return (
    <div className="positions-container">
      <h2 style={{ color: '#1E40AF', marginBottom: '16px' }}>Current Positions</h2>

      <DataTable<Position>
        data={visibleItems} 
        rowKey="symbol"
        columns={[
            
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Quantity', sortable: true },
          { 
            key: 'avgprice', 
            header: 'Avg Price', 
            render: (val) => `$${Number(val).toFixed(2)}` 
          },
          { 
            key: 'ltp', 
            header: 'LTP',
            render: (val) => `$${Number(val).toFixed(2)}`
          },
        ]}
      />

      <div ref={bottomRef} style={{ height: 1 }} />

      <div style={{ marginTop: '12px', textAlign: 'center' }}>
        {hasMore && <p>Loading more...</p>}
        {!hasMore && positions.length > 0 && (
          <p>Showing all {positions.length} positions</p>
        )}
      </div>
    </div>
  );
};

export default PositionsFeature;