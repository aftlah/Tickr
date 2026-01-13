"use client";

import { useEffect, useState } from "react";
import { getCryptoPrices, getUSStocks, getIndoStocks } from "@/lib/api";
import TickrCard from "@/components/TickrCard";
import MarketStatus from "@/components/MarketStatus";

export default function DashboardPage() {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [usStocks, setUsStocks] = useState<any[]>([]);
  const [indoStocks, setIndoStocks] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const allAssets = [...cryptoData, ...usStocks, ...indoStocks];
  const marketSentiment = allAssets.reduce((acc, curr) => acc + (parseFloat(curr.price_change_percentage_24h || curr.change || 0)), 0) / (allAssets.length || 1);
  const isBullish = marketSentiment >= 0;

  const filterData = (data: any[]) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      (item.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.symbol?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const renderContent = () => {
    const sections = [];
    
    if (activeTab === "all" || activeTab === "crypto") {
      sections.push({ title: "Crypto Assets", data: filterData(cryptoData), prefix: "CR" });
    }
    if (activeTab === "all" || activeTab === "us") {
      sections.push({ title: "US Stocks", data: filterData(usStocks), prefix: "US" });
    }
    if (activeTab === "all" || activeTab === "indo") {
      sections.push({ title: "Indo Stocks", data: filterData(indoStocks), prefix: "ID" });
    }

    return (
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.title} className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-foreground/10 to-foreground/5 border border-foreground/10 font-bold text-sm text-foreground/80 shadow-sm">
                {section.prefix}
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-foreground/10 to-transparent ml-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.data.map((asset: any, idx: number) => (
                <div key={asset.id || asset.symbol} className="h-64" style={{ animationDelay: `${idx * 50}ms` }}>
                  <TickrCard 
                    title={asset.name || asset.symbol}
                    symbol={asset.symbol}
                    value={parseFloat(asset.current_price || asset.price).toLocaleString()}
                    change={parseFloat(asset.price_change_percentage_24h || asset.change)}
                  />
                </div>
              ))}
              {section.data.length === 0 && (
                 <div className="col-span-full py-12 text-center text-foreground/40 border border-dashed border-foreground/10 rounded-xl">
                    No assets found matching "{searchTerm}"
                 </div>
              )}
            </div>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-8 relative lg:pb-32 min-h-screen">
       {/* Background decoration */}
       <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px]" />
       </div>

      <header className="flex flex-col gap-8 pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter">
              Terminal<span className="text-brand-primary">.</span>
            </h1>
            <p className="font-medium text-foreground/50 text-lg max-w-lg leading-relaxed">
              Global market intelligence at your fingertips.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col items-end gap-4">
            <div className="flex items-center gap-3 bg-foreground/5 p-1.5 rounded-2xl border border-foreground/5 backdrop-blur-sm">
               {['all', 'crypto', 'us', 'indo'].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                     activeTab === tab 
                     ? 'bg-background shadow-lg text-foreground scale-105' 
                     : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
                   }`}
                 >
                   {tab === 'all' ? 'Overview' : tab}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Search & Sentiment Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 relative group z-20">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-foreground/40 group-focus-within:text-brand-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search assets (e.g., BTC, TSLA, BBCA)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-foreground/10 rounded-2xl leading-5 bg-background/50 backdrop-blur-md text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all shadow-sm" 
              />
           </div>
           
           <div className="premium-card p-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-background to-foreground/5">
              <div>
                 <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-1">Market Sentiment</p>
                 <div className={`text-xl font-bold flex items-center gap-2 ${isBullish ? 'text-brand-primary' : 'text-brand-accent'}`}>
                    {isBullish ? 'BULLISH' : 'BEARISH'}
                    <span className="text-xs bg-current/10 px-2 py-0.5 rounded-full">
                       {marketSentiment > 0 ? '+' : ''}{marketSentiment.toFixed(2)}%
                    </span>
                 </div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isBullish ? 'bg-brand-primary/10' : 'bg-brand-accent/10'}`}>
                 <span className="text-2xl">{isBullish ? '🚀' : '🐻'}</span>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
           <MarketStatus />
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
}
