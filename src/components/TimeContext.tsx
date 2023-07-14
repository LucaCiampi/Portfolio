"use client";

import React, { createContext, useState } from "react";

type TimeContextType = {
  currentTime: Date;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const TimeContext = createContext<TimeContextType>(
  {} as TimeContextType
);

interface Props {
  children: React.ReactNode;
}

const getThemeString = (isDark: boolean): string => (isDark ? "dark" : "light");

const darkModeUserPreference = (): boolean =>
  (localStorage && localStorage.theme === "dark") ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

export const TimeProvider = ({ children }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(darkModeUserPreference);

  const toggleDarkMode = () => {
    const updatedTime = new Date(currentTime);
    updatedTime.setHours(updatedTime.getHours() + 12);
    setCurrentTime(updatedTime);

    localStorage.theme = getThemeString(!darkMode);
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <TimeContext.Provider value={{ currentTime, darkMode, toggleDarkMode }}>
      {children}
    </TimeContext.Provider>
  );
};
