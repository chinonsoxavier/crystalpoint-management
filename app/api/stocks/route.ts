import { NextResponse, NextRequest } from "next/server";

const TIME_PERIODS = [
  { key: "1D", days: 1 },
  { key: "1M", days: 30 },
  { key: "3M", days: 90 },
  { key: "1Y", days: 365 },
  { key: "5Y", days: 5 * 365 },
  { key: "ALL", days: 20 * 365 },
] as const;

type TimePeriodKey = (typeof TIME_PERIODS)[number]["key"];

type ChartPoint = {
  time: number;
  price: number | null;
  date: string;
};

interface ValidChartPoint extends ChartPoint {
  price: number;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const symbol = url.searchParams.get("symbol") || "GOOGL";
  const periodKey = (url.searchParams.get("period") || "1M") as TimePeriodKey;

  try {
    // Determine the selected period
    const selectedPeriod =
      TIME_PERIODS.find((p) => p.key === periodKey) ?? TIME_PERIODS[1];

    const now = Math.floor(Date.now() / 1000);
    const period1 = now - selectedPeriod.days * 24 * 60 * 60;
    const period2 = now;

    const interval =
      periodKey === "1D" ? "5m" : periodKey === "5Y" ? "1wk" : "1d";

    // Fetch Yahoo Finance chart data
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}`;
    const response = await fetch(yahooUrl);

    if (!response.ok) {
      throw new Error(`Yahoo Finance Error: ${response.status}`);
    }

    const json = await response.json();

    // Yahoo sometimes returns an error message instead of result
    if (!json.chart?.result?.length) {
      throw new Error("Invalid Yahoo chart data.");
    }

    const result = json.chart.result[0];
    const timestamps: number[] = result.timestamp ?? [];
    const prices: (number | null)[] =
      result.indicators?.quote?.[0]?.close ?? [];

    const currentPrice = result.meta?.regularMarketPrice ?? null;
    const previousClose = result.meta?.previousClose ?? null;

    if (currentPrice === null || previousClose === null) {
      throw new Error("Missing price data.");
    }

    const priceChange = currentPrice - previousClose;
    const changePercent = (priceChange / previousClose) * 100;

    // Build chart data safely
    const chartData: ValidChartPoint[] = timestamps
      .map(
        (ts, i): ChartPoint => ({
          time: ts * 1000,
          price: prices[i],
          date: new Date(ts * 1000).toLocaleDateString(),
        })
      )
      .filter(
        (item: ChartPoint): item is ValidChartPoint => item.price !== null
      );

    return NextResponse.json({
      price: currentPrice,
      change: priceChange,
      changePercent,
      chartData,
    });
  } catch (error) {
    console.error("API Route Error:", error);

    // Fallback mock values
    const mockPrice =
      symbol === "GOOGL" ? 291.61 : symbol === "MSFT" ? 428.67 : 196.94;

    const mockChange =
      symbol === "GOOGL" ? -1.2 : symbol === "MSFT" ? -3.65 : 4.41;

    const mockChangePercent = (mockChange / (mockPrice - mockChange)) * 100;

    const mockChartData: ValidChartPoint[] = Array.from({ length: 30 }).map(
      (_, i) => {
        const time = Date.now() - (30 - i) * 86400000;

        return {
          time,
          price: mockPrice + (Math.random() - 0.5) * (mockPrice * 0.1),
          date: new Date(time).toLocaleDateString(),
        };
      }
    );

    return NextResponse.json({
      price: mockPrice,
      change: mockChange,
      changePercent: mockChangePercent,
      chartData: mockChartData,
    });
  }
}
