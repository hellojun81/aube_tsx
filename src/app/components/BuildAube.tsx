'use client'
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useViewportScroll } from 'framer-motion';

const RotatingTexts = () => {
  const [isClient, setIsClient] = useState(false);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const { scrollY } = useViewportScroll();

  useEffect(() => {
    setIsClient(true); // 클라이언트 측에서만 true로 설정

    const updateRotation = () => {
      controls1.start({ rotate: scrollY.get() * 0.5 });
      controls2.start({ rotate: scrollY.get() * -0.5 });
      controls3.start({ rotate: scrollY.get() * 0.5 });
      controls4.start({ rotate: scrollY.get() * -0.5 });
    };

    if (isClient) {
      const unsubscribeScroll = scrollY.onChange(updateRotation);
      return () => {
        unsubscribeScroll();
      };
    }
  }, [controls1, controls2, controls3, controls4, scrollY, isClient]);

  if (!isClient) {
    // 서버 측에서는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <div style={{ height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls1}
        initial={{ rotate: 0 }}
      >
        Rotating Text 1
      </motion.div>
      <motion.div
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls2}
        initial={{ rotate: 0 }}
      >
        Rotating Text 2
      </motion.div>
      <motion.div
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls3}
        initial={{ rotate: 0 }}
      >
        Rotating Text 3
      </motion.div>
      <motion.div
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls4}
        initial={{ rotate: 0 }}
      >
        Rotating Text 4
      </motion.div>
    </div>
  );
};

export default RotatingTexts;
