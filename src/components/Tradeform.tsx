import React, { useState } from 'react';
import type { Stock, Trade } from '../types/stock.types';

// Utility types for clean data flow
type EditableStock = Partial<Stock>;
type StockSummary = Pick<Stock, 'id' | 'symbol' | 'name' | 'price' | 'sector'>; // Added 'id' here
type NewTradeInput = Omit<Trade, 'id' | 'date'>;

interface TradeFormProps {
    stocks: StockSummary[];
    onSubmitTrade: (trade: NewTradeInput) => void;
    initialValues?: EditableStock;
}

const TradeForm: React.FC<TradeFormProps> = ({
    stocks,
    onSubmitTrade,
    initialValues = {},
}) => {
    const [form, setForm] = useState<NewTradeInput>({
        stockId: initialValues.id ?? '',
        symbol: initialValues.symbol ?? '',
        type: "BUY",
        quantity: 1,
        price: initialValues.price ?? 0,
    });

    const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = stocks.find(s => s.symbol === e.target.value);
        if (selected) {
            setForm(prev => ({
                ...prev,
                stockId: selected.id, // Ensure the ID stays in sync with the symbol
                symbol: selected.symbol,
                price: selected.price,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.symbol) {
            onSubmitTrade(form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-4">Place a Trade</h3>
            
            <div className="mb-4">
                <label className="block mb-1">Select Asset</label>
                <select 
                    className="w-full p-2 border rounded"
                    value={form.symbol} 
                    onChange={handleStockChange}
                >
                    <option value="">-- Select Stock --</option>
                    {stocks.map(s => (
                        <option key={s.id} value={s.symbol}>
                            {s.symbol} - {s.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-2 mb-4">
                {(['BUY', 'SELL'] as const).map(t => (
                    <button 
                        key={t} 
                        type='button'
                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            background: form.type === t ? '#1E40AF' : '#e5e7eb',
                            color: form.type === t ? '#fff' : '#374151'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Quantity</label>
                <input 
                    type='number' 
                    min={1} 
                    className="w-full p-2 border rounded"
                    value={form.quantity} 
                    onChange={(e) => setForm(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                />
            </div>

            <div className="bg-gray-50 p-3 rounded mb-4">
                <p>Price: <strong>${form.price.toFixed(2)}</strong></p>
                <p>Total: <strong>${(form.price * form.quantity).toFixed(2)}</strong></p>
            </div>

            <button 
                type="submit" 
                disabled={!form.symbol}
                className={`w-full py-2 rounded font-bold ${!form.symbol ? 'bg-gray-300' : 'bg-green-600 text-white'}`}
            >
                Submit Trade
            </button>
        </form>
    );
};

export default TradeForm;