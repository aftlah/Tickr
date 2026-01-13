import { getAssetDetail } from "@/lib/api";
import AssetChart from "@/components/AssetChart";
import Link from "next/link";

export default async function AssetDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;

  if (!symbol || symbol === "undefined" || symbol === "UNDEFINED" || symbol === "null") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-2">
          <span className="text-4xl opacity-30">?</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Asset Not Found</h1>
        <p className="text-foreground/60 max-w-md">
          The requested asset identifier is invalid or could not be retrieved from the market data stream.
        </p>
        <Link href="/dashboard" className="premium-btn bg-brand-primary text-white px-8 py-4 shadow-xl shadow-brand-primary/20 hover:brightness-110 mt-4">
          Return to Terminal
        </Link>
      </div>
    );
  }

  const data = await getAssetDetail(symbol);
  
  // Use fetched data if available, otherwise fallback to safe default
  const quote = data ? {
    price: data.price || "0.00",
    change: data.change_percent || "0.00",
    high: data.high || "0.00",
    low: data.low || "0.00",
    volume: data.volume || "0",
    prevClose: data.prev_close || "0.00",
    name: data.name || symbol
  } : {
    price: "0.00",
    change: "0.00",
    high: "0.00",
    low: "0.00",
    volume: "0",
    prevClose: "0.00",
    name: symbol
  };
  
  const isPositive = quote.change && !String(quote.change).includes("-");

  return (
    <div className="flex flex-col gap-10 pb-8 relative">
       {/* Background decoration */}
       <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Link href="/dashboard" className="premium-btn self-start text-xs font-bold uppercase tracking-widest px-6 py-3 bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 text-foreground/60 hover:text-foreground">
        ← Return to Terminal
      </Link>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-foreground text-background p-10 rounded-3xl shadow-2xl relative overflow-hidden ring-1 ring-white/10">
        <div className="z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4">Asset Intelligence Report</p>
          <h1 className="text-7xl font-bold tracking-tighter">{quote.name}</h1>
          <p className="text-xl opacity-60 font-mono mt-2">{symbol}</p>
        </div>
        <div className="text-left md:text-right z-10">
          <p className="text-6xl font-bold tracking-tight tabular-nums">${quote.price}</p>
          <div className={`inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md ${isPositive ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/20' : 'bg-brand-accent/20 text-brand-accent border border-brand-accent/20'}`}>
             <span>{quote.change}%</span>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-primary/20 to-transparent rounded-full blur-[80px] z-0 opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-overlay" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AssetChart symbol={symbol} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="premium-card p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              Market Metrics
            </h3>
            <div className="flex flex-col gap-0">
              {[
                { label: "Day High", value: quote.high },
                { label: "Day Low", value: quote.low },
                { label: "Volume", value: quote.volume },
                { label: "Prev Close", value: quote.prevClose }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-foreground/5 last:border-0 group hover:bg-foreground/5 -mx-4 px-4 transition-colors">
                  <span className="opacity-50 text-sm font-medium">{stat.label}</span>
                  <span className="tabular-nums font-bold text-lg">{stat.label === "Volume" ? "" : "$"}{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="premium-btn w-full py-6 text-sm font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/10 bg-brand-primary text-white hover:brightness-110 border-0">
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
