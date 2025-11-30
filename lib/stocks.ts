import axios from "axios";

const FINNHUB_API_KEY =
  process.env.NEXT_PUBLIC_FINNHUB_API_KEY || "your_api_key_here";
const BASE_URL = "https://finnhub.io/api/v1";

interface StockQuote {
    c: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

interface CompanyProfile {
    country: string;
    currency: string;
    exchange: string;
    finnhubIndustry: string;
    ipo: string;
    logo: string;
    marketCapitalization: number;
    name: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    weburl: string;
}

export const fetchStockQuote = async (symbol: string): Promise<StockQuote | null> => {
    try {
        const response = await axios.get<StockQuote>(`${BASE_URL}/quote`, {
            params: {
                symbol,
                token: FINNHUB_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
        return null;
    }
};

export const fetchCompanyProfile = async (symbol:string) => {
  try {
    const response = await axios.get(`${BASE_URL}/stock/profile2`, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching company profile for ${symbol}:`, error);
    return null;
  }
};

export const fetchStockData = async (symbol:string  ) => {
  const [quote, profile] = await Promise.all([
    fetchStockQuote(symbol),
    fetchCompanyProfile(symbol),
  ]);

  return {
    ...quote,
    ...profile,
  };
};
