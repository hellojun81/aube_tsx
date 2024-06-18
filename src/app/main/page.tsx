"use client";
// npm run dev or npm run start
//Sticky Footer <--하단 소스 로 좋을듯
//Smooth Parallax Scroll<-- 가구 많이 들어오면 좋을듯
//Image slide project gallery<-- 가구 많이 들어오면 좋을듯
//Text Clip Mask On Scroll-- 가구 많이 들어오면 좋을듯
//Text Gradient Scroll Opacity v2<--텍스트 에니효과
//Text Mask Animation<--텍스트 에니효과
//Curved Menu<-메뉴
import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import "./main.css";
import {
  ScrollContainer,
  SequenceSection,
  gellyAnimation,
  ParallaxImage,
  parallaxAnimation,
  HorizontalSection,
  useGlobalState
} from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";
// import { ScrollRotate } from 'react-scroll-rotate';
import EmblaCarousel from '../carousel/CarouselWrapper'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';


const studioName = 'Aube';
const RoateClassName = [
  { name: "title1Sub", divname: 'Hero_title1', key: 0 },
  { name: "title2Sub", divname: 'Hero_title2', key: 1 },
  { name: "title3Sub", divname: 'Hero_title3', key: 2 },
  { name: "title4Sub", divname: 'Hero_title4', key: 3 },
];

