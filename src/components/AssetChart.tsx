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
    <div className="h-[450px] w-full premium-card p-8 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{symbol} Price Action</h3>
          <p className="text-xs font-medium text-foreground/40 mt-1 uppercase tracking-widest">Real-time Market Data</p>
        </div>
        <div className="flex gap-1 bg-foreground/5 p-1 rounded-xl border border-foreground/5">
          {['1D', '1W', '1M', '1Y', 'ALL'].map((t) => (
             <button key={t} className={`text-[10px] font-bold px-4 py-2 rounded-lg transition-all ${t === '1D' ? 'bg-background shadow-sm text-foreground' : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'}`}>
                {t}
             </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-brand-primary)" stopOpacity={0}/>
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
                backgroundColor: 'rgba(var(--background), 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--foreground)'
              }} 
              itemStyle={{ color: 'var(--color-brand-primary)' }}
              cursor={{ stroke: 'var(--foreground)', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.2 }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-brand-primary)" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
