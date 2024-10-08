'use client';

import { useState } from 'react';
import React from 'react';

import HamburgerIcon from '@/components/HamburgerIcon';
import Sidenav from '@/components/Sidenav';
import clsx from 'clsx';

const Header = () => {
  const [isSidenavToggled, setIsSidenavToggled] = useState(false);

  const handleSideNavClick = () => {
    setIsSidenavToggled((current) => !current);
  };

  return (
    <header className={clsx('z-50 fixed left-0 top-0')}>
      <div className="z-10 relative text-brown p-4 w-80 h-screen overflow-clip">
        <HamburgerIcon onClick={handleSideNavClick} isOpen={isSidenavToggled} />
        <Sidenav onClick={handleSideNavClick} isOpen={isSidenavToggled} />
      </div>
      <div
        className={clsx(
          'absolute bg-black -z-10 inset-0 opacity-0 w-screen duration-300 pointer-events-none',
          isSidenavToggled && 'opacity-50 pointer-events-auto'
        )}
        onClick={handleSideNavClick}
      />
    </header>
  );
};

export default Header;
