"use client";
// npm run dev or npm run start

import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import styles from "./page.module.css";
import {
  ScrollContainer,
  SequenceSection,
  gellyAnimation,
} from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";
import SlicksSlide from "./slickslide"
import { ScrollRotate } from 'react-scroll-rotate';
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Floor1 from "../components/1floor";
import Floor3 from "../components/3floor";

const studioName = 'Aube';


const App: React.FC = () => {
  // const [scroller] = useGlobalState("container");
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const rotateto = [-360, 360, -500, 500];
  const rotatefrom = [-45, 45, 45, -45];
  const addGellyAnimation = useCallback(
    (containerAnimation: gsap.core.Tween) => {
      const items = document.querySelectorAll(
        ".ns-horizontal-section__item__inner"
      ) as NodeListOf<HTMLDivElement>;

      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          containerAnimation,
          start: "left right",
          end: "right left",
          scrub: 0.5,
          immediateRender: false,
          onUpdate: () => {
            const velocity = containerAnimation.scrollTrigger?.getVelocity();
            if (velocity && item)
              gellyAnimation(
                item,
                velocity,
                "skewX",
                150,
                -20,
                20,
                0.8,
                "power3"
              );
          }
        });
      });
    },
    []
  );

  // const addParallaxAnimation = useCallback(
  //   (containerAnimation: gsap.core.Tween) => {
  //     const items = document.querySelectorAll(
  //       ".ns-horizontal-section__item__fig"
  //     ) as NodeListOf<HTMLDivElement>;

  //     items.forEach((trigger) => {
  //       const el = trigger.querySelector("img");
  //       if (el && scroller) {
  //         parallaxAnimation(
  //           el,
  //           trigger,
  //           scroller,
  //           "right left",
  //           "left right",
  //           "x",
  //           -30,
  //           30,
  //           containerAnimation
  //         );
  //       }
  //     });
  //   },
  //   [scroller]
  // );

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
          // ref.style.left = `${(parentWidth - textWidth) / 2}px`;
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

  return (
    <div>
      {/* <div className="c-intro"></div> */}

      <ScrollContainer>
        <section
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: 'relative'
          }}
        >
          <div className="titleMain">
            <div className="Hero_titleContainer Hero_title1" >
              <div
                className="title1Sub"
                ref={setTitleRef(0)}
                style={{ position: 'absolute' }}
              > <ScrollRotate method={"perc"} from={rotatefrom[0]} to={rotateto[0]} loops={3}>{studioName}</ScrollRotate></div>
            </div>
            <div className="Hero_titleContainer Hero_title2">
              <div
                className="title2Sub"
                ref={setTitleRef(1)}
                style={{ position: 'absolute' }}
              ><ScrollRotate method={"perc"} from={rotatefrom[1]} to={rotateto[1]} loops={3}>{studioName}</ScrollRotate></div>
            </div>
            <div ref={divRef} className="Hero_title_center Hero_titlecenter" >
              <div className="titleCSub">{studioName}</div>
            </div>
            <div className="Hero_titleContainer Hero_title3">
              <div
                className="title3Sub"
                ref={setTitleRef(2)}
                style={{ position: 'absolute' }}
              ><ScrollRotate method={"perc"} from={rotatefrom[2]} to={rotateto[2]} loops={3}>{studioName}</ScrollRotate></div>
            </div>
            <div className="Hero_titleContainer Hero_title4">
              <div
                className="title4Sub"
                ref={setTitleRef(3)}
                style={{ position: 'absolute' }}
              >
                <ScrollRotate method="perc" from={rotatefrom[3]} to={rotateto[3]} loops={3}>
                  {studioName}
                </ScrollRotate>
              </div>
            </div>
            <SequenceSection
              end="100%"
              imagesPath="/images"
              imagesCount={24}
              imagesType="png"
            >
            </SequenceSection>
          </div>
        </section>
        <section className="floor1"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <h1 className="title">1floor</h1> */}
        </section>
    
          <Floor1 />





        <section className="floor2"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <HorizontalSection addAnimation={addGellyAnimation}>
          <div className="ns-horizontal-section__item">
            <div className="ns-horizontal-section__item__inner">
            <h1 className="title">we stay in sungsu 6, Achasan-ro 11ga-gil, Seongdong-gu, Seoul, Republic of Korea</h1>
            </div>
          </div>
          </HorizontalSection> */}
        </section>
        <SlicksSlide />
        {/* <Slideshow /> */}

        <section className="floor3"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="title">3floor</h1>
        </section>

        <section className="outside"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="title">outside</h1>
        </section>

        {/* /////////////////////////////////// */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1>Hello World!</h1>
        </section>
        <section
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1>Hello World!!</h1>
        </section>
        <Floor3 />
        <section
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1>Hello World!!!</h1>
        </section>

      </ScrollContainer>
    </div>

  );
}


export default App;