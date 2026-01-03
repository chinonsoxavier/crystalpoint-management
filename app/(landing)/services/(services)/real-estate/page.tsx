"use client";

import PageHeader from "@/components/landing/services/(services)/page_header";
import RealEstate from "@/components/landing/services/(services)/real_estate/real_estate";
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

      {/* real estate header */}
      <PageHeader label="Our Services" desc="Real Estate Investment" />

      <RealEstate />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
