'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { LayoutGroup } from 'framer-motion';
import { TimeContext } from './TimeContext';

import NoScrollLink from '@/components/NoScrollLink';
import DarkModeToggle from '@/components/DarkModeToggle';

interface Link {
  label: string;
  href: string;
  classes?: string;
  submenu?: Link[];
}

const links: Link[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const revealingHeaderScrollThreshold = 100;

const Header = () => {
  const [mobilenavToggled, setMobilenavToggled] = useState(false);
  const [revealingHeader, setRevealingHeader] = useState(false);

  // TODO: remove auto time check in this component, place it at entrance of website
  const { currentTime, darkMode, toggleDarkMode } = useContext(TimeContext);
  const [villageStatus, setVillageStatus] = useState('is awake');
  const [villageAction, setVillageAction] = useState('Go to bed');

  const handleNaviconClick = () => {
    setMobilenavToggled((current) => !current);
  };
  const handleScroll = () => {
    setRevealingHeader(window.scrollY > revealingHeaderScrollThreshold);
  };

  const handleMenuLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    setMobilenavToggled(false);
  };

  useEffect(() => {
    setRevealingHeader(false);
    setMobilenavToggled(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-30 left-0 top-0 w-full transition-all hover:opacity-100 px-3 py-5 bg-background bg-opacity-70 border-b-[1px] border-brown ${
        revealingHeader ? 'opacity-30' : ''
      }`}
    >
      <div className="xl:container mx-auto flex justify-between relative text-marine">
        <LayoutGroup>
          <nav className="hidden lg:block font-semibold z-10">
            <ul className="flex gap-8">
              {links.map(({ label, href, classes, submenu }) => (
                <li key={label} className={`${classes || ''}`}>
                  <NoScrollLink href={href}>
                    <span title={label} onClick={handleMenuLinkClick}>
                      <span>{label}</span>
                    </span>
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
          <DarkModeToggle />
        </LayoutGroup>
        <div className="block lg:hidden" onClick={handleNaviconClick}>
          <span>nav icon here</span>
        </div>
      </div>
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
