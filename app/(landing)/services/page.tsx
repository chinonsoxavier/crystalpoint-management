"use client";

import Investment from "@/components/investment"
import OurServices from "@/components/landing/services/our_services"
import ServicesHeader from "@/components/landing/services/services_header"
import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import Sidemenu from "@/components/layouts/sidemenu"

const Page = () => {
  return (
    <div className="overflow-x-clip" >
        
        {/* header */}
        <Header/>

        {/* sidemenu */}
        <Sidemenu/>

        {/* service header */}
        <ServicesHeader/>

        {/* investment */}
        <Investment/>

        {/* our services */}
        <OurServices />

        {/* footer */}
        <Footer/>
    </div>
  )
}

export default Page