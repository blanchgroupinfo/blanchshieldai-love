import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap, RefreshCcw, Target, Layers, ChevronRight, Shield, AlertTriangle, CheckCircle2, GitCompareArrows, X, User, Mail, DollarSign, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProgramItem {
  name: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  deposit: string;
  returnPct: string;
  terms?: {
    description: string;
    minLockIn: string;
    payoutSchedule: string;
    earlyWithdrawalFee: string;
    compounding: string;
    eligibility: string;
    riskLevel: string;
    conditions: string[];
  };
}

const programs: { category: string; items: ProgramItem[] }[] = [
  {
    category: "Short-Term Programs",
    items: [
      { name: "24hrs Profit Trade", duration: "24 Hours", icon: Clock, deposit: "$500 - $10,000", returnPct: "10%", terms: { description: "Fast-paced 24-hour trading cycle designed for quick returns on short-term market movements.", minLockIn: "24 Hours", payoutSchedule: "Payout upon cycle completion", earlyWithdrawalFee: "5% of principal", compounding: "Not available", eligibility: "All verified users", riskLevel: "Medium", conditions: ["Principal returned with profit at cycle end", "No partial withdrawals during active cycle", "KYC verification required before enrollment", "Subject to market conditions and liquidity", "Maximum 3 concurrent 24hr trades per account"] } },
      { name: "48hrs Profit Trade", duration: "48 Hours", icon: Clock, deposit: "$1,000 - $25,000", returnPct: "15%", terms: { description: "Two-day strategic trade leveraging 48-hour market momentum for enhanced returns.", minLockIn: "48 Hours", payoutSchedule: "Payout upon cycle completion", earlyWithdrawalFee: "5% of principal", compounding: "Not available", eligibility: "All verified users", riskLevel: "Medium", conditions: ["Principal returned with profit at cycle end", "No partial withdrawals during active cycle", "KYC verification required", "Subject to market conditions and liquidity", "Maximum 3 concurrent trades per account"] } },
      { name: "72hrs Profit Trade", duration: "72 Hours", icon: Clock, deposit: "$2,000 - $50,000", returnPct: "18%", terms: { description: "Three-day trading program utilizing multi-day market trends for optimized profit capture.", minLockIn: "72 Hours", payoutSchedule: "Payout upon cycle completion", earlyWithdrawalFee: "4% of principal", compounding: "Not available", eligibility: "All verified users", riskLevel: "Medium", conditions: ["Principal returned with profit at cycle end", "No partial withdrawals during active cycle", "KYC verification required", "Subject to market conditions and liquidity"] } },
      { name: "5 Day Profit Trade", duration: "5 Days", icon: TrendingUp, deposit: "$5,000 - $100,000", returnPct: "22%", terms: { description: "Five-day structured trade capturing weekly market cycles for consistent returns.", minLockIn: "5 Days", payoutSchedule: "Payout upon cycle completion", earlyWithdrawalFee: "4% of principal", compounding: "Available after first cycle", eligibility: "Verified users with min. 1 prior trade", riskLevel: "Medium-High", conditions: ["Principal and profit returned at cycle end", "Compounding option available for reinvestment", "KYC and AML compliance required", "Subject to market conditions"] } },
      { name: "7 Day Profit Trade", duration: "7 Days", icon: TrendingUp, deposit: "$5,000 - $150,000", returnPct: "28%", terms: { description: "Full week trading strategy designed to maximize returns across weekly market patterns.", minLockIn: "7 Days", payoutSchedule: "Payout upon cycle completion", earlyWithdrawalFee: "3% of principal", compounding: "Available", eligibility: "Verified users with min. 1 prior trade", riskLevel: "Medium-High", conditions: ["Principal and profit returned at cycle end", "Weekly compounding option available", "KYC and AML compliance required", "Subject to market conditions and liquidity"] } },
    ],
  },
  {
    category: "Weekly & Monthly Programs",
    items: [
      { name: "Weekly Profit Trade", duration: "Weekly", icon: RefreshCcw, deposit: "$2,500 - $75,000", returnPct: "20%", terms: { description: "Recurring weekly trading program with automatic reinvestment options for steady growth.", minLockIn: "7 Days per cycle", payoutSchedule: "Weekly payout or reinvestment", earlyWithdrawalFee: "3% of principal", compounding: "Auto-compound available", eligibility: "All verified users", riskLevel: "Medium", conditions: ["Auto-renewal option available", "Profits paid weekly or compounded", "KYC verification required", "Minimum 2-week commitment recommended", "Subject to market conditions"] } },
      { name: "10 Day Profit Trade", duration: "10 Days", icon: TrendingUp, deposit: "$5,000 - $100,000", returnPct: "30%", terms: { description: "Extended short-term program spanning 10 days for enhanced profit potential.", minLockIn: "10 Days", payoutSchedule: "Payout upon cycle completion", earlyWithdrawalFee: "3% of principal", compounding: "Available", eligibility: "Verified users", riskLevel: "Medium-High", conditions: ["Principal and profit returned at cycle end", "Compounding option for reinvestment", "KYC and AML compliance required", "Subject to market conditions"] } },
      { name: "30 Day Profit Trade", duration: "30 Days", icon: Target, deposit: "$10,000 - $250,000", returnPct: "40%", terms: { description: "Monthly trading program providing significant returns over a 30-day investment period.", minLockIn: "30 Days", payoutSchedule: "Monthly payout", earlyWithdrawalFee: "2% of principal", compounding: "Monthly compounding available", eligibility: "Verified users with min. $10,000", riskLevel: "Medium", conditions: ["Monthly profit distribution", "Auto-renewal with compounding option", "Full KYC/AML compliance required", "Quarterly performance reports provided", "Subject to market conditions"] } },
      { name: "Recurring Monthly", duration: "Monthly", icon: RefreshCcw, deposit: "$10,000 - $500,000", returnPct: "35%", terms: { description: "Automated monthly recurring trade program with consistent return generation.", minLockIn: "30 Days per cycle", payoutSchedule: "End of each monthly cycle", earlyWithdrawalFee: "2% of principal", compounding: "Auto-compound available", eligibility: "Verified users", riskLevel: "Medium", conditions: ["Automatic monthly renewal", "Profits paid or reinvested each cycle", "KYC and AML compliance required", "Cancel anytime with 7-day notice", "Subject to market conditions"] } },
      { name: "60 Day Profit Trade", duration: "60 Days", icon: Target, deposit: "$25,000 - $500,000", returnPct: "55%", terms: { description: "Two-month strategic investment program for substantial medium-term returns.", minLockIn: "60 Days", payoutSchedule: "Bi-monthly or at maturity", earlyWithdrawalFee: "2% of principal", compounding: "Available", eligibility: "Verified users with min. $25,000", riskLevel: "Medium", conditions: ["Mid-term progress report at 30 days", "Partial profit withdrawal at midpoint available", "Full KYC/AML compliance required", "Subject to market conditions and liquidity"] } },
    ],
  },
  {
    category: "Long-Term Programs",
    items: [
      { name: "90 Day Profit Trade", duration: "90 Days", icon: Target, deposit: "$25,000 - $1,000,000", returnPct: "70%", terms: { description: "Quarterly investment program leveraging long-term market positioning for high returns.", minLockIn: "90 Days", payoutSchedule: "Quarterly payout", earlyWithdrawalFee: "1.5% of principal", compounding: "Quarterly compounding", eligibility: "Accredited investors preferred", riskLevel: "Medium", conditions: ["Quarterly performance reports", "Compounding reinvestment option", "Full KYC/AML and accreditation verification", "Dedicated account manager assigned", "Subject to market conditions"] } },
      { name: "120 Day Profit Trade", duration: "120 Days", icon: Target, deposit: "$50,000 - $1,000,000", returnPct: "85%", terms: { description: "Four-month structured trade for investors seeking strong medium-term growth.", minLockIn: "120 Days", payoutSchedule: "At maturity or quarterly", earlyWithdrawalFee: "1.5% of principal", compounding: "Available", eligibility: "Accredited investors", riskLevel: "Medium", conditions: ["Monthly progress updates", "Quarterly partial profit withdrawal option", "Full KYC/AML compliance required", "Dedicated portfolio oversight", "Subject to market conditions"] } },
      { name: "180 Day Profit Trade", duration: "180 Days", icon: Target, deposit: "$50,000 - $2,000,000", returnPct: "110%", terms: { description: "Six-month investment program delivering premium returns through diversified market strategies.", minLockIn: "180 Days", payoutSchedule: "Semi-annual or quarterly distributions", earlyWithdrawalFee: "1% of principal", compounding: "Semi-annual compounding", eligibility: "Accredited investors", riskLevel: "Medium-Low", conditions: ["Diversified multi-market allocation", "Quarterly performance reports", "Full KYC/AML and accreditation required", "Priority support and dedicated manager", "Subject to market conditions"] } },
      { name: "210 Day Profit Trade", duration: "210 Days", icon: Target, deposit: "$100,000 - $2,000,000", returnPct: "130%", terms: { description: "Seven-month premium program for serious investors seeking exceptional returns.", minLockIn: "210 Days", payoutSchedule: "At maturity or quarterly", earlyWithdrawalFee: "1% of principal", compounding: "Available", eligibility: "Accredited investors with min. $100,000", riskLevel: "Medium-Low", conditions: ["Monthly performance dashboards", "Quarterly partial distributions available", "Full compliance verification required", "VIP investor support channel", "Subject to market conditions"] } },
      { name: "40 Week Profit Trade", duration: "40 Weeks", icon: Layers, deposit: "$100,000 - $5,000,000", returnPct: "150%", terms: { description: "Extended 40-week wealth building program with institutional-grade strategies.", minLockIn: "40 Weeks", payoutSchedule: "Monthly distributions or at maturity", earlyWithdrawalFee: "0.5% of principal", compounding: "Monthly compounding available", eligibility: "Institutional & accredited investors", riskLevel: "Low-Medium", conditions: ["Institutional-grade portfolio management", "Monthly performance and risk reports", "Full regulatory compliance required", "Dedicated relationship manager", "Customizable distribution schedule", "Subject to market conditions"] } },
      { name: "3-5 Year Profit Trade", duration: "3-5 Years", icon: TrendingUp, deposit: "$250,000 - $10,000,000", returnPct: "300-500%", terms: { description: "Long-horizon wealth generation program designed for maximum capital appreciation over 3-5 years.", minLockIn: "3 Years minimum", payoutSchedule: "Quarterly distributions with annual review", earlyWithdrawalFee: "0.25% of principal after Year 1", compounding: "Annual compounding", eligibility: "Institutional & ultra-high-net-worth investors", riskLevel: "Low", conditions: ["Multi-asset diversified portfolio", "Annual strategy review and rebalancing", "Quarterly comprehensive performance reports", "Dedicated senior portfolio manager", "Tax optimization consultation included", "Full regulatory and compliance oversight", "Subject to market conditions"] } },
    ],
  },
  {
    category: "Specialty Programs",
    items: [
      { name: "Bullet Trades", duration: "Variable", icon: Zap, deposit: "$10,000 - $500,000", returnPct: "25-50%", terms: { description: "High-velocity trades targeting rapid market movements for accelerated profits.", minLockIn: "Varies by opportunity", payoutSchedule: "Upon trade completion", earlyWithdrawalFee: "5% of principal", compounding: "Not available", eligibility: "Experienced traders with verified history", riskLevel: "High", conditions: ["Returns vary based on market opportunity", "Trade duration determined by market conditions", "KYC and trading experience verification required", "Risk acknowledgment form required", "Maximum exposure limits enforced", "Subject to market volatility"] } },
      { name: "Multi Mix Trades", duration: "Variable", icon: Layers, deposit: "$25,000 - $1,000,000", returnPct: "35-75%", terms: { description: "Diversified multi-asset trading strategy across multiple market categories simultaneously.", minLockIn: "Varies by allocation", payoutSchedule: "Per-trade or aggregated monthly", earlyWithdrawalFee: "3% of principal", compounding: "Available on select allocations", eligibility: "Verified users with min. $25,000", riskLevel: "Medium-High", conditions: ["Multi-market diversification strategy", "Individual trade tracking and reporting", "KYC/AML compliance required", "Portfolio rebalancing available monthly", "Subject to market conditions across categories"] } },
      { name: "Multi Mix Bullet Trades", duration: "Variable", icon: Zap, deposit: "$50,000 - $2,000,000", returnPct: "40-90%", terms: { description: "Premium hybrid strategy combining bullet trade speed with multi-asset diversification.", minLockIn: "Varies by opportunity", payoutSchedule: "Per-trade completion", earlyWithdrawalFee: "4% of principal", compounding: "Selective compounding available", eligibility: "Experienced traders with min. $50,000", riskLevel: "High", conditions: ["Combined bullet and multi-mix strategy", "Enhanced risk-reward profile", "Full KYC/AML and experience verification", "Real-time trade monitoring available", "Maximum position limits enforced", "Subject to market volatility"] } },
      { name: "Compound Interest Trades", duration: "Variable", icon: TrendingUp, deposit: "$10,000 - $1,000,000", returnPct: "50-120%", terms: { description: "Automated compounding strategy that reinvests profits for exponential growth over time.", minLockIn: "Minimum 30 Days recommended", payoutSchedule: "Compounded until withdrawal", earlyWithdrawalFee: "2% of principal", compounding: "Automatic — core feature", eligibility: "All verified users", riskLevel: "Medium", conditions: ["Profits automatically reinvested", "Compounding frequency: daily/weekly/monthly", "Withdrawal available with notice period", "KYC verification required", "Performance reports provided weekly", "Subject to market conditions"] } },
      { name: "Multi Mix Compound Interest", duration: "Variable", icon: Layers, deposit: "$25,000 - $5,000,000", returnPct: "75-200%", terms: { description: "Advanced multi-asset compounding strategy for maximum wealth acceleration across diversified markets.", minLockIn: "Minimum 60 Days recommended", payoutSchedule: "Compounded until withdrawal request", earlyWithdrawalFee: "1.5% of principal", compounding: "Multi-asset auto-compounding", eligibility: "Accredited investors with min. $25,000", riskLevel: "Medium", conditions: ["Multi-market compounding across asset classes", "Customizable compounding frequency", "Monthly rebalancing and optimization", "Full KYC/AML compliance required", "Dedicated compound strategy manager", "Detailed growth projections provided", "Subject to market conditions"] } },
    ],
  },
];

