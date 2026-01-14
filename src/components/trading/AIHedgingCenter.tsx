import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Zap, 
  Target,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  LineChart,
  PieChart,
  Activity
} from "lucide-react";

const riskProfiles = [
  { id: "conservative", name: "Conservative", risk: 20, description: "Low risk, stable returns", color: "text-green-500" },
  { id: "moderate", name: "Moderate", risk: 50, description: "Balanced risk/reward", color: "text-yellow-500" },
  { id: "aggressive", name: "Aggressive", risk: 80, description: "High risk, high potential", color: "text-orange-500" },
  { id: "dynamic", name: "AI Dynamic", risk: 0, description: "AI-adjusted based on market", color: "text-primary" },
];

const activeStrategies = [
  { id: 1, name: "BTC Momentum Shield", type: "Hedging", status: "active", pnl: 2340.50, risk: 35, assets: ["BTC", "USDT"] },
  { id: 2, name: "EUR/USD Arbitrage", type: "Arbitrage", status: "active", pnl: 892.20, risk: 25, assets: ["EUR", "USD"] },
  { id: 3, name: "Multi-Asset Balance", type: "Rebalancing", status: "paused", pnl: 1567.80, risk: 45, assets: ["BTC", "ETH", "SOL"] },
  { id: 4, name: "Gold Safe Haven", type: "Hedging", status: "active", pnl: 456.30, risk: 15, assets: ["XAU", "USD"] },
];

const aiInsights = [
  { type: "opportunity", message: "BTC showing bullish divergence - consider increasing position", confidence: 87 },
  { type: "warning", message: "EUR/USD volatility spike expected - hedge recommended", confidence: 92 },
  { type: "success", message: "Portfolio rebalanced - risk exposure reduced by 12%", confidence: 100 },
  { type: "info", message: "New trading pair XRP/USDT available for hedging strategies", confidence: 75 },
];

