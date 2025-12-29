import goldImage from "@/assets/images/9.jpg";
import Animate from "@/components/animation/animate";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
const Gold = () => {
  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width py-10 md:px-10">
        <Animate>
            <Animate>

          <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
            <span className="underline">Gold Investments</span>
          </h2>
          </Animate>

          <div className=" flex justify-start max-w-4xl mx-auto">
            <Animate className="justify-start my-6 overflow-hidden rounded-xl">
              <Image
                src={goldImage}
                className=" duration-500 hover:scale-105 h-full rounded-xl"
                alt="gold image"
              />
            </Animate>
          </div>

          <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
            <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
              <FontAwesomeIcon className="text-white size-8.5" icon={faList} />
            </div>
            <div className="flex-1 space-y-5">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                History
              </h3>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                Commonly seen as a great store of wealth, this precious metal is
                also known as a reliable safe-haven asset. With a rich history
                amongst almost all global cultures, gold remains a highly
                popular investment. Although it has multiple uses, its primary
                function is typically to hedge against inflation in an often
                volatile futures market, as well as to diversify existing
                Precious Metals Investment Retirement Accounts.
              </p>

              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                Gold has been one of the most valuable precious metals
                throughout human history, used by elites as a symbol of wealth
                for centuries due to its rarity and its ability to hold its
                worth for a long time.
              </p>

              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                Historically, it has been the most common way to pass on one’s
                wealth as an inheritance from one generation to the next.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                Gold is considered a worthy investment, with coins and bars
                available for purchase in various sizes, ranging from one gram
                to a whopping 400 ounces. Being the most reliable investment
                commodity available, gold has proven to be a perfect way to
                diversify your investment portfolio and an excellent safeguard
                against volatile currency.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                Before investing in gold, it`s important to understand the key
                considerations and strategies to maximize your returns. Below
                are some crucial pUnderstand the different forms of gold
                investment, including physical gold (bullion, coins, and
                jewelry) and digital or paper gold (ETFs, mutual funds, and
                mining stocks). oints to evaluate:
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                1. Understand the different forms of gold investment, including
                physical gold (bullion, coins, and jewelry) and digital or paper
                gold (ETFs, mutual funds, and mining stocks).
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                2. Assess the historical performance of gold as an investment
                during economic downturns, geopolitical crises, and inflationary
                periods.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                3. Choose the right platform or broker to trade gold, ensuring
                they are reputable, secure, and transparent about fees and
                regulations.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                4. Stay informed about global market trends and economic
                indicators that influence gold prices, such as interest rates,
                currency values, and central bank policies.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                5. Diversify your gold investments by balancing physical
                holdings with paper gold options to reduce risk and enhance
                liquidity.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                6. Evaluate the storage and insurance options for physical gold
                to ensure its safety and accessibility.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                7. Invest for the long term, as gold is typically a slow but
                steady performer, providing value over extended periods.
              </p>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                8. Consult financial advisors or investment experts with a deep
                understanding of the gold market to develop a tailored
                investment strategy.
              </p>
            </div>
          </Animate>
        </Animate>
      </div>
    </div>
  );
};

export default Gold;
