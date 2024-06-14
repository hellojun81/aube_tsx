import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import {
    HorizontalSection,
    parallaxAnimation,
    useGlobalState
} from "react-nice-scroll";
import Modal from './modal';
import './floor.css';

const App: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    console.log('setWindowSize',windowSize)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    
    const handleImageClick = (imageSrc: string) => {
        console.log('double Click')
        setModalOpen(true);
        // setCurrentImage(imageSrc);
        // setIsModalOpen(true);
    };

    const closeModal = () => {
        // setIsModalOpen(false);
        // setCurrentImage(null);
    };
    const imageLinksHeight = [
        { path: "./1floor/height/1.jpg", },
        { path: "./1floor/height/2.jpg", },
        { path: "./1floor/height/3.jpg", },
        { path: "./1floor/height/4.jpg", },
        { path: "./1floor/height/5.jpg", },
        { path: "./1floor/height/6.jpg", },
    ];
    const imageLinksWidth = [
        { path: "./1floor/width/1.jpg", },
        { path: "./1floor/width/2.jpg", },
        { path: "./1floor/width/3.jpg", },
        { path: "./1floor/width/4.jpg", },
        { path: "./1floor/width/5.jpg", },
        { path: "./1floor/width/6.jpg", },
    ];

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
                        0,
                        0,
                        containerAnimation
                    );
                }
            });
        },
        [scroller]
    );
    useEffect(() => {
        // 창 크기 변경 이벤트 핸들러
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          });
        };
    
        // 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);
    
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
          window.removeEventListener('resize', handleResize);
        };
       
      }, []);

    return (
        <>
            <div>
                <section className=""
                    style={{
                        height: "600vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div>
                        <div className="floor_title">1floor width:8.5M Height:4.5M </div>
                    </div>

                    <HorizontalSection
                        toRight={false}
                        start='top'
                        addAnimation={addParallaxAnimation}>

                        {imageLinksHeight.map((link, index) => (
                            <div className="ns-horizontal-section__item" key={index}>
                                <figure
                                    style={{
                                        height: "100hv",
                                        width: "100wv",
                                        minWidth: "100%",
                                        // overflow: "hidden",
                                        margin: "0"
                                    }}
                                    className="ns-horizontal-section__item__fig" >
                                    <div onDoubleClick={() => handleImageClick(link.path)}>
                                        <img
                                            style={{
                                                // transform: "scale(1.2)",
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                            src={link.path}
                                        /></div>
                                </figure>
                            </div>
                        ))}
                    </HorizontalSection>
                </section>
            </div>
        </>

    )
};

export default App;
