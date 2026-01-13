import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 py-20 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px] -z-10" />

      <section className="flex flex-col items-center text-center gap-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-xs font-bold uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
          </span>
          Next Generation Intelligence
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight max-w-4xl">
          Market Monitoring <br />
          <span className="text-foreground/40 italic">Elevated.</span>
        </h1>
        
        <p className="text-xl text-foreground/60 max-w-xl font-medium">
          Experience real-time market data through a lens of clarity and precision. 
          Built for the modern investor who values both <span className="text-foreground font-bold">speed</span> and <span className="text-foreground font-bold">aesthetics</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/dashboard" className="premium-btn premium-btn-primary text-lg px-10 py-4 shadow-lg shadow-brand-primary/20">
            Enterprise Dashboard
          </Link>
          <button className="premium-btn premium-btn-secondary text-lg px-10 py-4">
            Documentation
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Ultra Low Latency", 
            text: "60s ISR revalidation ensures your data stays fresh without compromising performance.",
            color: "bg-brand-primary/5 border-brand-primary/20"
          },
          { 
            title: "Bitget Integration", 
            text: "Real-time crypto feeds powered by Bitget's high-frequency trading API infrastructure.",
             color: "bg-brand-secondary/5 border-brand-secondary/20"
          },
          { 
            title: "Deep Visualization", 
            text: "Interactive analytical tools designed to reveal market trends with crystalline clarity.",
             color: "bg-brand-accent/5 border-brand-accent/20"
          }
        ].map((feature, i) => (
          <div key={i} className={`premium-card p-10 flex flex-col gap-4 border ${feature.color}`}>
            <h2 className="text-2xl font-bold">{feature.title}</h2>
            <p className="text-foreground/60 font-medium leading-relaxed">{feature.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
