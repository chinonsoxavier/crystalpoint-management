import Animate from "@/components/animation/animate";
import stockImage from "@/assets/images/stock-2.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";
const StockInvestment = () => {
  return (
    <div className="wrapper md:py20 py-12">
      <div className="max_width">
        <Animate>
          <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
            <span className="underline">Oil And Gas</span>
          </h2>
        </Animate>

        <div className="max-w-4xl mx-auto flex justify-start">
          <Animate className="justify-start my-6 overflow-hidden rounded-xl">
            <Image
              src={stockImage}
              className=" duration-500 hover:scale-105 h-full rounded-xl"
              alt="stock image"
            />
          </Animate>
        </div>

        <div>
          <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
            <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
              <FontAwesomeIcon className="text-white size-8.5" icon={faList} />
            </div>
            <div className="flex-1 space-y-5">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                Trading Stock or Share on CristalPoint
              </h3>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                A stock or share (also known as a company`s equity) is a
                financial instrument that represents ownership in a company or
                corporation and represents a proportionate claim on its assets
                (what it owns) and earnings (what it generates in profits).
                Stock ownership implies that the shareholder owns a slice of the
                company equal to the number of shares held as a proportion of
                the company{"'"}s total outstanding shares. For instance, an
                individual or entity that owns 100,000 shares of a company with
                one million outstanding shares would have a 10% ownership stake
                in it. Most companies have outstanding shares that run into the
                millions or billions.
              </p>

              <div className="space-y-2">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  How do I invest in stocks with 0% commission
                </h3>

                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  As you will surely notice, the online trading platforms that
                  offer the opportunity to speculate on the oil price are
                  numerous. It is therefore necessary that you take the time to
                  carefully compare them in order to choose the one that offers
                  you the most advantages. You therefore need to verify certain
                  important points such as:
                </p>
                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    Create an account
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    Choose a deposit plan
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    Make deposit
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    Get your ROI on plan completion
                  </p>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default StockInvestment;
