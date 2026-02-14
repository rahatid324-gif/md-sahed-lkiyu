
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PriceDataPoint } from '../types';

interface MarketChartProps {
  data: PriceDataPoint[];
}

const MarketChart: React.FC<MarketChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 mt-4 rounded-xl overflow-hidden glass p-4 border border-blue-500/20">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c3ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00c3ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            hide
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
            itemStyle={{ color: '#00c3ff' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#00c3ff" 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
