'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';
import HamburgerIcon from './HamburgerIcon';
import Sidenav from './Sidenav';

const Header = () => {
  const [isSidenavToggled, setIsSidenavToggled] = useState(false);
  const sidenavClipPathRef = useRef<HTMLDivElement>(null);

  const handleSideNavClick = () => {
    setIsSidenavToggled((current) => !current);
  };

  useEffect(() => {
    if (sidenavClipPathRef.current) {
      gsap.to(sidenavClipPathRef.current, {
        clipPath: isSidenavToggled
          ? 'circle(150% at 40px 40px)'
          : 'circle(26px at 40px 40px)',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [isSidenavToggled]);

  return (
    <header className="z-50 fixed left-0 top-0 pointer-events-none">
      <div className="z-10 relative text-brown p-4 w-64 md:w-80 h-screen overflow-clip">
        <HamburgerIcon onClick={handleSideNavClick} isOpen={isSidenavToggled} />
        <div
          ref={sidenavClipPathRef}
          className="absolute left-0 top-0 h-full w-full"
          style={{ clipPath: 'circle(26px at 40px 40px)' }}
        >
          <Sidenav />
        </div>
      </div>
      <div
        className={clsx(
          'absolute -z-10 inset-0 opacity-0 w-screen bg-green-darker duration-300 delay-100',
          isSidenavToggled && 'pointer-events-auto opacity-50'
        )}
        onClick={handleSideNavClick}
      />
    </header>
  );
};

export default Header;
