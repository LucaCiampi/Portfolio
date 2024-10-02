'use client';

import Image from 'next/image';
import ExternalLinkSocial from '@/components/ExternalLinkSocial';
import GirlWithPearlEaring from 'public/images/fille-a-la-perle.jpg';

export default function ContactSection() {
  return (
    <div className="relative">
      <Image
        src={GirlWithPearlEaring}
        alt={'La fille à la perle'}
        className="absolute bottom-0 -right-32 md:right-0 -z-10 w-56 md:w-auto"
      />
      <h3 className="text-6xl text-center pt-6 font-allison my-24">
        I'm currently available for work !
      </h3>
      <div className="flex justify-between gap-8 gap-y-12 flex-wrap max-w-3xl m-auto py-12">
        <ExternalLinkSocial
          className="icon"
          name={'linkedin'}
          href={'https://linkedin.com/in/lucaciampi'}
        />
        <ExternalLinkSocial
          className="icon"
          name={'malt'}
          href={'https://www.malt.fr/profile/lucaciampi'}
        />
        <ExternalLinkSocial
          className="icon"
          name={'github'}
          href={'https://github.com/LucaCiampi'}
        />
      </div>
    </div>
  );
}
