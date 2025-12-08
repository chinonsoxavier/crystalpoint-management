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

      {/* about us */}
      <Animate className="center max_width_xl py-10 md:py-20">
        <div className="border-primary border p-10 rounded-md max_width flex-col xs:flex-row gap-10 flex-wrap flex items-start justify-between xs:items-center">
          <p className="font-bold text-base md:text-lg text-primary-foreground text-left">
            We are an international financial company engaged in investment
            activities, which are related to trading on financial markets and
            cryptocurrency exchanges performed by qualified professional
            traders.
          </p>
          <Link href="/about-us">
            <Button className="text-white">Learn More</Button>
          </Link>
        </div>
      </Animate>

      {/* ask a question */}
      <Animate className="center py-10">
        <div className="max_width center text-white">
          <div className="md:p-10 p-6 flex-col relative w-full flex rounded-xl items-start justify-start">
            <Image
              src={buildingImage}
              className="absolute inset-0 w-full h-full rounded-xl  -z-10"
              alt="building image"
            />

            <div className="space-y-4">
              <h2 className="sm:text-4xl text-3xl font-bold">
                Do You Have Any Questions?
              </h2>
              <p className="sm:text-xl text-lg">
                We are delighted to help you in getting the best out of our
                services.
              </p>
              <Link href="/contact-us">
                <Button className="bg-white text-primary-foreground hover:bg-gray-100 rounded-lg px-6 py-2 font-medium">
                  Ask us a question
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Animate>

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
