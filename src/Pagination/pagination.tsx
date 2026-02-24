

import DataTable from "../components/Datatable";
interface StockData {
    symbol: string;
    qty: number;
    avgprice: number;
    ltp: number;
}

export const Pagination = () => {
    // 2. Generate 30 sample values
    const myStocks: StockData[] = [
        { symbol: "AAPL", qty: 10, avgprice: 150.0, ltp: 175.5 },
        { symbol: "TSLA", qty: 5, avgprice: 240.5, ltp: 235.1 },
        { symbol: "NVDA", qty: 15, avgprice: 420.0, ltp: 485.25 },
        { symbol: "MSFT", qty: 8, avgprice: 310.0, ltp: 325.0 },
        { symbol: "GOOGL", qty: 12, avgprice: 120.0, ltp: 135.5 },
        { symbol: "AMZN", qty: 20, avgprice: 130.0, ltp: 145.0 },
        { symbol: "META", qty: 7, avgprice: 290.0, ltp: 310.2 },
        { symbol: "AMD", qty: 25, avgprice: 95.0, ltp: 110.5 },
        { symbol: "NFLX", qty: 4, avgprice: 400.0, ltp: 440.0 },
        { symbol: "PYPL", qty: 18, avgprice: 65.0, ltp: 58.5 },
        // ... (Adding 20 more entries to reach 30)
        ...Array.from({ length: 20 }).map((_, i) => ({
            symbol: `STOCK${i + 11}`,
            qty: Math.floor(Math.random() * 50) + 1,
            avgprice: parseFloat((Math.random() * 500).toFixed(2)),
            ltp: parseFloat((Math.random() * 500).toFixed(2)),
        }))
    ];

    // 3. Define Columns
    const stockColumns = [
        { key: 'symbol', header: 'Symbol' },
        { key: 'qty', header: 'Quantity' },
        { key: 'avgprice', header: 'Avg Price' },
        { key: 'ltp', header: 'LTP' },
        { 
            key: 'pnl', 
            header: 'P&L', 
            render: (_: any, row: StockData) => {
                const pnl = (row.ltp - row.avgprice) * row.qty;
                const color = pnl >= 0 ? 'green' : 'red';
                return <span style={{ color }}>{pnl.toFixed(2)}</span>;
            }
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Portfolio Holdings</h2>
            <DataTable 
                data={myStocks} 
                columns={stockColumns as any} 
                rowKey="symbol"
                rowsPerPage={10} // This triggers your 10-per-page logic
            />
        </div>
    );
};