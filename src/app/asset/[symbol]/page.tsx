import { getAssetDetail } from "@/lib/api";
import AssetChart from "@/components/AssetChart";
import Link from "next/link";

export default async function AssetDetailPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const data = await getAssetDetail(symbol);
  // Simulating quote data for demo since detail API is a placeholder
  const quote = {
    "05. price": "0.00",
    "10. change percent": "0.00%",
    "03. high": "0.00",
    "04. low": "0.00",
    "06. volume": "0",
    "08. previous close": "0.00"
  };
  
  const isPositive = quote["10. change percent"] && !quote["10. change percent"].includes("-");

  return (
    <div className="flex flex-col gap-10 py-8 relative">
       {/* Background decoration */}
       <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Link href="/dashboard" className="premium-btn self-start text-xs font-bold uppercase tracking-widest px-6 py-3 bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 text-foreground/60 hover:text-foreground">
        ← Return to Terminal
      </Link>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-foreground text-background p-10 rounded-3xl shadow-2xl relative overflow-hidden ring-1 ring-white/10">
        <div className="z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4">Asset Intelligence Report</p>
          <h1 className="text-7xl font-bold tracking-tighter">{symbol}</h1>
        </div>
        <div className="text-left md:text-right z-10">
          <p className="text-6xl font-bold tracking-tight tabular-nums">${quote["05. price"] || "0.00"}</p>
          <div className={`inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md ${isPositive ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/20' : 'bg-brand-accent/20 text-brand-accent border border-brand-accent/20'}`}>
             <span>{quote["10. change percent"] || "0.00%"}</span>
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
                { label: "Day High", value: quote["03. high"] },
                { label: "Day Low", value: quote["04. low"] },
                { label: "Volume", value: quote["06. volume"] },
                { label: "Prev Close", value: quote["08. previous close"] }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-foreground/5 last:border-0 group hover:bg-foreground/5 -mx-4 px-4 transition-colors">
                  <span className="opacity-50 text-sm font-medium">{stat.label}</span>
                  <span className="tabular-nums font-bold text-lg">${stat.value}</span>
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
