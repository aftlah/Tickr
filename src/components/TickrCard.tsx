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
    <div className={`premium-card p-5 flex flex-col gap-4 relative overflow-hidden group h-full justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/5 hover:-translate-y-1 border border-foreground/5 hover:border-foreground/10 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-xl`}>
      <div className="flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-brand-primary transition-colors">{title}</h3>
            {symbol && (
              <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-foreground/5 text-foreground/40 border border-foreground/5">
                {symbol}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
           <span className={`flex h-2 w-2 rounded-full ${isPositive ? 'bg-brand-primary' : 'bg-brand-accent'} animate-pulse`}></span>
        </div>
      </div>
      
      <div className="flex items-end justify-between z-10">
        <div className="flex flex-col">
           <p className="text-3xl font-black tracking-tighter tabular-nums text-foreground/90">${value}</p>
           {change !== undefined && (
            <div className={`flex items-center gap-1.5 font-bold text-sm mt-1 ${isPositive ? 'text-brand-primary' : 'text-brand-accent'}`}>
               <span className="flex items-center justify-center w-4 h-4 rounded-full bg-current/10 text-[10px]">
                  {isPositive ? '▲' : '▼'}
               </span>
               <span>{Math.abs(change).toFixed(2)}%</span>
            </div>
          )}
        </div>
        
        {/* Visual Sparkline */}
        <div className="h-10 w-24 opacity-40 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-110 origin-bottom-right">
          <svg viewBox="0 0 80 20" className="w-full h-full overflow-visible drop-shadow-sm">
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "var(--color-brand-primary)" : "var(--color-brand-accent)"} stopOpacity="0.5" />
                <stop offset="100%" stopColor={isPositive ? "var(--color-brand-primary)" : "var(--color-brand-accent)"} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d={sparklinePath} 
              fill="none" 
              stroke={isPositive ? "var(--color-brand-primary)" : "var(--color-brand-accent)"} 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />
             <path 
              d={`${sparklinePath} L80,20 L0,20 Z`} 
              fill={`url(#gradient-${symbol})`} 
              stroke="none"
              className="opacity-20"
            />
          </svg>
        </div>
      </div>

      <div className="mt-2 flex gap-2 z-10 pt-4 border-t border-foreground/5 opacity-80 group-hover:opacity-100 transition-opacity">
        <Link 
          href={`/asset/${symbol}`} 
          className="flex-1 py-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-xs font-bold transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
        >
          View Analysis
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Decorative gradient glow */}
      <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${isPositive ? 'bg-brand-primary' : 'bg-brand-accent'}`} />
    </div>
  );
}
