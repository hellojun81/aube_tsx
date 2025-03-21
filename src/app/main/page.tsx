'use client'
import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import dynamic from 'next/dynamic';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import './main.css'
import "react-nice-scroll/dist/styles.css";
import EmblaCarousel from '../carousel/newCarouse'
// import HorizontalGallery from '../carousel/HorizontalSection'
import Email from '../components/sendEmail'
import Footer from '../components/footer'
import Naverbar from '../components/Navbar'
import { ScrollContainer } from "react-nice-scroll"
// import ScrollToElement from '../components/ScrolltoElement';  // 해시 스크롤 기능 가져오기
const ScrollToElement = dynamic(() => import('../components/ScrollToElement'), {
  ssr: false,  // 서버 사이드 렌더링을 비활성화
});





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
  const [imagesPath, setimagesPath] = useState('/images/jpg_bk800')  //메인aubebuild이미지
  const [firstpage, setfirstpage] = useState('firstpage')

  const motionInfo = [
    { name: "Hero_titleContainer", name2: 'title1Sub', name1: 'Hero_title1', animate: controls1, rotate: -45, key: 0 },
    { name: "Hero_titleContainer", name2: 'title2Sub', name1: 'Hero_title2', animate: controls2, rotate: 45, key: 1 },
    { name: "Hero_titleContainer", name2: 'title3Sub', name1: 'Hero_title3', animate: controls3, rotate: 45, key: 2 },
    { name: "Hero_titleContainer", name2: 'title4Sub', name1: 'Hero_title4', animate: controls4, rotate: -45, key: 3 },
    // { name: "Hero_title_center", name2: 'titleCSub', name1: 'Hero_titlecenter', animate: 'controlsCenter', rotate: '0', key: 4 },
  ];
  const Carousel = [
    { floor: 1, loop: 8, classname: floorpadding, id: 'floor1' },
    { floor: 2, loop: 7, classname: floorpadding, id: 'floor2' },
    { floor: 3, loop: 7, classname: floorpadding, id: 'floor3' },
    { floor: 4, loop: 3, classname: floorpadding, id: 'Other' },
    { floor: 5, loop: 3, classname: floorpadding, id: 'Stairs' },
    { floor: 6, loop: 3, classname: floorpadding, id: 'Outside' },
    { floor: 7, loop: 9, classname: floorpadding, id: 'archive' },
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
    // console.log({ titleRefs: titleRefs.current })
    let index = 0;
    titleRefs.current.forEach(ref => {
      // console.log('titleRefs123')
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
          // console.log('parent', parent)
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
        controls1.start({ rotate: -45, transition: { duration: 0.9 } });
        controls2.start({ rotate: 45, transition: { duration: 0.9 } });
        controls3.start({ rotate: 45, transition: { duration: 0.9 } });
        controls4.start({ rotate: -45, transition: { duration: 0.9 } });
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

    const preloadImages = () => {
      const images = [];
      for (let i = 1; i <= 30; i++) {
        const img = new Image();
        img.src = `${imagesPath}/${i}.jpg`; // 실제 이미지 경로에 맞게 수정
        images.push(img);
      }
    };

    preloadImages();


  }, [imagesPath, controls1, controls2, controls3, controls4, scrollY, isClient]);

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

        <div className="button_container">
          <section
            style={{
              height: "100%",
              backgroundColor: '#fff'
            }}
          >
            <EmblaCarousel
              floor={99}
              loop={10}
              screenMode={screenMode}
              id='home'
              key={99}
              fileCount={10}
              classname='fullimage'
            />
          </section>
        </div>
        {screenMode === 'height' ? (
          <ScrollContainer >
            <section
              className={firstpage}
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: 'relative',
                backgroundColor: '#171717',
                zIndex: '99',
              }}
            >


              <SequenceSection
                // end="80%"
                imagesPath={imagesPath}
                imagesCount={30}
                imagesType="jpg" />
            </section>
          </ScrollContainer>) : <></>}
          {screenMode === 'width' ? (
          <ScrollContainer >
            <section
              className={firstpage}
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: 'relative',
                backgroundColor: '#171717',
                zIndex: '99',
              }}
            >


              <SequenceSection
                // end="80%"
                imagesPath={imagesPath}
                imagesCount={30}
                imagesType="jpg" />
            </section>
          </ScrollContainer>) : <></>}


        <section
          id='main'
          className={floorpadding}
          style={{
            backgroundColor: '#fff',
            padding: '10px'
          }}
        >
          <div style={{
            fontSize: '7em',
            fontWeight: '900',
            textAlign: 'center',
            paddingTop: '10px'
          }}><img src='/images/logo.gif' style={{ maxWidth: '100%' }} /></div>
          <p>
            Aube Studio 건축물은 1974년 공장으로 시작되었습니다. 이 흥미로운 건축물은 각각 다른 양식으로 1986년에 2층, 2013년 3층이 증축되어 방문자를 시간의 회랑으로 초대합니다. 산업화를 상징하는 붉은 벽돌 위에 근대 건축의 거장 르코르뷔제를 오마주 하는 창문과 문들은 기능주의적이면서 유기적인 조형적 아름다움을 선사하며, 710㎡의 대지 위에 3층으로 지어진 두 개의 건물과 마당은 거의 모든 것을 하기에 가능한 특별한 공간으로 제공됩니다.<br /><br /> Aube Studio began as a factory in 1974. This interesting building, each in a different style, was expanded with a second floor in 1986 and a third floor in 2013, inviting visitors to explore the corridors of time. Windows and doors that pay homage to the master of modern architecture, Le Corbusier, on red bricks symbolizing industrialization present a functionalistic yet organic formative beauty, and the two three-story buildings and yard built on a 710㎡ site provide almost everything. Therefore, it is provided as a special space.
          </p>
          <div style={{ color: "#fff" }}>
            어브 스튜디오 성수동 팝업 행사 스튜디오 aube studio 룩북 패션화보 광고 촬영
          </div>
        </section>

        {/* {Carousel.map((link, index) => (
          <section
             id={link.id}
            // className={floorpadding}
            style={{
              height: "100%",
              backgroundColor: '#fff'
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
          </sect
          ion>
        ))} */}



{Carousel.map((link, index) => (
  <section
     key={link.id}  // <-- key 추가
     id={link.id}
     style={{
       height: "100%",
       backgroundColor: '#fff'
     }}
  >
    <EmblaCarousel
      fileCount={link.loop}
      classname={floorpadding}
      floor={link.floor}
      loop={link.loop}
      screenMode={screenMode}
      id={link.id}
    />
  </section>
))}



        <section
          id='Contact'
          style={{

            marginBottom: "100px"
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
<ScrollToElement/>
      </div>
    </>
  );
}
export default App;


