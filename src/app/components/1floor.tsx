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
    const imageLinks = [
        { path: "./1floor/1.jpg", },
        { path: "./1floor/2.jpg", },
        { path: "./1floor/3.jpg", },
        { path: "./1floor/4.jpg", },
        { path: "./1floor/5.jpg", },
        { path: "./1floor/6.jpg", },
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
        // 컴포넌트가 마운트될 때 스크롤 숨기기
        document.body.style.overflow = 'hidden';


    }, []);

    return (
        <>
            <div>
                <section className=""
                    style={{
                        height: "500vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* <section>
                    <div className="floor_title">1floor width:8.5M Height:4.5M </div>
                    </section> */}

                    <HorizontalSection
                        toRight={false}
                        start='top top'
                        addAnimation={addParallaxAnimation}>
                        
                        {imageLinks.map((link, index) => (
                            <div className="ns-horizontal-section__item" key={index}>
                                <figure
                                    style={{
                                        height: "100hv",
                                        width: "100wv",
                                        minWidth: "300px",
                                        overflow: "hidden",
                                        margin: "0"
                                    }}
                                    className="ns-horizontal-section__item__fig" >
                                    <div onDoubleClick={() => handleImageClick(link.path)}>
                                        <img
                                            style={{
                                                transform: "scale(1.2)",
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
