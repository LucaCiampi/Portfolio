'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { LayoutGroup } from 'framer-motion';
import { TimeContext } from '@/contexts/TimeContext';

import NoScrollLink from '@/components/NoScrollLink';
import NavIcon from '@/components/NavIcon';
import Container from '@/components/Container';
import {
  navigation,
  revealingHeaderScrollThreshold,
} from '@/constants/navigation';

interface Props {
  revealOnScroll?: boolean;
}

const Header = ({ revealOnScroll }: Props) => {
  const [mobilenavToggled, setMobilenavToggled] = useState(false);
  const [revealingHeader, setRevealingHeader] = useState(false);

  // TODO: remove auto time check in this component, place it at entrance of website
  const { currentTime } = useContext(TimeContext);

  const handleNavIconClick = () => {
    setMobilenavToggled((current) => !current);
  };
  const handleScroll = () => {
    setRevealingHeader(window.scrollY > revealingHeaderScrollThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`z-30 absolute left-0 top-0 w-full transition-all hover:bg-opacity-90 px-3 pt-2 md:pt-5 border-text flex items-center ${
        revealingHeader ? 'translate-y-0' : ''
      } ${
        revealOnScroll
          ? '!fixed -translate-y-full bg-background bg-opacity-50'
          : 'mt-7'
      }`}
    >
      <Container className="w-full flex items-center justify-between relative text-brown pb-2 md:pb-5 border-b-[1px] border-text">
        <LayoutGroup>
          <nav className="hidden md:flex items-center font-semibold z-10">
            <ul className="flex gap-8">
              {navigation.map(({ label, href, classes, submenu }) => (
                <li key={label} className={`${classes || ''}`}>
                  <NoScrollLink href={href}>
                    <span>{label}</span>
                  </NoScrollLink>
                  {submenu && (
                    <ul className="flex flex-col">
                      {submenu.map(({ label, href }) => (
                        <li key={label}>
                          <Link href={href}>
                            <span title={label}>{label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </LayoutGroup>
        <div className="md:hidden">Luca Ciampi</div>
        <div className="flex items-center gap-3">
          {formatTime(currentTime)}
          <NavIcon onClick={handleNavIconClick} isOpen={mobilenavToggled} />
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
