'use client';

import AnimatedCursor from 'react-animated-cursor';

const AnimatedCursorComponent = () => {
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  return isTouchDevice() ? (
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
  ) : null;
};

export default AnimatedCursorComponent;
