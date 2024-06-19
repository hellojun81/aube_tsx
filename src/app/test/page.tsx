'use client'
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';

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
      <Head>
        <title>Framer Motion Animated Footer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: "Roboto", sans-serif;
          color: white;
          background-color: #1b1b1b;
          padding: 0;
          margin: 0;
        }

        .section {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero {
          background: salmon;
        }

        .content {
          background: CadetBlue;
        }

        .spacer {
          background: none;
        }

        .c-footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          z-index: -1;
          background-color: grey;
        }

        h1, .c-footer_text {
          max-width: 70vw;
          font-size: 3vw;
          font-weight: normal;
          text-transform: uppercase;
        }

        .indicator {
          position: fixed;
          top: 25%;
          width: 100%;
          height: 1px;
          background: teal;
        }
      `}</style>
      <div className="wrapper">
        <div className="section hero">
          <h1>This is hero section</h1>
        </div>
        <div className="section content">
          <h1>This is content section</h1>
        </div>
      </div>
      <div className="section spacer" ref={ref}></div>
      <motion.div
        className="section c-footer"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <h1 className="c-footer_text">
          This is an animated footer that appears on scroll.
        </h1>
      </motion.div>
      <div className="indicator"></div>
    </div>
  );
};

export default Home;
