import Image from 'next/image';
import WaveImage from 'public/images/wave-painting.png';
import SeaImage from 'public/images/sea.jpg';
import KlimtImage from 'public/images/the-kiss-klimt.jpg';
import Button from '@/components/Button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  const background = useRef(null);
  const introImage = useRef(null);
  const homeHeader = useRef(null);

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
      .from(background.current, { transform: `translateX(20%)` })
      .to(introImage.current, { clipPath: 'inset(15%)' }, 0);
  }, []);

  return (
    <>
      <div className="md:pt-[120px] pt-24 z-10 text-brown">
        <div className="relative">
          <div className="pattern-1 absolute top-0 left-0 -z-10 w-full h-44 md:w-[448px] md:h-[448px]" />
          <h1
            data-scroll
            data-scroll-speed="0.05"
            className="flex flex-wrap justify-between sm:inline font-allison text-[130px] leading-[100px] sm:text-[150px] sm:leading-[150px] md:leading-[190px] md:text-[184px] mb-12 lg:mb-0 md:block"
          >
            Luca{' '}
            <span className="ml-auto block sm:inline w-full sm:w-fit text-right">
              Ciampi
            </span>
          </h1>
          <div className="text-6xl sm:text-8xl md:text-[124px] md:leading-[130px] font-playfair-display">
            <div className="relative z-20" data-scroll data-scroll-speed="0.1">
              <span
                className="font-abril-fatface"
                data-scroll
                data-scroll-delay="0.1"
              >
                Front
              </span>
              <span data-scroll data-scroll-delay="2">
                -end
              </span>
              <Image
                src={SeaImage}
                alt="Sea pattern"
                className="absolute left-[2.6em] top-1/2 translate-y-1/2 rounded-full hidden lg:block"
              />
            </div>
            <div
              className="hero--developer relative z-10"
              data-scroll
              data-scroll-speed="0.2"
              data-scroll-delay="0.2"
            >
              Developer
              <Image
                ref={introImage}
                src={KlimtImage}
                alt="The Kiss - Gustav Klimt"
                className="absolute left-1/4 -translate-x-1/2 bottom-0 -z-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full md:w-1/2 overflow-x-clip">
        <div className="relative">
          <Image
            ref={background}
            src={WaveImage}
            className="w-full"
            alt="The Great Wave off Kanagawa"
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
