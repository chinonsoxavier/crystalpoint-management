import Image from 'next/image';
import BgShapeImage from "@/assets/images/in-equity-15-bg.png";
import { Button } from '@/components/ui/button';
import HoverArrow from '@/components/ui/hover_arrow';
import Animate from '@/components/animation/animate';

const ClientFundSecurity = () => {
  return (
    <div className="center bg-primary">
      <div className="max_width relative overflow-hidden">
        <Image className='absolute top-0 right-0 bottom-0 w-fll object-contain' src={BgShapeImage} alt="background shape" />

        {/* Content */}
        <div className="relative z-10 py-10 md:py-20">
          {/* Header */}
            <Animate>
            <h1 className="sm:text-3xl text-2xl sm:text-[40px] font-bold text-slate-900 text-balance">
              Security of Client`s Funds
            </h1>
            <p className="text-xl sm:text-2xl my-3 text-white max-w-2xl">
              Your funds are fully secured when you invest with Visional
              Wellington.
            </p>
            </Animate>

          {/* Trust Features Grid */}
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-10 sm:gap-16 max-w-4xl">
            <Animate type='fadeInRight' className='flex flex-col items-center justify-center' >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                Regulated activities: FSO license No. #3301338-5
              </p>
            </Animate>
            <Animate type='fadeInLeft' className='flex flex-col items-center justify-center' >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                Negative balance client protection policy
              </p>
            </Animate>
            <Animate type='fadeInRight' className='flex flex-col items-center justify-center' >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                Participant of The Financial Commission fund
              </p>
            </Animate>
            <Animate type="fadeInLeft" className='flex flex-col items-center justify-center' >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                Execution quality certificate of Verify My Trade
              </p>
            </Animate>
          </div>

          {/* Divider */}
          <div className="border-t border-white opacity-40 my-10 md:my-16 max-w-4xl"></div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Animate type='fadeInLeft'className='text-center md:text-left' >
            <span className="text-lg text-center font-bold text-primary-foreground">
              Ready to get started?
            </span>
            </Animate>
            <Animate type='fadeInRight' className="flex gap-1 md:gap-4">
              <Button variant='secondary' className='text-sm md:text-base' >
                Login
                <HoverArrow variant='light' className='' />
              </Button>
              <Button variant="dark" className='text-sm md:text-base' >
                Create Account
                <HoverArrow variant='secondary'  />
              </Button>
            </Animate>
          </div>
        </div>

   
      </div>
    </div>
  );
}

export default ClientFundSecurity