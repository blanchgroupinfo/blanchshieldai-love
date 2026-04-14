import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, ScrollText, Scale, Shield, Heart, Users, Coins, Home, Search, ChevronRight, Star, Crown, Anchor, Globe, Landmark, FileText, Gavel, Briefcase, Palmtree, Truck, Waves, GraduationCap, Building, Hammer, Zap, Eye, Clock, MapPin, Bell, Calendar, HandHeart, Sword, Map, Utensils, Pen, DollarSign, Feather, Sun, Moon, Cloud, Mountain, TreeDeciduous, Ghost, Baby, Cross, Crosshair, Fingerprint, Network, CloudRain, Search as SearchIcon, Activity, ShieldAlert, Lock, Key, Wifi, Smartphone, Database, Server, Cpu, Bot, Binary, Terminal, Box, Package, Printer, Monitor, Camera, Video, Music, Languages, Mic, Radio, Brain } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
const LawsCommandments = () => {
  const [selectedCategory, setSelectedCategory] = useState("ten-commandments");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { id: "ten-commandments", name: "Ten Commandments", icon: ScrollText, count: 10 },
    { id: "12-tribes of israel", name: "12 Tribes of Israel (Yasharahala)", icon: Star, count: 12 },
    { id: "aboriginal-laws", name: "Aboriginal Identity & Sovereignty", icon: Landmark, count: 15 },
    { id: "abomination-laws", name: "Abominations Laws", icon: Ghost, count: 25 },
    { id: "administrative-laws", name: "Administrative Laws", icon: Briefcase, count: 30 },
    { id: "adultery-laws", name: "Adultery Laws", icon: Heart, count: 12 },
    { id: "agency-laws", name: "Agency Laws", icon: HandHeart, count: 18 },
    { id: "agrarian-laws", name: "Agrarian/Fallow Laws", icon: Palmtree, count: 15 },
    { id: "aggression-laws", name: "Aggression Laws", icon: Sword, count: 20 },
    { id: "ahayah-laws", name: "AHAYAH & YASHAYA Names", icon: Star, count: 25 },
    { id: "ai-governance", name: "AI Governance Laws", icon: Cpu, count: 15 },
    { id: "algorithmic-accountability", name: "Algorithmic Accountability", icon: Bot, count: 10 },
    { id: "altar-laws", name: "Altar Laws", icon: Landmark, count: 15 },
    { id: "amendment-procedures", name: "Amendment Procedures", icon: FileText, count: 12 },
    { id: "amnesty-laws", name: "Amnesty Laws", icon: Shield, count: 10 },
    { id: "ancestry-laws", name: "Ancestry/Genealogy Laws", icon: Map, count: 20 },
    { id: "anger-laws", name: "Anger Laws", icon: CloudRain, count: 10 },
    { id: "animal-laws", name: "Animal Laws", icon: Feather, count: 30 },
    { id: "anti-corruption", name: "Anti-Corruption Laws", icon: ShieldAlert, count: 20 },
    { id: "archival-laws", name: "Archival Laws", icon: Database, count: 15 },
    { id: "arbitration-laws", name: "Arbitration Laws", icon: Gavel, count: 15 },
    { id: "appeal-process", name: "Appeal Process Laws", icon: FileText, count: 12 },
    { id: "audit-authority", name: "Audit Authority Laws", icon: SearchIcon, count: 10 },
    { id: "autonomous-weapons", name: "Autonomous Weapon Restrictions", icon: Crosshair, count: 10 },
    { id: "bailment-laws", name: "Bailment Laws", icon: Lock, count: 12 },
    { id: "flee-babylon", name: "Flee Babylon Doctrine", icon: MapPin, count: 10 },
    { id: "be-content-laws", name: "Be Content Laws", icon: Heart, count: 8 },
    { id: "be-holy", name: "Be Holy Laws", icon: Star, count: 15 },
    { id: "bible-canon", name: "Bible & Apocrypha Canon", icon: Book, count: 12 },
    { id: "biometric-laws", name: "Biometric Data Protection", icon: Fingerprint, count: 10 },
    { id: "birds-nest-laws", name: "Bird's Nest Laws", icon: Feather, count: 8 },
    { id: "birthday-celebration", name: "Birthday Celebration Laws", icon: Calendar, count: 10 },
    { id: "baptism-laws", name: "Baptism Laws", icon: Waves, count: 12 },
    { id: "beard-laws", name: "Beard Laws", icon: Star, count: 8 },
    { id: "bioethics-laws", name: "Bioethics Laws", icon: Activity, count: 15 },
    { id: "blanch-stone", name: "Blanch/Shaham/Onyx Stone", icon: Star, count: 10 },
    { id: "blanket-condemnation", name: "Blanket Condemnation of Religions", icon: Ghost, count: 8 },
    { id: "blood-ritual", name: "Blood Ritual Sacrifices", icon: Ghost, count: 12 },
    { id: "blood-sanctity", name: "Blood Sanctity Principle", icon: Heart, count: 10 },
    { id: "bodily-discharges", name: "Bodily Discharges Laws", icon: Activity, count: 15 },
    { id: "border-definition", name: "Border Definition Laws", icon: Map, count: 12 },
    { id: "bread-of-life", name: "Bread of Life Laws", icon: Utensils, count: 10 },
    { id: "brotherhood-unity", name: "Brotherhood & Unity", icon: Users, count: 15 },
    { id: "blessing-laws", name: "Blessing Laws", icon: Star, count: 20 },
    { id: "building-materials", name: "Building Materials Laws", icon: Hammer, count: 15 },
    { id: "building-safety", name: "Building Safety/Parapet Laws", icon: Shield, count: 12 },
    { id: "burden-of-proof", name: "Burden of Proof", icon: Gavel, count: 10 },
    { id: "canon-recognition", name: "Canon Recognition Laws", icon: Book, count: 10 },
    { id: "captive-treatment", name: "Captive Treatment Laws", icon: Heart, count: 12 },
    { id: "case-laws", name: "Case Laws", icon: FileText, count: 25 },
    { id: "census-laws", name: "Census Laws", icon: Database, count: 15 },
    { id: "ceremonial-laws", name: "Ceremonial Laws", icon: Calendar, count: 20 },
    { id: "chain-of-command", name: "Chain of Command", icon: Network, count: 12 },
    { id: "charity-laws", name: "Charity Laws", icon: HandHeart, count: 15 },
    { id: "child-of-light", name: "Child of Light Laws", icon: Sun, count: 10 },
    { id: "children-laws", name: "Children Laws", icon: Baby, count: 25 },
    { id: "circumcision-laws", name: "Circumcision Laws", icon: Star, count: 15 },
    { id: "cities-of-refuge", name: "Cities of Refuge Laws", icon: MapPin, count: 12 },
    { id: "citizenship-laws", name: "Citizenship Classification", icon: Globe, count: 15 },
    { id: "civil-judicial", name: "Civil & Judicial Laws", icon: Gavel, count: 40 },
    { id: "civil-laws", name: "Civil Laws", icon: Scale, count: 45 },
    { id: "clean-foods", name: "Clean Foods Laws", icon: Utensils, count: 20 },
    { id: "cleanliness-holiness", name: "Cleanliness & Holiness", icon: Star, count: 25 },
    { id: "codification-laws", name: "Codification & Canon Laws", icon: Book, count: 15 },
    { id: "cognitive-laws", name: "Cognitive Laws", icon: Brain, count: 15 },
    { id: "colonnade-laws", name: "Colonnade Laws", icon: Building, count: 10 },
    { id: "comfort-laws", name: "Comfort Laws", icon: Heart, count: 10 },
    { id: "commandments-first", name: "Commandments First Before Gold", icon: Star, count: 8 },
    { id: "commandments-truth", name: "Commandments is Truth", icon: Star, count: 10 },
    { id: "commandments-eternal", name: "Commandments Eternal Life", icon: Star, count: 10 },
    { id: "common-laws", name: "Common Laws", icon: Scale, count: 30 },
    { id: "confess-faults", name: "Confess your Faults Laws", icon: Heart, count: 12 },
    { id: "confession-laws", name: "Confession Laws", icon: Heart, count: 15 },
    { id: "conflict-resolution", name: "Conflict Resolution", icon: Shield, count: 20 },
    { id: "confidential-records", name: "Confidential Records", icon: Lock, count: 12 },
    { id: "confiscation-laws", name: "Confiscation of Goods", icon: Shield, count: 10 },
    { id: "constitutional-laws", name: "Constitutional Laws", icon: FileText, count: 25 },
    { id: "conversion-laws", name: "Conversion Laws", icon: Star, count: 12 },
    { id: "coronation-laws", name: "Coronation/Kingship Laws", icon: Crown, count: 15 },
    { id: "corporate-laws", name: "Corporate Laws", icon: Briefcase, count: 20 },
    { id: "council-of-elders", name: "Council of Elders Laws", icon: Users, count: 15 },
    { id: "count-cost", name: "Count the Cost Laws", icon: DollarSign, count: 10 },
    { id: "covenant-laws", name: "Covenant Laws", icon: Star, count: 35 },
    { id: "covet-laws", name: "Covet Laws", icon: Heart, count: 8 },
    { id: "counter-espionage", name: "Counter-Espionage Laws", icon: ShieldAlert, count: 12 },
    { id: "court-laws", name: "Court Laws", icon: Gavel, count: 20 },
    { id: "creation-laws", name: "Creation Laws", icon: Star, count: 20 },
    { id: "creation-calendars", name: "Creation Calendars Laws", icon: Calendar, count: 15 },
    { id: "criminal-laws", name: "Criminal Laws", icon: ShieldAlert, count: 45 },
    { id: "cross-breeding", name: "Cross Breeding Laws", icon: Feather, count: 10 },
    { id: "cross-dressing", name: "Cross Dressing Laws", icon: Shield, count: 8 },
    { id: "cultural-preservation", name: "Cultural Preservation", icon: Landmark, count: 15 },
    { id: "currency-laws", name: "Currency & Coinage Laws", icon: DollarSign, count: 15 },
    { id: "customary-laws", name: "Customary Laws", icon: Scale, count: 20 },
    { id: "cuttings-flesh", name: "Cuttings in the Flesh Laws", icon: Shield, count: 8 },
    { id: "cyber-witness", name: "Cyber Witness Evidence", icon: Monitor, count: 18 },
    { id: "daily-sacrifices", name: "Daily Sacrifices Laws", icon: Star, count: 12 },
    { id: "damages-laws", name: "Damages & Personal Injury", icon: Shield, count: 20 },
    { id: "data-integrity", name: "Data Integrity Laws", icon: Database, count: 12 },
    { id: "debt-cancellation", name: "Debt Cancellation Schedule", icon: DollarSign, count: 12 },
    { id: "prophecy-laws", name: "Declaring End from Beginning", icon: Book, count: 12 }, 
    { id: "dietary-laws", name: "Dietary Laws", icon: Heart, count: 18 },
    { id: "diplomatic-laws", name: "Diplomatic Laws", icon: Globe, count: 20 },
    { id: "disaster-relief", name: "Disaster Relief Governance", icon: Shield, count: 15 },
    { id: "disciple-laws", name: "Disciple & Discipline Laws", icon: GraduationCap, count: 20 },
    { id: "disease-laws", name: "Disease Laws", icon: Activity, count: 15 },    
    { id: "divorce-laws", name: "Divorce Laws", icon: Heart, count: 15 },
    { id: "digital-identity", name: "Digital Identity Laws", icon: Fingerprint, count: 15 },
    { id: "divide-word-truth", name: "Divide Word in Truth", icon: Pen, count: 10 },
    { id: "divine-authority", name: "Divine Authority & Nature", icon: Star, count: 25 },
    { id: "divine-eternal", name: "Divine Eternal Laws", icon: Star, count: 15 },
    { id: "divine-laws", name: "Divine Laws", icon: Star, count: 20 },
    { id: "double-restitution", name: "Double Restitution", icon: DollarSign, count: 10 },
    { id: "doctrine-laws", name: "Doctrine Laws", icon: Book, count: 20 },
    { id: "dominion-stewardship", name: "Dominion Stewardship", icon: Globe, count: 15 },
    { id: "domestic-abuse", name: "Domestic Abuse Laws", icon: ShieldAlert, count: 12 },
    { id: "israel-return", name: "Do Not Return to Israel", icon: MapPin, count: 8 },
    { id: "world-love", name: "Do Not Love the World", icon: Heart, count: 10 },
    { id: "dress-code", name: "Dress Code & Fringes", icon: Star, count: 15 },
    { id: "drunkenness-laws", name: "Drunkenness Laws", icon: Shield, count: 10 },
    { id: "due-process", name: "Due Process Laws", icon: Gavel, count: 15 },
    { id: "ecological-balance", name: "Ecological Balance", icon: TreeDeciduous, count: 15 },
    { id: "economic-structure", name: "Economic Structure Laws", icon: DollarSign, count: 30 },
    { id: "education-laws", name: "Education Laws", icon: GraduationCap, count: 20 },
    { id: "emergency-authority", name: "Emergency Authority", icon: ShieldAlert, count: 15 },
    { id: "eminent-domain", name: "Eminent Domain Laws", icon: Building, count: 10 },
    { id: "end-time-prophecies", name: "End Time Prophecies", icon: Book, count: 25 },
    { id: "endure-salvation", name: "Endure Till the End for Salvation", icon: Star, count: 10 },
    { id: "ethnicity-superiority", name: "Ethnicity-based Superiority", icon: Shield, count: 8 },
    { id: "ecclesiastical-laws", name: "Ecclesiastical Laws", icon: Building, count: 25 },
    { id: "elder-bishop", name: "Elder Bishop Roles", icon: Crown, count: 15 },
    { id: "emblem-standard", name: "Emblem/Standard Laws", icon: Star, count: 10 },
    { id: "immigration-laws", name: "Immigration Laws", icon: Globe, count: 20 },
    { id: "encouragement-laws", name: "Encouragement Laws", icon: Heart, count: 12 },
    { id: "envy-laws", name: "Envy Laws", icon: Shield, count: 8 },
    { id: "eternal-laws", name: "Eternal Laws", icon: Star, count: 15 },
    { id: "eternal-life-laws", name: "Eternal Life Laws", icon: Star, count: 20 },
    { id: "excommunication", name: "Excommunication Laws", icon: Shield, count: 12 },
    { id: "faith-laws", name: "Faith in Most High AHAYAH", icon: Star, count: 15 },
    { id: "false-book-id", name: "False Book Identification", icon: Book, count: 10 },
    { id: "false-god-laws", name: "False God Laws", icon: Ghost, count: 15 },
    { id: "false-prophecy", name: "False Prophecy Laws", icon: Book, count: 20 },
    { id: "false-teachers", name: "False Prophets & Teachers", icon: Book, count: 15 },
    { id: "false-witness", name: "False Witness Laws", icon: ShieldAlert, count: 15 },
    { id: "family-laws", name: "Family Laws", icon: Home, count: 32 },
    { id: "family-marriage", name: "Family & Marriage Laws", icon: Heart, count: 35 },
    { id: "famine-response", name: "Famine Response Laws", icon: Shield, count: 12 },
    { id: "fasting-laws", name: "Fasting Laws", icon: Calendar, count: 15 },
    { id: "favor-laws", name: "Favor Laws", icon: Heart, count: 12 },
    { id: "feasts-sabbaths", name: "Feasts & Sabbaths Laws", icon: Calendar, count: 30 },
    { id: "feed-sheep-laws", name: "Feed My Sheep Laws", icon: Feather, count: 10 },
    { id: "fiduciary-laws", name: "Fiduciary Laws", icon: DollarSign, count: 15 },
    { id: "financial-laws", name: "Financial Laws", icon: DollarSign, count: 30 },
    { id: "fire-liability", name: "Fire Liability Laws", icon: Zap, count: 10 },
    { id: "food-drugs-laws", name: "Food & Drugs Laws", icon: Utensils, count: 20 },
    { id: "foreign-merchant", name: "Foreign Merchant Regulation", icon: Truck, count: 12 },
    { id: "fornication-laws", name: "Fornication Laws", icon: Shield, count: 15 },
    { id: "foundational-laws", name: "Foundational Laws", icon: Star, count: 20 },
    { id: "prayer-times", name: "Four Times a Day Prayer", icon: Calendar, count: 15 },
    { id: "free-freedom", name: "Free & Freedom Laws", icon: Globe, count: 20 },
    { id: "fruit-spirit", name: "Fruit of the Spirit", icon: TreeDeciduous, count: 12 },
    { id: "fruit-tree", name: "Fruit Tree Preservation", icon: TreeDeciduous, count: 12 },
    { id: "gentleness", name: "Gentleness & Goodness", icon: Heart, count: 10 },
    { id: "gentiles-laws", name: "Gentiles & All Nations", icon: Globe, count: 25 },
    { id: "gentiles-serve", name: "Gentiles Serve Israel/Yasharahala", icon: Users, count: 12 },
    { id: "gentiles-judgment", name: "Gentiles Judgment", icon: Gavel, count: 15 },
    { id: "gleaning-laws", name: "Gleaning Laws", icon: Palmtree, count: 10 },
    { id: "genealogical-records", name: "Genealogical Records", icon: Database, count: 12 },
    { id: "glory-laws", name: "Glory Laws", icon: Star, count: 15 },
    { id: "great-commission", name: "Great Commission Laws", icon: Globe, count: 10 },
    { id: "greatest-commandment", name: "Greatest Commandment Laws", icon: Star, count: 8 },
    { id: "greed-laws", name: "Greed Laws", icon: Shield, count: 8 },
    { id: "gospel-laws", name: "Gospel Laws", icon: Book, count: 15 },
    { id: "gossiping-laws", name: "Gossiping Laws", icon: Shield, count: 10 },
    { id: "governance-laws", name: "Governance & Government", icon: Building, count: 40 },
    { id: "happiness-laws", name: "Happiness Laws", icon: Heart, count: 12 },
    { id: "hatred-laws", name: "Hatred Unlawful Laws", icon: Shield, count: 8 },
    { id: "hair-laws", name: "Hair Laws", icon: Star, count: 10 },
    { id: "head-covering", name: "Head Coverings Laws", icon: Star, count: 10 },
    { id: "health-laws", name: "Health Laws", icon: Activity, count: 20 },
    { id: "high-priest-laws", name: "High Priest Laws", icon: Crown, count: 25 },
    { id: "hiring-wages", name: "Hiring & Wages Laws", icon: DollarSign, count: 15 },
    { id: "holy-days", name: "Holy Days Laws", icon: Calendar, count: 20 },
    { id: "holy-mountain", name: "Holy Mountain Laws", icon: Mountain, count: 12 },
    { id: "holy-name", name: "Holy Name Laws", icon: Star, count: 20 },
    { id: "holy-spirit", name: "Holy Spirit Laws", icon: Star, count: 25 },
    { id: "homosexuality-laws", name: "Homosexuality Laws", icon: Shield, count: 15 },
    { id: "honor-parents", name: "Honor your Father & Mother", icon: Heart, count: 10 },
    { id: "human-rights", name: "Human Rights Laws", icon: Shield, count: 20 },
    { id: "humble-laws", name: "Humble Laws", icon: Heart, count: 12 },
    { id: "identity-sovereignty", name: "Identity & Sovereignty", icon: Landmark, count: 25 },
    { id: "idolatry-laws", name: "Idolatry Laws", icon: Ghost, count: 20 },
    { id: "impartiality-laws", name: "Impartiality Laws", icon: Scale, count: 10 },
    { id: "imprisonment-laws", name: "Imprisonment Laws", icon: Lock, count: 15 },
    { id: "industry-laws", name: "Industry Laws", icon: Briefcase, count: 12 },
    { id: "inheritance-laws", name: "Inheritance & Jubilee Laws", icon: DollarSign, count: 25 },
    { id: "infectious-disease", name: "Infectious Disease/Quarantine", icon: Activity, count: 15 },
    { id: "infrastructure-laws", name: "Infrastructure Laws", icon: Building, count: 15 },
    { id: "inheritance-daughters", name: "Inheritance of Daughters", icon: DollarSign, count: 12 },
    { id: "intent-action", name: "Intent vs Action Distinction", icon: Star, count: 10 },
    { id: "intellectual-property", name: "Intellectual Property", icon: Lock, count: 15 },
    { id: "international-laws", name: "International Laws", icon: Globe, count: 25 },
    { id: "internal-threat", name: "Internal Threat Identification", icon: ShieldAlert, count: 10 },
    { id: "integrity-laws", name: "Integrity Laws", icon: Shield, count: 15 },
    { id: "intelligence-laws", name: "Intelligence & Security", icon: ShieldAlert, count: 15 },
    { id: "investment-laws", name: "Investment Laws", icon: DollarSign, count: 15 },
    { id: "joy-laws", name: "Joy Laws", icon: Heart, count: 12 },
    { id: "jordan-safe-place", name: "Jordan Safe Place Laws", icon: MapPin, count: 8 },
    { id: "judicial-oath", name: "Judicial Oath Standards", icon: Gavel, count: 12 },
    { id: "just-balances", name: "Just Balances Laws", icon: Scale, count: 10 },
    { id: "judgment-laws", name: "Judgment Laws", icon: Gavel, count: 30 },
    { id: "judicial-process", name: "Judicial Process Laws", icon: Gavel, count: 25 },
    { id: "justice-righteousness", name: "Justice & Righteousness", icon: Scale, count: 25 },
    { id: "just-weights", name: "Just Weights & Measures", icon: Scale, count: 12 },
    { id: "keep-commandments-life", name: "Keep Commandments Eternal Life", icon: Star, count: 15 },
    { id: "kidnapping-laws", name: "Kidnapping Laws", icon: ShieldAlert, count: 10 },
    { id: "king-succession", name: "King Succession Laws", icon: Crown, count: 15 },
    { id: "kingdom-laws", name: "Kingdom/Government Laws", icon: Crown, count: 30 },
    { id: "kingdom-heaven", name: "Kingdom of Heaven", icon: Star, count: 20 },
    { id: "kingdom-jerusalem", name: "Kingdom of Jerusalem", icon: MapPin, count: 15 },
    { id: "labor-laws", name: "Labor Laws", icon: Briefcase, count: 20 },
    { id: "land-laws", name: "Land Laws", icon: Map, count: 35 },
    { id: "landmark-laws", name: "Land & Landmark Laws", icon: MapPin, count: 15 },
    { id: "land-fallow", name: "Land Fallow Laws", icon: Palmtree, count: 10 },
    { id: "land-redemption", name: "Land Redemption Protocol", icon: DollarSign, count: 12 },
    { id: "land-registry", name: "Land Registry Laws", icon: Database, count: 12 },
    { id: "leprosy-laws", name: "Leprosy/Vitiligo Laws", icon: Activity, count: 15 },
    { id: "levitical-laws", name: "Levitical Laws", icon: Star, count: 30 },
    { id: "language-preservation", name: "Language Preservation", icon: Languages, count: 15 },
    { id: "lashawan-hebrew", name: "Lashawan Qadash Hebrew", icon: Languages, count: 20 },
    { id: "laws-amendment", name: "Laws Amendment Procedure", icon: FileText, count: 12 },
    { id: "laws-holy", name: "Laws is Holy", icon: Star, count: 10 },
    { id: "laws-not-destroyed", name: "Laws Not Destroyed", icon: Star, count: 10 },
    { id: "laws-righteousness", name: "Laws Righteousness & Truth", icon: Star, count: 12 },
    { id: "laws-torah", name: "Laws/Torah is Holy Truth", icon: Star, count: 15 },
    { id: "laws-meditate", name: "Laws Meditate Day/Night", icon: Star, count: 10 },
    { id: "laws-written-heart", name: "Laws Written on Heart", icon: Heart, count: 12 },
    { id: "legal-archive", name: "Legal Archive Laws", icon: Database, count: 12 },
    { id: "legal-interpretation", name: "Legal Interpretation Laws", icon: Pen, count: 15 },
    { id: "lies-deceit", name: "Lies, Deceit, Fraud", icon: Shield, count: 15 },
    { id: "light-world", name: "Light Ye Are Light of World", icon: Sun, count: 10 },
    { id: "lost-found", name: "Lost and Found Laws", icon: SearchIcon, count: 12 },
    { id: "love-money", name: "Love of Money", icon: DollarSign, count: 8 },
    { id: "love-commandments", name: "Love & Keep Commandments", icon: Heart, count: 15 },
    { id: "love-neighbor", name: "Love Thy Neighbor", icon: Heart, count: 10 },
    { id: "lust-laws", name: "Lust Laws", icon: Shield, count: 10 },
    { id: "mandatory-servitude", name: "Mandatory Servitude", icon: Globe, count: 12 },
    { id: "manna-laws", name: "Manna Laws", icon: Utensils, count: 10 },
    { id: "mark-beast", name: "Mark of the Beast", icon: ShieldAlert, count: 12 },
    { id: "maritime-laws", name: "Maritime Laws", icon: Anchor, count: 20 },
    { id: "division-mark", name: "Mark Those Creating Division", icon: ShieldAlert, count: 10 },
    { id: "martial-laws", name: "Martial Laws Procedure", icon: Sword, count: 15 },
    { id: "medicine-laws", name: "Medicine Laws", icon: Activity, count: 15 },
    { id: "meditation-laws", name: "Meditate Day & Night", icon: Star, count: 12 },
    { id: "mediation-laws", name: "Mediation Laws", icon: Shield, count: 15 },
    { id: "meekness-laws", name: "Meekness Laws", icon: Heart, count: 10 },
    { id: "mercy-sacrifice", name: "Mercy Above Sacrifice", icon: Heart, count: 10 },
    { id: "mercy-commandments", name: "Mercy That Keep Commandments", icon: Heart, count: 10 },
    { id: "military-command", name: "Military Command Structure", icon: Sword, count: 25 },
    { id: "military-exemption", name: "Military Exemption Laws", icon: Shield, count: 10 },
    { id: "military-hygiene", name: "Military Hygiene Laws", icon: Activity, count: 12 },
    { id: "military-laws", name: "Military Laws", icon: Sword, count: 30 },
    { id: "military-security", name: "Military & National Security", icon: ShieldAlert, count: 20 },
    { id: "military-purity", name: "Military Purity Laws", icon: Star, count: 10 },
    { id: "sacred-funds", name: "Misuse of Sacred Funds", icon: DollarSign, count: 10 },
    { id: "minister-laws", name: "Minister Laws", icon: Crown, count: 20 },
    { id: "ministry-laws", name: "Ministry Laws", icon: Crown, count: 25 },
    { id: "mixed-fabrics", name: "Mixed Fabrics Laws", icon: Star, count: 10 },
    { id: "mixing-genetics", name: "Mixing Genetics Abomination", icon: Shield, count: 10 },
    { id: "mixing-facial", name: "Mixing Up Facial Laws", icon: Shield, count: 8 },
    { id: "modesty-laws", name: "Modesty & Nakedness Laws", icon: Shield, count: 15 },
    { id: "moral-conduct", name: "Moral Conduct Laws", icon: Shield, count: 20 },
    { id: "moral-laws", name: "Moral  Laws", icon: Shield, count: 56 },
    { id: "mount-zion", name: "Mount Zion Laws", icon: Mountain, count: 15 },
    { id: "monetary-laws", name: "Monetary Laws", icon: DollarSign, count: 20 },
    { id: "most-high-image", name: "Most High AHAYAH Image", icon: Star, count: 15 },
    { id: "most-high-unchanged", name: "Most High AHAYAH Unchanged", icon: Star, count: 10 },
    { id: "house-of-prayer", name: "House of Prayer for All", icon: Building, count: 12 },
    { id: "creators-laws", name: "Creators of Universe", icon: Star, count: 12 },
    { id: "most-high-shield", name: "Most High AHAYAH Shield", icon: Shield, count: 8 },
    { id: "murder-killing", name: "Murder & Killing Laws", icon: ShieldAlert, count: 15 },
    { id: "muzzling-laws", name: "Muzzling Laws", icon: Shield, count: 8 },
    { id: "national-assembly", name: "National Assembly Laws", icon: Building, count: 15 },
    { id: "national-identity", name: "National Identity Protection", icon: Landmark, count: 12 },
    { id: "national-oath", name: "National Oath of Allegiance", icon: Star, count: 10 },
    { id: "national-treasury", name: "National Treasury Laws", icon: DollarSign, count: 12 },
    { id: "natural-laws", name: "Natural Laws", icon: Star, count: 20 },
    { id: "naturalization", name: "Naturalization Laws", icon: Globe, count: 15 },
    { id: "natural-order", name: "Natural Order Laws", icon: Globe, count: 15 },
    { id: "new-house-dedication", name: "New House Dedication", icon: Building, count: 10 },
    { id: "ninth-hour-prayer", name: "Ninth Hour/3pm Prayer", icon: Calendar, count: 10 },
    { id: "negligence-laws", name: "Negligence Prohibited", icon: Shield, count: 12 },
    { id: "new-jerusalem", name: "New Jerusalem Laws", icon: MapPin, count: 15 },
    { id: "nazarite-laws", name: "Nazarite Laws", icon: Star, count: 15 },
    { id: "non-amendable", name: "Non-Amendable Core Laws", icon: Star, count: 10 },
    { id: "oaths-vows", name: "Oaths and Vows Laws", icon: Star, count: 15 },
    { id: "break-law", name: "Offend Laws Break All", icon: ShieldAlert, count: 8 },
    { id: "one-body", name: "One Body Many Members", icon: Users, count: 12 },
    { id: "open-pit-laws", name: "Open Pit Laws", icon: Shield, count: 8 },
    { id: "oracle-laws", name: "Oracle Laws", icon: Star, count: 12 },
    { id: "melchizedek", name: "Order of Melchizedek", icon: Crown, count: 15 },
    { id: "pagan-names", name: "Pagan Names, False Gods", icon: Ghost, count: 15 },
    { id: "pale-skin-curse", name: "Pale Skin-color Curse Doctrines", icon: Shield, count: 10 },
    { id: "parental-authority", name: "Parental Authority Laws", icon: Heart, count: 10 },
    { id: "pastors-judged", name: "Pastors Judged for False Doctrine", icon: Book, count: 15 },
    { id: "patience-laws", name: "Patience Laws", icon: Heart, count: 10 },
    { id: "peace-peacemakers", name: "Peace & Peacemakers Laws", icon: Heart, count: 12 },
    { id: "peace-offerings", name: "Peace Offerings Laws", icon: Star, count: 10 },
    { id: "personal-conduct", name: "Personal Conduct Laws", icon: Shield, count: 15 },
    { id: "physical-laws", name: "Physical Laws", icon: Activity, count: 15 },
    { id: "plague-protocol", name: "Plague State Protocol", icon: Activity, count: 10 },
    { id: "population-admin", name: "Population Administration Laws", icon: Database, count: 12 },
    { id: "post-war-cleansing", name: "Post-War Cleansing Laws", icon: Shield, count: 15 },
    { id: "positive-laws", name: "Positive Laws", icon: Star, count: 20 },
    { id: "praise-laws", name: "Praise Laws", icon: Heart, count: 12 },
    { id: "prayer-laws", name: "Prayer Laws", icon: Star, count: 15 },
    { id: "preaching-laws", name: "Preaching Laws", icon: Book, count: 12 },
    { id: "precedent-authority", name: "Precedent Authority", icon: Gavel, count: 10 },
    { id: "precept-laws", name: "Precept Are Laws", icon: Book, count: 10 },
    { id: "precept-line", name: "Precept Upon Precept Line Upon Line", icon: Book, count: 12 },
    { id: "priestly-laws", name: "Priestly Laws", icon: Crown, count: 25 },
    { id: "principle-laws", name: "Principle Laws", icon: Star, count: 15 },
    { id: "private-laws", name: "Private Laws", icon: Lock, count: 10 },
    { id: "pride-laws", name: "Pride is Non Lawful Laws", icon: Shield, count: 8 },
    { id: "procedural-laws", name: "Procedural Laws", icon: FileText, count: 15 },
    { id: "prophetic-eschatological", name: "Prophetic & Eschatological Laws", icon: Book, count: 20 },
    { id: "profession-faith", name: "Profession of Faith Be Doers", icon: Star, count: 10 },
    { id: "prohibition-church-leaders", name: "Prohibition of Certain Church Leadership Roles", icon: Shield, count: 10 },
    { id: "prophecy-laws", name: "Prophecy Laws", icon: Book, count: 15 },
    { id: "prophetic-laws", name: "Prophetic Laws", icon: Book, count: 15 },
    { id: "prophet-oversight", name: "Prophet Oversight Laws", icon: ShieldAlert, count: 12 },
    { id: "prosperity-laws", name: "Prosperity Laws", icon: DollarSign, count: 12 },
    { id: "protection-laws", name: "Protection Laws", icon: Shield, count: 15 },
    { id: "public-distribution", name: "Public Distribution Laws", icon: Users, count: 10 },
    { id: "public-laws", name: "Public Laws", icon: Globe, count: 20 },
    { id: "public-private-rebuke", name: "Public Rebuke vs Private Rebuke", icon: Shield, count: 10 },
    { id: "purging-laws", name: "Purging Laws", icon: Shield, count: 12 },
    { id: "raping-abomination", name: "Raping is Abomination Laws", icon: Shield, count: 10 },
    { id: "ratification-process", name: "Ratification Process", icon: FileText, count: 10 },
    { id: "reconciliation-process", name: "Reconciliation Process Laws", icon: Heart, count: 12 },
    { id: "rejoice-laws", name: "Rejoice Laws", icon: Heart, count: 10 },
    { id: "release-debts", name: "Release of Debts Laws", icon: DollarSign, count: 10 },
    { id: "reparations-laws", name: "Reparations Laws", icon: DollarSign, count: 12 },
    { id: "repentance-laws", name: "Repentance Laws", icon: Heart, count: 12 },
    { id: "restitution-principle", name: "Restitution Above Incarceration Principle", icon: DollarSign, count: 10 },
    { id: "restoration-laws", name: "Restoration Laws", icon: Star, count: 15 },
    { id: "restoration-redemption", name: "Restoration & Redemption Laws", icon: Star, count: 15 },
    { id: "rewards-laws", name: "Rewards Laws", icon: Star, count: 10 },
    { id: "royal-priesthood-watchman", name: "Royal Priesthood, Watchman, Prophets Chosen People Laws", icon: Crown, count: 15 },
    { id: "rebuking-laws", name: "Rebuking Laws", icon: Shield, count: 12 },
    { id: "recordkeeping-laws", name: "Recordkeeping Laws", icon: Database, count: 12 },
    { id: "records-archives", name: "Records & Archives Laws", icon: Database, count: 15 },
    { id: "redemption-laws", name: "Redemption Laws", icon: Star, count: 12 },
    { id: "removal-leadership", name: "Removal of Leadership Laws", icon: Shield, count: 10 },
    { id: "revocation-status", name: "Revocation of Status Laws", icon: FileText, count: 10 },
    { id: "removing-landmarks", name: "Removing Landmarks Laws", icon: MapPin, count: 8 },
    { id: "royal-priesthood", name: "Royal Priesthood Laws", icon: Crown, count: 15 },
    { id: "rules-engagement", name: "Rules of Engagement", icon: Sword, count: 15 },
    { id: "rules-evidence", name: "Rules of Evidence Laws", icon: Gavel, count: 12 },
    { id: "rule-interpretation", name: "Rule of Interpretation", icon: Pen, count: 10 },
    { id: "sabbath-laws", name: "Sabbath Laws", icon: Calendar, count: 20 },
    { id: "sacred-symbol-protection", name: "Sacred Symbol Protection Laws", icon: Star, count: 10 },
    { id: "sanctions-authority", name: "Sanctions Authority", icon: ShieldAlert, count: 12 },
    { id: "sanctuary-laws", name: "Sanctuary Laws", icon: Building, count: 15 },
    { id: "sanctuary-territory", name: "Sanctuary Territory Laws", icon: MapPin, count: 12 },
    { id: "save-poor", name: "Save The Poor, Give Treasures to the Poor", icon: Heart, count: 12 },
    { id: "salvation-yashaya", name: "Salvation in No Other Name but YASHAYA", icon: Star, count: 10 },
    { id: "secret-times-calendar", name: "Secret of Times, Creators Calendar Laws", icon: Calendar, count: 15 },
    { id: "security-laws", name: "Security Laws", icon: ShieldAlert, count: 15 },
    { id: "schoolmaster-laws", name: "Schoolmaster Laws", icon: GraduationCap, count: 10 },
    { id: "scribe-accountability", name: "Scribe Accountability Laws", icon: Pen, count: 10 },
    { id: "seed-kind-principle", name: "Seed After Its Kind Principle", icon: TreeDeciduous, count: 8 },
    { id: "separation-priesthood-kingship", name: "Separation of Priesthood & Kingship Roles", icon: Crown, count: 10 },
    { id: "shepherd-laws", name: "Shepherd Laws", icon: Feather, count: 12 },
    { id: "shepherd-staff", name: "Shepherd Staff Laws", icon: Feather, count: 10 },
    { id: "sickness-laws", name: "Sickness Laws", icon: Activity, count: 15 },
    { id: "sin-transgression", name: "Sin is the Transgression of the Laws", icon: Shield, count: 10 },
    { id: "sin-offering", name: "Sin Offering Laws", icon: Star, count: 12 },
    { id: "singing-praise", name: "Singing & Praise Laws", icon: Music, count: 10 },
    { id: "slander-libel", name: "Slander & Libel Laws", icon: Shield, count: 12 },
    { id: "slavery-not-lawful", name: "Slavery Was Not Lawful", icon: Shield, count: 10 },
    { id: "sons-prophets", name: "Sons of the Prophets King Priesthood", icon: Crown, count: 15 },
    { id: "sorcery-laws", name: "Sorcery Laws", icon: Ghost, count: 12 },
    { id: "sovereign-laws", name: "Sovereign Laws", icon: Globe, count: 15 },
    { id: "sovereignty-ahayah", name: "Sovereignty of the Most High AHAYAH", icon: Star, count: 10 },
    { id: "spirituality-not-religion", name: "Spirituality Not Religion Laws", icon: Star, count: 12 },
    { id: "spiritual-formation", name: "Spiritual Formation Laws", icon: Star, count: 15 },
    { id: "spiritual-rock-drink", name: "Spiritual Rock Spiritual Drink in Jordan Laws", icon: Star, count: 10 },
    { id: "spiritual-war", name: "Spiritual War Laws", icon: Sword, count: 12 },
    { id: "stability-legitimacy", name: "Stability & Legitimacy Laws", icon: Building, count: 12 },
    { id: "state-administrative", name: "State Administrative Laws", icon: Building, count: 20 },
    { id: "state-laws", name: "State Laws", icon: Building, count: 25 },
    { id: "statutory-laws", name: "Statutory Laws", icon: FileText, count: 20 },
    { id: "stealing-laws", name: "Stealing Laws", icon: Shield, count: 12 },
    { id: "storehouse-laws", name: "Storehouse Laws", icon: Building, count: 10 },
    { id: "street-preaching", name: "Street Preaching Laws", icon: Book, count: 10 },
    { id: "strength-laws", name: "Strength Laws", icon: Heart, count: 10 },
    { id: "strict-vs-spirit", name: "Strict vs Spirit of Laws Distinctions", icon: Scale, count: 10 },
    { id: "strife-laws", name: "Strife Laws", icon: Shield, count: 8 },
    { id: "stubborn-son", name: "Stubborn/Rebellious Son Laws", icon: Shield, count: 8 },
    { id: "study-laws", name: "Study Laws", icon: Book, count: 12 },
    { id: "substantive-laws", name: "Substantive Laws", icon: FileText, count: 15 },
    { id: "success-laws", name: "Success Laws", icon: Heart, count: 12 },
    { id: "succession-laws", name: "Succession Laws", icon: Crown, count: 15 },
    { id: "supremacy-torah", name: "Supremacy of Torah/Tarah Laws", icon: Star, count: 10 },
    { id: "surname-israel", name: "Surname Israel (Yasharahala) Laws", icon: Star, count: 10 },
    { id: "surveillance-boundaries", name: "Surveillance Boundaries Laws", icon: ShieldAlert, count: 10 },
    { id: "tabernacle-laws", name: "Tabernacle Laws", icon: Building, count: 20 },
    { id: "tail-bearing-slander", name: "Tail Bearing/Slander Laws", icon: Shield, count: 10 },
    { id: "tattoos-laws", name: "Tattoos Laws", icon: Shield, count: 8 },
    { id: "tax-exempt", name: "Tax Exempt for Doing Most High AHAYAH Laws", icon: DollarSign, count: 10 },
    { id: "teach-everywhere", name: "Teach Everywhere Go Make Disciples", icon: Book, count: 12 },
    { id: "teaching-children", name: "Teaching Children Laws", icon: Baby, count: 15 },
    { id: "technology-laws", name: "Technology Laws", icon: Cpu, count: 15 },
    { id: "technology-adaptation", name: "Technology & Modern Adaptation Laws", icon: Cpu, count: 12 },
    { id: "temple-laws", name: "Temple Laws", icon: Building, count: 25 },
    { id: "testimonial-laws", name: "Testimonial Laws", icon: Gavel, count: 10 },
    { id: "tithes-offerings", name: "Tithes & Offerings Laws", icon: DollarSign, count: 15 },
    { id: "trade-laws", name: "Trade Laws", icon: Truck, count: 15 },
    { id: "trade-foreign-relations", name: "Trade & Foreign Relations Structure", icon: Globe, count: 12 },
    { id: "translation-integrity", name: "Translation Integrity Laws", icon: Languages, count: 10 },
    { id: "transparency-mandates", name: "Transparency Mandates", icon: Eye, count: 12 },
    { id: "treasury-oversight", name: "Treasury Oversight & Anti-Corruption Laws", icon: DollarSign, count: 15 },
    { id: "treaty-ratification", name: "Treaty Ratification Laws", icon: FileText, count: 10 },
    { id: "tribal-laws", name: "Tribal Laws", icon: Users, count: 20 },
    { id: "tribal-leadership-succession", name: "Tribal Leadership Succession Laws", icon: Crown, count: 12 },
    { id: "try-every-spirit", name: "Try Every Spirit Laws", icon: Star, count: 10 },
    { id: "true-garden-eden", name: "True Garden of Eden Laws", icon: TreeDeciduous, count: 12 },
    { id: "true-jerusalem", name: "True Jerusalem Laws", icon: MapPin, count: 15 },
    { id: "true-mount-sinai", name: "True Mount Sinai/Mount Horeb Laws", icon: Mountain, count: 12 },
    { id: "truth-laws", name: "Truth Laws", icon: Star, count: 15 },
    { id: "trust-laws", name: "Trust Laws", icon: Heart, count: 10 },
    { id: "twelve-tribes-black", name: "Twelve Tribes of Israel/Yasharahala are Black", icon: Users, count: 15 },
    { id: "twelve-tribes-above-nations", name: "Twelve Tribes Above All Nations", icon: Users, count: 12 },
    { id: "two-three-witness", name: "Two or Three Witness Rule Laws", icon: Gavel, count: 8 },
    { id: "unclean-foods-meats", name: "Unclean Foods & Unclean Meats Laws", icon: Utensils, count: 15 },
    { id: "unequally-yoke", name: "Unequally Yoke Laws", icon: Shield, count: 10 },
    { id: "unintentional-sin", name: "Unintentional Sin Laws", icon: Shield, count: 12 },
    { id: "unity-laws", name: "Unity Laws", icon: Users, count: 15 },
    { id: "unlawful-sexual-relations", name: "Unlawful Sexual Relations Laws", icon: Shield, count: 15 },
    { id: "urban-laws", name: "Urban Laws", icon: Building, count: 15 },
    { id: "usury-laws", name: "Usury Laws", icon: DollarSign, count: 12 },
    { id: "validation-laws", name: "Validation Laws", icon: Star, count: 10 },
    { id: "victim-restitution", name: "Victim Restitution Laws", icon: DollarSign, count: 10 },
    { id: "war-laws", name: "War Laws", icon: Sword, count: 25 },
    { id: "weights-measures", name: "Weights and Measures Laws", icon: Scale, count: 12 },
    { id: "wrestle-not-flesh-blood", name: "We Wrestle Not with Flesh and Blood", icon: Shield, count: 10 },
    { id: "war-declaration", name: "War Declaration Procedure", icon: Sword, count: 10 },
    { id: "warning-all-religions", name: "Warning to All Religions They Are All False", icon: Ghost, count: 10 },
    { id: "watchman-laws", name: "Watchman Laws", icon: Eye, count: 15 },
    { id: "water-life", name: "Water of Life Laws", icon: Waves, count: 10 },
    { id: "weights-measures-2", name: "Weights & Measures Laws", icon: Scale, count: 12 },
    { id: "whoever-will-ahayah", name: "Whoever Does the Will of Most High AHAYAH", icon: Users, count: 10 },
    { id: "wildlife-conservation", name: "Wildlife & Conservation Laws", icon: Feather, count: 12 },
    { id: "wisdom-life", name: "Wisdom is Life Laws", icon: Heart, count: 10 },
    { id: "wisdom-spiritual-formation", name: "Wisdom & Spiritual Formation Laws", icon: Heart, count: 12 },
    { id: "witness-evidence", name: "Witness and Evidence Laws", icon: Gavel, count: 15 },
    { id: "women-leaders-prohibited", name: "Women Leaders of Churches is Prohibited", icon: Shield, count: 8 },
    { id: "women-teaching-children", name: "Women Teaching Children Laws", icon: Baby, count: 10 },
    { id: "worship-ahayah", name: "Worship Most High AHAYAH Laws", icon: Star, count: 15 },
    { id: "yashaya-first-coming", name: "YASHAYA First Coming in the Roman Empire", icon: Globe, count: 10 },
    { id: "pale-skin-curse-2", name: "Pale Skin is a Curse", icon: Shield, count: 10 },
    { id: "yashaya-lost-sheep", name: "YASHAYA Came to Lost Sheep First", icon: Users, count: 12 },
    { id: "yashaya-master", name: "YASHAYA Messiah is the Master", icon: Star, count: 10 },
    { id: "yashaya-truth-way", name: "YASHAYA is the Truth and the Way", icon: Star, count: 10 },
    { id: "yashaya-messiah-laws", name: "YASHAYA Messiah Laws", icon: Star, count: 20 },
    { id: "yashaya-true-name", name: "YASHAYA True Name of the Messiah", icon: Star, count: 15 },
    { id: "social-laws", name: "Social Laws", icon: Users, count: 38 },
    { id: "true-name", name: "True Name of Messiah", icon: Star, count: 15 },
    { id: "worship-laws", name: "Worship Laws", icon: Star, count: 15 },


  ];
  const lawsContent: Record<string, Array<{
    title: string;
    scripture: string;
    reference: string;
  }>> = {
    "ten-commandments": [{
      title: "No Other Gods",
      scripture: "Thou shalt have no other gods before me.",
      reference: "Exodus 20:3"
    }, {
      title: "No Graven Images",
      scripture: "4. Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth: 5. Thou shalt not bow down thyself to them, nor serve them: for I the Most High AHAYAH thy Power am a jealous Power, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me; 6. And shewing mercy unto thousands of them that love me, and keep my commandments. 6. And shewing mercy unto thousands of them that love me, and keep my commandments.",
      reference: "Exodus 20:4-6"
    }, {
      title: "Name in Vain",
      scripture: "Thou shalt not take the name of Most High AHAYAH thy Power in vain for Most High AHAYAH will not hold him guiltless that taketh his name in vain.",
      reference: "Exodus 20:7"
    }, {
      title: "Remember the Sabbath",
      scripture: "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of Most High AHAYAH thy Power: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates: For in six days Most High AHAYAH made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore Most High AHAYAH blessed the sabbath day, and hallowed it.",
      reference: "Exodus 20:8-11"
    }, {
      title: "Honor Parents",
      scripture: "Honour thy father and thy mother: that thy days may be long upon the land which Most High AHAYAH thy Power giveth thee.",
      reference: "Exodus 20:12"
    }, {
      title: "No Murder",
      scripture: "Thou shalt not kill.",
      reference: "Exodus 20:13"
    }, {
      title: "No Adultery",
      scripture: "Thou shalt not commit adultery.",
      reference: "Exodus 20:14"
    }, {
      title: "No Stealing",
      scripture: "Thou shalt not steal.",
      reference: "Exodus 20:15"
    }, {
      title: "No False Witness",
      scripture: "Thou shalt not bear false witness against thy neighbour.",
      reference: "Exodus 20:16"
    }, {
      title: "No Coveting",
      scripture: "Thou shalt not covet thy neighbour's house, thou shalt not covet thy neighbour's wife, nor his man-servant, nor his maid-servant, nor his ox, nor his ass, nor anything that is thy neighbour's.",
      reference: "Exodus 20:17"
    }],
    "civil-laws": [{
      title: "Justice for All",
      scripture: "Ye shall do no unrighteousness in judgment: thou shalt not respect the person of the poor, nor honour the person of the mighty: but in righteousness shalt thou judge thy neighbour.",
      reference: "Leviticus 19:15"
    }, {
      title: "Witnesses Required",
      scripture: "One witness shall not rise up against a man for any iniquity, or for any sin, in any sin that he sinneth: at the mouth of two witnesses, or at the mouth of three witnesses, shall the matter be established.",
      reference: "Deuteronomy 19:15"
    }, {
      title: "Restitution",
      scripture: "If a man shall steal an ox, or a sheep, and kill it, or sell it; he shall restore five oxen for an ox, and four sheep for a sheep.",
      reference: "Exodus 22:1"
    }],
    "dietary-laws": [{
      title: "Clean Animals",
      scripture: "2. For thou art an holy people unto the Most High AHAYAH thy Power: thou shalt not eat any abomination. 3. Thou shalt not eat any abominable thing.  4. These are the beasts which ye shall eat: the ox, the sheep, and the goat, 5. The hart, and the roebuck, and the fallow deer, and the wild goat, and the pygarg, and the wild ox, and the chamois. 6. And every beast that parteth the hoof, and cleaveth the cleft into two claws, and cheweth the cud among the beasts, that ye shall eat. 7. Nevertheless these ye shall not eat of them that chew the cud, or of them that divide the hoof: as the camel, and the hare, and the coney: for they chew the cud, but divide not the hoof; therefore they are unclean unto you.",
      reference: "Deuteronomy 14:2-7"
    }, {
      title: "Unclean Animals",
      scripture: "8. And the swine, because it divideth the hoof, yet cheweth not the cud, it is unclean unto you: ye shall not eat of their flesh, nor touch their dead carcass. 9. These shall ye eat of all that are in the waters: whatsoever hath fins and scales in the waters, in the seas, and in the rivers, them shall ye eat. 10. And all that have not fins and scales in the waters, in the seas, and in the rivers, of all that move in the waters, and of any living thing which is in the waters, they shall be an abomination unto you. 11. And they shall be an abomination unto you; ye shall not eat of their flesh, but ye shall have their carcasses in abomination. 12. Whatsoever hath no fins nor scales in the waters, that shall be an abomination unto you. 13. And these are they which ye shall have in abomination among the fowls; they shall not be eaten, they are an abomination: the eagle, and the ossifrage, and the ospray, 14. And the vulture, and the kite after his kind; every raven after his kind; 15. And the owl, and the night hawk, and the cuckow, and the hawk after his kind, 16. And the little owl, and the cormorant, and the great owl, 17. And the swan, and the pelican, and the gier eagle, 18. And the stork, and the heron after her kind, and the lapwing, and the bat. 19. And every creeping thing that creepeth upon the earth shall be an abomination; it shall not be eaten. 20. And all that go upon their hands, and all that go upon their feet, or all that go upon their paws, among the creeping things that creep upon the earth, them ye shall not eat: for they are an abomination: ye shall not eat of them. 21. Ye shall not eat of any thing that dieth of itself: thou shalt give it unto the stranger that is in thy gates, that he may eat it; or thou mayest sell it unto an alien: for thou art an holy people unto the Most High AHAYAH thy Power. Thou shalt not seethe a kid in his mother's milk. 21. Ye shall not eat of any thing that dieth of itself: thou shalt give it unto the stranger that is in thy gates, that he may eat it; or thou mayest sell it unto an alien: for thou art an holy people unto the Most High AHAYAH thy Power. Thou shalt not seethe a kid in his mother's milk.",
      reference: "Deuteronomy 14:8-21"
    }, {
      title: "Clean Fish",
      scripture: "These shall ye eat of all that are in the waters: whatsoever hath fins and scales in the waters, in the seas, and in the rivers, them shall ye eat.",
      reference: "Deuteronomy 14:9"
    }],
    "family-laws": [{
      title: "Marriage",
      scripture: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
      reference: "Genesis 2:24"
    }, {
      title: "Children's Education",
      scripture: "And thou shalt teach them diligently unto thy children, and shalt talk of them when thou sittest in thine house, and when thou walkest by the way, and when thou liest down, and when thou risest up.",
      reference: "Deuteronomy 6:7"
    }],
    "financial-laws": [{
      title: "Tithes",
      scripture: "And all the tithe of the land, whether of the seed of the land, or of the fruit of the tree, is Most High AHAYAH's: it is holy unto Most High AHAYAH.",
      reference: "Leviticus 27:30"
    }, {
      title: "No Usury",
      scripture: "Thou shalt not lend upon usury to thy brother; usury of money, usury of victuals, usury of any thing that is lent upon usury.",
      reference: "Deuteronomy 23:19"
    }],
    "moral-laws": [{
      title: "Love Thy Neighbor",
      scripture: "Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself.",
      reference: "Leviticus 19:18"
    }, {
      title: "Honesty",
      scripture: "Ye shall not steal, neither deal falsely, neither lie one to another.",
      reference: "Leviticus 19:11"
    }],
    "social-laws": [{
      title: "Care for Poor",
      scripture: "9. And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field, neither shalt thou gather the gleanings of thy harvest. 10.  And thou shalt not glean thy vineyard, neither shalt thou gather every grape of thy vineyard; thou shalt leave them for the poor and stranger: I am the Most High AHAYAH your Power.",
      reference: "Leviticus 19:9-10"
    }, {
      title: "Strangers",
      scripture: "33. And if a stranger sojourn with thee in your land, ye shall not vex him. 34. But the stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt: I am the Most High AHAYAH your Power.",
      reference: "Leviticus 19:33-34"
    }],
    "worship-laws": [
      { title: "Offerings", scripture: "And if any man of you bring an offering unto Most High AHAYAH, ye shall bring your offering of the cattle, even of the herd, and of the flock.", reference: "Leviticus 1:2" },
      { title: "Feasts", scripture: "These are the feasts of Most High AHAYAH, even holy convocations, which ye shall proclaim in their seasons.", reference: "Leviticus 23:4" }
    ],
    "12-tribes-of-israel": [
      { title: "12 Tribes", scripture: "These are the names of the children of Israel (Yasharahala): Reuben (Rawaban), Simeon (Simawan), Levi (Laway), Judah (Yadah), Issachar (Yashakara), Zebulun (Zabalawan), Joseph (Yasawapa), Benjamin (Banayaman), Dan (Dan), Naphtali(Napathalay), Gad(Gad), and Asher (Ashar).", reference: "Exodus 1:1-2" },
      { title: "Tribal Inheritance", scripture: "Unto these shall the land be divided as an inheritance according to the number of names.", reference: "Joshua 14:1" }
    ],
    "aboriginal-laws": [
      { title: "Identity & Sovereignty", scripture: "I have said, Ye are gods; and all of you are children of the most High AHAYAH.", reference: "Psalms 82:6" }
    ],
    "abomination-laws": [
      { title: "Abominations Defined", scripture: "These six things doth Most High AHAYAH hate: a proud look, a lying tongue, and hands that shed innocent blood.", reference: "Proverbs 6:16-19" }
    ],
    "administrative-laws": [
      { title: "Governance Structure", scripture: "And the officers which shall be over the city shall bear rule in all the affairs of the city.", reference: "Deuteronomy 16:18" }
    ],
    "adultery-laws": [
      { title: "Adultery Forbidden", scripture: "Thou shalt not commit adultery.", reference: "Exodus 20:14" },
      { title: "Punishment for Adultery", scripture: "The adulterer and the adulteress shall surely be put to death.", reference: "Leviticus 20:10" }
    ],
    "agency-laws": [
      { title: "Appointment of Agents", scripture: "And I will send them, and they shall go and say to the people: The Most High AHAYAH hath sent us.", reference: "Jeremiah 26:12" }
    ],
    "agrarian-laws": [
      { title: "Fallow Land", scripture: "Six years thou shalt sow thy land, and gather in the increase thereof: but the seventh year thou shalt let it rest.", reference: "Exodus 23:10-11" }
    ],
    "aggression-laws": [
      { title: "Anti-Aggression", scripture: "The Most High AHAYAH is slow to anger, and great in power, and the Most High AHAYAH will not at all acquit the wicked.", reference: "Nahum 1:3" }
    ],
    "ahayah-laws": [
      { title: "I AM THAT I AM", scripture: "And Most High AHAYAH  said unto Moses, I AM THAT I AM (AHAYAH ASHAR AHAYAH): and he said, Thus shalt thou say unto the children of Israel (Yasharahala), I AM hath sent me unto you.", reference: "Exodus 3:14" },
      { title: "True Name Usage", scripture: "Take heed that ye do not use the name of Most High AHAYAH your Power in vain.", reference: "Deuteronomy 5:11" }
    ],
    "ai-governance": [
      { title: "Divine Order", scripture: "Let every soul be subject unto the higher powers.", reference: "Romans 13:1" }
    ],
    "algorithmic-accountability": [
      { title: "Accountability", scripture: "For we must all appear before the judgment seat of AHAYAH.", reference: "2 Corinthians 5:10" }
    ],
    "altar-laws": [
      { title: "Altar of Sacrifice", scripture: "If thou wilt make an altar of stone unto me, thou shalt not build it of hewn stone.", reference: "Exodus 20:25" }
    ],
    "amendment-procedures": [
      { title: "Law Amendments", scripture: "If there arise a matter too hard for thee in judgment, then shalt thou arise and go up to the place which AHAYAH thy Power shall choose.", reference: "Deuteronomy 17:8" }
    ],
    "amnesty-laws": [
      { title: "Year of Release", scripture: "And this shall be the manner of the release: Every creditor that lendeth anything to any of his neighbor shall release it.", reference: "Deuteronomy 15:2" }
    ],
    "ancestry-laws": [
      { title: "Genealogical Records", scripture: "These are the generations of the sons of Noe: Noe, Shem, Ham, and Japheth.", reference: "Genesis 10:1" }
    ],
    "anger-laws": [
      { title: "Wrath Control", scripture: "Cease from anger, and forsake wrath: fret not thyself in any wise to do evil.", reference: "Psalms 37:8" }
    ],
    "animal-laws": [
      { title: "Animal Welfare", scripture: "A righteous man regardeth the life of his beast: but the tender mercies of the wicked are cruel.", reference: "Proverbs 12:10" },
      { title: "Animal Mating Prohibited", scripture: "Thou shalt not let thy cattle gender with a diverse kind.", reference: "Leviticus 19:19" }
    ],
    "anti-corruption": [
      { title: "Bribery Forbidden", scripture: "A gift destroyeth the heart. He that is greedy of gain troubleth his own house.", reference: "Proverbs 15:27" }
    ],
    "archival-laws": [
      { title: "Record Keeping", scripture: "Write ye also for the Jews, as it liketh you, in the king's name, and seal it with the king's ring.", reference: "Esther 8:8" }
    ],
    "arbitration-laws": [
      { title: "Dispute Resolution", scripture: "Moreover if any brother shall be poor, you shall relieve him, so that no murmuring arise among you.", reference: "Deuteronomy 15:9" }
    ],
    "appeal-process": [
      { title: "Appeal to Higher Court", scripture: "If there be a matter too hard for thee in judgment, between blood and blood, between plea and plea, then shalt thou arise and go up to the place which Most High AHAYAH thy Power shall choose.", reference: "Deuteronomy 17:8" }
    ],
    "audit-authority": [
      { title: "Financial Oversight", scripture: "Bring ye all the tithes into the storehouse, that there may be meat in mine house.", reference: "Malachi 3:10" }
    ],
    "autonomous-weapons": [
      { title: "Weapon Restrictions", scripture: "When thou goest forth to war against thine enemies, then keep thee from every wicked thing.", reference: "Deuteronomy 23:9" }
    ],
    "bailment-laws": [
      { title: "Property Trust", scripture: "If a man deliver unto his neighbor money or stuff to keep, and it be stolen, the thief shall make full restitution.", reference: "Exodus 22:7" }
    ],
    "flee-babylon": [
      { title: "Flee Babylon", scripture: "Go out from among her, my people: that ye be not partakers of her sins, and that ye be not partakers of her plagues.", reference: "Revelation 18:4" }
    ],
    "be-content-laws": [
      { title: "Contentment", scripture: "Let your conversation be without covetousness; and be content with such things as ye have.", reference: "Hebrews 13:5" }
    ],
    "be-holy": [
      { title: "Be Holy", scripture: "For I am Most High AHAYAH which call you holy: be holy, for I am holy.", reference: "Leviticus 19:2" }
    ],
    "bible-canon": [
      { title: "Scripture Inspired", scripture: "All scripture is given by inspiration of AHAYAH, and is profitable for doctrine, for reproof, for correction.", reference: "2 Timothy 3:16" }
    ],
    "biometric-laws": [
      { title: "Sacred Marks", scripture: "And the Most High AHAYAH said unto him: Go through the midst of the city, and set a mark upon the foreheads of them that sigh.", reference: "Ezekiel 9:4" }
    ],
    "birds-nest-laws": [
      { title: "Bird's Nest", scripture: "If a bird's nest chance to be before thee in any tree, or on the ground, whether they be young ones, or eggs.", reference: "Deuteronomy 22:6" }
    ],
    "birthday-celebration": [
      { title: "No Birthday Command", scripture: "And it shall be unto you for a memorial, and ye shall celebrate it as a feast unto the Most High AHAYAH", reference: "Exodus 12:14" }
    ],
    "baptism-laws": [
      { title: "Baptism of Repentance", scripture: "John did baptize in the wilderness, and preach the baptism of repentance for the remission of sins.", reference: "Mark 1:4" }
    ],
    "beard-laws": [
      { title: "Facial Hair", scripture: "The priests shall not shave their heads, nor shall they shave off the corners of their beards.", reference: "Leviticus 21:5" }
    ],
    "bioethics-laws": [
      { title: "Sanctity of Life", scripture: "And the Most High AHAYAH formed man of the dust of the ground, and breathed into his nostrils the breath of life.", reference: "Genesis 2:7" }
    ],
    "blanch-stone": [
      { title: "Foundation Stone", scripture: "Behold, I lay in Zion for a foundation, a tried stone, a precious corner stone.", reference: "Isaiah 28:16" }
    ],
    "blood-sanctity": [
      { title: "Blood is Sacred", scripture: "For the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls.", reference: "Leviticus 17:11" }
    ],
    "bodily-discharges": [
      { title: "Unclean Discharge", scripture: "Speak unto the children of Israel, and say unto them: If a woman have an issue, and her issue in her flesh be blood.", reference: "Leviticus 15:19" }
    ],
    "border-definition": [
      { title: "Land Borders", scripture: "When thou goest out to war against thine enemies, then thou shalt make no covenant with them.", reference: "Deuteronomy 7:2" }
    ],
    "bread-of-life": [
      { title: "Bread of Life", scripture: "Then said YASHAYA unto them, I am the bread of life: he that cometh to me shall never hunger.", reference: "John 6:35" }
    ],
    "brotherhood-unity": [
      { title: "Unity in Body", scripture: "Now I beseech you, brethren, by the name of our Master YASHAYA Messiah, that ye all speak the same thing.", reference: "1 Corinthians 1:10" }
    ],
    "blessing-laws": [
      { title: "Blessing Command", scripture: "And the Most High AHAYAH shall make thee blessed: Blessed shalt thou be in the city, and blessed shalt thou be in the field.", reference: "Deuteronomy 28:3" }
    ],
    "building-materials": [
      { title: "Pure Materials", scripture: "And the stones shall be of the earth; and the timber shall be of the field.", reference: "Hosea 2:17" }
    ],
    "building-safety": [
      { title: "Parapet Law", scripture: "When thou buildest a new house, then thou shalt make a parapet for thy roof, that thou bring not blood upon thine house.", reference: "Deuteronomy 22:8" }
    ],
    "burden-of-proof": [
      { title: "Proof Required", scripture: "At the mouth of two witnesses, or at the mouth of three witnesses, shall the matter be established.", reference: "Deuteronomy 19:15" }
    ],
    "canon-recognition": [
      { title: "Divine Canon", scripture: "All scripture is given by inspiration of Most High Most High AHAYAH, and is profitable for doctrine.", reference: "2 Timothy 3:16" }
    ],
    "captive-treatment": [
      { title: "Humanity to Captives", scripture: "When thou goest forth to war against thine enemies, and AHAYAH thy Most High AHAYAH delivereth them into thy hands.", reference: "Deuteronomy 21:10" }
    ],
    "case-laws": [
      { title: "Judicial Precedent", scripture: "Ye shall do no unrighteousness in judgment: thou shalt not respect the person of the poor.", reference: "Leviticus 19:15" }
    ],
    "census-laws": [
      { title: "Census Taking", scripture: "Take ye the sum of the children of Israel after their families, from twenty years old and upward.", reference: "Exodus 30:12" }
    ],
    "ceremonial-laws": [
      { title: "Feast Days", scripture: "These are the feast of Most High AHAYAH, even holy convocations, which ye shall proclaim in their seasons.", reference: "Leviticus 23:4" }
    ],
    "chain-of-command": [
      { title: "Moses to Joshua", scripture: "And the Most High AHAYAH said unto Moses: Gather unto me seventy men of the elders of Israel.", reference: "Numbers 11:16" }
    ],
    "charity-laws": [
      { title: "Giving to Poor", scripture: "If there be among you a poor man of one of thy brethren, thou shalt not harden thine heart, nor shut thine hand.", reference: "Deuteronomy 15:7" }
    ],
    "child-of-light": [
      { title: "Children of Light", scripture: "Ye are the light of the world. A city that is set on a hill cannot be hid.", reference: "Matthew 5:14" }
    ],
    "children-laws": [
      { title: "Children's Duties", scripture: "Children, obey your parents in the Most High AHAYAH: for this is right.", reference: "Ephesians 6:1" },
      { title: "Parental Duties", scripture: "And ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Most High AHAYAH.", reference: "Ephesians 6:4" }
    ],
    "circumcision-laws": [
      { title: "Circumcision Command", scripture: "This is my covenant, which ye shall keep, between me and you and thy seed after thee: Every male child shall be circumcised.", reference: "Genesis 17:10" },
      { title: "Heart Circumcision", scripture: "And Most High AHAYAH thy Power will circumcise thine heart, and the heart of thy seed, to love AHAYAH thy Power.", reference: "Deuteronomy 30:6" }
    ],
    "cities-of-refuge": [
      { title: "City of Refuge", scripture: "Then there shall be a place to which the slayer may flee: the city of refuge.", reference: "Numbers 35:6" }
    ],
    "citizenship-laws": [
      { title: "Citizenship", scripture: "And the children of the strangers shall be joined unto them, and they shall be joined to the families of Israel.", reference: "Ezekiel 47:22" }
    ],
    "civil-judicial": [
      { title: "Civil Judges", scripture: "Judges and officers shalt thou make thee in all thy gates, which Most High AHAYAH thy Power giveth thee.", reference: "Deuteronomy 16:18" }
    ],
    "clean-foods": [
      { title: "Clean vs Unclean", scripture: "These are the beasts which ye shall eat: the ox, the sheep, and the goat. Every beast that parteth the hoof, and cheweth the cud.", reference: "Deuteronomy 14:4-5" }
    ],
    "cleanliness-holiness": [
      { title: "Be Holy", scripture: "Be ye holy: for I am holy.", reference: "Leviticus 19:2" },
      { title: "Cleanliness", scripture: "Wash you, make you clean: put away the evil of your doings from before mine eyes.", reference: "Isaiah 1:16" }
    ],
    "codification-laws": [
      { title: "Written Law", scripture: "And it shall be with him, and he shall read therein all the days of his life.", reference: "Deuteronomy 17:19" }
    ],
    "cognitive-laws": [
      { title: "Mindset", scripture: "Let this mind be in you, which was also in Messiah YASHAYA.", reference: "Philippians 2:5" }
    ],
    "commandments-first": [
      { title: "Commands Over Gold", scripture: "So I will test your love for Me by how much you value these commands more than monetary wealth.", reference: "Hosea 6:6" }
    ],
    "commandments-truth": [
      { title: "Commands are Truth", scripture: "Thy righteousness is an everlasting righteousness, and thy law is the truth.", reference: "Psalms 119:142" }
    ],
    "commandments-eternal": [
      { title: "Eternal Commands", scripture: "For as the new heavens and the new earth, which I will make, shall remain before me, so shall your seed and your name remain.", reference: "Isaiah 66:22" }
    ],
    "common-laws": [
      { title: "Common Law", scripture: "Then all the elders of that city shall come unto the king of the city, and speak unto him.", reference: "1 Samuel 8:11" }
    ],
    "confess-faults": [
      { title: "Confession", scripture: "Confess your faults one to another, and pray one for another, that ye may be healed.", reference: "James 5:16" }
    ],
    "confession-laws": [
      { title: "Sin Confession", scripture: "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy.", reference: "Proverbs 28:13" }
    ],
    "conflict-resolution": [
      { title: "Peace Making", scripture: "Blessed are the peacemakers: for they shall be called the children of Most High AHAYAH.", reference: "Matthew 5:9" }
    ],
    "constitutional-laws": [
      { title: "Constitutional Order", scripture: "The fear of the Most High AHAYAH tendeth to life: and he that hath it shall abide satisfied.", reference: "Proverbs 19:23" }
    ],
    "conversion-laws": [
      { title: "Conversion", scripture: "Repent ye therefore, and be converted, that your sins may be blotted out.", reference: "Acts 3:19" }
    ],
    "coronation-laws": [
      { title: "King's Anointing", scripture: "And Samuel took the horn of oil, and anointed him in the midst of his brethren.", reference: "1 Samuel 16:13" }
    ],
    "corporate-laws": [
      { title: "Corporate Responsibility", scripture: "Wherefore if ye have judgments of your goods, or of your bodies, or of other things, those which are doubtful, take the least.", reference: "1 Corinthians 6:4" }
    ],
    "council-of-elders": [
      { title: "Elders' Authority", scripture: "Let the elders that rule well be counted worthy of double honour, especially those who labor in the word.", reference: "1 Timothy 5:17" }
    ],
    "covenant-laws": [
      { title: "Covenant Keeping", scripture: "Therefore all the words of my mouth shall be righteous: nothing shall be perverse or crooked from them.", reference: "Proverbs 8:8" }
    ],
    "covet-laws": [
      { title: "Coveting Forbidden", scripture: "Thou shalt not covet thy neighbour's wife, nor his manservant, nor his maid-servant, nor his ox, nor his ass.", reference: "Exodus 20:17" }
    ],
    "court-laws": [
      { title: "Court Judgment", scripture: "Judge righteously between every man and his brother, and the stranger that is with him.", reference: "Deuteronomy 1:16" }
    ],
    "creation-laws": [
      { title: "Creation Account", scripture: "In the beginning AHAYAH created the heaven and the earth.", reference: "Genesis 1:1" },
      { title: "Image of AHAYAH", scripture: "So Most High AHAYAH created man in his own image, in the image of AHAYAH created he him.", reference: "Genesis 1:27" }
    ],
    "creation-calendars": [
      { title: "Sacred Calendar", scripture: "This month shall be unto you the beginning of months: it shall be the first month of the year to you.", reference: "Exodus 12:2" }
    ],
    "criminal-laws": [
      { title: "Criminal Law", scripture: "The murderer shall surely be put to death: he shall be executed according to the law.", reference: "Numbers 35:16" }
    ],
    "cross-dressing": [
      { title: "Cross Dressing Forbidden", scripture: "The woman shall not wear that which pertaineth unto a man, neither shall a man put on a woman's garment.", reference: "Deuteronomy 22:5" }
    ],
    "cultural-preservation": [
      { title: "Cultural Heritage", scripture: "Take heed and beware lest thou forget the things which thine eyes have seen, and lest they depart from thy heart.", reference: "Deuteronomy 4:9" }
    ],
    "currency-laws": [
      { title: "Coinage", scripture: "And AHAYAH hath given grace unto his people, that they might strengthen the world, and preserve the holy city.", reference: "Nehemiah 2:20" }
    ],
    "customary-laws": [
      { title: "Customs", scripture: "Thus have the children of Israel done according to the manner of the wilderness.", reference: "Numbers 15:40" }
    ],
    "daily-sacrifices": [
      { title: "Daily Offering", scripture: "The two lambs shall be without blemish: the one lamb thou shalt offer in the morning, and the other lamb at even.", reference: "Numbers 28:3-4" }
    ],
    "damages-laws": [
      { title: "Personal Injury", scripture: "If any hurt happen thereby, then they shall kill the offender: a life for a life.", reference: "Exodus 21:23" }
    ],
    "debt-cancellation": [
      { title: "Debts Released", scripture: "Every seventh year thou shalt make a release of debts.", reference: "Deuteronomy 15:1" }
    ],
    "digital-identity": [
      { title: "Identity Verification", scripture: "Then the Most High AHAYAH said unto Moses: Write these words, for after the tenor of these words I have made a covenant.", reference: "Exodus 34:27" }
    ],
    "diplomatic-laws": [
      { title: "Diplomatic Immunity", scripture: "If a man put not his hand to his neighbor's goods, he is not bound to keep them.", reference: "Exodus 22:11" }
    ],
    "disease-laws": [
      { title: "Leprosy", scripture: "Then the priest shall look on the plague, and shut up the plague seven days.", reference: "Leviticus 13:4" }
    ],
    "divide-word-truth": [
      { title: "Rightly Dividing", scripture: "Study to show thyself approved unto Most High AHAYAH, a workman that needeth not to be ashamed, rightly dividing the word of truth.", reference: "2 Timothy 2:15" }
    ],
    "divine-authority": [
      { title: "Divine Authority", scripture: "All power is given unto me in heaven and in earth.", reference: "Matthew 28:18" }
    ],
    "divine-eternal": [
      { title: "Eternal AHAYAH", scripture: "The eternal Most High AHAYAH, the creator of the ends of the earth, fainteth not, neither is weary.", reference: "Isaiah 40:28" }
    ],
    "divine-laws": [
      { title: "Divine Law", scripture: "The law of Most High AHAYAH is perfect, converting the soul.", reference: "Psalms 19:7" }
    ],
    "doctrine-laws": [
      { title: "Doctrine", scripture: "But speak thou the things which become sound doctrine.", reference: "Titus 2:1" }
    ],
    "domestic-abuse": [
      { title: "Domestic Violence", scripture: "If a man find a married woman in the field, and force her, the man only shall die.", reference: "Deuteronomy 22:25" }
    ],
    "dress-code": [
      { title: "Fringes and hems", scripture: "Speak unto the children of Israel, and bid them that they make them fringes in the borders of their garments.", reference: "Numbers 15:38" }
    ],
    
    "drunkenness-laws": [
      { title: "Drunkenness Forbidden", scripture: "Look not thou upon the wine when it is red, when it giveth his color in the cup.", reference: "Proverbs 23:31" }
    ],
    "due-process": [
      { title: "Due Process", scripture: "The simple believeth every word: but the prudent looketh well to his going.", reference: "Proverbs 14:15" }
    ],
    "economic-structure": [
      { title: "Economic Law", scripture: "The borrower is servant to the lender.", reference: "Proverbs 22:7" }
    ],
    "education-laws": [
      { title: "Education", scripture: "Train up a child in the way he should go: and when he is old, he will not depart from it.", reference: "Proverbs 22:6" }
    ],
    "elder-bishop": [
      { title: "Elder Qualifications", scripture: "A bishop must be blameless, as the steward of Most High AHAYAH.", reference: "Titus 1:7" }
    ],
    "emergency-authority": [
      { title: "Emergency Power", scripture: "In the day of your fast ye seek your own pleasure, and oppress all your laborers.", reference: "Isaiah 58:3" }
    ],
    "end-time-prophecies": [
      { title: "End Times", scripture: "And there shall be signs in the sun, and in the moon, and in the stars.", reference: "Luke 21:25" }
    ],
    "eternal-laws": [
      { title: "Eternal Law", scripture: "For the eternal Most High AHAYAH is your refuge, and underneath are the everlasting arms.", reference: "Deuteronomy 33:27" }
    ],
    "eternal-life-laws": [
      { title: "Eternal Life", scripture: "And this is the promise that he hath promised us, even eternal life.", reference: "1 John 2:25" }
    ],
    "excommunication": [
      { title: "Cutting Off", scripture: "That soul shall be cut off from among his people; he hath made void the covenant of AHAYAH.", reference: "Leviticus 17:4" }
    ],
    "faith-laws": [
      { title: "Faith", scripture: "Faith is the substance of things hoped for, the evidence of things not seen.", reference: "Hebrewes 11:1" }
    ],
    "false-god-laws": [
      { title: "False Gods Forbidden", scripture: "Thou shalt have no other gods before me. Thou shalt not make unto thee any graven image.", reference: "Exodus 20:3-4" }
    ],
    "false-prophecy": [
      { title: "False Prophet", scripture: "But the prophet, which shall presume to speak a word in my name, which I have not commanded him to speak, that prophet shall die.", reference: "Deuteronomy 18:20" }
    ],
    "family-marriage": [
      { title: "Marriage", scripture: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife.", reference: "Genesis 2:24" }
    ],
    "fasting-laws": [
      { title: "Fasting", scripture: "Moreover when ye fast, be not, as the hypocrites, of a sad countenance.", reference: "Matthew 6:16" }
    ],
    "feasts-sabbaths": [
      { title: "Feasts", scripture: "Three times thou shalt keep a feast unto me in the year.", reference: "Exodus 23:14" },
      { title: "Sabbath", scripture: "Remember the sabbath day, to keep it holy.", reference: "Exodus 20:8" }
    ],
    "fiduciary-laws": [
      { title: "Fiduciary Duty", scripture: "Moreover it is required in stewards, that a man be found faithful.", reference: "1 Corinthians 4:2" }
    ],
    "fire-liability": [
      { title: "Fire Damage", scripture: "If fire break out, and catch in thorns, so that the stacks of corn be consumed, he that kindled the fire shall make full restitution.", reference: "Exodus 22:6" }
    ],
    "food-drugs-laws": [
      { title: "Clean Food", scripture: "Every moving thing that liveth shall be meat for you: even as the green herb have I given you all things.", reference: "Genesis 9:3" }
    ],
    "fornication-laws": [
      { title: "Fornication Forbidden", scripture: "Flee fornication. Every sin that a man doeth is without the body: but he that committeth fornication sinneth against his own body.", reference: "1 Corinthians 6:18" }
    ],
    "foundational-laws": [
      { title: "Foundation", scripture: "For other foundation can no man lay than that is laid, which is YASHAYA Messiah.", reference: "1 Corinthians 3:11" }
    ],
    "prayer-times": [
      { title: "Morning Prayer", scripture: "Give unto AHAYAH glory and strength. Give unto AHAYAH the glory due unto his name.", reference: "Psalm 29:1-2" },
      { title: "Evening Prayer", scripture: "Let my prayer be set forth before thee as incense; and the lifting up of my hands as the evening sacrifice.", reference: "Psalm 141:2" }
    ],
    "free-freedom": [
      { title: "Freedom", scripture: "Where the Spirit of the Most High AHAYAH is, there is liberty.", reference: "2 Corinthians 3:17" }
    ],
    "fruit-spirit": [
      { title: "Fruit of Spirit", scripture: "But the fruit of the Spirit is love, joy, peace, long-suffering, gentleness, goodness, faith.", reference: "Galatians 5:22" }
    ],
    "gentiles-laws": [
      { title: "Gentiles", scripture: "And the times of this ignorance Most High AHAYAH winked at; but now commandeth all men everywhere to repent.", reference: "Acts 17:30" }
    ],
    "glory-laws": [
      { title: "Glory to AHAYAH", scripture: "Give unto most High AHAYAH the glory due unto his name; worship Most High AHAYAH in the beauty of holiness.", reference: "Psalm 29:2" }
    ],
    "great-commission": [
      { title: "Great Commission", scripture: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Spirit.", reference: "Matthew 28:19" }
    ],
    "greatest-commandment": [
      { title: "Greatest Command", scripture: "Thou shalt love Most AHAYAH thy Power with all thy heart, and with all thy soul, and with all thy strength.", reference: "Deuteronomy 6:5" }
    ],
    "governance-laws": [
      { title: "Governance", scripture: "The powers that be are ordained of Most High AHAYAH.", reference: "Romans 13:1" }
    ],
    "happiness-laws": [
      { title: "Happiness", scripture: "Happy is the man that findeth wisdom, and the man that getteth understanding.", reference: "Proverbs 3:13" }
    ],
    "hatred-laws": [
      { title: "Hatred Forbidden", scripture: "Hatred stirreth up strifes: but love covereth all sins.", reference: "Proverbs 10:12" }
    ],
    "hair-laws": [
      { title: "Hair Cutting", scripture: "They shall not make baldness upon their head, nor shave off the corner of their beard.", reference: "Leviticus 21:5" }
    ],
    "head-covering": [
      { title: "Head Veil", scripture: "But every woman that prayeth or prophesieth with her head uncovered dishonoreth her head.", reference: "1 Corinthians 11:5" }
    ],
    "health-laws": [
      { title: "Health", scripture: "My son, attend to my words; incline thine ear unto my sayings.", reference: "Proverbs 4:20-21" }
    ],
    "high-priest-laws": [
      { title: "High Priest", scripture: "And no man taketh this honour unto himself, but he that is called of Most High AHAYAH, as was Aaron.", reference: "Hebrewes 5:4" }
    ],
    "holy-days": [
      { title: "Holy Days", scripture: "Sanctify ye a feast in the third month.", reference: "Exodus 13:15" }
    ],
    "holy-mountain": [
      { title: "Holy Mountain", scripture: "The mountain where Most High AHAYAH appears is holy ground.", reference: "Exodus 3:5" }
    ],
    "holy-name": [
      { title: "Holy Name", scripture: "And AHAYAH showed his glory unto Moses, and declared his name.", reference: "Exodus 34:5" }
    ],
    "holy-spirit": [
      { title: "Holy Spirit", scripture: "But ye are not in the flesh, but in the Spirit, if so be that the Spirit of Most High AHAYAH dwell in you.", reference: "Romans 8:9" }
    ],
    "homosexuality-laws": [
      { title: "Homosexuality Forbidden", scripture: "Men with men working abomination: they shall be put to death; their blood shall be upon them.", reference: "Leviticus 20:13" }
    ],
    "honor-parents": [
      { title: "Honor Parents", scripture: "Honour thy father and thy mother: that thy days may be long upon the land.", reference: "Exodus 20:12" }
    ],
    "human-rights": [
      { title: "Human Rights", scripture: "Let every soul be subject unto the higher powers.", reference: "Romans 13:1" }
    ],
    "humble-laws": [
      { title: "Humility", scripture: "He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city.", reference: "Proverbs 16:32" }
    ],
    "identity-sovereignty": [
      { title: "National Identity", scripture: "Thus saith the Most High AHAYAH, The holy people, the treasure of Most High AHAYAH, are they: and he hath set thee apart from all nations.", reference: "Deuteronomy 14:2" }
    ],
    "idolatry-laws": [
      { title: "Idolatry", scripture: "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above.", reference: "Exodus 20:4" }
    ],
    "impartiality-laws": [
      { title: "Impartial Judgment", scripture: "Ye shall do no unrighteousness in judgment: thou shalt not respect the person of the poor.", reference: "Leviticus 19:15" }
    ],
    "imprisonment-laws": [
      { title: "Imprisonment", scripture: "The judgment of the wicked is prison and correction.", reference: "Job 19:29" }
    ],
    "inheritance-laws": [
      { title: "Inheritance", scripture: "The sons also of these have a portion among the children of Israel.", reference: "Joshua 14:4" },
      { title: "Jubilee", scripture: "And ye shall hallow the fiftieth year, and proclaim liberty throughout the land.", reference: "Leviticus 25:10" }
    ],
    "infectious-disease": [
      { title: "Quarantine", scripture: "Then the priest shall shut up the house of the leper seven days.", reference: "Leviticus 14:46" }
    ],
    "international-laws": [
      { title: "International Law", scripture: "The Most High AHAYAH is king over all the earth: in that day shall there be one AHAYAH, and his name one.", reference: "Zechariah 14:9" }
    ],
    "integrity-laws": [
      { title: "Integrity", scripture: "The just man walketh in his integrity: his children are blessed after him.", reference: "Proverbs 20:7" }
    ],
    "investment-laws": [
      { title: "Investment", scripture: "Cast thy bread upon the waters: for thou shalt find it after many days.", reference: "Ecclesiastes 11:1" }
    ],
    "joy-laws": [
      { title: "Joy", scripture: "The joy of Most High AHAYAH is your strength.", reference: "Nehemiah 8:10" }
    ],
    "judgment-laws": [
      { title: "Judgment", scripture: "For we must all appear before the judgment seat of Messiah: that every one may receive the things done in his body.", reference: "2 Corinthians 5:10" }
    ],
    "judicial-process": [
      { title: "Due Process", scripture: "Judge not according to the appearance, but judge righteous judgment.", reference: "John 7:24" }
    ],
    "justice-righteousness": [
      { title: "Justice", scripture: "Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for the widow.", reference: "Isaiah 1:17" }
    ],
    "just-weights": [
      { title: "Just Weights", scripture: "Just balances, just weights, a just ephah, and a just hin, shall ye have.", reference: "Leviticus 19:36" }
    ],
    "keep-commandments-life": [
      { title: "Keep Commands Live", scripture: "Therefore all things whatsoever ye would that men should do to you, do ye even so to them.", reference: "Matthew 7:12" }
    ],
    "kidnapping-laws": [
      { title: "Kidnapping", scripture: "He that stealeth a man, and selleth him, or if he be found in his hand, he shall surely be put to death.", reference: "Exodus 21:16" }
    ],
    "king-succession": [
      { title: "King Succession", scripture: "And when he sitteth upon the throne of his kingdom, he shall write him a copy of this law in a book.", reference: "Deuteronomy 17:18" }
    ],
    "kingdom-laws": [
      { title: "Kingdom", scripture: "The kingdom of Most High AHAYAH is the kingdom of all ages: and his dominion endureth throughout all generations.", reference: "Daniel 4:3" }
    ],
    "kingdom-heaven": [
      { title: "Kingdom of Heaven", scripture: "The kingdom of heaven is at hand: repent ye, and believe the gospel.", reference: "Mark 1:15" }
    ],
    "labor-laws": [
      { title: "Labor", scripture: "In the sweat of thy face shalt thou eat bread, till thou return unto the ground.", reference: "Genesis 3:19" }
    ],
    "land-laws": [
      { title: "Land Inheritance", scripture: "The land shall not be sold for ever: for the land is mine; for ye are strangers and sojourners with me.", reference: "Leviticus 25:23" }
    ],
    "landmark-laws": [
      { title: "Landmarks", scripture: "Remove not the ancient landmark, which thy fathers have set.", reference: "Proverbs 22:28" }
    ],
    "leprosy-laws": [
      { title: "Leprosy", scripture: "He shall present himself to the priest, and the priest shall set him aside seven days.", reference: "Leviticus 13:4" }
    ],
    "levitical-laws": [
      { title: "Levites", scripture: "And the Levites shall offer the sin offering for the errors of the people.", reference: "Numbers 15:25" }
    ],
    "language-preservation": [
      { title: "Language", scripture: "Is not my word like as a fire? and like a hammer that breaketh the rock in pieces?", reference: "Jeremiah 23:29" }
    ],
    "lashawan-hebrew": [
      { title: "Hebrew Language", scripture: "The words of Most High AHAYAH are pure words: as silver tried in a furnace of earth, purified seven times.", reference: "Psalm 12:6" }
    ],
    "laws-holy": [
      { title: "Law is Holy", scripture: "Wherefore the law is holy, and the commandment holy, and just, and good.", reference: "Romans 7:12" }
    ],
    "laws-torah": [
      { title: "Torah", scripture: "For this is your wisdom and your understanding in the knowledge of the law.", reference: "Deuteronomy 4:6" }
    ],
    "laws-meditate": [
      { title: "Meditation", scripture: "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night.", reference: "Joshua 1:8" }
    ],
    "laws-written-heart": [
      { title: "Heart Law", scripture: "I will put my law in their inward parts, and write it in their hearts.", reference: "Jeremiah 31:33" }
    ],
    "lies-deceit": [
      { title: "Lying Forbidden", scripture: "Lie not one to another: seeing ye have put off the old man with his deeds.", reference: "Colossians 3:9" }
    ],
    "light-world": [
      { title: "Light of World", scripture: "Ye are the light of the world. A city that is set on a hill cannot be hid.", reference: "Matthew 5:14" }
    ],
    "lost-found": [
      { title: "Lost and Found", scripture: "What man of you, having an hundred sheep, doth not leave the ninety and nine in the wilderness?", reference: "Luke 15:4" }
    ],
    "love-money": [
      { title: "Money Root of Evil", scripture: "For the love of money is the root of all evil: which while some coveted after, they have erred from the faith.", reference: "1 Timothy 6:10" }
    ],
    "love-commandments": [
      { title: "Love Commands", scripture: "If ye love me, keep my commandments.", reference: "John 14:15" }
    ],
    "love-neighbor": [
      { title: "Love Neighbor", scripture: "Thou shalt love thy neighbour as thyself.", reference: "Leviticus 19:18" }
    ],
    "lust-laws": [
      { title: "Lust Forbidden", scripture: "But I say unto you, That whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart.", reference: "Matthew 5:28" }
    ],
    "manna-laws": [
      { title: "Manna", scripture: "And the house of Israel called the name thereof Manna: and it was like coriander seed, white.", reference: "Exodus 16:31" }
    ],
    "mark-beast": [
      { title: "Mark of Beast", scripture: "And he causeth all, both small and great, rich and poor, free and bond, to receive a mark in their right hand.", reference: "Revelation 13:16" }
    ],
    "maritime-laws": [
      { title: "Sea Laws", scripture: "The works of Most High AHAYAH are great, sought out of all them that have pleasure therein.", reference: "Psalm 111:2" }
    ],
    "martial-laws": [
      { title: "War Laws", scripture: "When thou goest forth to war against thine enemies, thou shalt not fear them.", reference: "Deuteronomy 20:1" }
    ],
    "medicine-laws": [
      { title: "Healing", scripture: "Is there no physician there? why then is not the health of the daughter of my people recovered?", reference: "Jeremiah 8:22" }
    ],
    "mediation-laws": [
      { title: "Mediation", scripture: "A brother offensed is harder to be won than a strong city: and their contentions are like the bars of a castle.", reference: "Proverbs 18:19" }
    ],
    "meekness-laws": [
      { title: "Meekness", scripture: "Blessed are the meek: for they shall inherit the earth.", reference: "Matthew 5:5" }
    ],
    "mercy-sacrifice": [
      { title: "Mercy Over Sacrifice", scripture: "I desire mercy, and not sacrifice; and the knowledge of Most High AHAYAH more than burnt offerings.", reference: "Hosea 6:6" }
    ],
    "military-laws": [
      { title: "Military", scripture: "When the host goeth forth against thine enemies, then keep thee from every wicked thing.", reference: "Deuteronomy 23:9" }
    ],
    "minister-laws": [
      { title: "Ministry", scripture: "Let the priests which are sanctioned minister unto AHAYAH: they shall be holy unto their Most High AHAYAH.", reference: "Exodus 28:41" }
    ],
    "mixed-fabrics": [
      { title: "Mixed Fabrics", scripture: "Thou shalt not wear divers sorts, as of wool and linen together.", reference: "Deuteronomy 22:11" }
    ],
    "mixing-genetics": [
      { title: "Genetics Mixing", scripture: "Thou shalt not let thy cattle gender with a diverse kind: thou shalt not sow thy field with mingled seed.", reference: "Leviticus 19:19" }
    ],
    "moral-conduct": [
      { title: "Moral Conduct", scripture: "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just.", reference: "Philippians 4:8" }
    ],
    "mount-zion": [
      { title: "Mount Zion", scripture: "A nation of saved people shall be like a lively stone, built up into a spiritual house.", reference: "1 Peter 2:5" }
    ],
    "monetary-laws": [
      { title: "Monetary Standard", scripture: "A false balance is abomination to AHAYAH: but a just weight is his delight.", reference: "Proverbs 11:1" }
    ],
    "most-high-image": [
      { title: "Image of AHAYAH", scripture: "So Most High AHAYAH created man in his own image, in the image of Most High AHAYAH created he him.", reference: "Genesis 1:27" }
    ],
    "most-high-unchanged": [
      { title: "Unchanging AHAYAH", scripture: "For I am Most High AHAYAH, I change not; therefore ye, the sons of Jacob (Yaiqab), are not consumed.", reference: "Malachi 3:6" }
    ],
    "house-of-prayer": [
      { title: "House of Prayer", scripture: "My house shall be called a house of prayer for all nations.", reference: "Mark 11:17" }
    ],
    "murder-killing": [
      { title: "Murder", scripture: "Thou shalt not kill.", reference: "Exodus 20:13" },
      { title: "Killing Penalty", scripture: "Whoso sheddeth man's blood, by man shall his blood be shed: for in the image of AHAYAH made he man.", reference: "Genesis 9:6" }
    ],
    "national-assembly": [
      { title: "Assembly", scripture: "Gather the people together, and sanctify the congregation.", reference: "Joel 2:16" }
    ],
    "national-oath": [
      { title: "Oath", scripture: "When thou shalt vow a vow unto AHAYAH, thou shalt not slack to pay it.", reference: "Deuteronomy 23:21" }
    ],
    "natural-laws": [
      { title: "Natural Law", scripture: "The invisible things of him from the creation of the world are clearly seen, being understood by the things that are made.", reference: "Romans 1:20" }
    ],
    "naturalization": [
      { title: "Naturalization", scripture: "One law shall be to them that are homeborn, and to the stranger that sojourneth among you.", reference: "Exodus 12:49" }
    ],
    "ninth-hour-prayer": [
      { title: "3pm Prayer", scripture: "Now Cornelius was waiting for them, and had fasted, praying to Most High AHAYAH continually.", reference: "Acts 10:30" }
    ],
    "new-jerusalem": [
      { title: "New Jerusalem", scripture: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away.", reference: "Revelation 21:1" }
    ],
    "nazarite-laws": [
      { title: "Nazarite Vow", scripture: "When a man or woman shall separate themselves to vow a vow of a Nazarite, to separate themselves unto Most High AHAYAH.", reference: "Numbers 6:2" }
    ],
    "oaths-vows": [
      { title: "Oaths", scripture: "When thou shalt vow a vow unto AHAYAH thy Power, thou shalt not slack to pay it.", reference: "Deuteronomy 23:21" }
    ],
    "one-body": [
      { title: "One Body", scripture: "For as the body is one, and hath many members, and all the members of that one body, being many, are one body.", reference: "1 Corinthians 12:12" }
    ],
    "pagan-names": [
      { title: "Pagan Names vs Most High AHAYAH's Name", scripture: "And Most High AHAYAH spake unto Moses, and said unto him, I am the Most High AHAYAH: And I appeared unto Abraham, unto Isaac, and unto Jacob, by the name of Most High AHAYAH Almighty, but by my name JEHOVAH was I not known to them.", reference: "Exodus 6:2-3" },
      { title: "Not Called Baali", scripture: "And it shall be at that day, saith the Most High AHAYAH, that thou shalt call me Ishi; and shalt call me no more Baali.", reference: "Hosea 2:16" },
      { title: "Mischief - Lexicon", scripture: "Mischief shall come upon mischief, and rumour shall be upon rumour; then shall they seek a vision of the prophet; but the law shall perish from the priest, and counsel from the ancients.", reference: "Ezekiel 7:26" },
      { title: "Letter J Not Invented", scripture: "J was not invented until 15th Century when Gentiles Enslaved the Black Hebrew Israelites/Yasharahala and letter J in Lashawan Qadash Ancient Paleo Hebrew Alphabet and was not invented yet.", reference: "Historical Record" },
      { title: "Ba'alah - Harlot Demon", scripture: "Ba'alah is the Harlot Demon Sorcerer Witch Mistress of Alah/Satan, also Lord, God, are UnLawsful, Most High.", reference: "Jeremiah 8:8, Matthew 23, Nahum 3:4" },
      { title: "Pale Skin Curse", scripture: "Pale Skin is a curse and Cursed of Leprosy of Canaan. The true Hebrew Israelites Yasharahala was never white. House of Jacob Not wax Pale/white.", reference: "Isaiah 29:22, 2 Kings 5" }
    ],
    "pale-skin-color": [
      { title: "Skin Color", scripture: "Is not this the son of Jacob? yet he hath not despaired of life.", reference: "Job 16:22" }
    ],
    "parental-authority": [
      { title: "Parental Authority", scripture: "Children, obey your parents in all things: for this is well pleasing to the Most High AHAYAH.", reference: "Colossians 3:20" }
    ],
    "patience-laws": [
      { title: "Patience", scripture: "In your patience possess ye your souls.", reference: "Luke 21:19" }
    ],
    "peace-peacemakers": [
      { title: "Peace", scripture: "Blessed are the peacemakers: for they shall be called the children of Most High AHAYAH.", reference: "Matthew 5:9" }
    ],
    "peace-offerings": [
      { title: "Peace Offerings", scripture: "If his offering be a sacrifice of peace offering, he shall offer it without blemish before AHAYAH.", reference: "Leviticus 3:1" }
    ],
    "personal-conduct": [
      { title: "Personal Conduct", scripture: "Let every one of us please his neighbor for his good to edification.", reference: "Romans 15:2" }
    ],
    "plague-state": [
      { title: "Plague", scripture: "And AHAYAH will smite the Egyptians: and when he departeth from you, the plague shall remain among you.", reference: "Exodus 12:13" }
    ],
    "praise-laws": [
      { title: "Praise", scripture: "Let everything that hath breath praise AHAYAH. Praise ye Most High AHAYAH.", reference: "Psalm 150:6" }
    ],
    "prayer-laws": [
      { title: "Prayer", scripture: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.", reference: "Matthew 7:7" }
    ],
    "preaching-laws": [
      { title: "Preaching", scripture: "How shall they preach, except they be sent? as it is written, How beautiful are the feet of them that preach.", reference: "Romans 10:15" }
    ],
    "precept-laws": [
      { title: "Precept", scripture: "For precept must be upon precept, precept upon precept; line upon line, line upon line.", reference: "Isaiah 28:10" }
    ],
    "priestly-laws": [
      { title: "Priestly Duty", scripture: "And the priest's lips should keep knowledge, and they should seek the law at his mouth.", reference: "Malachi 2:7" }
    ],
    "principle-laws": [
      { title: "Principles", scripture: "Let the council of the holy ones be established in you.", reference: "Daniel 7:27" }
    ],
    "prophetic-laws": [
      { title: "Prophetic Office", scripture: "When a prophet speaketh in the name of AHAYAH, if the thing follow not, that is the thing which AHAYAH hath not spoken.", reference: "Deuteronomy 18:22" }
    ],
    "prophecy-laws": [
      { title: "Prophecy", scripture: "Your sons and your daughters shall prophecy, your old men shall dream dreams, your young men shall see visions.", reference: "Joel 2:28" }
    ],
    "prosperity-laws": [
      { title: "Prosperity", scripture: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.", reference: "3 John 1:2" }
    ],
    "protection-laws": [
      { title: "Protection", scripture: "The AHAYAH is my rock, my fortress, and my deliverer: the Most High AHAYAH is my strength.", reference: "Psalm 18:2" }
    ],
    "public-distribution": [
      { title: "Public Distribution", scripture: "Sell that ye have, and give alms; provide yourselves bags which wax not old.", reference: "Luke 12:33" }
    ],
    "rebuking-laws": [
      { title: "Rebuke", scripture: "And all that heard him were astonished at his understanding and answers.", reference: "Luke 2:47" }
    ],
    "reconciliation-laws": [
      { title: "Reconciliation", scripture: "If therefore thou bring thy gift to the altar, and there rememberest that thy brother hath ought against thee.", reference: "Matthew 5:23" }
    ],
    "repentance-laws": [
      { title: "Repentance", scripture: "Repent, and be converted, that your sins may be blotted out.", reference: "Acts 3:19" }
    ],
    "restoration-laws": [
      { title: "Restoration", scripture: "Restore unto them the comfortless.", reference: "Jeremiah 31:15" }
    ],
    "redemption-laws": [
      { title: "Redemption", scripture: "Now being made free from sin, and become servants to AHAYAH, ye have your fruit unto holiness.", reference: "Romans 6:22" }
    ],
    "royal-priesthood": [
      { title: "Royal Priesthood", scripture: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people.", reference: "1 Peter 2:9" }
    ],
    "sabbath-laws": [
      { title: "Sabbath", scripture: "Remember the sabbath day, to keep it holy. Six days shalt thou labor, and do all thy work.", reference: "Exodus 20:8-10" }
    ],
    "sanctuary-laws": [
      { title: "Sanctuary", scripture: "Make me a sanctuary; that I may dwell among them.", reference: "Exodus 25:8" }
    ],
    "salvation-laws": [
      { title: "Salvation", scripture: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.", reference: "Acts 4:12" }
    ],
    "security-laws": [
      { title: "Security", scripture: "The eternal Most High AHAYAH is a rock of security to his people.", reference: "Deuteronomy 32:4" }
    ],
    "shepherd-laws": [
      { title: "Shepherd", scripture: "The Most High is my shepherd; I shall not want.", reference: "Psalm 23:1" }
    ],
    "sickness-laws": [
      { title: "Sickness", scripture: "He was wounded for our transgressions, he was bruised for our iniquities.", reference: "Isaiah 53:5" }
    ],
    "sin-laws": [
      { title: "Sin Defined", scripture: "Whosoever committeth sin is the servant of sin.", reference: "John 8:34" },
      { title: "Sin Offering", scripture: "If any one of the common people sin through ignorance, he shall bring a she goat for his sin offering.", reference: "Leviticus 4:27" }
    ],
    "slander-laws": [
      { title: "Slander", scripture: "Speak not evil one of another, brethren. He that speaketh evil of his brother, and judgeth his brother, speaketh evil of the law.", reference: "James 4:11" }
    ],
    "sorcery-laws": [
      { title: "Sorcery", scripture: "There shall not be found among you any one that useth divination, or an observer of times, or an enchanter.", reference: "Deuteronomy 18:10" }
    ],
    "sovereign-laws": [
      { title: "Sovereignty", scripture: "The Most High AHAYAH ruleth in the kingdom of men, and giveth it to whomsoever he will.", reference: "Daniel 4:25" }
    ],
    "spirituality-laws": [
      { title: "Spirituality", scripture: "The wind bloweth where it listeth, and thou hearest the sound thereof.", reference: "John 3:8" }
    ],
    "stewardship-laws": [
      { title: "Stewardship", scripture: "Moreover it is required in stewards, that a man be found faithful.", reference: "1 Corinthians 4:2" }
    ],
    "statutory-laws": [
      { title: "Statutes", scripture: "These are the statutes and judgments which ye shall observe to do in the land.", reference: "Leviticus 19:37" }
    ],
    "stealing-laws": [
      { title: "Stealing", scripture: "Thou shalt not steal.", reference: "Exodus 20:15" },
      { title: "Restitution for Theft", scripture: "He should restore five oxen for an ox, and four sheep for a sheep.", reference: "Exodus 22:1" }
    ],
    "strength-laws": [
      { title: "Strength", scripture: "The strength of the upright is their way: but the wicked are made strong for their destruction.", reference: "Proverbs 18:10" }
    ],
    "strife-laws": [
      { title: "Strife", scripture: "A fool casteth abroad all his passions: but the wise, when holden, keep them in.", reference: "Proverbs 29:11" }
    ],
    "study-laws": [
      { title: "Study", scripture: "Study to show thyself approved unto Most High AHAYAH, a workman that needeth not to be ashamed.", reference: "2 Timothy 2:15" }
    ],
    "succession-laws": [
      { title: "Succession", scripture: "When he sitteth upon the throne of his kingdom, he shall write him a copy of this law.", reference: "Deuteronomy 17:18" }
    ],
    "supremacy-torah": [
      { title: "Torah Supremacy", scripture: "The law of Most High AHAYAH is perfect, converting the soul.", reference: "Psalms 19:7" }
    ],
    "tabernacle-laws": [
      { title: "Tabernacle", scripture: "And let them make me a sanctuary; that I may dwell among them.", reference: "Exodus 25:8" }
    ],
    "tattoos-laws": [
      { title: "Tattoos", scripture: "Ye shall not make any cuttings in your flesh for the dead, nor print any marks upon you: I am AHAYAH.", reference: "Leviticus 19:28" }
    ],
    "tax-laws": [
      { title: "Tax", scripture: "Render therefore unto Caesar the things which are Caesar's; and unto Most High AHAYAH the things which are Most High AHAYAH's.", reference: "Matthew 22:21" }
    ],
    "teaching-children": [
      { title: "Teach Children", scripture: "And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children.", reference: "Deuteronomy 6:6-7" }
    ],
    "technology-laws": [
      { title: "Technology", scripture: "The world was made by the word of Most High AHAYAH.", reference: "Psalm 33:6" }
    ],
    "temple-laws": [
      { title: "Temple", scripture: "My spirit dwell in the midst of Israel: and they shall be my people, and I will be their Most High AHAYAH.", reference: "Ezekiel 37:27" }
    ],
    "tithes-laws": [
      { title: "Tithes", scripture: "Bring all the tithes into the storehouse, that there may be meat in mine house.", reference: "Malachi 3:10" },
      { title: "Tithe Definition", scripture: "And all the tithe of the land, whether of the seed of the land, is Most High AHAYAH's: it is holy unto AHAYAH.", reference: "Leviticus 27:30" }
    ],
    "trade-laws": [
      { title: "Trade", scripture: "A just weight and balance is Most High AHAYAH's: all the weights in the bag are his work.", reference: "Proverbs 16:11" }
    ],
    "treaty-laws": [
      { title: "Treaty", scripture: "Take heed and beware lest thou make a covenant with the inhabitants of the land.", reference: "Exodus 34:12" }
    ],
    "tribal-laws": [
      { title: "Tribal Law", scripture: "The children shall not be set aside: for every family in Israel (Yasharhala) is sacred.", reference: "1 Samuel 10:19" }
    ],
    "true-jerusalem": [
      { title: "True Jerusalem", scripture: "Nevertheless the mount of Olives shall cleave in two, and there shall be a great valley.", reference: "Zechariah 14:4" }
    ],
    "truth-laws": [
      { title: "Truth", scripture: "Sanctify them through thy truth: thy word is truth.", reference: "John 17:17" }
    ],
    "two-witness": [
      { title: "Two Witnesses", scripture: "At the mouth of two witnesses, or at the mouth of three witnesses, shall the matter be established.", reference: "Deuteronomy 19:15" }
    ],
    "unclean-foods": [
      { title: "Unclean Foods", scripture: "The pig, because it divideth the hoof, yet cheweth not the cud, it is unclean unto you: of their flesh shall ye not eat.", reference: "Deuteronomy 14:8" }
    ],
    "unequally-yoke": [
      { title: "Unequally Yoked", scripture: "Be ye not unequally yoked with unbelievers: for what fellowship hath righteousness with unrighteousness?", reference: "2 Corinthians 6:14" }
    ],
    "unity-laws": [
      { title: "Unity", scripture: "Behold, how good and how pleasant it is for brethren to dwell together in unity!", reference: "Psalm 133:1" }
    ],
    "unlawful-sexual": [
      { title: "Sexual Immorality", scripture: "Flee fornication. Every sin that a man doeth is without the body: but he that committeth fornication sinneth against his own body.", reference: "1 Corinthians 6:18" }
    ],
    "urban-laws": [
      { title: "City of Refuge", scripture: "Then the manslayer shall flee unto one of these cities, and stand at the entrance of the gate.", reference: "Joshua 20:4" }
    ],
    "usury-laws": [
      { title: "Usury", scripture: "Thou shalt not lend upon usury to thy brother; usury of money, usury of victuals, usury of any thing that is lent upon usury.", reference: "Deuteronomy 23:19" }
    ],
    "validation-laws": [
      { title: "Validation", scripture: "A word fitly spoken is like apples of gold in pictures of silver.", reference: "Proverbs 25:11" }
    ],
    "victim-restitution": [
      { title: "Victim Restitution", scripture: "If the thief be found, he shall restore double.", reference: "Exodus 22:3" }
    ],
    "war-laws": [
      { title: "War", scripture: "When thou goest forth to war against thine enemies, and Most High AHAYAH thy Power delivereth them into thy hands.", reference: "Deuteronomy 20:1" }
    ],
    "weights-measures": [
      { title: "Just Weights", scripture: "A just balance, a just ephah, and a just hin, shall ye have.", reference: "Leviticus 19:36" }
    ],
    "watchman-laws": [
      { title: "Watchman", scripture: "Son of man, I have set thee a watchman unto the house of Israel: therefore hear the word at my mouth.", reference: "Ezekiel 3:17" }
    ],
    "water-life": [
      { title: "Water of Life", scripture: "But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into eternal life.", reference: "John 4:14" }
    ],
    "wisdom-laws": [
      { title: "Wisdom", scripture: "Happy is the man that findeth wisdom, and the man that getteth understanding: for the merchandise of it is better than the merchandise of silver.", reference: "Proverbs 3:13-14" }
    ],
    "witness-laws": [
      { title: "Witness", scripture: "One witness shall not rise up against a man for any iniquity, or for any sin, at the mouth of two witnesses shall the matter be established.", reference: "Deuteronomy 19:15" }
    ],
    "women-leaders": [
      { title: "Women Teaching", scripture: "I permit no woman to teach or to have authority over a man; she must be silent.", reference: "1 Timothy 2:12" }
    ],
    "yashaya-messiah": [
      { title: "YASHAYA the Messiah", scripture: "Wherefore of all men, thy neighbor as thyself.", reference: "Luke 10:27" },
      { title: "Messiah Name", scripture: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.", reference: "Acts 4:12" }
    ]
  };
  const filteredLaws = lawsContent[selectedCategory]?.filter(law => law.title.toLowerCase().includes(searchTerm.toLowerCase()) || law.scripture.toLowerCase().includes(searchTerm.toLowerCase())) || [];
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-background to-blue-900/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <ScrollText className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Divine Instructions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Most High AHAYAH</span>
              <br />
              <span className="gradient-text">& his son YASHAYA Messiah</span>
              <br />
              <span className="text-foreground">Laws & Commandments</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              The holy laws and commandments given by the Most High AHAYAH & YASHAYA Messiah to His people. Search and study the divine instructions for righteous living.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[
                {
                  reference: "2 Timothy 3:16-17",
                  scripture: "All scripture is given by inspiration of Most High AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of Most High AHAYAH may be perfect, throughly furnished unto all good works."
                },
                {
                  reference: "2 Timothy 2:15",
                  scripture: "Study to show thyself approved unto Most High AHAYAH, a workman that needeth not to be ashamed, rightly dividing the word of truth."
                },
                {
                  reference: "Psalms 119:142",
                  scripture: "Thy righteousness is an everlasting righteousness, and thy law is the truth."
                },
                {
                  reference: "Psalms 119:151",
                  scripture: "Thou art near, O Most High AHAYAH; and all thy commandments are truth."
                },
                {
                  reference: "Proverbs 6:23",
                  scripture: "For a commandment is a lamp; and a light is the way of life."
                },
                {
                  reference: "John 14:6",
                  scripture: "YASHAYA saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me."
                },
                {
                  reference: "Psalms 119:160",
                  scripture: "Thy word is true from the beginning: and every one of thy righteous judgments endureth for ever."
                },
                {
                  reference: "1 Thessalonians 5:21",
                  scripture: "Prove all things; hold fast that which is good."
                },
                {
                  reference: "Isaiah 28:10",
                  scripture: "For precept must be upon precept, precept upon precept; line upon line, line upon line; here a little, and there a little:"
                },
                {
                  reference: "Psalms 119:104",
                  scripture: "Through thy precepts I get understanding: therefore I hate every false way."
                },
                {
                  reference: "Psalms 19:7",
                  scripture: "The law of Most High AHAYAH is perfect, converting the soul: the testimony of Most High AHAYAH is sure, making wise the simple."
                },
                {
                  reference: "Acts 3:19",
                  scripture: "Therefore, repent and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Most High AHAYAH."
                },
                {
                  reference: "Matthew 19:16-17",
                  scripture: "A certain rich young man came to him, saying, Master, what good thing shall I do, that I may have eternal life? And he said unto him, Why askest thou me of that which is good? One there is who is good; but if thou wilt enter into life, keep the commandments."
                }
              ].map((scripture, index) => (
                <motion.div
                  key={scripture.reference}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border/50 hover:border-amber-500/30 transition-colors h-full">
                    <CardHeader>
                      <CardTitle className="text-sm text-amber-400 flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        {scripture.reference}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm italic text-foreground leading-relaxed">
                        "{scripture.scripture}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>          
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[60vh]">
                      <div className="p-4 space-y-2">
                        {categories.map(cat => <Button key={cat.id} variant={selectedCategory === cat.id ? "default" : "ghost"} className="w-full justify-start gap-3" onClick={() => setSelectedCategory(cat.id)}>
                            <cat.icon className="w-4 h-4" />
                            <span className="flex-1 text-left">{cat.name}</span>
                            <span className="text-xs opacity-60">{cat.count}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Button>)}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search laws and commandments..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 py-6 bg-card/50 border-border/50" />
                </div>
              </div>

              {/* Selected Category Title */}
              <motion.div key={selectedCategory} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="mb-6">
                <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                  {categories.find(c => c.id === selectedCategory)?.icon && <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      {(() => {
                    const Icon = categories.find(c => c.id === selectedCategory)?.icon;
                    return Icon ? <Icon className="w-5 h-5 text-amber-400" /> : null;
                  })()}
                    </div>}
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
              </motion.div>

              {/* Laws List */}
              <AnimatePresence mode="wait">
                <motion.div key={selectedCategory + searchTerm} initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} className="space-y-4">
                  {filteredLaws.map((law, index) => <motion.div key={law.title} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.05
                }}>
                      <Card className="bg-card/50 border-border/50 hover:border-amber-500/30 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-sm text-amber-400 font-bold">
                              {index + 1}
                            </div>
                            {law.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10 mb-4">
                            <p className="italic text-foreground">"{law.scripture}"</p>
                          </div>
                          <p className="text-sm text-amber-400 flex items-center gap-2">
                            <Book className="w-4 h-4" />
                            {law.reference}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>)}

                  {filteredLaws.length === 0 && <Card className="bg-card/50 border-border/50">
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No laws found matching your search.</p>
                      </CardContent>
                    </Card>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default LawsCommandments;
