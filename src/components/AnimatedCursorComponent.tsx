'use client';

import { useEffect, useState } from 'react';
import AnimatedCursor from 'react-animated-cursor';

const AnimatedCursorComponent = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkIsTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    setIsTouchDevice(checkIsTouchDevice());
  }, []);

  return isTouchDevice ? null : (
    <AnimatedCursor
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={1.7}
      outerStyle={{
        mixBlendMode: 'exclusion',
        backgroundColor: '#F75D3B',
      }}
      innerStyle={{
        mixBlendMode: 'exclusion',
        backgroundColor: '#F75D3B',
      }}
    />
  );
};

export default AnimatedCursorComponent;
