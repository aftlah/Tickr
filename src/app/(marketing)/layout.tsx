import Link from "next/link";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
          <div className="premium-card !rounded-full !border-white/10 !bg-background/70 !backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-2xl shadow-black/20">
             <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-1">
              Tickr<span className="text-brand-primary text-3xl leading-none">.</span>
            </Link>
            <div className="flex gap-8 font-medium text-sm text-foreground/70">
              <Link href="/" className="hover:text-brand-primary transition-colors relative group text-brand-primary">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-brand-primary transition-colors relative group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </Link>
              <Link href="/watchlist" className="hover:text-brand-primary transition-colors relative group">
                Watchlist
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </Link>
            </div>
          </div>
        </nav>

        <main className="w-full">
          {children}
        </main>
    </>
  );
}
