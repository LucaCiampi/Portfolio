"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { LayoutGroup } from "framer-motion";
import { TimeContext } from "./TimeContext";

import NoScrollLink from "@/components/NoScrollLink";
import DarkModeToggle from "@/components/DarkModeToggle";

interface Link {
  label: string;
  href: string;
  classes?: string;
  submenu?: Link[];
}

const links: Link[] = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
];

const revealingHeaderScrollThreshold = 100;

const Header = () => {
  const [mobilenavToggled, setMobilenavToggled] = useState(false);
  const [revealingHeader, setRevealingHeader] = useState(false);

  // TODO: remove auto time check in this component, place it at entrance of website
  const { currentTime, darkMode, toggleDarkMode } = useContext(TimeContext);
  const [villageStatus, setVillageStatus] = useState("is awake");
  const [villageAction, setVillageAction] = useState("Go to bed");

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-30 left-0 top-0 w-full p-4 bg-background bg-opacity-80 border-b-[1px] border-brown ${
        revealingHeader ? "bg-green-light" : ""
      }`}
    >
      <div className="xl:container mx-auto flex justify-between relative">
        <LayoutGroup>
          <nav className="hidden lg:block font-semibold">
            <ul className="flex gap-8">
              {links.map(({ label, href, classes, submenu }) => (
                <li key={label} className={`${classes || ""}`}>
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
          <div className="absolute flex w-full justify-center z-10">
            | {formatTime(currentTime)} |
          </div>
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
    hour: "numeric",
    minute: "numeric",
  });
};

export default Header;
