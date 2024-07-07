import Navigation from '@/components/Navigation';
import Heading from '@/components/Heading';
import { useCallback } from 'react';
import Arrow from '@/components/Arrow';

interface Props {
  onClick?: () => void;
  isOpen?: boolean;
}

const Sidenav = ({ onClick, isOpen }: Props) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div
      onClick={onClick}
      className={`absolute w-80 rounded-b-full z-10 flex flex-col items-center top-0 right-0 bg-green text-background -translate-y-full opacity-0 transition-all ${
        isOpen && 'translate-y-0 opacity-100'
      }`}
    >
      <div className="relative px-9 py-32">
        <Heading level={'h3'} className="text-xl mb-10">
          Navigation
        </Heading>
        <Navigation
          className="navigation--sidenav"
          ulClassName="flex-col items-center"
        />
        <div
          onClick={scrollToTop}
          className="flex-col cursor-pointer items-center text-sm flex gap-4 absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          Back to top
          <div className="scale-[0.3] -mr-1">
            <Arrow color="white" orientation="top" large />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
