import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 py-20 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -z-10 animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[120px] -z-10 animate-[float_10s_ease-in-out_infinite_reverse]" />

      <section className="flex flex-col items-center text-center gap-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/5 border border-brand-primary/20 rounded-full text-brand-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-brand-primary/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
          </span>
          Next Generation Intelligence
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight max-w-5xl leading-[0.9]">
          Market Monitoring <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/40 italic">Elevated.</span>
        </h1>
        
        <p className="text-xl text-foreground/60 max-w-xl font-medium leading-relaxed">
          Experience real-time market data through a lens of clarity and precision. 
          Built for the modern investor who values both <span className="text-foreground font-bold">speed</span> and <span className="text-foreground font-bold">aesthetics</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/dashboard" className="premium-btn premium-btn-primary text-lg px-10 py-4 shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/40 bg-brand-primary text-white">
            Enterprise Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <button className="premium-btn bg-white/5 border border-white/10 text-foreground text-lg px-10 py-4 hover:bg-white/10">
            Documentation
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          { 
            title: "Ultra Low Latency", 
            text: "60s ISR revalidation ensures your data stays fresh without compromising performance.",
            color: "bg-brand-primary/5 border-brand-primary/10",
            icon: "⚡"
          },
          { 
            title: "Bitget Integration", 
            text: "Real-time crypto feeds powered by Bitget's high-frequency trading API infrastructure.",
             color: "bg-brand-secondary/5 border-brand-secondary/10",
             icon: "🔗"
          },
          { 
            title: "Deep Visualization", 
            text: "Interactive analytical tools designed to reveal market trends with crystalline clarity.",
             color: "bg-brand-accent/5 border-brand-accent/10",
             icon: "📊"
          }
        ].map((feature, i) => (
          <div key={i} className={`premium-card p-10 flex flex-col gap-6 ${feature.color} group`}>
            <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center text-2xl border border-white/5 shadow-inner">
              {feature.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-primary transition-colors">{feature.title}</h2>
              <p className="text-foreground/60 font-medium leading-relaxed">{feature.text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
