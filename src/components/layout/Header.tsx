'use client';

import { useState } from 'react';
import React from 'react';

import HamburgerIcon from '@/components/layout/HamburgerIcon';
import Sidenav from '@/components/layout/Sidenav';
import clsx from 'clsx';

const Header = () => {
  const [isSidenavToggled, setIsSidenavToggled] = useState(false);

  const handleSideNavClick = () => {
    setIsSidenavToggled((current) => !current);
  };

  return (
    <header className={'z-50 fixed left-0 top-0 pointer-events-none'}>
      <div className="z-10 relative text-brown p-4 w-64 md:w-80 h-screen overflow-clip">
        <HamburgerIcon onClick={handleSideNavClick} isOpen={isSidenavToggled} />
        <Sidenav onClick={handleSideNavClick} isOpen={isSidenavToggled} />
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
