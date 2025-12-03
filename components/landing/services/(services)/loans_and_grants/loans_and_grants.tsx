import LoanImage from "@/assets/images/7.jpg";
import Animate from "@/components/animation/animate";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
const LoansAndGrants = () => {
  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width md:px-10">
        <Animate>
          <Animate>
            <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
              <span className="underline">Loan And Grants</span>
            </h2>
          </Animate>

          <div className="max-w-4xl mx-auto flex justify-start">
            <Animate className="justify-start my-6 overflow-hidden rounded-xl">
              <Image
                src={LoanImage}
                className=" duration-500 hover:scale-105 h-full rounded-xl"
                alt="loan image"
              />
            </Animate>
          </div>

          <div>
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  Easy with CrystalPoint Management
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  Getting a loan doesn’t have to be intimidating, with the right
                  lender it can be a simple process. You only need a lender
                  committed to taking the mystery out of the mortgage loan
                  process! At Visional Wellington, we understand! Our investors
                  want simple facts, honest answers and competitive products.
                  DGS automatically offers loan services to investors with over
                  $50,000 investment either in our normal Visional Wellington
                  financial Services packages or the NFP plans. Investors over
                  $50,000 are entitled to loans of $200,000-1millon dollars
                  yearly with 5% paid monthly, or the investor could wish to
                  compound the interest till the time limit, provided all
                  required information and identity of the investor are duly
                  confirmed by  Crystalpoint loan board. Every investor
                  above $50,000 is provided with a personal account manager and
                  the investor has a direct communication with the manager in
                  order to see that our loan offers are secured. GREAT INVESTING
                  WITH  Crystalpoint FAMILY
                </p>
              </div>
            </Animate>
          </div>
        </Animate>
      </div>
    </div>
  );
};

export default LoansAndGrants;
