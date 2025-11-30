"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
} from "lucide-react";
import Animate from "@/components/animation/animate";

// --- Type Definitions ---
interface ForexPair {
  symbol: string;
  name: string;
  flag1: string;
  flag2: string;
}

interface ForexData {
  pair: string;
  symbol: string;
  name: string;
  flag1: string;
  flag2: string;
  price: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  lastUpdated: string;
  simulated?: boolean;
}

interface TechnicalRating {
  rating: string;
  color: string;
  icon: string;
}

interface SortConfig {
  key: keyof ForexData | null;
  direction: "asc" | "desc";
}

// --- Currency Map ---
const currencyMap: Record<string, { flag: string; name: string }> = {
  USD: { flag: "United States", name: "US Dollar" },
  EUR: { flag: "European Union", name: "Euro" },
  GBP: { flag: "United Kingdom", name: "British Pound" },
  JPY: { flag: "Japan", name: "Japanese Yen" },
  CHF: { flag: "Switzerland", name: "Swiss Franc" },
  CAD: { flag: "Canada", name: "Canadian Dollar" },
  AUD: { flag: "Australia", name: "Australian Dollar" },
  NZD: { flag: "New Zealand", name: "New Zealand Dollar" },
  CNY: { flag: "China", name: "Chinese Yuan" },
  SEK: { flag: "Sweden", name: "Swedish Krona" },
  NOK: { flag: "Norway", name: "Norwegian Krone" },
  MXN: { flag: "Mexico", name: "Mexican Peso" },
  SGD: { flag: "Singapore", name: "Singapore Dollar" },
  HKD: { flag: "Hong Kong", name: "Hong Kong Dollar" },
  ZAR: { flag: "South Africa", name: "South African Rand" },
  TRY: { flag: "Turkey", name: "Turkish Lira" },
  INR: { flag: "India", name: "Indian Rupee" },
};

// --- Generate All Forex Pairs ---
const generateForexPairs = (): Record<string, ForexPair> => {
  const pairs: Record<string, ForexPair> = {};
  const currencies = Object.keys(currencyMap);
  for (let i = 0; i < currencies.length; i++) {
    for (let j = 0; j < currencies.length; j++) {
      if (i === j) continue;
      const from = currencies[i];
      const to = currencies[j];
      const pairKey = `${from}/${to}`;
      const symbol = `${from}${to}`;
      pairs[pairKey] = {
        symbol,
        name: `${currencyMap[from].name} / ${currencyMap[to].name}`,
        flag1: currencyMap[from].flag,
        flag2: currencyMap[to].flag,
      };
    }
  }
  return pairs;
};

const allForexPairs = generateForexPairs();
const allForexPairsArray = Object.entries(allForexPairs);

// --- Helpers ---
const getTechnicalRating = (changePercent: number): TechnicalRating => {
  if (changePercent > 0.5)
    return { rating: "Strong Buy", color: "text-green-400", icon: "Strong Up" };
  if (changePercent > 0.1)
    return { rating: "Buy", color: "text-green-300", icon: "Up" };
  if (changePercent < -0.5)
    return {
      rating: "Strong Sell",
      color: "text-red-400",
      icon: "Strong Down",
    };
  if (changePercent < -0.1)
    return { rating: "Sell", color: "text-red-300", icon: "Down" };
  return { rating: "Neutral", color: "text-gray-400", icon: "Neutral" };
};

