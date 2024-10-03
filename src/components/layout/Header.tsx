'use client';

import { useState } from 'react';
import React from 'react';

import HamburgerIcon from '@/components/HamburgerIcon';
import Sidenav from '@/components/Sidenav';
import clsx from 'clsx';

const Header = () => {
  const [mobilenavToggled, setMobilenavToggled] = useState(false);

  const handleSideNavClick = () => {
    setMobilenavToggled((current) => !current);
  };

  return (
    <header className={clsx('z-50 fixed left-0 top-0')}>
      <div className="flex items-center justify-between relative text-brown p-4">
        <HamburgerIcon onClick={handleSideNavClick} isOpen={mobilenavToggled} />
        <Sidenav onClick={handleSideNavClick} isOpen={mobilenavToggled} />
        <div
          className={clsx(
            'fixed bg-black -z-10 inset-0 opacity-0 duration-300 pointer-events-none',
            mobilenavToggled && 'opacity-50 pointer-events-auto'
          )}
          onClick={handleSideNavClick}
        />
      </div>
    </header>
  );
};

export default Header;
