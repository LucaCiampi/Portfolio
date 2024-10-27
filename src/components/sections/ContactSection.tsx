'use client';

import Image from 'next/image';
import ExternalLinkSocial from '@/components/links/ExternalLinkSocial';
import GirlWithPearlEaring from 'public/images/fille-a-la-perle.jpg';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContactSection() {
  const GirlWithPearlEaringRef = useRef(null);

  useEffect(() => {
    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact',
        scroller: '#page-content',
        scrub: true,
        start: 'start bottom',
        end: '+=700px',
      },
    });

    timeline2.to(GirlWithPearlEaringRef.current, {
      x: '-20%',
    });
  }, []);

  return (
    <div className="relative contact">
      <Image
        src={GirlWithPearlEaring}
        ref={GirlWithPearlEaringRef}
        alt={'La fille à la perle'}
        className="absolute bottom-0 -right-32 md:-right-16 -z-10 w-56 md:w-auto"
      />
      <h3 className="text-6xl text-center font-allison my-12 ld:my-24">
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
