"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <>
        {/* Ticker Tape - Fixed Top */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-background/80 backdrop-blur-md border-b border-foreground/5 h-10 flex items-center overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap gap-8 w-full">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="flex gap-8 items-center">
                  {["BTC +2.4%", "ETH +1.8%", "NVDA +4.2%", "TSLA -1.2%", "AAPL +0.5%", "GOOGL +1.1%", "MSFT +0.8%", "AMZN +2.1%", "SOL +5.4%", "XRP +0.9%"].map((item, j) => {
                    const [symbol, change] = item.split(" ");
                    const isPositive = change.startsWith("+");
                    return (
                      <div key={j} className="flex items-center gap-2 text-xs font-mono font-bold">
                        <span className="text-foreground/70">{symbol}</span>
                        <span className={isPositive ? "text-brand-primary" : "text-brand-accent"}>{change}</span>
                      </div>
                    );
                  })}
               </div>
            ))}
          </div>
        </div>

        <nav className="fixed top-14 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 transition-all duration-300">
          <div className="premium-card !rounded-full !border-white/10 !bg-background/70 !backdrop-blur-md px-6 py-3 flex justify-between items-center shadow-2xl shadow-black/20 hover:border-brand-primary/20 transition-colors">
             <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-1">
              Tickr<span className="text-brand-primary text-2xl leading-none">.</span>
            </Link>
            <div className="flex gap-8 font-medium text-sm text-foreground/70">
              <Link href="/" className={`hover:text-brand-primary transition-colors relative group ${isActive('/') ? 'text-brand-primary' : ''}`}>
                Home
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
              <Link href="/dashboard" className={`hover:text-brand-primary transition-colors relative group ${isActive('/dashboard') ? 'text-brand-primary' : ''}`}>
                Dashboard
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all ${isActive('/dashboard') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
              <Link href="/watchlist" className={`hover:text-brand-primary transition-colors relative group ${isActive('/watchlist') ? 'text-brand-primary' : ''}`}>
                Watchlist
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all ${isActive('/watchlist') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            </div>
          </div>
        </nav>

        <main className="w-full pt-32">
          {children}
        </main>
    </>
  );
}
