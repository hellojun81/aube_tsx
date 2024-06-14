import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current.offsetWidth,
          markers: true
        }
      });
    }, component);
    return () => ctx.revert();
  });

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
