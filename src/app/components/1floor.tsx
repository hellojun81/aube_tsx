import React, { useRef, useEffect, useState, RefCallback, useCallback } from "react";
import {
    HorizontalSection,
    parallaxAnimation,
    useGlobalState
} from "react-nice-scroll";

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setCurrentImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImage(null);
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
                        -30,
                        30,
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
        <HorizontalSection toRight={false} addAnimation={addParallaxAnimation}>
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
            {isModalOpen && currentImage && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={currentImage} alt="Zoomed" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                </div>
            )}
        </HorizontalSection>
    )
};

export default App;
