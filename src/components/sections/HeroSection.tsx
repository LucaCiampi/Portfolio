import Image from 'next/image';
import WaveImage from 'public/images/wave-painting.png';
import SeaImage from 'public/images/sea.jpg';
import KlimtImage from 'public/images/the-kiss-klimt.jpg';
import Button from '@/components/Button';

const HeroSection = () => (
  <>
    <div className="md:pt-[120px] pt-24 z-10 text-brown">
      <div className="relative pt-24 md:pt-0">
        <div className="pattern-1 absolute top-0 left-0 -z-10 w-full h-44 md:w-[448px] md:h-[448px]" />
        <h1 className="font-allison text-6xl sm:text-8xl md:leading-[170px] md:text-[164px]">
          Luca Ciampi
        </h1>
        <div className="text-6xl sm:text-8xl md:text-[144px] md:leading-[160px] font-playfair-display">
          <div className="relative">
            <span className="font-abril-fatface">Front</span>-end
            <Image
              src={SeaImage}
              alt="Sea pattern"
              className="absolute left-[2.6em] top-1/2 translate-y-1/2 rounded-full"
            />
          </div>
          <div className="hero--developer relative">
            Developer
            <Image
              src={KlimtImage}
              alt="The Kiss - Gustav Klimt"
              className="absolute left-1/4 -translate-x-1/2 bottom-0 -z-10"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 right-0 w-full md:w-1/2">
      <div className="relative">
        <Image
          src={WaveImage}
          className="w-full"
          alt="The Great Wave off Kanagawa"
        />
        <a href="#work">
          <Button className="absolute z-30 bottom-24 right-1/2 bg-green text-background text-2xl translate-x-1/2">
            See my work
          </Button>
        </a>
      </div>
    </div>
  </>
);

export default HeroSection;
