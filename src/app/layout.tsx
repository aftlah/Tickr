import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tickr | Smart Market Intelligence",
  description: "Monitor crypto and stock prices with elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen selection:bg-brand-primary selection:text-white">
        <nav className="border-b border-white/5 p-4 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Tickr<span className="text-brand-primary text-3xl">.</span>
            </h1>
            <div className="flex gap-6 font-medium text-sm text-foreground/70">
              <a href="/" className="hover:text-brand-primary transition-colors">Home</a>
              <a href="/dashboard" className="hover:text-brand-primary transition-colors">Dashboard</a>
              <a href="/watchlist" className="hover:text-brand-primary transition-colors">Watchlist</a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4 md:p-8">
          {children}
        </main>
        <footer className="border-t border-white/5 p-12 mt-20 text-center">
          <p className="font-medium text-foreground/40 text-sm">
            &copy; 2026 Tickr Labs. Market intelligence for the modern era.
          </p>
        </footer>
      </body>
    </html>
  );
}
