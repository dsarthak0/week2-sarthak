import React from 'react';
import type {Stock} from '../types/stock.types'

interface StockCardProps {
    stock: Stock;
    onSelect?: (stock: Stock) => void;
    isSelected?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({
    stock,
    onSelect,
    isSelected = false 
}) => {
    const isPositive = stock.change >= 0;

    return (
        <div 
            onClick={() => onSelect?.(stock)} 
            style={{
                border: isSelected ? '2px solid #1E40AF' : '1px solid #D1D5DB',
                borderRadius: 8,
                padding: 16,
                cursor: 'pointer',
                background: isSelected ? '#DBEAFE' : '#fff',
                marginBottom: '8px',
                transition: 'all 0.2s ease' // Added a slight transition for better feel
            }}
        >
            <h3 style={{ margin: '0 0 8px 0' }}>{stock.symbol} - {stock.name}</h3>
            <p style={{ margin: '4px 0' }}>Price: ${stock.price.toFixed(2)}</p>
            <p style={{ 
                color: isPositive ? '#059669' : '#DC2626', // Slightly punchier green/red
                fontWeight: 'bold', 
                margin: '4px 0' 
            }}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} 
                ({stock.changePct.toFixed(2)}%)
            </p>
            <small style={{ color: '#6B7280' }}>Sector: {stock.sector}</small>
        </div>
    );
};

export default StockCard;