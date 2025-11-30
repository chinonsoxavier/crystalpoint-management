import StockMarket from "@/components/landing/markets/stock_market"
import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import Sidemenu from "@/components/layouts/sidemenu"
import MarketHeader from "./market_header"
import ForexMarket from "@/components/landing/markets/forex_market"

const Page = () => {
  return (
    <div>
        
        {/* header */}
        <Header/>

        {/* sidemenu */}
        <Sidemenu/>

        {/* market header */}
        <MarketHeader/>

        {/* stock market */}
        <StockMarket/>

        {/* forex market */}
        <ForexMarket/>

        {/* fooyer */}
        <Footer/>

    </div>
  )
}

export default Page