const App: React.FC = () => {

  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const rotateto = [-360, 360, -500, 500];
  const rotatefrom = [-45, 45, 45, -45];
  let floorValue = 1;
  const [screenMode, setscreenMode] = useState('mainsection')
  const [imagesPath, setimagesPath] = useState('/images/jpg_bk')
  const [firstpage, setfirstpage] = useState('firstpage')
  const [scroller] = useGlobalState('container');
  // const [floor, setfloor] = useState('');

  useEffect(() => {
    // const div = divRef.current;
    const div = divRef.current as HTMLDivElement;

    if (div) {
      // 윈도우의 높이와 너비를 가져옵니다.
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      // div 요소의 높이와 너비를 가져옵니다.
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
        // console.log('windowHeight', windowHeight)
      } else {
        // console.log('windowWidth', windowWidth)
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
          // console.log('parentWidth', parentWidth);
          // console.log('titleRefs', divRef.current.offsetWidth);
          let leftposition
          if(divRef.current){
          leftposition =(parentWidth-divRef.current.offsetWidth)/2
          console.log('leftposition', leftposition);
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
  }, []);

  const setTitleRef = (index: number): RefCallback<HTMLDivElement> => {
    return (el) => {
      titleRefs.current[index] = el;
    };
  };
  const htmlElement = document.documentElement;
  htmlElement.style.overflow = '';
  const addGellyAnimation = useCallback((containerAnimation: gsap.core.Tween) => {
    const items = document.querySelectorAll('.ns-horizontal-section__item__inner') as NodeListOf<HTMLDivElement>;

    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        containerAnimation,
        start: 'left right',
        end: 'right left',
        scrub: 0.5,
        immediateRender: false,
        onUpdate: () => {
          const velocity = containerAnimation.scrollTrigger?.getVelocity();
          if (velocity && item) gellyAnimation(item, velocity, 'skewX', 150, -20, 20, 0.8, 'power3');
        },
      });
    });
  }, []);

  const addParallaxAnimation = useCallback(
    (containerAnimation: gsap.core.Tween) => {
      const items = document.querySelectorAll('.ns-horizontal-section__item__fig') as NodeListOf<HTMLDivElement>;

      items.forEach((trigger) => {
        const el = trigger.querySelector('img');
        if (el && scroller) {
          parallaxAnimation(el, trigger, scroller, 'right left', 'left right', 'x', -30, 30, containerAnimation);
        }
      });
    },
    [scroller]
  );
  return (
    <div>
      <ScrollContainer>
        <div
          id='home'
          className={firstpage}
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: 'relative',
            backgroundColor: '#171717',
            // padding:'50px'
            // width:'80%',
            // textAlign:'center'
          }}
        >
          <div className="titleMain">
            {RoateClassName.map((link, index) => (
              <div className={`Hero_titleContainer ${link.divname}`} key={index}>
                <div
                  className={link.name}
                  ref={setTitleRef(link.key)}
                  style={{ position: 'absolute' }}
                >
                  {/* <ScrollRotate method={"perc"} from={rotatefrom[link.key]} to={rotateto[link.key]} loops={3}>
                    {studioName}
                  </ScrollRotate> */}
                  </div>
              </div>
            ))}
            <div ref={divRef} className="Hero_title_center Hero_titlecenter" >
              <div className="titleCSub">{studioName}</div>
            </div>
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




      <section
        id='floor0'
        className={screenMode}
        style={{
          // height: "100vh",
          // width: "100vw",
          // backgroundColor: '#a3d9d6',
          position: 'relative'
        }}
      >


        <p>
        aube Studio 건축물은 1974년 공장으로 시작되어졌습니다.
          이 흥미로운 건축물은 각각 다른 양식으로 1986년에 2층, 
          2013년 3층이 증축되어 방문자를 시간의 회랑으로 초대합니다.
          산업화를 상징하는 붉은벽돌위에 근대건축의 거장 르꼬르뷔제를 오마주하는 
          창문과 문들은 기능주의적이면서 유기적인 조형적 아름다움을 선사하며, 
          710㎡의 대지위에 3층으로 지어진 두개의 건물과 마당은 
          거의 모든 것을 하기에 특별한 공간으로 제공 됩니다.<br /><br /><br />

          Aube Studio began as a factory in 1974.
          This interesting building, each in a different style,
          was expanded with a second floor in 1986 and a third floor in 2013,
          inviting visitors to explore the corridors of time.
          Windows and doors that pay homage to the master of modern architecture, 
          Le Corbusier, on red bricks symbolizing industrialization 
          present a functionalistic yet organic formative beauty,
          and the two three-story buildings and yard built on a 710㎡ site 
          provide almost everything. Therefore, it is provided as a special space.

        </p>

      </section>

      <section
        id='1floor'
        className={screenMode}
        style={{
          // height: "100vh",
          // width: "100vw",
          backgroundColor: '#e8e8e8',
          position: 'relative'
        }}
      >

        <EmblaCarousel floor={1} loop={6} />


      </section>


      {/* <HorizontalSection addAnimation={addGellyAnimation}>
        <div className="ns-horizontal-section__item">
          <div className="ns-horizontal-section__item__inner">
            <img src='./1floor/height/1.jpg' style={{width:'100%'}}/>

          </div>
        </div>
        <div className="ns-horizontal-section__item">
          <div className="ns-horizontal-section__item__inner">
          <img src='./1floor/height/2.jpg' style={{width:'100%'}}/>
          </div>
        </div>
        <div className="ns-horizontal-section__item">
          <div className="ns-horizontal-section__item__inner">
          <img src='./1floor/height/3.jpg' style={{width:'100%'}}/>
          </div>
        </div>
        <div className="ns-horizontal-section__item">
          <div className="ns-horizontal-section__item__inner">
          <img src='./1floor/height/4.jpg' style={{width:'100%'}}/>
          </div>
        </div>

      </HorizontalSection> */}



      <section
        id='2floor'
        className={screenMode}
        style={{
        }}
      >
        <EmblaCarousel floor={2} loop={6} />
      </section>

      <section
        id='3floor'
        className={screenMode}
        style={{
          backgroundColor: '#e8e8e8',
          position: 'relative'
        }}
      >
        <EmblaCarousel floor={3} loop={6} />
      </section>

      <section
        id='3floor'
        className={screenMode}
        style={{
          backgroundColor: '#e8e8e8',
          position: 'relative'
        }}
      >
        <div style={{fontSize:'15em'}}> AUBE </div>
        
      </section>
      <section
        id='Other'
        className={screenMode}
        style={{
          position: 'relative'
        }}
      >
      <EmblaCarousel floor={4} loop={3} />
      </section>

      <section
        id='Stairs'
        className={screenMode}
        style={{
          position: 'relative'
        }}
      >
        <EmblaCarousel floor={5} loop={5} />
      </section>

      <section
        id='Outside'
        className={screenMode}
        style={{
          backgroundColor: '#e8e8e8',
          position: 'relative'
        }}
      >
        <EmblaCarousel floor={6} loop={3} />
      </section>
      <section
        id="Contact"
        className={screenMode}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="title">contact</h1>
      </section>



      {/* </ScrollContainer> */}

    </div>

  );
}


export default App;