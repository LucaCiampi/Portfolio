import Container from '@/components/layout/Container';
import Image from 'next/image';
import Navigation from '@/components/layout/Navigation';

const Footer = () => (
  <footer className="bg-green pattern-3 text-background py-8 md:pt-20 px-6 md:px-0">
    <Container className="flex flex-wrap justify-between mb-10 gap-4">
      <div className="w-max">
        <Image src="/images/rose.svg" alt="rose" width={107} height={240} />
      </div>
      <div className="w-max"></div>
      <div className="w-max text-right">
        <div className="text-xl mb-4 font-abril-fatface">Navigation</div>
        <Navigation ulClassName="flex-col !gap-2" />
      </div>
    </Container>
    <Container className="text-right text-xs px-6 md:px-0">
      Design & development by Luca Ciampi
    </Container>
  </footer>
);

export default Footer;
