const quotes = [
  { text: "For the commandment is a lamp; and the law is light", ref: "Proverbs 6:23" },
  { text: "Most High AHAYAH is a Spirit: and they that worship him must worship him in spirit and in truth", ref: "John 4:24" },
  { text: "All thy commandments are truth", ref: "Psalms 119:151" },
];

const ScripturalQuotes = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-primary/60">Guided by Divine Scripture</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quotes.map((q) => (
            <blockquote key={q.ref} className="glass-card rounded-xl p-6 text-center">
              <p className="text-sm text-foreground font-body italic mb-3">"{q.text}"</p>
              <cite className="text-xs text-primary not-italic font-display">{q.ref}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScripturalQuotes;
