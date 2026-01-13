"use client";

import { useEffect, useState } from "react";
import TickrCard from "@/components/TickrCard";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tickr_watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex flex-col gap-12 py-8">
      <header>
        <h1 className="text-5xl font-bold tracking-tight">Your Stash</h1>
        <p className="font-medium text-foreground/40 mt-1 uppercase tracking-[0.2em] text-xs">Curated list of watched liquidity</p>
      </header>

      {watchlist.length === 0 ? (
        <div className="premium-card p-20 text-center bg-brand-primary/5 border-dashed border-2 border-brand-primary/20">
          <h2 className="text-2xl font-bold mb-2">Portfolio Empty</h2>
          <p className="text-foreground/50 font-medium">Start monitoring assets to build your alpha.</p>
          <a href="/dashboard" className="premium-btn premium-btn-primary inline-flex mt-8 px-8">
            Browse Market
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {watchlist.map((item) => (
            <TickrCard 
              key={item.symbol}
              title={item.name || item.symbol}
              symbol={item.symbol}
              value={item.price}
              change={item.change}
            />
          ))}
        </div>
      )}
    </div>
  );
}
