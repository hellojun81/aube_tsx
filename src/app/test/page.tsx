'use client'
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './horizontal.css';

gsap.registerPlugin(ScrollTrigger);

const MyComponent: React.FC = () => {
  useEffect(() => {
    const sections: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".panel");

    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none"
    });

    const horizontalScroll = ScrollTrigger.create({
      animation: scrollTween,
      trigger: ".container",
      pin: true,
      scrub: 1,
      end: "+=3500"
    });

    const section: HTMLElement | null = document.querySelector(".staggerCatchContainer");
    if (section) {
      const innerContainer = section.querySelector<HTMLElement>(".inner-container");
      const staggerCatchItem = section.querySelector<HTMLElement>(".staggerCatchItem");

      if (innerContainer && staggerCatchItem) {
        const sectionAnimation = gsap.to(innerContainer, {
          x: "100vw",
          ease: "none"
        });

        const innerSection = gsap.to(staggerCatchItem, {
          x: "-100vw",
          ease: "none",
          paused: true
        });

        const scrub = gsap.to(innerSection, {
          progress: 1,
          paused: true,
          ease: "power3",
          duration: parseFloat(section.dataset.scrub || "0.1"),
          overwrite: true
        });

        ScrollTrigger.create({
          containerAnimation: scrollTween,
          markers: true,
          animation: sectionAnimation,
          scrub: true,
          trigger: section,
          start: "left right",
          end: "right left",
          onUpdate: (self) => {
            scrub.vars.progress = self.progress;
            scrub.invalidate().restart();
          }
        });
      }
    }
  }, []);

  return (
<div className="container">
  <div className="test">ttttt</div>
  <div className="description panel blue">
    <div>
      <h1>Horizontal scroll with lerping</h1>
      <div className="scroll-down">Scroll down<div className="arrow"></div>
      </div>
    </div>
  </div>

  <section className="panel red">
    <div>test</div>
    ONE
  </section>
  <section className="panel orange">
two
  </section>
  <section className="panel purple">
    THREE
  </section>
  <section className="panel green">
    FOUR
  </section>
  <section className="panel gray">
    FIVE
  </section>
  <div className="staggerCatchContainer" data-scrub="0.1">
        <div className="inner-container">
          <div className="staggerCatchItem">Item 1</div>
          <div className="staggerCatchItem">Item 2</div>
        </div>
      </div>
</div>
  );
};

export default MyComponent;