const AIHedgingCenter = () => {
  const [selectedRisk, setSelectedRisk] = useState(riskProfiles[1]);
  const [autoHedge, setAutoHedge] = useState(true);
  const [stopLoss, setStopLoss] = useState([5]);
  const [takeProfit, setTakeProfit] = useState([15]);
  const [portfolioAllocation, setPortfolioAllocation] = useState([60]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStrategy = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Brain className="w-5 h-5" />
            <span className="font-medium">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Hedging Center
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced AI algorithms to protect your portfolio, manage risk, and generate optimized trading strategies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Risk Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights Panel */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.map((insight, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      insight.type === "warning" ? "bg-yellow-500/10" :
                      insight.type === "success" ? "bg-green-500/10" :
                      insight.type === "opportunity" ? "bg-primary/10" : "bg-muted/50"
                    }`}
                  >
                    {insight.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                    {insight.type === "success" && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />}
                    {insight.type === "opportunity" && <TrendingUp className="w-5 h-5 text-primary mt-0.5" />}
                    {insight.type === "info" && <Activity className="w-5 h-5 text-muted-foreground mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{insight.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={insight.confidence} className="h-1 flex-1" />
                        <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Strategies */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Active Strategies
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={handleGenerateStrategy}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeStrategies.map((strategy) => (
                    <div key={strategy.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{strategy.name}</h4>
                          <Badge variant={strategy.status === "active" ? "default" : "secondary"}>
                            {strategy.status}
                          </Badge>
                          <Badge variant="outline">{strategy.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Assets: {strategy.assets.join(", ")}</span>
                          <span>Risk: {strategy.risk}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${strategy.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl.toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="ghost">
                            {strategy.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strategy Generator */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Strategy Generator
                </CardTitle>
                <CardDescription>
                  Let AI create optimized trading strategies based on your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="quick">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="quick">Quick Generate</TabsTrigger>
                    <TabsTrigger value="custom">Custom Strategy</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="quick" className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Strategy Type</label>
                        <Select defaultValue="hedging">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hedging">Hedging Strategy</SelectItem>
                            <SelectItem value="arbitrage">Arbitrage Strategy</SelectItem>
                            <SelectItem value="momentum">Momentum Strategy</SelectItem>
                            <SelectItem value="rebalancing">Portfolio Rebalancing</SelectItem>
                            <SelectItem value="compound">Compound Interest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Target Market</label>
                        <Select defaultValue="crypto">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crypto">Cryptocurrencies</SelectItem>
                            <SelectItem value="forex">Forex</SelectItem>
                            <SelectItem value="commodities">Commodities</SelectItem>
                            <SelectItem value="stocks">Stocks & ETFs</SelectItem>
                            <SelectItem value="mixed">Multi-Market</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Investment Amount</label>
                      <Input type="number" placeholder="Enter amount in USD" defaultValue="10000" />
                    </div>
                    <Button className="w-full" size="lg" onClick={handleGenerateStrategy} disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating Strategy...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate AI Strategy
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="custom" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Strategy Description</label>
                        <Input placeholder="Describe your trading goals..." />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Time Horizon</label>
                          <Select defaultValue="medium">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short (1-7 days)</SelectItem>
                              <SelectItem value="medium">Medium (1-4 weeks)</SelectItem>
                              <SelectItem value="long">Long (1-6 months)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Max Drawdown</label>
                          <Select defaultValue="10">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5%</SelectItem>
                              <SelectItem value="10">10%</SelectItem>
                              <SelectItem value="20">20%</SelectItem>
                              <SelectItem value="30">30%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Target Return</label>
                          <Select defaultValue="moderate">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">5-10%</SelectItem>
                              <SelectItem value="moderate">10-25%</SelectItem>
                              <SelectItem value="high">25-50%</SelectItem>
                              <SelectItem value="aggressive">50%+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full" size="lg">
                        <Brain className="w-4 h-4 mr-2" />
                        Create Custom Strategy
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4 mt-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Use Machine Learning Models</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Include Technical Indicators</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Sentiment Analysis</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">On-Chain Analytics</span>
                        <Switch />
                      </div>
                    </div>
                    <Button className="w-full" size="lg" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Advanced Parameters
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Risk Settings */}
          <div className="space-y-6">
            {/* Risk Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Risk Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskProfiles.map((profile) => (
                  <div 
                    key={profile.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRisk.id === profile.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-transparent bg-muted/50 hover:border-border'
                    }`}
                    onClick={() => setSelectedRisk(profile)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${profile.color}`}>{profile.name}</span>
                      {profile.risk > 0 && (
                        <Badge variant="outline">{profile.risk}% risk</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{profile.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Auto Hedging */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Auto Hedging
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Enable Auto-Hedge</p>
                    <p className="text-sm text-muted-foreground">AI manages hedging automatically</p>
                  </div>
                  <Switch checked={autoHedge} onCheckedChange={setAutoHedge} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Stop Loss</span>
                    <span className="text-sm text-muted-foreground">{stopLoss[0]}%</span>
                  </div>
                  <Slider 
                    value={stopLoss} 
                    onValueChange={setStopLoss} 
                    max={25} 
                    min={1} 
                    step={1}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Take Profit</span>
                    <span className="text-sm text-muted-foreground">{takeProfit[0]}%</span>
                  </div>
                  <Slider 
                    value={takeProfit} 
                    onValueChange={setTakeProfit} 
                    max={100} 
                    min={5} 
                    step={5}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Portfolio Allocation</span>
                    <span className="text-sm text-muted-foreground">{portfolioAllocation[0]}%</span>
                  </div>
                  <Slider 
                    value={portfolioAllocation} 
                    onValueChange={setPortfolioAllocation} 
                    max={100} 
                    min={10} 
                    step={10}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Portfolio Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Value</span>
                  <span className="font-bold text-foreground">$125,432.50</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Today's P&L</span>
                  <span className="font-bold text-green-500">+$3,256.80</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Protected Assets</span>
                  <span className="font-bold text-foreground">78%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Active Strategies</span>
                  <span className="font-bold text-foreground">4</span>
                </div>
                <Button className="w-full" variant="outline">
                  <LineChart className="w-4 h-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIHedgingCenter;
