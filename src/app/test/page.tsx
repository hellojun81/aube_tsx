'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./style.css";
import EmblaCarousel from '../carousel/CarouselWrapper'
import { EmblaOptionsType } from 'embla-carousel'
gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  // const component = useRef();
  // const slider = useRef();

  // const OPTIONS: EmblaOptionsType = {}
  // const SLIDE_COUNT = 5
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <>
    <div>
  
     <EmblaCarousel floor={2} />
     </div>
    </>
  );
}
