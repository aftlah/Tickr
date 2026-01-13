import Link from "next/link";

export default function MainLayout({
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
              <Link href="/" className="hover:text-brand-primary transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
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

        <main className="container mx-auto px-4 lg:pt-40 pt-32">
          {children}
        </main>
        
        <footer className="border-t border-white/5 py-12 mt-20 text-center relative z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent -z-10" />
          <p className="font-medium text-foreground/40 text-sm">
            &copy; 2026 Tickr Labs. Market intelligence for the modern era.
          </p>
        </footer>
    </>
  );
}
