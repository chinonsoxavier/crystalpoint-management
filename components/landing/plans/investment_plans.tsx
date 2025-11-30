import Animate from "../../animation/animate";
import InvestmentCard from "./investment_card";

interface InvestmentPlan {
  id: string;
  name: string;
  icon: string;
  min: number;
  max: number;
  dailyReturn: string;
  duration: string;
  referralBonus: string;
}

const investmentPlans: InvestmentPlan[] = [
  {
    id: "beginners",
    name: "Beginners Plan",
    icon: "🛍",
    min: 50,
    max: 499,
    dailyReturn: "3%",
    duration: "5 days",
    referralBonus: "10%",
  },
  {
    id: "accessories",
    name: "Accessories Plan",
    icon: "⚙",
    min: 500,
    max: 999,
    dailyReturn: "4%",
    duration: "7 days",
    referralBonus: "10%",
  },
  {
    id: "oil-gas",
    name: "Oil & Gas Plan",
    icon: "🛢",
    min: 1000,
    max: 1999,
    dailyReturn: "5%",
    duration: "12 days",
    referralBonus: "10%",
  },
  {
    id: "agriculture",
    name: "Agriculture Plan",
    icon: "🌾",
    min: 2000,
    max: 4999,
    dailyReturn: "8%",
    duration: "20 days",
    referralBonus: "10%",
  },
  {
    id: "real-estate",
    name: "Real Estate Plan",
    icon: "🏢",
    min: 5000,
    max: 100000,
    dailyReturn: "10%",
    duration: "28 days",
    referralBonus: "10%",
  },
];

export default function InvestmentPlans() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Animate className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-2">
            Invest on
            <span className="underline pl-2">crystalpoint</span>
          </h1>
        </Animate>

        {/* Investment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentPlans.map((plan) => (
            <InvestmentCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
