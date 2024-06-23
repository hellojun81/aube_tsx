'use client';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './footer.css';
import Script from 'next/script';
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
    <>
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
     {/* Kakao Pixel */}
     <Script
        src="//t1.daumcdn.net/kas/static/kp.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.kakaoPixel) {
            window.kakaoPixel('6453357753087996056').pageView();
          }
        }}
      />

      {/* Google Tag */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16618431657" />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16618431657');
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1442522209958810');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{display:'none'}}
          src="https://www.facebook.com/tr?id=1442522209958810&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
};

export default Home;
