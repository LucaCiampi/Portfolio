import { useEffect, useState } from 'react';
import '@/styles/interactiveBackground.scss';
import Background from 'public/images/italy.svg';
import BackgroundNight from 'public/images/italy-night.svg';

export default function InteractiveBackground() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [villageStatus, setVillageStatus] = useState('is awake');
  const [villageAction, setVillageAction] = useState('Go to bed');

  useEffect(() => {
    // const timer = setInterval(() => {
      setCurrentTime(new Date());
    // }, 1000);

    // return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const currentHour = currentTime.getHours();
    const isNight = currentHour < 6 || currentHour >= 18;

    if (isNight) {
      setVillageStatus('is sleeping');
      setVillageAction('Wake up');
    } else {
      setVillageStatus('is awake');
      setVillageAction('Go to bed');
    }
  }, [currentTime]);

  const formattedTime = formatTime(currentTime);

  function changeVillageTime() {
    const updatedTime = new Date(currentTime);
    updatedTime.setHours(updatedTime.getHours() + 12);
    setCurrentTime(updatedTime);
  }

  return (
    <div className="fullscreen--svg italy-background">
      <div className="absolute left-10 top-10 z-10">
        {formattedTime}
        <div>The village {villageStatus}</div>
        <div onClick={changeVillageTime}>{villageAction}</div>
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