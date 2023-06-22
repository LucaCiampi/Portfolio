"use client";

import ExternalLinkSocial from '@/components/ExternalLinkSocial'
import PageWrapper from '../page-wrapper'
import Lottie from "lottie-react";
import Cheers from "public/lotties/cheers.json";

export default function Page() {
  return (
    <PageWrapper>
      <div>
        <h1>Contact</h1>
        <div className="w-96">
          <Lottie animationData={Cheers} />
        </div>
        <div>
          <ExternalLinkSocial name={'github'} href={'https://github.com/LucaCiampi'} />
          <ExternalLinkSocial name={'linkedin'} href={'https://linkedin.com/in/lucaciampi'} />
        </div>
      </div>
    </PageWrapper>
  )
}