// --- Live Clock Hook (Fixed & Perfect) ---
function useCurrentTime(): Date {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

// --- Main Component ---
export default function ForexMarket() {
  const currentTime = useCurrentTime();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 50;
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["forex-data-infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const start = Number(pageParam) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const pagePairs = allForexPairsArray.slice(start, end);

      if (pagePairs.length === 0) return [];

      await new Promise((r) => setTimeout(r, 500)); // simulate network

      return pagePairs.map(([pairName, pairInfo]): ForexData => {
        const basePrice = Math.random() * 150 + 0.5;
        const change = (Math.random() - 0.5) * 2;
        const spread = basePrice * (Math.random() * 0.001 + 0.0001);

        return {
          pair: pairName,
          symbol: pairInfo.symbol,
          name: pairInfo.name,
          flag1: pairInfo.flag1,
          flag2: pairInfo.flag2,
          price: Number(basePrice.toFixed(5)),
          change: Number(change.toFixed(5)),
          changePercent: Number(((change / basePrice) * 100).toFixed(2)),
          bid: Number((basePrice - spread / 2).toFixed(5)),
          ask: Number((basePrice + spread / 2).toFixed(5)),
          high: Number((basePrice + Math.random() * 2).toFixed(5)),
          low: Number((basePrice - Math.random() * 2).toFixed(5)),
          lastUpdated: new Date().toISOString(),
          simulated: true,
        };
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < ITEMS_PER_PAGE ? undefined : allPages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  const sortedForexData = useMemo(() => {
    const allData = data?.pages.flat() ?? [];

    if (!sortConfig.key) return allData;

    return [...allData].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];

      if (aVal === undefined || bVal === undefined) return 0;

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data?.pages, sortConfig]);

  // Infinite scroll
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollHeight - container.scrollTop - container.clientHeight <
          200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSort = (key: keyof ForexData) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
    if (isMobileView) {
      setShowMobileSort(false);
    }
  };

  const getSortIcon = (key: keyof ForexData) => {
    if (sortConfig.key !== key)
      return <ChevronsUpDown size={16} className="text-gray-500" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} className="text-blue-400" />
    ) : (
      <ChevronDown size={16} className="text-blue-400" />
    );
  };

  const formatPrice = (n: number) =>
    n.toFixed(5).replace(/0+$/, "").replace(/\.$/, "");
  const formatChange = (n: number) => (n >= 0 ? "+" : "") + n.toFixed(5);
  const formatPercent = (n: number) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0b0d] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle size={64} className="mx-auto text-red-400" />
          <h2 className="text-2xl font-bold text-red-400">
            Error Loading Data
          </h2>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#181818] to-[#373737] text-white py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Animate className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Invest on <span className="underline">Forex</span> Market
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4">
            Real-time rates • 24/7 trading • 300+ currency pairs
          </p>
        </Animate>

        <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden">
          {/* Desktop Table View */}
          {!isMobileView && (
            <>
              {/* Sticky Header */}
              <Animate className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/70 sticky top-0 z-10 border-b border-gray-800">
                    <tr>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">
                        TICKER
                      </th>
                      {(
                        [
                          "price",
                          "changePercent",
                          "change",
                          "bid",
                          "ask",
                          "high",
                          "low",
                        ] as const
                      ).map((key) => (
                        <th
                          key={key}
                          onClick={() => handleSort(key)}
                          className="text-right p-4 text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span className="uppercase">
                              {key === "changePercent"
                                ? "CHG %"
                                : key === "change"
                                ? "CHG"
                                : key}
                            </span>
                            {getSortIcon(key)}
                          </div>
                        </th>
                      ))}
                      <th className="text-right p-4 text-gray-400 text-sm font-medium">
                        RATING
                      </th>
                    </tr>
                  </thead>
                </table>
              </Animate>

              {/* Scrollable Body */}
              <div ref={tableContainerRef} className="h-[70vh] overflow-y-auto">
                <table className="w-full">
                  <tbody>
                    {isLoading && sortedForexData.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-12">
                          <Loader2
                            className="mx-auto animate-spin text-blue-400"
                            size={32}
                          />
                        </td>
                      </tr>
                    ) : (
                      sortedForexData.map((item: ForexData) => {
                        const rating: TechnicalRating = getTechnicalRating(
                          item.changePercent
                        );
                        const isPositive: boolean = item.changePercent >= 0;

                        return (
                          <tr
                            key={item.pair}
                            className="border-b border-gray-800/30 hover:bg-gray-800/20 transition"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="flex gap-1 text-xl">
                                  <span>{item.flag1}</span>
                                  <span>{item.flag2}</span>
                                </div>
                                <div>
                                  <div className="font-semibold text-blue-400">
                                    {item.pair}
                                  </div>
                                  {item.simulated && (
                                    <div className="text-xs text-yellow-500">
                                      Demo
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-right font-mono font-semibold">
                              {formatPrice(item.price)}
                            </td>
                            <td
                              className={`p-4 text-right font-semibold ${
                                isPositive ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {formatPercent(item.changePercent)}
                            </td>
                            <td
                              className={`p-4 text-right font-mono ${
                                isPositive ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {formatChange(item.change)}
                            </td>
                            <td className="p-4 text-right font-mono text-gray-300">
                              {formatPrice(item.bid)}
                            </td>
                            <td className="p-4 text-right font-mono text-gray-300">
                              {formatPrice(item.ask)}
                            </td>
                            <td className="p-4 text-right font-mono text-gray-300">
                              {formatPrice(item.high)}
                            </td>
                            <td className="p-4 text-right font-mono text-gray-300">
                              {formatPrice(item.low)}
                            </td>
                            <td
                              className={`p-4 text-right ${rating.color} font-medium`}
                            >
                              <span>
                                {rating.icon} {rating.rating}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                    {isFetchingNextPage && (
                      <tr>
                        <td colSpan={9} className="text-center py-6">
                          <Loader2
                            className="mx-auto animate-spin text-blue-400"
                            size={24}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Mobile Card View */}
          {isMobileView && (
            <>
              {/* Mobile Sort Controls */}
              <Animate className="p-4 border-b border-gray-800 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Showing {sortedForexData.length} pairs
                </div>
                <button
                  onClick={() => setShowMobileSort(!showMobileSort)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg text-sm"
                >
                  <Filter size={16} />
                  Sort
                </button>
              </Animate>

              {/* Mobile Sort Options */}
              {showMobileSort && (
                <div className="p-4 bg-gray-800/50 border-b border-gray-800">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Sort by</h3>
                    <button
                      onClick={() => setShowMobileSort(false)}
                      className="p-1 rounded-full hover:bg-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        { key: "price", label: "Price" },
                        { key: "changePercent", label: "Change %" },
                        { key: "change", label: "Change" },
                        { key: "bid", label: "Bid" },
                        { key: "ask", label: "Ask" },
                        { key: "high", label: "High" },
                        { key: "low", label: "Low" },
                      ] as const
                    ).map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => handleSort(key)}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          sortConfig.key === key
                            ? "bg-blue-600/20 border border-blue-600/30"
                            : "bg-gray-700/30 border border-gray-700/30"
                        }`}
                      >
                        <span>{label}</span>
                        {getSortIcon(key)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Cards */}
              <Animate
                ref={tableContainerRef}
                className="h-[60vh] scrollbar_hidden overflow-y-auto p-4"
              >
                {isLoading && sortedForexData.length === 0 ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-blue-400" size={32} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedForexData.map(
                      (item: ForexData): React.ReactElement => {
                        const rating: TechnicalRating = getTechnicalRating(
                          item.changePercent
                        );
                        const isPositive: boolean = item.changePercent >= 0;

                        return (
                          <div
                            key={item.pair}
                            className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1 text-lg">
                                  <span>{item.flag1}</span>
                                  <span>{item.flag2}</span>
                                </div>
                                <div>
                                  <div className="font-semibold text-blue-400">
                                    {item.pair}
                                  </div>
                                  {item.simulated && (
                                    <div className="text-xs text-yellow-500">
                                      Demo
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                className={`text-right ${rating.color} font-medium text-sm`}
                              >
                                {rating.rating}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-400 text-xs">
                                  Price
                                </span>
                                <div className="font-mono font-semibold">
                                  {formatPrice(item.price)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs">
                                  Change
                                </span>
                                <div
                                  className={`font-mono ${
                                    isPositive
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {formatChange(item.change)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs">
                                  Change %
                                </span>
                                <div
                                  className={`font-mono ${
                                    isPositive
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {formatPercent(item.changePercent)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs">
                                  Bid/Ask
                                </span>
                                <div className="font-mono text-gray-300">
                                  {formatPrice(item.bid)}/
                                  {formatPrice(item.ask)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs">
                                  High
                                </span>
                                <div className="font-mono text-gray-300">
                                  {formatPrice(item.high)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs">
                                  Low
                                </span>
                                <div className="font-mono text-gray-300">
                                  {formatPrice(item.low)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                    {isFetchingNextPage && (
                      <div className="flex justify-center py-6">
                        <Loader2
                          className="animate-spin text-blue-400"
                          size={24}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Animate>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
