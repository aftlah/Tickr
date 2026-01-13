import Link from "next/link";

export default function TickrCard({ 
  title, 
  value, 
  change, 
  symbol,
  variant = "default"
}: { 
  title: string, 
  value: string, 
  change?: number, 
  symbol: string,
  variant?: "default" | "accent"
}) {
  const isPositive = change && change > 0;
  
  // Fake sparkline data generation based on positive/negative
  const sparklinePath = isPositive 
    ? "M0,20 C10,20 10,10 20,15 C30,20 30,5 40,10 C50,15 50,0 60,5 C70,10 70,0 80,0" 
    : "M0,0 C10,0 10,10 20,5 C30,0 30,15 40,10 C50,5 50,20 60,15 C70,10 70,20 80,20";

  return (
    <div className={`premium-card p-6 flex flex-col gap-4 relative overflow-hidden group h-full justify-between`}>
      <div className="flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-foreground/90">{title}</h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/40 border border-foreground/5">
              {symbol}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isPositive ? 'bg-brand-primary' : 'bg-brand-accent'}`} />
        </div>
      </div>
      
      <div className="flex items-end justify-between z-10 mt-2">
        <div>
           <p className="text-3xl font-bold tracking-tight tabular-nums text-foreground">${value}</p>
           {change !== undefined && (
            <div className={`flex items-center gap-1 mt-1 font-bold text-sm ${isPositive ? 'text-brand-primary' : 'text-brand-accent'}`}>
               <span className="text-xs">{isPositive ? '▲' : '▼'}</span>
               <span>{Math.abs(change).toFixed(2)}%</span>
               <span className="text-foreground/20 text-[10px] font-medium ml-1">24H</span>
            </div>
          )}
        </div>
        
        {/* Mini Sparkline Visualization */}
        <div className="h-8 w-20 opacity-30 group-hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 80 20" className="w-full h-full overflow-visible">
            <path 
              d={sparklinePath} 
              fill="none" 
              stroke={isPositive ? "var(--color-brand-primary)" : "var(--color-brand-accent)"} 
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <div className="mt-4 flex gap-2 z-10 pt-4 border-t border-foreground/5">
        <Link 
          href={`/asset/${symbol}`} 
          className="flex-1 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1"
        >
          Analysis
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <button className="px-3 py-2 rounded-lg border border-foreground/10 hover:border-foreground/20 text-xs font-semibold transition-colors">
          ★
        </button>
      </div>

      {/* Decorative gradient */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isPositive ? 'bg-brand-primary' : 'bg-brand-accent'}`} />
    </div>
  );
}
