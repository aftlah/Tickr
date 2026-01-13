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
  
  return (
    <div className={`premium-card p-6 flex flex-col gap-4 relative overflow-hidden group`}>
      <div className="flex justify-between items-start z-10">
        <div>
          <h3 className="font-bold text-lg text-foreground/80">{title}</h3>
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">{symbol}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isPositive ? 'bg-brand-primary' : 'bg-brand-accent'}`} />
          <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50">Live</span>
        </div>
      </div>
      
      <div className="mt-2 z-10">
        <p className="text-3xl font-bold tracking-tight tabular-nums">${value}</p>
        {change !== undefined && (
          <div className={`flex items-center gap-1 mt-1 font-bold text-sm ${isPositive ? 'text-brand-primary' : 'text-brand-accent'}`}>
             <span className="text-xs">{isPositive ? '▲' : '▼'}</span>
             <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2 z-10">
        <button className="premium-btn premium-btn-primary text-xs flex-1">Overview</button>
        <button className="premium-btn premium-btn-secondary text-xs">
          <span className="opacity-60">★</span>
        </button>
      </div>

      {/* Decorative gradient */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[80px] opacity-20 pointer-events-none ${isPositive ? 'bg-brand-primary' : 'bg-brand-accent'}`} />
    </div>
  );
}
