"use client";
import BeginTrading from "@/components/landing/home/begin_trading";
import ClientFundSecurity from "@/components/landing/home/client_funds_security";
import FAQ from "@/components/landing/home/faqs";
import Hero from "@/components/landing/home/hero";
import Investment from "@/components/landing/home/investment";
import LearnMoreAboutUs from "@/components/landing/home/learn_more_about_us";
import Header from "@/components/layouts/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import buildingImage from "@/assets/images/in-card-background-1.jpg";
import PopularMarkets from "@/components/landing/home/popular_markets";
import InvestmentProduct from "@/components/landing/home/investment_product";
import Footer from "@/components/layouts/footer";
import Sidemenu from "@/components/layouts/sidemenu";
import Animate from "@/components/animation/animate";
import StockMarketPage from "@/components/landing/markets/stock_market";
import InvestmentPlans from "@/components/landing/plans/investment_plans";
import Link from "next/link";
import AboutAndQuestionSections from "@/components/landing/home/about_and_questions_section";

const Page = () => {
  return (
    <div className="relative overflow-x-clip">
      {/* header */}
      <Header />

      {/*sidemenu  */}
      <Sidemenu />

      {/* hero */}
      <Hero />

      {/* learn more about us */}
      <LearnMoreAboutUs />

      {/* Plans */}
      <InvestmentPlans />

      {/* investment */}
      <Investment />

      {/* stock market */}
      <StockMarketPage />

      {/* client funds security */}
      <ClientFundSecurity />

      {/* faqs */}
      <FAQ />

      {/* begin trading */}
      <BeginTrading />

      {/* about us and ask a question */}
      <AboutAndQuestionSections />

      {/* popular markets */}
      <PopularMarkets />

      {/* investment product */}
      <InvestmentProduct />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
