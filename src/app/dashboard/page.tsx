"use client";

import { useEffect, useState } from "react";
import { getCryptoPrices, getUSStocks, getIndoStocks } from "@/lib/api";
import TickrCard from "@/components/TickrCard";
import MarketStatus from "@/components/MarketStatus";

export default function DashboardPage() {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [usStocks, setUsStocks] = useState<any[]>([]);
  const [indoStocks, setIndoStocks] = useState<any[]>([]);
  
  const [showAllCrypto, setShowAllCrypto] = useState(false);
  const [showAllUS, setShowAllUS] = useState(false);
  const [showAllIndo, setShowAllIndo] = useState(false);

  useEffect(() => {
    async function init() {
      // Fetch data without limits initially to manage "Show More" client-side
      const [c, u, i] = await Promise.all([
        getCryptoPrices(),
        getUSStocks(),
        getIndoStocks()
      ]);
      setCryptoData(c);
      setUsStocks(u);
      setIndoStocks(i);
    }
    init();
  }, []);

  const renderSection = (
    title: string, 
    data: any[], 
    limit: number, 
    showAll: boolean, 
    setShowAll: (v: boolean) => void,
    categoryPrefix: string
  ) => {
    const displayData = showAll ? data : data.slice(0, limit);
    return (
      <section className="relative">
        <div className="flex items-center justify-between mb-8 sticky top-24 z-30 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 rounded-xl border border-transparent">
          <div className="flex items-center gap-4 text-foreground flex-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/5 font-bold text-xs text-foreground/60">
              {categoryPrefix}
            </div>
            <h2 className="text-lg font-bold tracking-tight">{title}</h2>
          </div>
          {data.length > limit && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="premium-btn bg-foreground/5 hover:bg-foreground/10 text-[10px] uppercase font-bold tracking-widest px-4 py-2 border border-foreground/5"
            >
              {showAll ? "Collapse" : "View All"}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayData.map((asset: any) => (
            <div key={asset.id || asset.symbol} className="h-64">
              <TickrCard 
                title={asset.name || asset.symbol}
                symbol={asset.symbol}
                value={parseFloat(asset.current_price || asset.price).toLocaleString()}
                change={parseFloat(asset.price_change_percentage_24h || asset.change)}
              />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-12 py-8 relative lg:py-32">
       {/* Background decoration */}
       <div className="fixed top-20 right-20 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
       <div className="fixed bottom-20 left-20 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <header className="flex flex-col gap-8 pb-8 border-b border-foreground/5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold tracking-tighter">Terminal<span className="text-brand-primary">.</span></h1>
            <p className="font-medium text-foreground/50 text-lg max-w-lg leading-relaxed">
              Real-time cross-market analysis. Monitoring global assets with millisecond precision.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col items-end gap-4">
            {/* Search Bar Visual */}
            <div className="relative group w-full lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-foreground/40 group-focus-within:text-brand-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2.5 border border-foreground/10 rounded-xl leading-5 bg-foreground/5 text-foreground placeholder-foreground/40 focus:outline-none focus:bg-background focus:ring-1 focus:ring-brand-primary focus:border-brand-primary sm:text-sm transition-all" 
                placeholder="Search assets (e.g. BTC, AAPL)..." 
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-foreground/20 text-xs font-mono border border-foreground/10 rounded px-1.5 py-0.5">/</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-medium text-foreground/40">
               <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
               System Operational
               <span className="mx-2">|</span>
               v2.4.0-stable
            </div>
          </div>
        </div>

        {/* Global Market Status Widget */}
        <div className="mt-4">
           <MarketStatus />
        </div>
      </header>

      <div className="space-y-20">
        {renderSection("Cryptocurrency Assets", cryptoData, 4, showAllCrypto, setShowAllCrypto, "01")}
        {renderSection("US Equity Markets", usStocks, 4, showAllUS, setShowAllUS, "02")}
        {renderSection("IDX Local Markets", indoStocks, 4, showAllIndo, setShowAllIndo, "03")}
      </div>
    </div>
  );
}
