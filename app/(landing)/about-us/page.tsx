import AboutUs from "@/components/landing/about-us/about_us";
import AboutUsGrid from "@/components/landing/about-us/about_us_grid";
import AboutUsHeader from "@/components/landing/about-us/about_us_header";
import WhyChooseUs from "@/components/landing/about-us/why_choose_us";
import PopularMarkets from "@/components/landing/home/popular_markets";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Sidemenu from "@/components/layouts/sidemenu";
import InvestorsChoice from "@/components/shared/investors_choice";

const Page = () => {
  return (
    <div className="overflow-x-clip">
      {/* header */}
      <Header />

      {/* sidemenu */}
      <Sidemenu />

      {/* about us header */}
      <AboutUsHeader />

      {/* about us */}
      <AboutUs />

      {/* about us grid */}
      <AboutUsGrid />

      {/* why choose us */}
      <WhyChooseUs />

      {/* popular market */}
      <PopularMarkets />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
