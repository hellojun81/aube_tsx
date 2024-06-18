'use client'
import React, {useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useViewportScroll } from 'framer-motion';
import {
  ScrollContainer,
  SequenceSection,
  gellyAnimation,
  ParallaxImage,
  parallaxAnimation,
  HorizontalSection,
  useGlobalState
} from "react-nice-scroll";
import '../main/main.css'


const RotatingTexts = () => {
  const [isClient, setIsClient] = useState(false);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const { scrollY } = useViewportScroll();
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);

  const [screenMode, setscreenMode] = useState('mainsection')     //층별안내padding사이즈
  const [imagesPath, setimagesPath] = useState('/images/jpg_bk')  //메인aubebuild이미지
  const [firstpage, setfirstpage] = useState('firstpage')


  useEffect(() => {
    setIsClient(true); // 클라이언트 측에서만 true로 설정

    const div = divRef.current as HTMLDivElement;
    const elements = document.querySelectorAll('.ns-container');
    elements.forEach(element => {
      (element as HTMLElement).style.overflow = '';
    });

    if (div) {
      const windowHeight = window.innerHeight;        // 윈도우의 높이와 너비를 가져옵니다.
      const windowWidth = window.innerWidth;          // div 요소의 높이와 너비를 가져옵니다.
      const divHeight = div.offsetHeight;
      const divWidth = div.offsetWidth;
      // 중앙에 위치시키기 위한 계산을 합니다.
      const topPosition = (windowHeight / 2) - (divHeight / 2);
      const leftPosition = (windowWidth / 2) - (divWidth / 2);
      // div 요소의 스타일을 설정합니다.
      div.style.position = 'absolute';
      div.style.top = `${topPosition}px`;
      div.style.left = `${leftPosition}px`;

      if (windowWidth < windowHeight) {
      } else {
        setscreenMode('mainsection2')
        setfirstpage('firstpage2')
        setimagesPath('/images/jpg_width')
      }
    }

    let index = 0;
    titleRefs.current.forEach(ref => {
      index++;
      if (ref) {
        const parent = ref.parentElement as HTMLElement | null;
        if (parent) {
          const parentHeight = parent.clientHeight;
          const parentWidth = parent.clientWidth;
          const textHeight = ref.clientHeight;
          const textWidth = ref.clientWidth;

          let checkindex = index % 2
          let leftposition
          if (divRef.current) {
            leftposition = (parentWidth - divRef.current.offsetWidth) / 2
          }
          ref.style.position = 'absolute';
          ref.style.top = `${(parentHeight - textHeight) / 2}px`;
          if (checkindex == 1) {
            ref.style.left = `${leftposition}px`;
          } else {
            ref.style.right = `${leftposition}px`;
          }
        }
      }
    });
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
    <ScrollContainer>
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div className="titleMain">
      <motion.div
      className={`Hero_titleContainer Hero_title1`}
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls1}
        initial={{ rotate: 45 }}
      >
       AUBE
      </motion.div>
      <motion.div
         className={`Hero_titleContainer Hero_title2`}
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls2}
        initial={{ rotate: -45 }}
      >
        AUBE
      </motion.div>
      <motion.div
         className={`Hero_titleContainer Hero_title3`}
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls3}
        initial={{ rotate: 45 }}
      >
        AUBE
      </motion.div>
      <motion.div
         className={`Hero_titleContainer Hero_title4`}
        style={{ fontSize: '2rem', margin: '20px' }}
        animate={controls4}
        initial={{ rotate: -45 }}
      >
       AUBE
      </motion.div>
      </div>
          <SequenceSection
              end="80%"
              imagesPath="/images/jpg_width"
              imagesCount={30}
              imagesType="jpg"
            >
            </SequenceSection>
    </div>
    </ScrollContainer>
  );

}


export default RotatingTexts;
