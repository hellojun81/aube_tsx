'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const component = useRef();
  const slider = useRef();


alert('s')

  return (
    <>
      <div className="solid-view">
        <div className='down'>
          <h1>Scroll Down</h1>
          <h1 className='arrow'>-</h1>
        </div>
      </div>
      <div className="parallax-view">
        <h1>Easy Parallax Scrolling</h1>
      </div>
      <div className="solid-view">
        <h1>Enjoy!</h1>
      </div>
    </>
  );
}
