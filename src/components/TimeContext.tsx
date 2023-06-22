"use client";

import React, { createContext, useState } from 'react';

type TimeContextType = {
    currentTime: Date;
    toggleTime: () => void;
    nightTime: boolean;
};

export const TimeContext = createContext<TimeContextType>({} as TimeContextType);

interface Props {
    children: React.ReactNode
}

export const TimeProvider = ({ children }: Props) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    const toggleTime = () => {
        const updatedTime = new Date(currentTime);
        updatedTime.setHours(updatedTime.getHours() + 12);
        setCurrentTime(updatedTime);
    };

    const currentHour = currentTime.getHours();
    const nightTime = currentHour < 6 || currentHour >= 18;

    return (
        <TimeContext.Provider value={{ currentTime, toggleTime, nightTime }}>
            {children}
        </TimeContext.Provider>
    );
};
