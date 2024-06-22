
import React, { useEffect } from 'react';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import '../app/main/main.css';

const ScrollSequence: React.FC = () => {
  const controls = useAnimation();
  const { scrollY } = useViewportScroll();

  useEffect(() => {
    const updateAnimation = () => {
      const scrollSpeed = 0.5; // 스크롤 속도 조절
      controls.start({ y: scrollY.get() * scrollSpeed });
    };

    const unsubscribeScroll = scrollY.onChange(updateAnimation);
    return () => unsubscribeScroll();
  }, [controls, scrollY]);

  return (
    <motion.div
      animate={controls}
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.div
        style={{ fontSize: '2rem' }}
      >
        Scroll to see the effect
      </motion.div>
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <ScrollSequence />
      <div style={{ height: '200vh', background: '#f0f0f0' }}>
        <p style={{ marginTop: '150vh', textAlign: 'center' }}>
          Keep scrolling...
        </p>
      </div>
    </div>
  );
};

export default App;
