import Container from '@/components/layout/Container';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Heading from '@/components/Heading';

const Footer = () => (
  <footer className="bg-green text-background py-8 md:pt-20 px-6 md:px-0">
    <Container className="flex flex-wrap justify-between mb-10">
      <div className="w-full md:w-max">
        <Image src="/images/rose.svg" alt="rose" width={107} height={240} />
      </div>
      <div className="w-full md:w-max"></div>
      <div className="w-full md:w-max text-right">
        <Heading level={'h3'} className="mb-4">
          Navigation
        </Heading>
        <Navigation ulClassName="flex-col !gap-2" />
      </div>
    </Container>
    <Container className="text-right text-xs px-6 md:px-0">
      Design & development by Luca Ciampi
    </Container>
  </footer>
);

export default Footer;
