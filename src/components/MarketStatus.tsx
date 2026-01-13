"use client";

import { useEffect, useState } from "react";

type Market = {
  city: string;
  region: string;
  timezone: string;
  openHour: number;
  closeHour: number;
};

const MARKETS: Market[] = [
  { city: "New York", region: "NYSE", timezone: "America/New_York", openHour: 9, closeHour: 16 },
  { city: "London", region: "LSE", timezone: "Europe/London", openHour: 8, closeHour: 16 },
  { city: "Tokyo", region: "TSE", timezone: "Asia/Tokyo", openHour: 9, closeHour: 15 },
  { city: "Jakarta", region: "IDX", timezone: "Asia/Jakarta", openHour: 9, closeHour: 16 },
];

export default function MarketStatus() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getMarketStatus = (market: Market) => {
    try {
      const marketTime = new Date(time.toLocaleString("en-US", { timeZone: market.timezone }));
      const hours = marketTime.getHours();
      const day = marketTime.getDay();
      
      // Weekend check (0 = Sunday, 6 = Saturday)
      if (day === 0 || day === 6) return { status: "Closed", color: "text-foreground/30", dot: "bg-foreground/20" };
      
      if (hours >= market.openHour && hours < market.closeHour) {
        return { status: "Open", color: "text-brand-primary", dot: "bg-brand-primary animate-pulse" };
      }
      return { status: "Closed", color: "text-brand-accent", dot: "bg-brand-accent" };
    } catch (e) {
      return { status: "Unknown", color: "text-foreground/30", dot: "bg-foreground/20" };
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {MARKETS.map((market) => {
        const { status, color, dot } = getMarketStatus(market);
        const timeString = time.toLocaleTimeString("en-US", { 
          timeZone: market.timezone, 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        });

        return (
          <div key={market.city} className="premium-card p-4 flex flex-col justify-between group hover:bg-foreground/5 transition-all duration-300 border border-foreground/5 hover:border-foreground/10 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-xl hover:shadow-lg hover:shadow-brand-primary/5 hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 group-hover:text-foreground/60 transition-colors">{market.region}</span>
              <div className={`w-2 h-2 rounded-full shadow-sm ${dot}`} />
            </div>
            
            <div className="mt-4">
              <div className="text-3xl font-black font-mono tracking-tighter tabular-nums text-foreground/90">{timeString}</div>
              <div className="flex justify-between items-center mt-2 border-t border-foreground/5 pt-2">
                <span className="text-xs font-bold text-foreground/50">{market.city}</span>
                <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-foreground/5 ${color}`}>{status}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
