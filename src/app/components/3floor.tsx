import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import {
    ScrollContainer,
    SequenceSection,
    HorizontalSection,
    gellyAnimation,
    parallaxAnimation,
    useGlobalState
} from "react-nice-scroll";

const App: React.FC = () => {
    const [scroller] = useGlobalState("container");
    const addParallaxAnimation = useCallback(
        (containerAnimation: gsap.core.Tween) => {
          const items = document.querySelectorAll(
            ".ns-horizontal-section__item__fig"
          ) as NodeListOf<HTMLDivElement>;
    
          items.forEach((trigger) => {
            const el = trigger.querySelector("img");
            if (el && scroller) {
              parallaxAnimation(
                el,
                trigger,
                scroller,
                "right left",
                "left right",
                "x",
                -30,
                30,
                containerAnimation
              );
            }
          });
        },
        [scroller]
      );
    return(
    <HorizontalSection toRight={false} addAnimation={addParallaxAnimation}>
        <div className="ns-horizontal-section__item">
            <figure
                style={{
                    height: "100hv",
                    width: "100wv",
                    minWidth: "400px",
                    overflow: "hidden",
                    margin: "0"
                }}
                className="ns-horizontal-section__item__fig"
            >
                <img
                    style={{
                        transform: "scale(1.2)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    src="./3floor/1.jpg"

                />
            </figure>
        </div>
        <div className="ns-horizontal-section__item">
            <figure
                style={{
                    height: "100hv",
                    width: "100wv",
                    minWidth: "400px",
                    overflow: "hidden",
                    margin: "0"
                }}
                className="ns-horizontal-section__item__fig"
            >
                <img
                    style={{
                        transform: "scale(1.2)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    src="./3floor/2.jpg"

                />
            </figure>
        </div>
        <div className="ns-horizontal-section__item">
            <figure
                style={{
                    height: "100hv",
                    width: "100wv",
                    minWidth: "400px",
                    overflow: "hidden",
                    margin: "0"
                }}
                className="ns-horizontal-section__item__fig"
            >
                <img
                    style={{
                        transform: "scale(1.2)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    src="./3floor/3.jpg"

                />
            </figure>
        </div>
        <div className="ns-horizontal-section__item">
            <figure
                style={{
                    height: "100hv",
                    width: "100wv",
                    minWidth: "400px",
                    overflow: "hidden",
                    margin: "0"
                }}
                className="ns-horizontal-section__item__fig"
            >
                <img
                    style={{
                        transform: "scale(1.2)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    src="./3floor/4.jpg"
                />
            </figure>
        </div>
        <div className="ns-horizontal-section__item">
            <figure
                style={{
                    height: "100hv",
                    width: "100wv",
                    minWidth: "400px",
                    overflow: "hidden",
                    margin: "0"
                }}
                className="ns-horizontal-section__item__fig"
            >
                <img
                    style={{
                        transform: "scale(1.2)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    src="./3floor/5.jpg"
                />
            </figure>
        </div>
        <div className="ns-horizontal-section__item">
            <figure
                style={{
                    height: "100hv",
                    width: "100wv",
                    minWidth: "400px",
                    overflow: "hidden",
                    margin: "0"
                }}
                className="ns-horizontal-section__item__fig"
            >
                <img
                    style={{
                        transform: "scale(1.2)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    src="./3floor/6.jpg"

                />
            </figure>
        </div>
    </HorizontalSection>
)
};

export default App;
