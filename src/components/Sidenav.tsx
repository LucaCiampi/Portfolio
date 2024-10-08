import Navigation from '@/components/Navigation';
import Heading from '@/components/Heading';
import { useCallback } from 'react';
import Arrow from '@/components/Arrow';
import clsx from 'clsx';

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
      className={clsx(
        'absolute w-full h-full flex flex-col items-center top-0 left-0 text-background -translate-x-full opacity-0 transition-all duration-300 ease-out',
        isOpen && 'translate-x-0 opacity-100'
      )}
    >
      <div className="relative px-9 py-24 flex flex-col justify-between h-full w-full text-center">
        <div>
          <Heading level={'h3'} className="text-xl mb-10">
            Navigation
          </Heading>
          <Navigation
            className="navigation--sidenav"
            ulClassName="flex-col items-center"
          />
        </div>
        <div
          onClick={scrollToTop}
          className="flex-col cursor-pointer items-center text-sm flex gap-4"
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
