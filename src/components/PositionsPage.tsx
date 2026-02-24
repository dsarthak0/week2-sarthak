
import DataTable from './Datatable'; 
import type { Column } from './Datatable';
import type { HoldingsDisplay } from '../types/stock.types';
import { sampleHoldings, getProcessedHoldings } from '../data/sampleData';


const HoldingsPage = () => {

   


    const displayData: HoldingsDisplay[] = getProcessedHoldings(sampleHoldings);

  
    const columns: Column<HoldingsDisplay>[] = [
        { key: 'symbol', header: 'Symbol', width: 100 },
        { key: 'quantity', header: 'Qty' },
        { 
            key: 'investedvalue', 
            header: 'Invested', 
            render: (val: number) => `$${val.toLocaleString()}` 
        },
        { 
            key: 'currentvalue', 
            header: 'Current Value', 
            render: (val: number) => `$${val.toLocaleString()}` 
        },
        { 
            key: 'totalreturn', 
            header: 'Total Return',
            render: (val: number) => (
                <span style={{ 
                    color: val >= 0 ? '#10B981' : '#EF4444', 
                    fontWeight: '600' 
                }}>
                    {val >= 0 ? `+$${val.toLocaleString()}` : `-$${Math.abs(val).toLocaleString()}`}
                </span>
            )
        },
        { 
            key: 'returnPercentage', 
            header: 'Return %',
            render: (val: number) => (
                <span style={{ 
                    color: val >= 0 ? '#10B981' : '#EF4444',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: val >= 0 ? '#ECFDF5' : '#FEF2F2'
                }}>
                    {val > 0 ? `+${val}%` : `${val}%`}
                </span>
            )
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h1>My Portfolio Holdings</h1>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    Total Assets: {displayData.length}
                </div>
            </div>
            
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <DataTable<HoldingsDisplay> 
                    data={displayData} 
                    columns={columns} 
                    rowKey="symbol" 
                    onRowClick={(row) => console.log("Viewing Holding details for:", row.symbol)}
                />
            </div>
        </div>
    );
};

export default HoldingsPage;