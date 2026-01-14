import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  History,
  TrendingUp,
  TrendingDown,
  Copy,
  QrCode,
  CreditCard,
  Building2
} from "lucide-react";

const balances = [
  { currency: "USD", symbol: "$", balance: 125432.50, change: 2.34 },
  { currency: "EUR", symbol: "€", balance: 98543.20, change: -0.45 },
  { currency: "BTC", symbol: "₿", balance: 2.45678, change: 5.67 },
  { currency: "ETH", symbol: "Ξ", balance: 15.234, change: 3.21 },
  { currency: "USDT", symbol: "₮", balance: 50000.00, change: 0.01 },
  { currency: "GBP", symbol: "£", balance: 45230.80, change: 1.12 },
];

const transactions = [
  { id: "TXN001", type: "deposit", currency: "USD", amount: 10000, status: "completed", date: "2024-01-14 14:32", method: "Wire Transfer" },
  { id: "TXN002", type: "withdraw", currency: "BTC", amount: 0.5, status: "pending", date: "2024-01-14 12:15", method: "Blockchain" },
  { id: "TXN003", type: "swap", currency: "ETH → USDT", amount: 5000, status: "completed", date: "2024-01-13 18:45", method: "Instant Swap" },
  { id: "TXN004", type: "deposit", currency: "EUR", amount: 25000, status: "completed", date: "2024-01-13 09:22", method: "SEPA" },
  { id: "TXN005", type: "trade", currency: "USD", amount: 15000, status: "completed", date: "2024-01-12 16:30", method: "24hr Program" },
  { id: "TXN006", type: "withdraw", currency: "USD", amount: 5000, status: "completed", date: "2024-01-12 11:00", method: "Bank Transfer" },
  { id: "TXN007", type: "deposit", currency: "USDT", amount: 30000, status: "processing", date: "2024-01-11 20:15", method: "Crypto Deposit" },
  { id: "TXN008", type: "swap", currency: "BTC → ETH", amount: 12500, status: "completed", date: "2024-01-11 14:00", method: "Cross-Chain Swap" },
];

const depositMethods = [
  { id: "wire", name: "Wire Transfer", icon: Building2, fee: "0.5%", time: "1-3 days" },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard, fee: "2.5%", time: "Instant" },
  { id: "crypto", name: "Crypto Deposit", icon: Wallet, fee: "Network fee", time: "10-60 min" },
  { id: "sepa", name: "SEPA Transfer", icon: Building2, fee: "Free", time: "1-2 days" },
];

const TradingWallet = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [swapFrom, setSwapFrom] = useState("USD");
  const [swapTo, setSwapTo] = useState("BTC");
  const [swapAmount, setSwapAmount] = useState("");

  const totalBalance = balances.reduce((sum, b) => {
    // Convert everything to USD for display (simplified)
    const rate = b.currency === "BTC" ? 42000 : b.currency === "ETH" ? 2500 : b.currency === "EUR" ? 1.08 : b.currency === "GBP" ? 1.27 : 1;
    return sum + (b.balance * rate);
  }, 0);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Wallet & Transactions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your multi-currency portfolio with seamless deposits, withdrawals, and swaps
          </p>
        </div>

        {/* Portfolio Overview */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Total Portfolio Value
              </CardTitle>
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-6">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {balances.map((bal) => (
                <Card key={bal.currency} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{bal.currency}</span>
                      <span className={`text-xs flex items-center ${bal.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {bal.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {bal.change >= 0 ? '+' : ''}{bal.change}%
                      </span>
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {bal.symbol}{bal.balance.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Tabs */}
        <Tabs defaultValue="deposit" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deposit" className="flex items-center gap-2">
              <ArrowDownLeft className="w-4 h-4" /> Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" /> Withdraw
            </TabsTrigger>
            <TabsTrigger value="swap" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Swap
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" /> History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Deposit Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {depositMethods.map((method) => (
                    <Card key={method.id} className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4 text-center">
                        <method.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="font-medium text-sm text-foreground">{method.name}</p>
                        <p className="text-xs text-muted-foreground">Fee: {method.fee}</p>
                        <p className="text-xs text-muted-foreground">{method.time}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Currency</label>
                    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {balances.map((b) => (
                          <SelectItem key={b.currency} value={b.currency}>{b.currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Amount</label>
                    <Input 
                      type="number" 
                      placeholder="Enter amount" 
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Deposit Address</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost"><Copy className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost"><QrCode className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <code className="text-xs break-all text-foreground">0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D</code>
                </div>
                <Button className="w-full" size="lg">
                  <ArrowDownLeft className="w-4 h-4 mr-2" />
                  Generate Deposit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Currency</label>
                    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {balances.map((b) => (
                          <SelectItem key={b.currency} value={b.currency}>
                            {b.currency} - Available: {b.symbol}{b.balance.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Amount</label>
                    <Input 
                      type="number" 
                      placeholder="Enter amount" 
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Destination Address / Bank Details</label>
                  <Input placeholder="Enter wallet address or bank account" />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span className="text-foreground">$2.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Time</span>
                    <span className="text-foreground">1-24 hours</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Initiate Withdrawal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swap">
            <Card>
              <CardHeader>
                <CardTitle>Currency Swap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">From</label>
                    <Select value={swapFrom} onValueChange={setSwapFrom}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {balances.map((b) => (
                          <SelectItem key={b.currency} value={b.currency}>{b.currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-center">
                    <Button variant="ghost" size="icon" onClick={() => { 
                      const temp = swapFrom; 
                      setSwapFrom(swapTo); 
                      setSwapTo(temp); 
                    }}>
                      <RefreshCw className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">To</label>
                    <Select value={swapTo} onValueChange={setSwapTo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {balances.map((b) => (
                          <SelectItem key={b.currency} value={b.currency}>{b.currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Amount to Swap</label>
                  <Input 
                    type="number" 
                    placeholder="Enter amount"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span className="text-foreground">1 {swapFrom} = {swapFrom === "BTC" ? "42,150.00" : "0.0000237"} {swapTo}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You will receive</span>
                    <span className="text-foreground font-medium">~{swapAmount ? (parseFloat(swapAmount) * 0.98).toFixed(4) : "0"} {swapTo}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Swap Fee</span>
                    <span className="text-foreground">0.3%</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Execute Swap
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Currency</th>
                        <th className="text-right p-3 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Method</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 text-sm font-mono text-foreground">{tx.id}</td>
                          <td className="p-3">
                            <Badge variant={tx.type === "deposit" ? "default" : tx.type === "withdraw" ? "secondary" : "outline"}>
                              {tx.type}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-foreground">{tx.currency}</td>
                          <td className="p-3 text-sm text-right font-medium text-foreground">
                            {tx.type === "withdraw" ? "-" : "+"}{tx.amount.toLocaleString()}
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{tx.method}</td>
                          <td className="p-3">
                            <Badge variant={tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "outline"} 
                                   className={tx.status === "completed" ? "bg-green-500/20 text-green-500" : ""}>
                              {tx.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TradingWallet;
