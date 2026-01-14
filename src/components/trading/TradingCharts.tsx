import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart
} from "recharts";
import { 
  TrendingUp, TrendingDown, Activity, BarChart3, 
  CandlestickChart, Maximize2, RefreshCw 
} from "lucide-react";

// Generate mock price data
const generatePriceData = (basePrice: number, volatility: number, points: number) => {
  const data = [];
  let price = basePrice;
  const now = Date.now();
  
  for (let i = points; i >= 0; i--) {
    const change = (Math.random() - 0.5) * volatility;
    price = Math.max(price + change, basePrice * 0.8);
    const high = price + Math.random() * volatility * 0.5;
    const low = price - Math.random() * volatility * 0.5;
    const open = price + (Math.random() - 0.5) * volatility * 0.3;
    
    data.push({
      time: new Date(now - i * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(price.toFixed(2)),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  return data;
};

const marketData = [
  { symbol: "BTC/USD", name: "Bitcoin", price: 42150.00, change: 2.34, volume: "12.5B" },
  { symbol: "ETH/USD", name: "Ethereum", price: 2485.50, change: -0.87, volume: "5.2B" },
  { symbol: "EUR/USD", name: "Euro", price: 1.0845, change: 0.12, volume: "892M" },
  { symbol: "GBP/USD", name: "British Pound", price: 1.2698, change: 0.34, volume: "654M" },
  { symbol: "XAU/USD", name: "Gold", price: 2028.40, change: 1.56, volume: "1.8B" },
  { symbol: "SPX", name: "S&P 500", price: 4783.45, change: 0.89, volume: "3.2B" },
];

const TradingCharts = () => {
  const [selectedMarket, setSelectedMarket] = useState(marketData[0]);
  const [chartData, setChartData] = useState(generatePriceData(42150, 150, 60));
  const [timeframe, setTimeframe] = useState("1H");
  const [chartType, setChartType] = useState<"line" | "area" | "candle">("area");

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        const change = (Math.random() - 0.5) * 50;
        const newPrice = Math.max(lastPrice + change, selectedMarket.price * 0.9);
        const high = newPrice + Math.random() * 25;
        const low = newPrice - Math.random() * 25;
        
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: parseFloat(newPrice.toFixed(2)),
          open: lastPrice,
          high: parseFloat(high.toFixed(2)),
          low: parseFloat(low.toFixed(2)),
          close: parseFloat(newPrice.toFixed(2)),
          volume: Math.floor(Math.random() * 1000000) + 500000,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedMarket]);

  const handleMarketChange = (market: typeof marketData[0]) => {
    setSelectedMarket(market);
    setChartData(generatePriceData(market.price, market.price * 0.005, 60));
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Live Trading Charts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time market data with advanced charting tools and technical analysis
          </p>
        </div>

        {/* Market Ticker */}
        <div className="flex overflow-x-auto gap-4 mb-8 pb-2">
          {marketData.map((market) => (
            <Card 
              key={market.symbol} 
              className={`min-w-[180px] cursor-pointer transition-all hover:scale-105 ${
                selectedMarket.symbol === market.symbol ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
              onClick={() => handleMarketChange(market)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-foreground">{market.symbol}</span>
                  <Badge variant={market.change >= 0 ? "default" : "destructive"} className="text-xs">
                    {market.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {market.change >= 0 ? '+' : ''}{market.change}%
                  </Badge>
                </div>
                <p className="text-lg font-bold text-foreground">
                  ${market.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Vol: {market.volume}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Chart */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  {selectedMarket.symbol}
                </CardTitle>
                <div className="text-2xl font-bold text-foreground">
                  ${chartData[chartData.length - 1]?.price.toLocaleString()}
                </div>
                <Badge variant={selectedMarket.change >= 0 ? "default" : "destructive"}>
                  {selectedMarket.change >= 0 ? '+' : ''}{selectedMarket.change}%
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={timeframe} onValueChange={setTimeframe}>
                  <TabsList>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="5M">5M</TabsTrigger>
                    <TabsTrigger value="15M">15M</TabsTrigger>
                    <TabsTrigger value="1H">1H</TabsTrigger>
                    <TabsTrigger value="4H">4H</TabsTrigger>
                    <TabsTrigger value="1D">1D</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex gap-1 ml-4">
                  <Button 
                    size="sm" 
                    variant={chartType === "line" ? "default" : "outline"}
                    onClick={() => setChartType("line")}
                  >
                    <Activity className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={chartType === "area" ? "default" : "outline"}
                    onClick={() => setChartType("area")}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={chartType === "candle" ? "default" : "outline"}
                    onClick={() => setChartType("candle")}
                  >
                    <CandlestickChart className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" variant="ghost">
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "line" ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                ) : chartType === "area" ? (
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                ) : (
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="volume" fill="hsl(var(--muted))" opacity={0.3} />
                    <Line type="monotone" dataKey="high" stroke="hsl(142 76% 36%)" strokeWidth={1} dot={false} />
                    <Line type="monotone" dataKey="low" stroke="hsl(0 84% 60%)" strokeWidth={1} dot={false} />
                    <Line type="monotone" dataKey="close" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </ComposedChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">24h High</p>
              <p className="text-xl font-bold text-green-500">${(selectedMarket.price * 1.025).toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">24h Low</p>
              <p className="text-xl font-bold text-red-500">${(selectedMarket.price * 0.975).toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-xl font-bold text-foreground">{selectedMarket.volume}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-xl font-bold text-foreground">$825.4B</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TradingCharts;
