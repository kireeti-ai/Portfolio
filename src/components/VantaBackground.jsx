import React, { useState, useEffect, useRef } from 'react';

import RINGS from 'vanta/dist/vanta.rings.min.js'; 
import * as THREE from 'three';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {

      const effect = RINGS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x121212, 
        color: 0x888888          
      });
      setVantaEffect(effect);
    }


    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="vanta-background" />;
};

export default VantaBackground;