import Image from 'next/image';
import WaveImage from 'public/images/van-gogh.jpg';
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
        end: '+=500px',
      },
    });

    timeline
      .to(backgroundRef.current, { transform: `translateX(20%)` })
      .to(introImageRef.current, { clipPath: 'inset(15%)' }, 0)
      .to(VertumneImageRef.current, { transform: 'translateX(15%)' }, 0);
  }, []);

  return (
    <>
      <div className="pt-24 z-10 text-brown">
        <div className="relative">
          <h1
            data-scroll
            data-scroll-speed="0.05"
            className="flex flex-wrap justify-between sm:inline font-allison text-[130px] leading-[100px] sm:text-[150px] sm:leading-[150px] md:leading-[220px] md:text-[220px] mb-12 lg:mb-0 md:block text-text-header"
          >
            Luca{' '}
            <span className="ml-auto block sm:inline w-full sm:w-fit text-right">
              Ciampi
            </span>
          </h1>
          <div
            data-scroll
            data-scroll-speed="0.1"
            className="text-6xl sm:text-8xl md:text-[124px] md:leading-[130px] font-playfair-display pl-24"
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
      <div className="absolute lg:top-1/3 bottom-0 right-0 w-full md:w-1/2 overflow-x-clip -z-20">
        <div className="relative">
          <Image
            ref={backgroundRef}
            src={WaveImage}
            className="w-full"
            alt="Van Gogh"
          />
          <a href="#work">
            <Button className="w-max pattern--dots !px-6 py-4 absolute z-30 bottom-48 md:bottom-24 right-1/2 bg-green text-background text-2xl translate-x-1/2">
              See my work
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
