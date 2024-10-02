'use client';

import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { LayoutGroup } from 'framer-motion';
import { TimeContext } from '@/contexts/TimeContext';

import HamburgerIcon from '@/components/HamburgerIcon';
import Container from '@/components/layout/Container';
import { REVEALING_HEADER_SCROLL_THRESHOLD } from '@/constants/navigation-constants';
import Navigation from '@/components/Navigation';
import Sidenav from '@/components/Sidenav';
import clsx from 'clsx';

interface Props {
  revealOnScroll?: boolean;
}

const Header = ({ revealOnScroll }: Props) => {
  const [mobilenavToggled, setMobilenavToggled] = useState(false);
  const [revealingHeader, setRevealingHeader] = useState(false);

  const handleHamburgerIconClick = () => {
    setMobilenavToggled((current) => !current);
  };
  const handleScroll = () => {
    setRevealingHeader(window.scrollY > REVEALING_HEADER_SCROLL_THRESHOLD);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx('z-50 fixed left-0 top-0')}>
      <div className="flex items-center justify-between relative text-brown p-4">
        <HamburgerIcon
          onClick={handleHamburgerIconClick}
          isOpen={mobilenavToggled}
        />
        <Sidenav onClick={handleHamburgerIconClick} isOpen={mobilenavToggled} />
      </div>
    </header>
  );
};

export default Header;
