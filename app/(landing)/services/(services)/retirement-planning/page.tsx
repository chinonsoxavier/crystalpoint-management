"use client";
import PageHeader from "@/components/landing/services/(services)/page_header";
import RetirementPlanning from "@/components/landing/services/(services)/retirement_planning/retirement_planning";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Sidemenu from "@/components/layouts/sidemenu";
import InvestorsChoice from "@/components/shared/investors_choice";
import { useTranslate } from "@/hooks/use_translate";

const Page = () => {
  const {t} = useTranslate();
  return (
    <div className="overflow-x-clip">
      {/* header */}
      <Header />

      {/* sidemenu */}
      <Sidemenu />

      {/* real estate header */}
      <PageHeader
        label={t.landing.pageHeader.services}
        desc={t.landing.retirementPlanning.title}
      />
      <RetirementPlanning />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
