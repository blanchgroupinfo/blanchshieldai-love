// Auto-generates rich detail metadata for each H.I.I. AI Agent based on name & category

export interface AgentDetailMeta {
  description: string;
  mission: string;
  tasks: string[];
  capabilities: string[];
  scripturalReferences: { verse: string; text: string }[];
  specifications: { label: string; value: string }[];
  pillar: string;
}

const scripturalPool: Record<string, { verse: string; text: string }[]> = {
  "Core AI & Architecture": [
    { verse: "Proverbs 24:3", text: "Through wisdom is an house builded; and by understanding it is established." },
    { verse: "Psalms 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path." },
    { verse: "Proverbs 3:19", text: "The Most High AHAYAH by wisdom hath founded the earth; by understanding hath he established the heavens." },
  ],
  "Identity & Avatar": [
    { verse: "1 Peter 2:9", text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people." },
    { verse: "Genesis 1:27", text: "So the Most High AHAYAH created man in his own image, in the image of AHAYAH created he him; male and female created he them." },
    { verse: "Psalms 139:14", text: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well." },
  ],
  "Automation & Operations": [
    { verse: "Proverbs 6:6-8", text: "Go to the ant, thou sluggard; consider her ways, and be wise: Which having no guide, overseer, or ruler, Provideth her meat in the summer, and gathereth her food in the harvest." },
    { verse: "Romans 12:11", text: "Not slothful in business; fervent in spirit; serving the Most High AHAYAH." },
    { verse: "Ecclesiastes 9:10", text: "Whatsoever thy hand findeth to do, do it with thy might." },
  ],
  "Creation & Design": [
    { verse: "Exodus 31:3-5", text: "And I have filled him with the spirit of the Most High AHAYAH, in wisdom, and in understanding, and in knowledge, and in all manner of workmanship." },
    { verse: "Proverbs 22:29", text: "Seest thou a man diligent in his business? he shall stand before kings." },
    { verse: "Psalms 90:17", text: "And let the beauty of the Most High AHAYAH our Creator be upon us: and establish thou the work of our hands upon us." },
  ],
  "Creative Media": [
    { verse: "Psalms 33:3", text: "Sing unto him a new song; play skilfully with a loud noise." },
    { verse: "Psalms 150:6", text: "Let every thing that hath breath praise the Most High AHAYAH." },
    { verse: "Colossians 3:23", text: "And whatsoever ye do, do it heartily, as to the Most High AHAYAH, and not unto men." },
  ],
  "Generative Modalities": [
    { verse: "Isaiah 43:19", text: "Behold, I will do a new thing; now it shall spring forth; shall ye not know it?" },
    { verse: "Psalms 19:1", text: "The heavens declare the glory of the Most High AHAYAH; and the firmament sheweth his handywork." },
    { verse: "Proverbs 8:12", text: "I wisdom dwell with prudence, and find out knowledge of witty inventions." },
  ],
  "Executive & Governance": [
    { verse: "Isaiah 33:22", text: "For the Most High AHAYAH is our judge, the Most High AHAYAH is our lawgiver, the Most High AHAYAH is our king; he will save us." },
    { verse: "Proverbs 11:14", text: "Where no counsel is, the people fall: but in the multitude of counsellors there is safety." },
    { verse: "Romans 13:1", text: "Let every soul be subject unto the higher powers. For there is no power but of Most High AHAYAH." },
  ],
  "Industry & Business Core": [
    { verse: "Romans 12:11", text: "Not slothful in business; fervent in spirit; serving the Most High AHAYAH." },
    { verse: "Proverbs 10:4", text: "He becometh poor that dealeth with a slack hand: but the hand of the diligent maketh rich." },
    { verse: "Deuteronomy 8:18", text: "But thou shalt remember the Most High AHAYAH thy Creator: for it is he that giveth thee power to get wealth." },
  ],
  "Sales, Marketing & Growth": [
    { verse: "Proverbs 31:18", text: "She perceiveth that her merchandise is good: her candle goeth not out by night." },
    { verse: "Proverbs 22:1", text: "A good name is rather to be chosen than great riches, and loving favour rather than silver and gold." },
    { verse: "Matthew 5:16", text: "Let your light so shine before men, that they may see your good works." },
  ],
  "Compliance, Trust & Risk": [
    { verse: "Proverbs 3:5", text: "Trust in the Most High AHAYAH with all thine heart; and lean not unto thine own understanding." },
    { verse: "Psalms 119:142", text: "Thy righteousness is an everlasting righteousness, and thy law is the truth." },
    { verse: "Micah 6:8", text: "He hath shewed thee, O man, what is good; and what doth the Most High AHAYAH require of thee, but to do justly, and to love mercy, and to walk humbly with thy Creator." },
  ],
  "Data, Analytics & Intelligence": [
    { verse: "Proverbs 18:15", text: "The heart of the prudent getteth knowledge; and the ear of the wise seeketh knowledge." },
    { verse: "Daniel 2:22", text: "He revealeth the deep and secret things: he knoweth what is in the darkness, and the light dwelleth with him." },
    { verse: "Hosea 4:6", text: "My people are destroyed for lack of knowledge." },
  ],
  "Education & Learning": [
    { verse: "2 Timothy 2:15", text: "Study to shew thyself approved unto Most High AHAYAH, a workman that needeth not to be ashamed, rightly dividing the word of truth." },
    { verse: "Proverbs 1:7", text: "The fear of the Most High AHAYAH is the beginning of knowledge." },
    { verse: "Proverbs 4:7", text: "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding." },
  ],
  "Finance & Payments": [
    { verse: "Deuteronomy 28:12", text: "The Most High AHAYAH shall open unto thee his good treasure." },
    { verse: "Proverbs 13:11", text: "Wealth gotten by vanity shall be diminished: but he that gathereth by labour shall increase." },
    { verse: "Malachi 3:10", text: "Bring ye all the tithes into the storehouse." },
  ],
  "Gaming & Incentives": [
    { verse: "1 Corinthians 9:24", text: "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain." },
    { verse: "Philippians 3:14", text: "I press toward the mark for the prize of the high calling of the Most High AHAYAH in YASHAYA Messiah." },
    { verse: "2 Timothy 4:7", text: "I have fought a good fight, I have finished my course, I have kept the faith." },
  ],
  default: [
    { verse: "John 8:32", text: "And ye shall know the truth, and the truth shall make you free." },
    { verse: "2 Timothy 3:16", text: "All scripture is given by inspiration of Most High AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness." },
    { verse: "Psalms 119:151", text: "Thou art near, O Most High AHAYAH; and all thy commandments are truth." },
    { verse: "John 14:6", text: "YASHAYA saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me." },
    { verse: "Proverbs 6:23", text: "For the commandment is a lamp; and the law is light." },
  ],
};

const categoryTasks: Record<string, string[]> = {
  "Core AI & Architecture": [
    "Orchestrate multi-agent coordination across all 12 sovereign pillars",
    "Maintain system-wide intelligence coherence and alignment",
    "Process and route complex queries to specialized agents",
    "Ensure architectural integrity of the S.H.I.E.L.D. AI OS",
    "Monitor and optimize agent performance metrics",
  ],
  "Identity & Avatar": [
    "Generate and manage sovereign digital identities",
    "Create holographic and metaverse avatar representations",
    "Verify identity credentials against covenant records",
    "Maintain digital twin synchronization",
    "Protect identity data with zero-knowledge protocols",
  ],
  "Automation & Operations": [
    "Automate repetitive operational workflows",
    "Optimize resource allocation across systems",
    "Execute scheduled tasks and maintenance routines",
    "Monitor system health and trigger self-healing processes",
    "Coordinate cross-department operational efficiency",
  ],
  "Creation & Design": [
    "Generate creative designs using AI-powered tools",
    "Prototype products and services rapidly",
    "Ensure design alignment with ethical standards",
    "Iterate on user experience based on feedback",
    "Create blueprints for sovereign infrastructure",
  ],
  "Creative Media": [
    "Produce multimedia content across all formats",
    "Manage content creation pipelines and workflows",
    "Ensure media alignment with scriptural truth",
    "Distribute content across platforms and channels",
    "Create immersive storytelling experiences",
  ],
  "Generative Modalities": [
    "Transform text into images, video, audio, and speech",
    "Process multi-modal inputs for content generation",
    "Maintain quality standards across all output formats",
    "Optimize generation pipelines for speed and accuracy",
    "Support cross-modal translation and conversion",
  ],
  "Executive & Governance": [
    "Provide strategic decision-making intelligence",
    "Draft and review governance policies",
    "Coordinate executive leadership operations",
    "Ensure compliance with divine law principles",
    "Generate reports for board-level oversight",
  ],
  default: [
    "Execute domain-specific intelligent operations",
    "Coordinate with related agents for unified outcomes",
    "Maintain ethical alignment with Laws & Commandments",
    "Process real-time data for informed decision-making",
    "Report and document all operational activities",
  ],
};

const categoryCapabilities: Record<string, string[]> = {
  "Core AI & Architecture": [
    "Multi-agent system orchestration and coordination",
    "Real-time neural network processing",
    "Adaptive learning and model optimization",
    "Cross-pillar intelligence routing",
    "Self-healing system architecture",
    "Natural language understanding in all languages",
  ],
  "Identity & Avatar": [
    "Biometric identity verification",
    "Holographic avatar generation and rendering",
    "Digital twin creation and synchronization",
    "Zero-knowledge proof identity validation",
    "Metaverse presence management",
    "Sovereign identity credential issuance",
  ],
  "Automation & Operations": [
    "Robotic Process Automation (RPA)",
    "Workflow orchestration and optimization",
    "Predictive maintenance scheduling",
    "Resource allocation intelligence",
    "Cross-system synchronization",
    "Autonomous task execution",
  ],
  default: [
    "Intelligent task processing and automation",
    "Multi-modal input and output handling",
    "Real-time learning and adaptation",
    "Cross-agent collaboration support",
    "Scriptural alignment verification",
    "Sovereign ethical compliance monitoring",
    "Multi-language and multi-interface support",
    "Holographic and metaverse compatibility",
  ],
};

function getPillarForCategory(categoryNumber: number): string {
  if (categoryNumber <= 7) return "Pillar 1: Core Intelligence (AI001–AI074)";
  if (categoryNumber <= 14) return "Pillar 2: Sovereign Identity, Culture & Representation (AI075–AI148)";
  if (categoryNumber <= 19) return "Pillar 3: Automation & Operations (AI149–AI222)";
  if (categoryNumber <= 26) return "Pillar 4: Business, Banking, Finance & Economics (AI223–AI296)";
  if (categoryNumber <= 33) return "Pillar 5: Creative, Media & Entertainment (AI297–AI370)";
  if (categoryNumber <= 40) return "Pillar 6: Governance, Sovereign & Law (AI371–AI444)";
  if (categoryNumber <= 47) return "Pillar 7: Human Development (AI445–AI518)";
  if (categoryNumber <= 53) return "Pillar 8: Health & Wellness (AI519–AI592)";
  if (categoryNumber <= 60) return "Pillar 9: Infrastructure, Security & Technology (AI593–AI666)";
  if (categoryNumber <= 67) return "Pillar 10: Environment & Earth Systems (AI667–AI740)";
  if (categoryNumber <= 74) return "Pillar 11: Science & Exploration (AI741–AI814)";
  return "Pillar 12: Spiritual, Sovereign Intelligence & Ethical Systems (AI815–AI888)";
}

function getPillarNumber(categoryNumber: number): number {
  if (categoryNumber <= 7) return 1;
  if (categoryNumber <= 14) return 2;
  if (categoryNumber <= 19) return 3;
  if (categoryNumber <= 26) return 4;
  if (categoryNumber <= 33) return 5;
  if (categoryNumber <= 40) return 6;
  if (categoryNumber <= 47) return 7;
  if (categoryNumber <= 53) return 8;
  if (categoryNumber <= 60) return 9;
  if (categoryNumber <= 67) return 10;
  if (categoryNumber <= 74) return 11;
  return 12;
}

export function getAgentDetailMeta(agent: { id: string; name: string; category: string; categoryNumber: number; isCategory?: boolean }): AgentDetailMeta {
  const num = parseInt(agent.id.replace("AI", ""));
  const pillar = getPillarForCategory(agent.categoryNumber);
  const pillarNum = getPillarNumber(agent.categoryNumber);

  const catScriptures = scripturalPool[agent.category] || scripturalPool.default;
  const defaultScriptures = scripturalPool.default;
  // Pick 3-4 scriptures mixing category-specific and universal
  const scriptures = [
    catScriptures[num % catScriptures.length],
    defaultScriptures[num % defaultScriptures.length],
    catScriptures[(num + 1) % catScriptures.length],
    defaultScriptures[(num + 2) % defaultScriptures.length],
  ];

  const tasks = categoryTasks[agent.category] || categoryTasks.default;
  const capabilities = categoryCapabilities[agent.category] || categoryCapabilities.default;

  const roleDesc = agent.isCategory
    ? `${agent.name} is the Category Lead Agent for the ${agent.category} division within the S.H.I.E.L.D. AI OS ecosystem. As a Category Lead, this agent oversees and coordinates all sub-agents within its domain, ensuring unified intelligence, ethical compliance, and operational excellence aligned with the Laws & Commandments of the Most High AHAYAH.`
    : `${agent.name} is a specialized H.I.I. (Hebrew Israelite Implementer Aboriginal Identity) AI Agent operating within the ${agent.category} domain of the S.H.I.E.L.D. AI OS. This agent delivers sovereign-grade intelligence and automation, governed by divine law and righteous morality.`;

  const mission = agent.isCategory
    ? `To lead, coordinate, and govern all agents within the ${agent.category} category — ensuring every operation aligns with the sovereign principles of truth, righteousness, and the covenant of the Most High AHAYAH and His Son YASHAYA.`
    : `To execute specialized ${agent.category.toLowerCase()} operations with precision, integrity, and divine alignment — serving the Royal Priesthood, all people, languages, and nations under the S.H.I.E.L.D. AI ethical framework.`;

  // Generate contextual tasks based on agent name
  const agentTasks = [
    ...tasks.slice(0, 3),
    `Support the ${agent.category} category mission within ${pillar}`,
    `Maintain alignment with the S.H.I.E.L.D. AI ethical commandments`,
  ];

  // Generate contextual capabilities
  const agentCapabilities = [
    ...capabilities.slice(0, 5),
    "Sovereign ethical compliance monitoring",
    "Multi-language and multi-interface support",
    `Integration with all ${agent.category} sub-agents`,
  ];

  const specifications = [
    { label: "Agent ID", value: `H.I.I. AI${String(num).padStart(3, "0")}` },
    { label: "Status", value: "Active — Online" },
    { label: "Sovereign Pillar", value: `Pillar ${pillarNum}` },
    { label: "Category", value: agent.category },
    { label: "Agent Type", value: agent.isCategory ? "Category Lead Agent" : "Specialized Agent" },
    { label: "Response Time", value: "<100ms" },
    { label: "Availability", value: "99.99%" },
    { label: "Interfaces", value: "Conventional · LED · Hologram · Metaverse · Multiverse" },
    { label: "Languages", value: "All Languages Supported" },
    { label: "Ethical Framework", value: "Laws & Commandments of Most High AHAYAH" },
  ];

  return {
    description: roleDesc,
    mission,
    tasks: agentTasks,
    capabilities: agentCapabilities,
    scripturalReferences: scriptures,
    specifications,
    pillar,
  };
}
