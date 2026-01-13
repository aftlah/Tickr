import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background selection:bg-brand-primary/20 selection:text-brand-primary">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/10 rounded-full blur-[120px] animate-[float_12s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-brand-accent/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center pt-20 pb-32 px-4 max-w-7xl mx-auto w-full relative z-10">
          
          {/* Badge */}
          <div className="mb-8 animate-[float_4s_ease-in-out_infinite]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/5 border border-brand-primary/20 rounded-full backdrop-blur-md shadow-[0_0_20px_-5px_var(--color-brand-primary)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Live Market Data v2.0</span>
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 select-none">
            TRADE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent animate-pulse-slow">FASTER.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl font-medium leading-relaxed mb-12">
            The next generation of financial intelligence. 
            <span className="text-foreground font-bold"> Zero latency</span>. 
            <span className="text-foreground font-bold"> Infinite possibilities</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link href="/dashboard" className="group relative px-8 py-4 bg-foreground text-background rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(var(--foreground),0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                Launch Dashboard
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
            </Link>
            <button className="px-8 py-4 bg-background border border-foreground/10 rounded-2xl font-bold text-lg text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all hover:scale-105 backdrop-blur-sm">
              View Documentation
            </button>
          </div>

          {/* Abstract Dashboard Visual */}
          <div className="relative w-full max-w-4xl mx-auto [perspective:2000px] group">
            <div className="relative aspect-[16/9] bg-gradient-to-br from-foreground/5 to-foreground/2 rounded-2xl border border-foreground/10 backdrop-blur-xl shadow-2xl transition-all duration-700 [transform:rotateX(12deg)] group-hover:[transform:rotateX(0deg)] group-hover:scale-105 group-hover:shadow-brand-primary/20">
              
              {/* Fake UI Elements */}
              <div className="absolute inset-0 p-6 flex flex-col gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                {/* Header */}
                <div className="h-8 w-full flex justify-between items-center border-b border-foreground/10 pb-4">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/50" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                     <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <div className="h-2 w-32 bg-foreground/10 rounded-full" />
                </div>
                {/* Body */}
                <div className="flex-1 flex gap-4">
                  <div className="w-1/4 h-full bg-foreground/5 rounded-lg animate-pulse" />
                  <div className="flex-1 h-full bg-foreground/5 rounded-lg flex items-end p-4 gap-2">
                     {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-brand-primary/20 rounded-t-sm transition-all duration-500 group-hover:bg-brand-primary/50" style={{ height: `${h}%` }} />
                     ))}
                  </div>
                </div>
              </div>

              {/* Reflection/Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
            </div>
            
            {/* Floor Reflection */}
            <div className="absolute -bottom-20 left-10 right-10 h-20 bg-gradient-to-b from-brand-primary/20 to-transparent blur-3xl opacity-50 transform scale-x-90" />
          </div>

        </section>

        {/* Features Grid */}
        <section className="w-full max-w-7xl mx-auto px-4 pb-32">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Why Tickr?</h2>
              <p className="text-foreground/60 max-w-xl mx-auto">Built for those who demand more than just numbers.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-time Precision",
                  desc: "Updates as fast as the market moves. 50ms latency globally.",
                  icon: "⚡",
                  gradient: "from-brand-primary/20 to-transparent"
                },
                {
                  title: "Institutional Grade",
                  desc: "Powered by the same APIs used by top hedge funds and banks.",
                  icon: "🏛️",
                  gradient: "from-brand-secondary/20 to-transparent"
                },
                {
                  title: "Beautiful Analytics",
                  desc: "Data visualization that tells a story, not just a spreadsheet.",
                  icon: "🎨",
                  gradient: "from-brand-accent/20 to-transparent"
                }
              ].map((item, i) => (
                <div key={i} className="group relative p-8 rounded-3xl bg-foreground/5 border border-foreground/5 overflow-hidden hover:bg-foreground/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                   <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                   
                   <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-background shadow-inner flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors">
                        {item.desc}
                      </p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Bottom CTA */}
        <section className="w-full bg-foreground text-background py-32 px-4 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 grayscale"></div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Ready to start trading?</h2>
              <Link href="/dashboard" className="inline-block px-12 py-5 bg-background text-foreground rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">
                 Get Started Now
              </Link>
           </div>
        </section>
      </main>

      <footer className="w-full border-t border-foreground/10 py-12 text-center text-foreground/40 text-sm">
        <p>© 2026 Tickr Inc. All rights reserved. Market data is delayed by 15 minutes.</p>
      </footer>
    </div>
  );
}
