import Image from 'next/image';
import VanGoghImage from 'public/images/van-gogh.jpg';
import KlimtImage from 'public/images/the-kiss-klimt.jpg';
import VertumneImage from 'public/images/vertumne.jpg';
import Button from '@/components/Button';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const HeroSection = () => {
  const backgroundRef = useRef(null);
  const introImageRef = useRef(null);
  const VertumneImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scroller: '#page-content',
        scrub: true,
        start: 'top',
        end: '+=700px',
      },
    });

    timeline
      .to(backgroundRef.current, { transform: `translateX(20%)` })
      .to(introImageRef.current, { clipPath: 'inset(15%)' }, 0)
      .to(VertumneImageRef.current, { transform: 'translateX(15%)' }, 0);
  }, []);

  return (
    <div>
      <div className="pt-24 z-10">
        <h1 className="font-allison text-[130px] leading-[96px] sm:text-[150px] sm:leading-[150px] md:leading-[220px] md:text-[220px] mb-12 lg:mb-0 md:block text-text-header md:text-white md:mix-blend-difference">
          Luca <span className="pl-12 sm:pl-0">Ciampi</span>
        </h1>
        <div className="text-6xl sm:text-8xl md:text-[124px] md:leading-[130px] lg:pl-40 font-playfair-display text-text-header mt-32 lg:mt-0">
          <div className="relative z-20">
            <span className="font-abril-fatface">Front</span>-end
          </div>
          <div className="hero--developer relative z-10">
            Developer
            <Image
              ref={introImageRef}
              src={KlimtImage}
              alt="The Kiss - Gustav Klimt"
              className="absolute -left-24 -bottom-4 -z-10"
            />
          </div>
        </div>
      </div>
      <Image
        ref={VertumneImageRef}
        src={VertumneImage}
        alt="Vertumne"
        className="absolute right-12 top-12 -z-10 rounded-t-full w-36 md:w-auto md:right-24"
      />
      <Image
        ref={backgroundRef}
        src={VanGoghImage}
        priority
        className="absolute md:right-0 top-64 lg:bottom-36 -z-20 w-2/3 md:w-auto"
        alt="Van Gogh"
      />
      <a
        href="#contact"
        className="block w-fit m-auto mt-12 md:mt-0 md:absolute bottom-64 right-44"
      >
        <Button className="w-max font-allison py-1 px-4 !border-0 flex items-center gap-4 bg-background text-4xl">
          <div className="rounded-full bg-lime-500 w-4 h-4"></div>
          Available for work
        </Button>
      </a>
    </div>
  );
};

export default HeroSection;
