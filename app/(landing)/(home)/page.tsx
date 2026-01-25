"use client";
import BeginTrading from "@/components/landing/home/begin_trading";
import ClientFundSecurity from "@/components/landing/home/client_funds_security";
import FAQ from "@/components/landing/home/faqs";
import Hero from "@/components/landing/home/hero";
import Investment from "@/components/landing/home/investment";
import LearnMoreAboutUs from "@/components/landing/home/learn_more_about_us";
import Header from "@/components/layouts/header";
import Image from "next/image";
import PopularMarkets from "@/components/landing/home/popular_markets";
import InvestmentProduct from "@/components/landing/home/investment_product";
import Footer from "@/components/layouts/footer";
import Sidemenu from "@/components/layouts/sidemenu";
import StockMarketPage from "@/components/landing/markets/stock_market";
import InvestmentPlans from "@/components/landing/plans/investment_plans";
import AboutAndQuestionSections from "@/components/landing/home/about_and_questions_section";
import image5 from "@/assets/images/image5.jpeg";

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

<div className="w-full h-120 overflow-hidden center">
      <Image src={image5} className="w-full object-cover" alt='image5' />
</div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
