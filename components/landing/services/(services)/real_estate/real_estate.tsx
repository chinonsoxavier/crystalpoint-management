import realEstateImage from "@/assets/images/5.jpg";
import Animate from "@/components/animation/animate";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import image1 from "@/assets/images/2.jpeg";
import image2 from "@/assets/images/3.jpeg";
import image3 from "@/assets/images/1.jpeg";
import image4 from "@/assets/images/4.jpeg";
const RealEstate = () => {

    const estates = [
      {
        image: image1,
        price: "$620,000",
        desc: "Zak Hale 9 | Offered for $620,000 | 4 BR/ 4.5 BA | 2,460 sq. ft. Interior.",
      },
      {
        image: image2,
        price: "$1,450,000",
        desc: "4 BR/ 4.5 BA dream with a lounge pool, spa, and detached guest ohana",
      },
      {
        image: image3,
        price: "$350,000",
        desc: "4/5.5/2 |5,472 sqft |8,060 sqft lot Location:Afton oaks",
      },
      {
        image: image4,
        price: "$26,439",
        desc: "Bds | 1 Ba | 360 SQFT Location: 225 East 4th Street, Apt 18, New York.",
      },
    ];

  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width py-10 md:px-10">
        <Animate>
          <Animate>
            <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
              <span className="underline">Real Estate Investments</span>
            </h2>
          </Animate>

          <div className=" flex justify-start max-w-4xl mx-auto">
            <Animate className="justify-start my-6 overflow-hidden rounded-xl bg-[red]">
              <Image
                src={realEstateImage}
                className=" duration-500 hover:scale-105 h-full rounded-xl"
                alt="real estate image"
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
                Real estate investment involves the purchase, ownership,
                management, rental and/or sale of real estate for profit.
                Improvement of realty property as part of a real estate
                investment strategy is generally considered to be a
                sub-specialty of real estate investing called real estate
                development. Real estate is an asset form with limited liquidity
                relative to other investments (such as stocks or bonds that
                openly trade on financial markets). It is also capital intensive
                (although capital may be gained through mortgage leverage) and
                is highly cash flow dependent. If these factors are not well
                understood and managed by the investor, real estate becomes a
                risky investment.
              </p>
            </div>
          </Animate>
        </Animate>

        <div className="mt-8 md:mt-12 pt-8 md:pt-12 bg-white md:px-10 px-4">
          <Animate>
            <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-8 md:mb-10">
                Hot Deals From<span className="underline px-2">Real Estate</span>
            </h2>
          </Animate>

          <div className="grid xlarge:grid-cols-4 smedium:grid-cols-3 xs:grid-cols-2 grid-cols-1 flex-wrap items-center justify-center gap-5">
            {
                estates.map((estate,index)=>(
                    <Animate key={index} className="space-y-4 duration-500 hover:shadow-md rounded order-secondary-foreground white flex-1 hover:bg-white" >
                        <Image src={estate.image} alt="real estate image" className="h-full max-h-[270px]" />

<div className="px-5 py-8 space-y-4">

                        <p className="text-3xl md:text-4xl font-medium text-primary" >{estate.price}</p>

                        <p className="text-secondary-foreground md:text-lg" >{estate.desc}</p>

                        <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md" >
                            Make Enquiry
                        </button>
</div>
                    </Animate>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstate;
