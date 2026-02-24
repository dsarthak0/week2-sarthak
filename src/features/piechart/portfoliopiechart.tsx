// components/PortfolioPieChart.tsx
import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

interface Props {
  holdings: {
    symbol: string;
    currentvalue: number;
  }[];
}

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const PortfolioPieChart: React.FC<Props> = ({ holdings }) => {
  const data = useMemo(
    () =>
      holdings.map((h) => ({
        name: h.symbol,
        value: Number(h.currentvalue),
      })),
    [holdings]
  );

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
  formatter={(value) => {
    if (typeof value === 'number') {
      return [`$${value.toLocaleString()}`, 'Value'];
    }
    return [value ?? '', 'Value'];
  }}
/>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioPieChart;