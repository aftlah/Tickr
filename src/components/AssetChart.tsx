"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

const data = [
  { name: '10:00', price: 4000 },
  { name: '11:00', price: 3000 },
  { name: '12:00', price: 3500 },
  { name: '13:00', price: 2780 },
  { name: '14:00', price: 2890 },
  { name: '15:00', price: 3390 },
  { name: '16:00', price: 3490 },
];

export default function AssetChart({ symbol }: { symbol: string }) {
  return (
    <div className="h-[450px] w-full premium-card bg-background/50 p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold">{symbol} History</h3>
          <p className="text-xs font-medium text-foreground/40 mt-0.5">Price action relative to USD</p>
        </div>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '1Y'].map((t) => (
             <button key={t} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/5 ${t === '1D' ? 'bg-brand-primary text-white' : 'bg-white/5 opacity-50'}`}>
                {t}
             </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="75%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="currentColor" 
            opacity={0.3}
            fontSize={10}
            fontWeight={600}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            hide
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(2, 6, 23, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)',
              fontSize: '12px',
              fontWeight: '600'
            }} 
            itemStyle={{ color: '#10B981' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#10B981" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
