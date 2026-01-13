"use client";

import { useEffect, useState } from "react";
import { getCryptoPrices, getUSStocks, getIndoStocks } from "@/lib/api";
import TickrCard from "@/components/TickrCard";

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
      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6 text-foreground flex-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 whitespace-nowrap">{categoryPrefix} / {title}</h2>
            <div className="flex-1 h-px bg-current opacity-10"></div>
          </div>
          {data.length > limit && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="premium-btn premium-btn-secondary text-[10px] uppercase font-bold tracking-widest px-4 py-2 ml-4"
            >
              {showAll ? "Show Less" : "View More Assets"}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData.map((asset: any) => (
            <TickrCard 
              key={asset.id || asset.symbol}
              title={asset.name || asset.symbol}
              symbol={asset.symbol}
              value={parseFloat(asset.current_price || asset.price).toLocaleString()}
              change={parseFloat(asset.price_change_percentage_24h || asset.change)}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-16 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">Market Terminal</h1>
          <p className="font-medium text-foreground/40 mt-1 uppercase tracking-[0.2em] text-xs">Top Assets by 24h Trading Volume</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Real-time Feed</span>
           </div>
           <div className="h-4 w-px bg-white/10" />
           <span className="text-[10px] font-bold opacity-40">High Volume Focus</span>
        </div>
      </header>

      <div className="space-y-24">
        {renderSection("Most Active Crypto", cryptoData, 3, showAllCrypto, setShowAllCrypto, "01")}
        {renderSection("Active US Markets", usStocks, 3, showAllUS, setShowAllUS, "02")}
        {renderSection("IDX Volume Leaders", indoStocks, 3, showAllIndo, setShowAllIndo, "03")}
      </div>
    </div>
  );
}
