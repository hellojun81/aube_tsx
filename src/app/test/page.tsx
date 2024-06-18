'use client'
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const ScrollRotate = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const rotateValue = window.scrollY * 0.1;
      controls.start({ rotate: rotateValue });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <div style={{ height: '200vh' }}>
      <motion.div animate={controls} style={{ display: 'inline-block' }}>
        <h1>Scroll to Rotate</h1>
      </motion.div>
    </div>
  );
};

export default ScrollRotate;
