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
      <body className="antialiased min-h-screen selection:bg-brand-primary selection:text-white bg-background relative">
        <div className="fixed inset-0 bg-grid-pattern -z-10 pointer-events-none opacity-50" />
        {children}
      </body>
    </html>
  );
}
