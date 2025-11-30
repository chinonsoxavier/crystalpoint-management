import ContactForm from '@/components/landing/contact-us/contact_us_form'
import ContactUsHeader from '@/components/landing/contact-us/contact_us_header'
import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'
import Sidemenu from '@/components/layouts/sidemenu'
import InvestorsChoice from '@/components/shared/investors_choice'
import React from 'react'

const Page = () => {
  return (
    <div className="overflow-x-clip">
      {/* header */}
      <Header />

      {/* sidemenu */}
      <Sidemenu />

      {/* contact us header */}
      <ContactUsHeader />

      {/* contact us content */}
      <ContactForm />

      {/* investors choice */}
      <InvestorsChoice />

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Page