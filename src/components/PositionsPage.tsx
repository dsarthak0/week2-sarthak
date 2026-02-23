
import DataTable from './Datatable'; // Adjust path
import type { Column } from './Datatable' // If exported, or define locally
import type { PositionDisplay } from '../types/stock.types';
import { MockPositions, getProcessedPositions } from '../data/sampleData';

const PositionsPage = () => {
    // 1. Process the raw mock data to get P&L calculations
    const displayData: PositionDisplay[] = getProcessedPositions(MockPositions);

    // 2. Define the columns specifically for the PositionDisplay type
    const columns: Column<PositionDisplay>[] = [
        { key: 'symbol', header: 'Symbol', width: 100 },
        { key: 'qty', header: 'Qty' },
        { 
            key: 'avgprice', 
            header: 'Avg Price', 
            render: (val: number) => `$${val.toFixed(2)}` 
        },
        { 
            key: 'ltp', 
            header: 'LTP', 
            render: (val: number) => `$${val.toFixed(2)}` 
        },
        { 
            key: 'pnl', 
            header: 'P&L',
            render: (val: number) => (
                <span style={{ 
                    color: val >= 0 ? '#10B981' : '#EF4444', 
                    fontWeight: '600' 
                }}>
                    {val >= 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                </span>
            )
        },
        { 
            key: 'pnlPercent', 
            header: 'P&L%',
            render: (val: number) => (
                <span style={{ color: val >= 0 ? '#10B981' : '#EF4444' }}>
                    {val}%
                </span>
            )
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '16px' }}>My Positions</h1>
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                {/* 3. Plug everything into your Generic DataTable */}
                <DataTable<PositionDisplay> 
                    data={displayData} 
                    columns={columns} 
                    rowKey="symbol" 
                    onRowClick={(row) => console.log("Selected:", row.symbol)}
                />
            </div>
        </div>
    );
};

export default PositionsPage;