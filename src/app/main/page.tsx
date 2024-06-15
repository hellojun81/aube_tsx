"use client";
// npm run dev or npm run start

import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import "./main.css";
import {
  ScrollContainer,
  SequenceSection,
  gellyAnimation,
  ParallaxImage
} from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";
import SlicksSlide from "./slickslide"
import { ScrollRotate } from 'react-scroll-rotate';
import Script from 'next/script';
// import ScrollTrigger from "gsap/dist/ScrollTrigger";
// import Floor1 from "../components/1floor";
// import Floor3 from "../components/3floor";
// import Test from "../test/test"
import EmblaCarousel from '../carousel/CarouselWrapper'



const studioName = 'Aube';
const RoateClassName = [
  { name: "title1Sub", divname: 'Hero_title1', key: 0 },
  { name: "title2Sub", divname: 'Hero_title2', key: 1 },
  { name: "title3Sub", divname: 'Hero_title3', key: 2 },
  { name: "title4Sub", divname: 'Hero_title4', key: 3 },
];

const App: React.FC = () => {
  // const [scroller] = useGlobalState("container");
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const rotateto = [-360, 360, -500, 500];
  const rotatefrom = [-45, 45, 45, -45];
  let floorValue = 1;


  // const [floor, setfloor] = useState('');

  useEffect(() => {
    const div = divRef.current;
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
          // console.log('checkindex', checkindex);

          ref.style.position = 'absolute';
          ref.style.top = `${(parentHeight - textHeight) / 2}px`;
          if (checkindex == 1) {
            ref.style.left = `10px`;
          } else {
            ref.style.right = `10px`;
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

  return (
    <div>
      <ScrollContainer>
        <div
          style={{
            height: "120vh",
            alignItems: "center",
            justifyContent: "center",
            position: 'relative'
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
                  <ScrollRotate method={"perc"} from={rotatefrom[link.key]} to={rotateto[link.key]} loops={3}>
                    {studioName}
                  </ScrollRotate></div>
              </div>
            ))}
            <div ref={divRef} className="Hero_title_center Hero_titlecenter" >
              <div className="titleCSub">{studioName}</div>
            </div>
          </div>

          <SequenceSection
            end="80%"
            imagesPath="/images"
            imagesCount={30}
            imagesType="jpg"
          >
          </SequenceSection>
        </div>
        <section
          style={{
            // height: "100vh",
            // width: "100vw",
            backgroundColor: '#a3d9d6',
            position: 'relative'
          }}
        >
          <EmblaCarousel floor={0} />
        </section>
  
        <section
          style={{
            // height: "100vh",
            // width: "100vw",
            backgroundColor: '#d3d3d3',
            position: 'relative'
          }}
        >

          <EmblaCarousel floor={1} />


        </section>

        <section
          style={{
            backgroundColor: '#a3d9d6',

          }}
        >
          <EmblaCarousel floor={2} />
        </section>

        <section
          style={{
            // height: "100vh",
            // width: "100vw",
            backgroundColor: '#d3d3d3',
            position: 'relative'
          }}
        >
          <EmblaCarousel floor={3} />
        </section>

        <section
          id="contact"
          className="outside"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="title">contact</h1>
        </section>



      </ScrollContainer>

    </div>

  );
}


export default App;