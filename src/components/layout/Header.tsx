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

interface Props {
  revealOnScroll?: boolean;
}

const Header = ({ revealOnScroll }: Props) => {
  const [mobilenavToggled, setMobilenavToggled] = useState(false);
  const [revealingHeader, setRevealingHeader] = useState(false);

  // TODO: remove auto time check in this component, place it at entrance of website
  const { currentTime } = useContext(TimeContext);

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
    <header
      className={`z-50 absolute left-0 top-0 w-full transition-all hover:bg-opacity-90 border-text ${
        revealingHeader && 'translate-y-0 opacity-100'
      } ${
        revealOnScroll &&
        '!fixed -translate-y-full opacity-0 bg-background bg-opacity-50'
      }`}
    >
      <div className="max-w-[1778px] relative mx-auto">
        <Sidenav onClick={handleHamburgerIconClick} isOpen={mobilenavToggled} />
      </div>
      <Container className="w-full flex items-center justify-between relative text-brown py-2 border-b-[1px] border-text">
        <LayoutGroup>
          <Navigation className="hidden md:flex items-center font-semibold z-10" />
        </LayoutGroup>
        <div className="md:hidden">Luca Ciampi</div>
        <div className="flex items-center gap-3 mr-4">
          {formatTime(currentTime)}
          <HamburgerIcon
            onClick={handleHamburgerIconClick}
            isOpen={mobilenavToggled}
          />
        </div>
      </Container>
    </header>
  );
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
};

export default Header;
