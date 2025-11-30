import Gold from "@/components/landing/services/(services)/gold/gold";
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
      <PageHeader
        label="Our Services
"
        desc="Gold Investments

"
      />

      {/* gold */}
      <Gold />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
