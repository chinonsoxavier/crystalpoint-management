import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Sidemenu from "@/components/layouts/sidemenu";
import InvestmentPlans from "@/components/landing/plans/investment_plans";
import PlansHeader from "@/components/landing/plans/plans_header";
import InvestorsChoice from "@/components/shared/investors_choice";

const Page = () => {
  return (
    <div className="overflow-x-clip">
      {/* header */}
      <Header />

      {/* sidemenu */}
      <Sidemenu />

      {/* plans header */}
      <PlansHeader />

      {/* plans */}
      <InvestmentPlans />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
