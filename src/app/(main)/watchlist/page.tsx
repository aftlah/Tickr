"use client";

import { useEffect, useState } from "react";
import TickrCard from "@/components/TickrCard";
import Link from "next/link";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tickr_watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-8 relative">
       {/* Background decoration */}
       <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <header className="flex flex-col md:flex-row justify-between items-end gap-6 pb-8 border-b border-foreground/5">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">Your Stash</h1>
          <p className="font-medium text-foreground/40 mt-2 uppercase tracking-[0.2em] text-xs">Curated list of watched liquidity</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/5 text-xs font-bold text-foreground/60">
           <span>{watchlist.length} Assets Tracked</span>
        </div>
      </header>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-foreground/5 flex items-center justify-center mb-6 animate-pulse">
            <span className="text-4xl opacity-20">★</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Portfolio Empty</h2>
          <p className="text-foreground/50 font-medium max-w-md mx-auto mb-8 leading-relaxed">
            Start monitoring assets to build your market intelligence. Track stocks, crypto, and indices here.
          </p>
          <Link href="/dashboard" className="premium-btn bg-brand-primary text-white shadow-xl shadow-brand-primary/20 hover:scale-105 transition-transform">
            Browse Market Terminal
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlist.map((item) => (
            <div key={item.symbol} className="h-64 relative group">
              <div className="absolute -top-2 -right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="bg-brand-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    // Basic removal logic for demo
                    const updated = watchlist.filter(w => w.symbol !== item.symbol);
                    setWatchlist(updated);
                    localStorage.setItem("tickr_watchlist", JSON.stringify(updated));
                  }}
                >
                  ×
                </button>
              </div>
              <TickrCard 
                title={item.name || item.symbol}
                symbol={item.symbol}
                value={item.price}
                change={item.change}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
