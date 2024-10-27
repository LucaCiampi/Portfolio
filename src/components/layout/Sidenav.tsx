import Navigation from '@/components/layout/Navigation';
import { useCallback } from 'react';
import Arrow from '@/components/Arrow';

const Sidenav = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="absolute w-full h-full flex flex-col items-center top-0 left-0 text-background-darker bg-green pattern-4">
      <div className="relative px-9 py-24 flex flex-col justify-between h-full w-full text-center">
        <div>
          <div className="text-xl mb-10 font-abril-fatface">Navigation</div>
          <Navigation
            className="navigation--sidenav"
            ulClassName="flex-col items-center"
          />
        </div>
        <div
          onClick={scrollToTop}
          className="flex-col items-center text-sm flex gap-4"
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
