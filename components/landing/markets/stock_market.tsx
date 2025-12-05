"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image"; // Keep this import
import Animate from "@/components/animation/animate";

// REMOVE these imports as they are no longer needed
// import apple from "@/assets/svg/apple--big.svg";
// import google from "@/assets/svg/alphabet--big.svg";
// import microsoft from "@/assets/svg/microsoft--big.svg";

const STOCKS = [
  {
    id: "GOOGL",
    name: "Alphabet Inc (Google) Class A",
    ticker: "GOOGL",
    // Use the path from the public directory
    logo: "/logos/alphabet--big.svg",
  },
  {
    id: "MSFT",
    name: "Microsoft Corporation",
    ticker: "MSFT",
    logo: "/logos/microsoft--big.svg",
  },
  {
    id: "AAPL",
    name: "Apple Inc.",
    ticker: "AAPL",
    logo: "/logos/apple--big.svg",
  },
];

const TIME_PERIODS = [
  { key: "1D", label: "1D" },
  { key: "1M", label: "1M" },
  { key: "3M", label: "3M" },
  { key: "1Y", label: "1Y" },
  { key: "5Y", label: "5Y" },
  { key: "ALL", label: "All" },
];

// Custom hook to handle client-side rendering
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return isClient;
}

export default function StockMarketPage() {
  const [selectedStock, setSelectedStock] = useState(STOCKS[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS[1]);
  const isClient = useIsClient();

  // Fetch data from our own API route
  const { data, isLoading, error } = useQuery({
    queryKey: ["stockData", selectedStock.id, selectedPeriod.key],
    queryFn: async () => {
      const response = await fetch(
        `/api/stocks?symbol=${selectedStock.id}&period=${selectedPeriod.key}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const currentPrice = data?.price || 0;
  const priceChange = data?.change || 0;
  const priceChangePercent = data?.changePercent || 0;
  const isPositive = priceChange >= 0;
  const chartData = data?.chartData || [];

  return (
    <div className="text-white py-20 bg-linear-to-b from-[#181818] to-[#373737]">
      {/* Main Container */}
      <div className="max_width">
        <Animate className="text-center mb-12 space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Invest on <span className="underline">Stock</span> Market
          </h1>
          <p className="text-xl max-w-4xl mx-auto">
            Invest on our extensive range of CFDs on FX, Commodities,
            Cryptocurrencies, Shares, ETFs and more. Low costs, fast execution
            and 24/7 support.
          </p>
        </Animate>

        {/* Stock Selector Tabs */}
        <div className="flex justify-center mb-8">
          <Animate className="bg-gray-800/50 rounded-xl p-2 flex gap-2">
            {STOCKS.map((stock) => (
              <button
                key={stock.id}
                onClick={() => setSelectedStock(stock)}
                className={`md:px-6 px-4 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedStock.id === stock.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {stock.ticker === "GOOGL"
                  ? "Google"
                  : stock.ticker === "MSFT"
                  ? "Microsoft"
                  : "Apple"}
              </button>
            ))}
          </Animate>
        </div>
        <Animate className="bg-[#181818] rounded-lg shadow-md overflow-hidden">
          {/* Price Display */}
          <div className="p-6 space-y-2">
            <Animate className="flex items-start gap-2 justify-start">
              {/* Use the logo directly from the selectedStock object */}
              <Image
                src={selectedStock.logo}
                alt={selectedStock.ticker}
                width={32} // Add width and height for next/image
                height={32}
                className="rounded-full  sm:flex"
              />
              <p className="text-2xl font-bold md:text-3xl">
                {selectedStock.name}
              </p>
            </Animate>
            <Animate className="flex items-baseline flex-wrap space-y-2 space-x-4 mb-6">
              <span className="md:text-3xl text-2xl font-semibold">
                ${" "}{currentPrice.toFixed(2)} USD
              </span>
              <div
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                  isPositive
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {priceChange > 0 ? "+" : ""}
                  {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                </span>
                <span className="text-gray-400 text-sm">Today</span>
              </div>
            </Animate>

            {/* Time Period Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {TIME_PERIODS.map((period) => (
                <Animate key={period.key} >
                <button
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod.key === period.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  >
                  {period.label}
                </button>
             </Animate>
              ))}
            </div>

            {/* Chart with Gradient Fill */}
            <div className="overflow-x-scroll scrollbar_hidden">
              <div className="min-w-[560px] h-80">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Loading chart...
                  </div>
                ) : error ? (
                  <div className="flex h-full items-center justify-center text-red-400">
                    Error loading chart data.
                  </div>
                ) : (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: -20 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorPrice"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                      />
                      <YAxis
                        domain={["dataMin", "dataMax"]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#9ca3af" }}
                        itemStyle={{ color: "#3b82f6" }}
                        formatter={(value: number) => [
                          `$${value.toFixed(2)}`,
                          "Price",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </Animate>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center grid-cols-3 gap-6 pt-20">
          <Animate className="text-center">
            <div className="text-2xl font-bold mb-1">102+ Billion</div>
            <div className="text-gray-400 text-sm">transactions</div>
          </Animate>
          <Animate className="text-center">
            <div className="text-2xl font-bold mb-1">211+ Thousand</div>
            <div className="text-gray-400 text-sm">active accounts</div>
          </Animate>
          <Animate className="text-center">
            <div className="text-2xl font-bold mb-1">112+ Thousand</div>
            <div className="text-gray-400 text-sm">running days</div>
          </Animate>
        </div>
      </div>
    </div>
  );
}
