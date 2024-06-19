'use client';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './footer.css';

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.25,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: 'easeOut' },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
        transition: { duration: 1, ease: 'easeOut' },
      });
    }
  }, [controls, inView]);

  return (
    <div>
      <div className="footersection spacer" ref={ref}></div>
      <motion.footer
        className="footersection c-footer"
        initial={{ opacity: 0, y: 10 }}
        animate={controls}
      >
        <div className="footer-content">
          <div className="footer-info">
            <p>Taul Company</p>
            <p>owner:hong jae wook / kim wan jun</p>
            <p>bussiness license:149-88-02941</p>
            <p>6, Achasan-ro 11ga-gil, Seongdong-gu, Seoul, Republic of Korea</p>
            <p>TEL:(010) 3101-9551 | <a href="mailto:taulcontact@gmail.com">taulcontact@gmail.com</a></p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
