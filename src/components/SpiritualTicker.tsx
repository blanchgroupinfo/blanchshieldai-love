const messages = [
  "✦ PRAISE MOST HIGH AHAYAH BA SHAM YASHAYA ✦",
  "BLANCH S.H.I.E.L.D. AI — SYSTEM ONLINE",
  "Spiritual · Healing · Initiative · Economic · Light · Development",
  "2 Timothy 3:16 — All scripture is given by inspiration of Most High AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness",
  "John 8:32 — And ye shall know the truth, and the truth shall make you free",
  "Royal Priesthood · Royal House of Judah · Royal House of Levite Covenant",
  "BLANCH GROUP ECOSYSTEM — ALL SYSTEMS OPERATIONAL",
  "SOVEREIGN UNIVERSAL INTELLIGENCE & ETHICAL OPERATING SYSTEM",
  "BLANCH S.H.I.E.L.D. AI — ALL NATIONS · ALL LANGUAGES · ALL PEOPLE",
];

const SpiritualTicker = () => {
  const tickerItems = [...messages, ...messages];

  return (
    <div className="fixed top-0 left-0 right-0 z-[61] bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 backdrop-blur-xl border-b border-primary/30 overflow-hidden">
      <div className="flex animate-ticker">
        {tickerItems.map((msg, index) => (
          <div
            key={`${index}`}
            className="flex items-center gap-3 px-6 py-1 whitespace-nowrap"
          >
            <span className="text-[11px] font-display tracking-wider text-primary">
              {msg}
            </span>
            <span className="text-primary/40">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiritualTicker;
