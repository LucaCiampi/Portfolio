import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  onClick?: () => void;
  isOpen?: boolean;
}

const HamburgerIcon = ({ onClick, isOpen }: Props) => {
  const [scaleValue, setScaleValue] = useState('scale(1)');

  /**
   * Updates the sidenav background size scale based on user window's height
   */
  useEffect(() => {
    const calculateBackgroundScaleValue = () => {
      const desiredScale = window.innerHeight / 24; // button's height divided by 2 as the button is at the top of the screen
      setScaleValue(`scale(${desiredScale})`);
    };

    calculateBackgroundScaleValue();

    window.addEventListener('resize', calculateBackgroundScaleValue);

    return () => {
      window.removeEventListener('resize', calculateBackgroundScaleValue);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className="rounded-full relative border-olive px-3 h-12 w-12 flex flex-col gap-2 justify-center items-center"
    >
      <span
        className={clsx(
          'h-[1px] bg-white transition-all rounded-full w-full',
          isOpen && 'translate-y-1'
        )}
      />
      <span
        className={clsx(
          'h-[1px] bg-white transition-all rounded-full w-full',
          isOpen && '-translate-y-1'
        )}
      />
      <div
        className={clsx(
          'bg-text absolute inset-0 rounded-full -z-10 transition duration-300'
        )}
        style={{
          transform: isOpen ? scaleValue : 'scale(1)',
        }}
      ></div>
    </button>
  );
};

export default HamburgerIcon;
