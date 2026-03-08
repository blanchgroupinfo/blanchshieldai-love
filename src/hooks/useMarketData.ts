import { useState, useEffect, useCallback, useRef } from "react";

export interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume?: string;
  source: "api" | "simulated";
}

// CoinGecko IDs mapped to our symbols
const CRYPTO_IDS: Record<string, string> = {
  "BTC/USD": "bitcoin",
  "ETH/USD": "ethereum",
};

// Fallback base prices for simulated data
const FALLBACK_PRICES: Record<string, { price: number; volume?: string }> = {
  "BTC/USD": { price: 87500, volume: "28.5B" },
  "ETH/USD": { price: 2050, volume: "12.2B" },
  "EUR/USD": { price: 1.0845, volume: "892M" },
  "GBP/USD": { price: 1.2698, volume: "654M" },
  "XAU/USD": { price: 2920, volume: "1.8B" },
  "SPX": { price: 5670, volume: "3.2B" },
  "JPY/USD": { price: 0.0067, volume: "420M" },
  "XAG/USD": { price: 32.50, volume: "380M" },
  "BRICS": { price: 1250, volume: "156M" },
  "CBDC": { price: 0.14, volume: "89M" },
  "NAS100": { price: 19850, volume: "2.1B" },
  "DJI": { price: 42100, volume: "1.9B" },
  "OIL": { price: 68.45, volume: "1.2B" },
  "NGS": { price: 3.89, volume: "340M" },
};

const ALL_SYMBOLS = [
  { symbol: "BTC/USD", name: "Bitcoin" },
  { symbol: "ETH/USD", name: "Ethereum" },
  { symbol: "EUR/USD", name: "Euro" },
  { symbol: "GBP/USD", name: "British Pound" },
  { symbol: "XAU/USD", name: "Gold" },
  { symbol: "SPX", name: "S&P 500" },
  { symbol: "JPY/USD", name: "Japanese Yen" },
  { symbol: "XAG/USD", name: "Silver" },
  { symbol: "BRICS", name: "BRICS Index" },
  { symbol: "CBDC", name: "Digital Yuan" },
  { symbol: "NAS100", name: "NASDAQ 100" },
  { symbol: "DJI", name: "Dow Jones" },
  { symbol: "OIL", name: "Crude Oil" },
  { symbol: "NGS", name: "Natural Gas" },
];

// Realistic simulated price movement using geometric Brownian motion
function simulatePrice(currentPrice: number, volatility: number = 0.0008): number {
  const drift = 0.00001;
  const dt = 1;
  const randomShock = (Math.random() + Math.random() + Math.random() - 1.5) * 2; // approx normal
  const priceChange = currentPrice * (drift * dt + volatility * Math.sqrt(dt) * randomShock);
  return Math.max(currentPrice + priceChange, currentPrice * 0.5);
}

function simulateChange(currentChange: number): number {
  const mean = 0;
  const reversion = 0.02;
  const noise = (Math.random() - 0.5) * 0.08;
  return parseFloat((currentChange * (1 - reversion) + mean * reversion + noise).toFixed(2));
}

async function fetchCryptoPrices(): Promise<Map<string, { price: number; change: number }>> {
  const result = new Map<string, { price: number; change: number }>();
  try {
    const ids = Object.values(CRYPTO_IDS).join(",");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!response.ok) throw new Error("CoinGecko API error");
    const data = await response.json();

    for (const [symbol, coinId] of Object.entries(CRYPTO_IDS)) {
      const coin = data[coinId];
      if (coin) {
        result.set(symbol, {
          price: coin.usd,
          change: parseFloat((coin.usd_24h_change || 0).toFixed(2)),
        });
      }
    }
  } catch {
    // Silently fail, will use simulated data
  }
  return result;
}

export function useMarketData(updateIntervalMs: number = 3000) {
  const [markets, setMarkets] = useState<MarketItem[]>(() =>
    ALL_SYMBOLS.map((s) => ({
      ...s,
      price: FALLBACK_PRICES[s.symbol]?.price ?? 100,
      change: parseFloat(((Math.random() - 0.5) * 4).toFixed(2)),
      volume: FALLBACK_PRICES[s.symbol]?.volume,
      source: "simulated" as const,
    }))
  );
  const lastApiFetch = useRef(0);
  const apiCache = useRef<Map<string, { price: number; change: number }>>(new Map());

  // Fetch real API data every 60s (CoinGecko rate limit friendly)
  const fetchApiData = useCallback(async () => {
    const now = Date.now();
    if (now - lastApiFetch.current < 60000) return;
    lastApiFetch.current = now;

    const cryptoPrices = await fetchCryptoPrices();
    if (cryptoPrices.size > 0) {
      apiCache.current = cryptoPrices;
      setMarkets((prev) =>
        prev.map((m) => {
          const apiData = cryptoPrices.get(m.symbol);
          if (apiData) {
            return { ...m, price: apiData.price, change: apiData.change, source: "api" };
          }
          return m;
        })
      );
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  // Simulate realistic price ticks
  useEffect(() => {
    const interval = setInterval(() => {
      // Periodically re-fetch API data
      fetchApiData();

      setMarkets((prev) =>
        prev.map((m) => {
          // For API-sourced items, add small realistic noise
          const isApi = apiCache.current.has(m.symbol);
          const vol = isApi ? 0.0003 : 0.0008;
          const newPrice = simulatePrice(m.price, vol);
          const decimals = m.price < 1 ? 4 : m.price < 100 ? 2 : 2;

          return {
            ...m,
            price: parseFloat(newPrice.toFixed(decimals)),
            change: simulateChange(m.change),
            source: isApi ? ("api" as const) : ("simulated" as const),
          };
        })
      );
    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, [updateIntervalMs, fetchApiData]);

  return markets;
}

// Generate realistic OHLCV candle data
export function generateRealisticCandles(
  basePrice: number,
  points: number,
  volatility: number = 0.015
) {
  const data = [];
  let price = basePrice;
  const now = Date.now();

  for (let i = points; i >= 0; i--) {
    const open = price;
    // Trend component
    const trend = Math.sin(i / 10) * volatility * 0.3;
    const shock = (Math.random() + Math.random() + Math.random() - 1.5) * 2;
    const move = price * (trend + volatility * shock);
    price = Math.max(price + move, basePrice * 0.7);
    const close = price;

    const highExtra = Math.abs(move) * (1 + Math.random());
    const lowExtra = Math.abs(move) * (1 + Math.random());
    const high = Math.max(open, close) + highExtra;
    const low = Math.min(open, close) - lowExtra;

    // Volume correlates with price movement magnitude
    const baseVolume = 500000;
    const volumeSpike = Math.abs(move / price) * 20000000;
    const volume = Math.floor(baseVolume + volumeSpike + Math.random() * 300000);

    data.push({
      time: new Date(now - i * 60000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      price: parseFloat(close.toFixed(2)),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    });
  }
  return data;
}
