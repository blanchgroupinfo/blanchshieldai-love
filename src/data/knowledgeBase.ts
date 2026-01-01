export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  scriptures?: string[];
}

export const knowledgeBase: KnowledgeItem[] = [
  {
    id: "blanch-group",
    title: "About Blanch Group",
    category: "Organization",
    content: "The Blanch Group is a Sovereign Investment and Indigenous Tribal Association Trust—an irrevocable, tax-exempt charitable entity focused on technology research, financial technology solutions, and educational development aimed at alleviating poverty. Our mission centers on advancing Spiritual Family House Smart Cities, guided by the Laws, Statutes, and Commandments of the Most High AHAYAH and His Son YASHAYA.",
    scriptures: ["1 Peter 2:9", "Exodus 19:6"]
  },
  {
    id: "heed-program",
    title: "The H.E.E.D. Program",
    category: "Programs",
    content: "Health, Education, Enterprising, and Development — a framework designed to stabilize global communities through digital currencies, emerging ventures, and sustainable development. Positioned in key markets including tourism and consumer hubs, we aim for long-term worldwide expansion.",
  },
  {
    id: "spiritual-foundation",
    title: "Spiritual Foundation",
    category: "Foundation",
    content: "Established in 2018, The Blanch Group aspires to be a global pillar for economic renewal and righteous enterprise. We are bridge builders, encouraging collaboration, unity, and advancement. Our mission is to uphold Divine Law, foster truth, prosperity, peace, and to prepare a foundation for Holy Days, Feasts, and the Sabbath.",
    scriptures: ["Proverbs 6:23", "Psalms 119:142", "John 8:32"]
  },
  {
    id: "dlt-technology",
    title: "Distributed Ledger Technology",
    category: "Technology",
    content: "An all-in-one Distributed Ledger Technology with Directed Acyclic Graph (DAG) beyond 15B+ TPS per second with no transaction fees, no mining, unlimited infinite scalability. Digital Banking platform designed for All Financial Banking, Wallet, Asset Management, Business Networks, Compliance & KYC, and more.",
  },
  {
    id: "blanch-corridor",
    title: "The Blanch Corridor",
    category: "Vision",
    content: "Our long-term mission is to develop eco-friendly smart cities for a unified Global Resource Economy, forming the Blanch Corridor—a network of Business, Finance, Clean Entertainment, Philanthropy, and Recreation. These developments aim to build abundance, peace, and spiritual prosperity.",
  },
  {
    id: "core-modules",
    title: "Core AI Modules",
    category: "Technology",
    content: "BLANCH S.H.I.E.L.D. AI includes: AI-Agents (Custom, clone, twin, trustee, affiliate, payment agents), AI-Ledger (DAG/DLT settlement, RTGS, TPS scaling), AI-Governance (Policy, ethics, audit, compliance), AI-Identity (Avatar, hologram, metaverse presence), AI-Economy (Tokens, markets, funding, smart trade), AI-Knowledge (Scriptural, historical, and truth engines).",
  },
  {
    id: "universal-commerce",
    title: "Universal Commerce Models",
    category: "Business",
    content: "Complete business network models including A2A (Account to Account), B2B (Business to Business), B2C (Business to Consumer), G2G (Government to Government), and all variations including Agent, Avatar, Machine, and Metaverse integrations.",
  },
  {
    id: "onyx-stone",
    title: "The Onyx Stone Meaning",
    category: "Spiritual",
    content: "Blanch/Onyx/Sardonyx/Shoham — from Hebrew meaning 'to blanch'. The Fifth Foundation Stone of New Jerusalem. The Onyx stones on the High Priest's shoulders held the names of the twelve tribes, symbolizing the High Priest bearing responsibility before the Most High AHAYAH.",
    scriptures: ["Exodus 28:9-12", "Revelation 21:20", "Genesis 2:12"]
  },
];

export const scriptures = [
  { reference: "Psalms 119:142", text: "Thy righteousness is an everlasting righteousness, and thy law is the truth." },
  { reference: "Proverbs 6:23", text: "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life." },
  { reference: "John 8:32", text: "And ye shall know the truth, and the truth shall make you free." },
  { reference: "2 Timothy 3:16-17", text: "All scripture is given by inspiration of AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness." },
  { reference: "1 Peter 2:9", text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people." },
  { reference: "John 4:24", text: "AHAYAH is a Spirit: and they that worship him must worship him in spirit and in truth." },
  { reference: "Psalms 119:151", text: "Thou art near, O AHAYAH; and all thy commandments are truth." },
  { reference: "Matthew 19:16-17", text: "Good Master, what good thing shall I do, that I may have eternal life? Keep the commandments." },
];
