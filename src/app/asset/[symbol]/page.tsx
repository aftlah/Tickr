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
    <div className="flex flex-col gap-10 py-8">
      <Link href="/dashboard" className="premium-btn premium-btn-secondary self-start text-xs font-bold uppercase tracking-widest px-4 py-2">
        ← Terminal
      </Link>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-foreground text-background p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Asset Intelligence Report</p>
          <h1 className="text-6xl font-bold tracking-tighter">{symbol}</h1>
        </div>
        <div className="text-left md:text-right z-10">
          <p className="text-5xl font-bold tracking-tight tabular-nums">${quote["05. price"] || "0.00"}</p>
          <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-accent/20 text-brand-accent'}`}>
             <span>{quote["10. change percent"] || "0.00%"}</span>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] z-0" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <AssetChart symbol={symbol} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="premium-card p-8 bg-background border border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] opacity-40 mb-6">Market Metrics</h3>
            <div className="flex flex-col gap-4 font-semibold text-sm">
              {[
                { label: "Day High", value: quote["03. high"] },
                { label: "Day Low", value: quote["04. low"] },
                { label: "Volume", value: quote["06. volume"] },
                { label: "Prev Close", value: quote["08. previous close"] }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="opacity-50">{stat.label}</span>
                  <span className="tabular-nums font-bold">${stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="premium-btn premium-btn-primary w-full py-6 text-sm font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/10">
            Track Asset
          </button>
        </div>
      </div>
    </div>
  );
}
