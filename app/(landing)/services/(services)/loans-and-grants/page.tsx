import LoansAndGrants from "@/components/landing/services/(services)/loans_and_grants/loans_and_grants";
import PageHeader from "@/components/landing/services/(services)/page_header";
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
      <PageHeader label="Our Services" desc="Loan And Grants" />

       {/* loan and grants */}
      <LoansAndGrants />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
