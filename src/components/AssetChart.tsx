"use client";

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { getAssetHistory } from '@/lib/api';

export default function AssetChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any[]>([]);
  const [period, setPeriod] = useState("1D");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const history = await getAssetHistory(symbol, period);
        if (isMounted) {
          setData(history);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load chart data");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, [symbol, period]);

  return (
    <div className="h-[450px] w-full premium-card p-8 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{symbol} Price Action</h3>
          <p className="text-xs font-medium text-foreground/40 mt-1 uppercase tracking-widest">Real-time Market Data</p>
        </div>
        <div className="flex gap-1 bg-foreground/5 p-1 rounded-xl border border-foreground/5">
          {['1D', '1W', '1M', '1Y', 'ALL'].map((t) => (
             <button 
               key={t} 
               onClick={() => setPeriod(t)}
               className={`text-[10px] font-bold px-4 py-2 rounded-lg transition-all ${t === period ? 'bg-background shadow-sm text-foreground' : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'}`}
             >
                {t}
             </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        {loading && (
             <div className="absolute inset-0 flex items-center justify-center bg-background/5 backdrop-blur-[1px] z-10 rounded-xl">
                <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
             </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
             <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
               <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <p className="text-sm font-medium text-red-500 mb-2">{error}</p>
             <button 
               onClick={() => window.location.reload()}
               className="text-xs bg-foreground/5 hover:bg-foreground/10 text-foreground px-4 py-2 rounded-lg transition-colors"
             >
               Retry
             </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
