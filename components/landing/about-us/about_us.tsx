import Animate from "@/components/animation/animate";
import {
  faFlag,
  faHourglassEnd,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutUs = () => {
  return (
    <div className="text-black px-4 sm:px-6 py-20 lg:px-8">
      <section className="flex-col center">
        <Animate>
          <h2 className="text-3xl md:text-4xl max-w-4xl text-center font-bold text-primary-foreground mb-5">
            TRUST, EXPERIENCE, EXPERTISE AND
            <span className="underline px-2">KNOWLEDGE</span>
          </h2>
        </Animate>
        <Animate>
          <p className="text-secondary-foreground text-center sm:text-lg leading-relaxed max-w-3xl">
            We are an international financial company engaged in investment
            activities, which are related to trading on financial markets and
            cryptocurrency exchanges, real estate investment, stock and gold.
            All performed by qualified professional traders.
          </p>
        </Animate>
      </section>

      {/* Content Sections */}
      <div className="wrapper py-8">
        <div className="max_width space-y-8">
          {/* Who We Are Section */}
          <Animate className="flex gap-4 sm:gap-6">
            {/* <div className="shrink-0"> */}

              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon className="size-8.5 text-white" icon={faLeaf} />
              </div>
            {/* </div> */}
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                Who We Are
              </h3>
              <p className="text-secondary-foreground text-[16px] tracking-wide">
                We are a leading financial investment platform focusing on
                various aspect of finance and wealth management by providing
                access to over 4,000 funds and assets listed on the major
                capital markets ranging from investments banking, stock Broking,
                fund escrow services, forex, Gold and the most recently
                developed Cryptocurrencies, ETFs and Assets listed on the major
                stock markets, ISA`s investment services, Pensions and insurance
                bonds(onshore and offshore), third party providers such as Self
                Invested Personal pensions providers, advisory professionals,
                discretionary investment managers, portfolio management,
                lifetime cash flow modeling and a comprehensive financial
                planning infrastructure for investors in a more tax-efficient
                way.
              </p>
            </div>
          </Animate>

          {/* History Section */}
          <Animate className="flex gap-4 sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
               <FontAwesomeIcon
                  className="text-white size-8"
                  icon={faHourglassEnd}
                />
              </div>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                History
              </h3>
              <p className="text-secondary-foreground text-[16px] tracking-wide">
                CrystalPoint is a private limited liability company
                established on 24th January 2022, incorporated on 11th December
                2022 and have gained popular support and trust from worldwide
                customers and investors owing totally to the teams dedication,
                hard work and sincerity by using our own in-depth knowledge
                supported by proven technology and systems already developed to
                provide our investors and clients with a simple and efficient
                way to invest and manage assets, maintain records, have access
                to bank term deposits listed on major exchanges and stock
                markets, provide access to reports and analysis tools and a
                high-touch client/customer service team through a team of over
                72 of our own highly trained service staff.
              </p>
            </div>
          </Animate>

          {/* Culture Section */}
          <Animate className="flex gap-4 sm:gap-6">
            <div className="shrink-0">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon className="text-white size-8" icon={faFlag} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                Culture
              </h3>
              <p className="text-secondary-foreground text-[16px] tracking-wide">
                We are in control of our investors experience as we operate
                using our own proprietary sophisticated trading technologies
                that allows us to react quickly to market trends and investors
                demands to regulate changes with no reliance on external
                technology. We can set our own priorities and control the cost
                involved, hence we have been reckoned to providing bespoke
                technology and comprehensive functionality for the efficient
                management of investors portfolio as we are founded with the
                vision to create transparent trading and investment experience
                for our client. We are interested in successful and transparent
                traders that will create high trading and investment volume for
                we are proud to help many customers to make revenue as we
                provide real-time market data from leading analytical agencies.
                Crystalpoint investment management have had a very strong relationship with
                equity and funding providers since our inception, we have also
                had experience of working across multiple sectors and offering
                variety of full partner led services from experienced and
                professionals with passion for working on corporate finance
                transactions, delivering transactions on the best all round
                investments services ranging from acquisitions, MBO, Growth and
                capital development, replacement capital, real estates funding
                and arranging long term financing.
              </p>
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
