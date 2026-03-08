import { useNavigate } from "react-router-dom";

const models = [
  { id: "A2X", label: "Account", desc: "Account to Everything" },
  { id: "AG2X", label: "Agent", desc: "Agent to Everything" },
  { id: "AI2X", label: "AI", desc: "AI to Everything" },
  { id: "AV2X", label: "Avatar", desc: "Avatar to Everything" },
  { id: "B2X", label: "Business", desc: "Business to Everything" },
  { id: "C2X", label: "Consumer", desc: "Consumer to Everything" },
  { id: "D2X", label: "Direct", desc: "Direct to Everything" },
  { id: "DAO2X", label: "DAO", desc: "DAO to Everything" },
  { id: "DEV2X", label: "Developer", desc: "Developer to Everything" },
  { id: "E2X", label: "Employee", desc: "Employee to Everything" },
  { id: "G2X", label: "Government", desc: "Government to Everything" },
  { id: "I2X", label: "Institution", desc: "Institution to Everything" },
  { id: "ID2X", label: "Identity", desc: "Identity to Everything" },
  { id: "LAW2X", label: "Law", desc: "Legal/Compliance to Everything" },
  { id: "M2X", label: "Machine", desc: "Machine to Everything" },
  { id: "MF2X", label: "Manufacturer", desc: "Manufacturer to Everything" },
  { id: "N2X", label: "Many", desc: "Many to Everything" },
  { id: "P2X", label: "Prosumer", desc: "Prosumer to Everything" },
  { id: "Apps2X", label: "Apps", desc: "Apps to Everything" },
  { id: "AD2X", label: "Administration", desc: "Administration to Everything" },
];

const UniversalCommerce = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Universal <span className="gradient-text">Commerce</span>
          </h2>
          <p className="text-lg text-primary font-display mb-2">380+ Commerce Models</p>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-sm">
            Every entity connects to every other entity. 20 primary models, each with 18 target connections.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {models.map((model) => (
            <div key={model.id} className="glass-card rounded-xl p-4 text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navigate("/universal-commerce")}>
              <div className="text-lg font-display font-bold text-primary mb-1">{model.id}</div>
              <div className="text-xs font-display text-foreground mb-1">{model.label}</div>
              <div className="text-[10px] text-muted-foreground">{model.desc}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/universal-commerce")}
            className="text-sm text-primary hover:text-primary/80 font-display transition-colors underline underline-offset-4"
          >
            Explore all 380+ Commerce Pathways →
          </button>
        </div>
      </div>
    </section>
  );
};

export default UniversalCommerce;
