"use client";
import OilAndGas from "@/components/landing/services/(services)/oil_and_gas/oil_and_gas";
import PageHeader from "@/components/landing/services/(services)/page_header";
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
        desc={t.landing.oilAndGas.title}
      />

      {/* oil and gas */}
      <OilAndGas />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
