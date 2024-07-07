import Container from '@/components/layout/Container';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Heading from '@/components/Heading';

const Footer = () => (
  <footer className="bg-green text-background py-10 md:pt-20 px-6 md:px-0">
    <Container className="flex flex-wrap justify-between">
      <div className="w-full md:w-max">
        <Image src="/images/rose.svg" alt="rose" width={153} height={270.6} />
      </div>
      <div className="w-full md:w-max">
        <Heading level={'h3'} className="mb-4">
          Navigation
        </Heading>
        <Navigation ulClassName="flex-col !gap-2" />
      </div>
      <div className="w-full md:w-max">item</div>
    </Container>
    <Container className="text-right text-xs px-6 md:px-0">
      Design & development by Luca Ciampi
    </Container>
  </footer>
);

export default Footer;
