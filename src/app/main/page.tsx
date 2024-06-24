'use client'
import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import dynamic from 'next/dynamic';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import '../main.css'
import "react-nice-scroll/dist/styles.css";
import EmblaCarousel from '../carousel/newCarouse'
// import HorizontalGallery from '../carousel/HorizontalSection'
import Email from '../components/sendEmail'
import Footer from '../components/footer'
import Naverbar from '../components/Navbar'
import { ScrollContainer } from "react-nice-scroll"
// import styles from './ScrollIcon.module.scss';
const SequenceSection = dynamic(() => import('react-nice-scroll').then(mod => mod.SequenceSection), { ssr: false });

const App: React.FC = () => {
  const scrolloptions = {
    speed: 0.5, // 스크롤 속도를 조절하는 옵션 (기본값: 1)
  };
  const [isClient, setIsClient] = useState(false);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const { scrollY } = useViewportScroll();
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [screenMode, setscreenMode] = useState('height')     //층별안내padding사이즈
  const [floorpadding, setfloorpadding] = useState('mainsection')     //층별안내padding사이즈
  const [imagesPath, setimagesPath] = useState('/images/jpg_bk')  //메인aubebuild이미지
  const [firstpage, setfirstpage] = useState('firstpage')


  const motionInfo = [
    { name: "Hero_titleContainer", name2: 'title1Sub', name1: 'Hero_title1', animate: controls1, rotate: -45, key: 0 },
    { name: "Hero_titleContainer", name2: 'title2Sub', name1: 'Hero_title2', animate: controls2, rotate: 45, key: 1 },
    { name: "Hero_titleContainer", name2: 'title3Sub', name1: 'Hero_title3', animate: controls3, rotate: 45, key: 2 },
    { name: "Hero_titleContainer", name2: 'title4Sub', name1: 'Hero_title4', animate: controls4, rotate: -45, key: 3 },
    // { name: "Hero_title_center", name2: 'titleCSub', name1: 'Hero_titlecenter', animate: 'controlsCenter', rotate: '0', key: 4 },
  ];
  const Carousel = [
    { floor: 1, loop: 7, classname: floorpadding, id: '1floor' },
    { floor: 2, loop: 7, classname: floorpadding, id: '2floor' },
    { floor: 3, loop: 7, classname: floorpadding, id: '3floor' },
    { floor: 4, loop: 3, classname: floorpadding, id: 'Other' },
    { floor: 5, loop: 3, classname: floorpadding, id: 'Stairs' },
    { floor: 6, loop: 3, classname: floorpadding, id: 'Outside' },
  ]

  useEffect(() => {

    setIsClient(true); // 클라이언트 측에서만 true로 설정
    const div = divRef.current as HTMLDivElement;
    const elements = document.querySelectorAll('.ns-container');

    elements.forEach(element => {
      (element as HTMLElement).style.overflow = 'inital';
    });
    const windowHeight = window.innerHeight;        // 윈도우의 높이와 너비를 가져옵니다.
    const windowWidth = window.innerWidth;          // div 요소의 높이와 너비를 가져옵니다.

    if (windowHeight < windowWidth) {
      setscreenMode('width')
      setfloorpadding('mainsection2')
      setfirstpage('firstpage2')
      setimagesPath('/images/jpg_width')
    }

    console.log({ titleRefs: titleRefs.current })
    let index = 0;



    titleRefs.current.forEach(ref => {
      console.log('titleRefs123')
      index++;

      if (ref) {
        const parent = ref.parentElement as HTMLElement | null;
        if (parent) {
          const parentHeight = parent.clientHeight;
          const parentWidth = parent.clientWidth;
          const textHeight = ref.clientHeight;
          let checkindex = index % 2
          let leftposition
          ref.style.position = 'absolute';
          ref.style.top = `${(parentHeight - textHeight) / 2}px`;
          ref.style.left = `${leftposition}px`;
          let childWidth = titleRefs.current[0]?.clientWidth
          console.log('parent', parent)
          if (childWidth) {
            leftposition = (parentWidth - childWidth) / 2
            if (index !== 5) {
              if (checkindex == 1) {
                ref.style.left = `${leftposition}px`;
              } else {
                ref.style.right = `${leftposition}px`;
              }
            }
          }

        }
      }
    });
    const updateRotation = () => {
      const scrollValue = scrollY.get();
      if (scrollValue === 0) {
        // 스크롤이 원점으로 돌아왔을 때 초기 상태로 되돌리기
        controls1.start({ rotate: -45, transition: { duration: 0.5 } });
        controls2.start({ rotate: 45, transition: { duration: 0.5 } });
        controls3.start({ rotate: 45, transition: { duration: 0.5 } });
        controls4.start({ rotate: -45, transition: { duration: 0.5 } });
      } else {
        controls1.start({
          rotate: 45,
          transition: { duration: 2.5 }
        });
        controls2.start({
          rotate: -45,
          transition: { duration: 2.5 }
        });
        controls3.start({
          rotate: -45,
          transition: { duration: 2.5 }
        });
        controls4.start({
          rotate: 45,
          transition: { duration: 2.5 }
        });
      }
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
  const setTitleRef = (index: number): RefCallback<HTMLDivElement> => {
    return (el) => {
      titleRefs.current[index] = el;
    };
  };

  return (
    <>
      <div>
        <Naverbar />
        <ScrollContainer >
          <></>
          <section
            id='home'
            className={firstpage}
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: 'relative',
              backgroundColor: '#171717',
              zIndex: '99',

            }}
          >


             <div className="titleMain" >
              {motionInfo.map((link, index) => (
                <div className={`${link.name} ${link.name1}`} key={index}>
                  <motion.div
                    className={link.name2}
                    style={{ fontSize: '2.5rem' }}
                    animate={link.animate}
                    initial={{ rotate: (link.rotate) }}
                    ref={setTitleRef(link.key)}
                    key={index}
                  >
                    AUBE
                  </motion.div>
                </div>
              ))}
              <div className='Hero_title_center Hero_titlecenter' key={4}>
                <div
                  className='titleCSub'
                  style={{ fontSize: '1.5rem' }}

                  // initial={0}
                  ref={setTitleRef(4)}
                  key={4}
                >
                  <div className="scroll-downs">
                    <div className="mousey">
                      <div className="scroller"></div>
                    </div>
                    <div>down</div>
                  </div>

                </div>
              </div>
            </div> 
             <SequenceSection
              end="80%"
              imagesPath={imagesPath}
              imagesCount={30}
              imagesType="jpg" /> 
          </section>

          </ScrollContainer>
          <section
            id='floor0'
            className={floorpadding}
            style={{
            
              // position: 'relative'
            }}
          >
            <div style={{
              fontSize: '7em',
              fontWeight: '700',
              textAlign: 'center',
              paddingTop: '10px'
            }}>AUBE</div>
            <p>
              Aube Studio 건축물은 1974년 공장으로 시작되었습니다. 이 흥미로운 건축물은 각각 다른 양식으로 1986년에 2층, 2013년 3층이 증축되어 방문자를 시간의 회랑으로 초대합니다. 산업화를 상징하는 붉은 벽돌 위에 근대 건축의 거장 르코르뷔제를 오마주 하는 창문과 문들은 기능주의적이면서 유기적인 조형적 아름다움을 선사하며, 710㎡의 대지 위에 3층으로 지어진 두 개의 건물과 마당은 거의 모든 것을 하기에 특별한 공간으로 제공됩니다.<br /><br /> Aube Studio began as a factory in 1974. This interesting building, each in a different style, was expanded with a second floor in 1986 and a third floor in 2013, inviting visitors to explore the corridors of time. Windows and doors that pay homage to the master of modern architecture, Le Corbusier, on red bricks symbolizing industrialization present a functionalistic yet organic formative beauty, and the two three-story buildings and yard built on a 710㎡ site provide almost everything. Therefore, it is provided as a special space.
            </p>

          </section>

          {Carousel.map((link, index) => (
            <section
              // id={link.id}
              // className={floorpadding}
              style={{
                height: "100%",
                // position: 'relative'
              }}
            >
              <EmblaCarousel
                fileCount={link.loop}
                classname={floorpadding}
                floor={link.floor}
                loop={link.loop}
                screenMode={screenMode}
                id={link.id}
                key={index}
              />
            </section>
          ))}

          <section
            id='Contact'
            style={{
         
              marginBottom:"100px"
            }}
            className={floorpadding}
          >
            <div><h1>Contact US</h1></div>
            <Email />
          </section>

          <section
            style={{

            }}
          >
            <Footer />
          </section>
   
      </div>
    </>
  );
}
export default App;


