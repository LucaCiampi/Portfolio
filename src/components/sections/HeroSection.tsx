import Image from 'next/image';
import VanGoghImage from 'public/images/van-gogh.jpg';
import KlimtImage from 'public/images/the-kiss-klimt.jpg';
import VertumneImage from 'public/images/vertumne.jpg';
import Button from '@/components/Button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  const backgroundRef = useRef(null);
  const introImageRef = useRef(null);
  const VertumneImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
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
        <div className="relative">
          <h1
            data-scroll
            data-scroll-speed="0.05"
            className="flex flex-wrap justify-between sm:inline font-allison text-[130px] leading-[100px] sm:text-[150px] sm:leading-[150px] md:leading-[220px] md:text-[220px] mb-12 lg:mb-0 md:block text-white mix-blend-difference"
          >
            Luca{' '}
            <span className="ml-auto block sm:inline w-full sm:w-fit text-right">
              Ciampi
            </span>
          </h1>
          <div
            data-scroll
            data-scroll-speed="0.1"
            className="text-6xl leading-[120px] sm:text-8xl md:text-[124px] md:leading-[130px] font-playfair-display lg:pl-40 text-text-header"
          >
            <div className="relative z-20">
              <span className="font-abril-fatface">Front</span>
              <span>-end</span>
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
      </div>
      <Image
        ref={VertumneImageRef}
        src={VertumneImage}
        alt="Vertumne"
        className="absolute right-24 top-12 -z-10 rounded-t-full"
      />
      <Image
        ref={backgroundRef}
        src={VanGoghImage}
        className="absolute right-0 bottom-36 -z-20"
        alt="Van Gogh"
      />
      <a href="#work" className="absolute bottom-64 right-44">
        <Button className="w-max font-allison py-1 px-4 border-0 flex items-center gap-4 bg-background text-4xl">
          <div className="rounded-full bg-lime-500 w-4 h-4"></div>
          Available for work
        </Button>
      </a>
    </div>
  );
};

export default HeroSection;