const riskColors: Record<string, string> = {
  "Low": "text-green-400 border-green-500/30 bg-green-500/10",
  "Low-Medium": "text-green-400 border-green-500/30 bg-green-500/10",
  "Medium": "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  "Medium-Low": "text-green-400 border-green-500/30 bg-green-500/10",
  "Medium-High": "text-orange-400 border-orange-500/30 bg-orange-500/10",
  "High": "text-red-400 border-red-500/30 bg-red-500/10",
};

const EnrollmentForm = ({ program, onBack }: { program: ProgramItem; onBack: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    depositAmount: "",
    compounding: "no",
    agreeTerms: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || formData.fullName.length > 100) {
      toast.error("Please enter a valid name (max 100 characters)");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length > 20) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!formData.depositAmount) {
      toast.error("Please select a deposit amount");
      return;
    }
    if (!formData.agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("enrollment_submissions").insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        program_name: program.name,
        program_duration: program.duration,
        deposit_amount: formData.depositAmount,
        compounding: formData.compounding,
      });

      if (error) throw error;

      toast.success(`Enrollment request submitted for ${program.name}!`, {
        description: "Our team will review your application and contact you within 24 hours.",
      });
      onBack();
    } catch (err) {
      console.error("Enrollment submission error:", err);
      toast.error("Failed to submit enrollment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{program.name}</p>
          <p className="text-xs text-muted-foreground">{program.duration} · {program.returnPct} Return</p>
        </div>
        <Badge variant="outline" className="text-xs text-green-400 border-green-500/30 bg-green-500/10">
          {program.deposit}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="pl-10"
              maxLength={100}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              maxLength={255}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-10"
              maxLength={20}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="depositAmount" className="text-sm">Deposit Amount</Label>
          <Select value={formData.depositAmount} onValueChange={(v) => setFormData({ ...formData, depositAmount: v })}>
            <SelectTrigger id="depositAmount">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Select amount" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimum">Minimum Deposit</SelectItem>
              <SelectItem value="mid-range">Mid-Range</SelectItem>
              <SelectItem value="maximum">Maximum Deposit</SelectItem>
              <SelectItem value="custom">Custom Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {program.terms?.compounding !== "Not available" && (
        <div className="space-y-2">
          <Label htmlFor="compounding" className="text-sm">Compounding Preference</Label>
          <Select value={formData.compounding} onValueChange={(v) => setFormData({ ...formData, compounding: v })}>
            <SelectTrigger id="compounding">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No Compounding</SelectItem>
              <SelectItem value="yes">Enable Compounding</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-start gap-2">
        <Checkbox
          id="agreeTerms"
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked === true })}
          className="mt-1"
        />
        <Label htmlFor="agreeTerms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
          I have read and agree to the program terms and conditions, including the early withdrawal fee of {program.terms?.earlyWithdrawalFee} and minimum lock-in period of {program.terms?.minLockIn}. I understand that returns are subject to market conditions.
        </Label>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back to Details
        </Button>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Enrollment"}
        </Button>
      </div>
    </form>
  );
};

const TradingPrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [compareList, setCompareList] = useState<ProgramItem[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);

  const toggleCompare = (item: ProgramItem) => {
    setCompareList((prev) =>
      prev.find((p) => p.name === item.name)
        ? prev.filter((p) => p.name !== item.name)
        : prev.length < 4
        ? [...prev, item]
        : prev
    );
  };

  const isInCompare = (name: string) => compareList.some((p) => p.name === name);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Profit Trade Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-primary">Trading Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From short-term gains to long-term wealth building, we have a program for every investment strategy.
          </p>
        </motion.div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/30 flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <GitCompareArrows className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Comparing {compareList.length} program{compareList.length > 1 ? "s" : ""}</span>
              {compareList.map((p) => (
                <Badge key={p.name} variant="secondary" className="text-xs gap-1">
                  {p.name}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => toggleCompare(p)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setCompareList([])}>Clear</Button>
              <Button size="sm" onClick={() => setShowCompare(true)} disabled={compareList.length < 2}>
                Compare Side by Side
              </Button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program, programIndex) => (
            <motion.div
              key={program.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: programIndex * 0.1 }}
            >
              <Card className="bg-card/70 border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{program.category}</CardTitle>
                  <CardDescription>
                    {program.items.length} programs available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {program.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={isInCompare(item.name)}
                            onCheckedChange={() => toggleCompare(item)}
                            className="shrink-0"
                          />
                          <div
                            className="flex items-center gap-3 cursor-pointer flex-1"
                            onClick={() => { setSelectedProgram(item); setShowEnrollForm(false); }}
                          >
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <item.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <span className="font-medium text-sm block">{item.name}</span>
                              <span className="text-xs text-muted-foreground">Deposit: {item.deposit}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedProgram(item); setShowEnrollForm(false); }}>
                          <Badge variant="outline" className="text-xs text-green-400 border-green-500/30 bg-green-500/10">
                            {item.returnPct} Return
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.duration}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Trade Finance AUM</h3>
                  <p className="text-muted-foreground text-sm">
                    Total All Markets Market Cap - Access comprehensive trading analytics and market capitalization data.
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                  View Total AUM
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Program Detail Modal with Enrollment Form */}
      <Dialog open={!!selectedProgram} onOpenChange={(open) => { if (!open) { setSelectedProgram(null); setShowEnrollForm(false); } }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
          {selectedProgram && selectedProgram.terms && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <selectedProgram.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">
                      {showEnrollForm ? `Enroll: ${selectedProgram.name}` : selectedProgram.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      {showEnrollForm ? "Complete the form below to submit your enrollment request." : selectedProgram.terms.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {showEnrollForm ? (
                <EnrollmentForm
                  program={selectedProgram}
                  onBack={() => setShowEnrollForm(false)}
                />
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Return</p>
                      <p className="text-lg font-bold text-green-400">{selectedProgram.returnPct}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="text-lg font-bold text-primary">{selectedProgram.duration}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Deposit Range</p>
                      <p className="text-sm font-bold">{selectedProgram.deposit}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                      <Badge variant="outline" className={`text-xs ${riskColors[selectedProgram.terms.riskLevel] || ""}`}>
                        {selectedProgram.terms.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-4 my-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Program Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Minimum Lock-In Period</p>
                        <p className="text-sm font-medium">{selectedProgram.terms.minLockIn}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Payout Schedule</p>
                        <p className="text-sm font-medium">{selectedProgram.terms.payoutSchedule}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Early Withdrawal Fee</p>
                        <p className="text-sm font-medium">{selectedProgram.terms.earlyWithdrawalFee}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Compounding</p>
                        <p className="text-sm font-medium">{selectedProgram.terms.compounding}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Eligibility</p>
                        <p className="text-sm font-medium">{selectedProgram.terms.eligibility}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-3 my-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      Terms & Conditions
                    </h4>
                    <ul className="space-y-2">
                      {selectedProgram.terms.conditions.map((condition, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="bg-border/50" />

                  <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                    </DialogClose>
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90" onClick={() => setShowEnrollForm(true)}>
                      Enroll in Program
                    </Button>
                  </DialogFooter>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Comparison Modal */}
      <Dialog open={showCompare} onOpenChange={setShowCompare}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompareArrows className="w-5 h-5 text-primary" />
              Program Comparison
            </DialogTitle>
            <DialogDescription>
              Side-by-side comparison of {compareList.length} selected programs
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Feature</TableHead>
                  {compareList.map((p) => (
                    <TableHead key={p.name} className="min-w-[160px] text-center">
                      <div className="flex flex-col items-center gap-1">
                        <p.icon className="w-5 h-5 text-primary" />
                        <span className="text-xs font-semibold">{p.name}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Duration</TableCell>
                  {compareList.map((p) => <TableCell key={p.name} className="text-center text-sm">{p.duration}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Deposit Range</TableCell>
                  {compareList.map((p) => <TableCell key={p.name} className="text-center text-sm">{p.deposit}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Return</TableCell>
                  {compareList.map((p) => (
                    <TableCell key={p.name} className="text-center">
                      <Badge variant="outline" className="text-xs text-green-400 border-green-500/30 bg-green-500/10">{p.returnPct}</Badge>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Risk Level</TableCell>
                  {compareList.map((p) => (
                    <TableCell key={p.name} className="text-center">
                      <Badge variant="outline" className={`text-xs ${riskColors[p.terms?.riskLevel || ""] || ""}`}>{p.terms?.riskLevel}</Badge>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lock-In Period</TableCell>
                  {compareList.map((p) => <TableCell key={p.name} className="text-center text-sm">{p.terms?.minLockIn}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Payout Schedule</TableCell>
                  {compareList.map((p) => <TableCell key={p.name} className="text-center text-sm">{p.terms?.payoutSchedule}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Early Withdrawal Fee</TableCell>
                  {compareList.map((p) => <TableCell key={p.name} className="text-center text-sm">{p.terms?.earlyWithdrawalFee}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Compounding</TableCell>
                  {compareList.map((p) => <TableCell key={p.name} className="text-center text-sm">{p.terms?.compounding}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Eligibility</TableCell>
                  {compareList.map((p) => <TableCell key={p.name} className="text-center text-sm">{p.terms?.eligibility}</TableCell>)}
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TradingPrograms;
