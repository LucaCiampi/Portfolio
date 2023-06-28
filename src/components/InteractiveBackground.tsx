import { useContext, useEffect, useState } from 'react';
import { TimeContext } from './TimeContext';
import Background from 'public/images/italy.svg';
import BackgroundNight from 'public/images/italy-night.svg';
import '@/styles/interactiveBackground.scss';
import Button from './Button';

import Cloud1 from 'public/images/cloud1.svg'
import Cloud2 from 'public/images/cloud2.svg'
import Cloud3 from 'public/images/cloud3.svg'

export default function InteractiveBackground() {
    // TODO: remove auto time check in this component, place it at entrance of website
    const { currentTime, darkMode, toggleDarkMode } = useContext(TimeContext);
    const [villageStatus, setVillageStatus] = useState('is awake');
    const [villageAction, setVillageAction] = useState('Go to bed');

    useEffect(() => {
        toggleDarkMode()
    }, []);

    useEffect(() => {
        if (darkMode) {
            setVillageStatus('is sleeping');
            setVillageAction('Wake up now !');
        } else {
            setVillageStatus('is awake');
            setVillageAction('Time to go to bed');
        }
    }, [currentTime]);

    const formattedTime = formatTime(currentTime);

    return (
        <div className="fullscreen--svg italy-background">
            <div className="absolute left-10 top-10 z-10">
                {formattedTime}
                <div>The village {villageStatus}</div>
                <Button onClick={toggleDarkMode}>{villageAction}</Button>
            </div>
            <div className="italy-background">
                <Background />
            </div>
            <div className="italy-background italy-background--night">
                <BackgroundNight />
            </div>
        </div>
    );
}

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' });
};