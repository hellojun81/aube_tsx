
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './newCarouse.css';
import {
    SelectedSnapDisplay,
    useSelectedSnapDisplay
} from './EmblaCarouselSelectedSnapDisplay'

import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'

type PropType = {
    fileCount: number,
    floor: number,
    loop: number,
    screenMode: string,
    classname: string,
    id: string
};
interface ImageLink {
    path: string;
}

const Home: React.FC<PropType> = (props) => {
    const [floor, setfloor] = useState(props.floor);
    const [loop, setloop] = useState(props.loop);
    const [screenMode, setfscreenMode] = useState(props.screenMode);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const emblaOptions = { loop: true };
    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
    const [cursorClass, setCursorClass] = useState<string>('');
    const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)
    const [imageLinks, setImageLinks] = useState<ImageLink[]>([
        { path: `'/${floor}floor/${screenMode}/1.jpg'` }
    ]);
    const scrollToPrevious = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);
    const countFiles = ''
    // const [FileList, setFileList] = useState(0);
    const [FileList, setFileList] = useState<string[]>([
        'public/images/photo1.jpg',
        'public/images/photo2.jpg',
        'public/images/photo3.jpg',
      ]);
    const [error, setError] = useState('');
    const link = `public/${floor}floor/${screenMode}`;
    useEffect(() => {
        fetch('/fileList.json')
            .then(response => response.json())
            .then(data => setFileList(data[link]))
            .catch(error => console.error('Error loading the file list:', error));
    }, []);

    // console.log('FileList', FileList[0])

    const scrollToNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)
    const handleMouseClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const containerWidth = event.currentTarget.offsetWidth;
        const mouseX = event.clientX - event.currentTarget.getBoundingClientRect().left;

        if (mouseX < containerWidth / 2) {
            scrollToPrevious();
        } else {
            scrollToNext();
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const container = event.currentTarget;
        const containerWidth = container.offsetWidth;
        const mouseX = event.clientX - container.getBoundingClientRect().left;

        if (mouseX < containerWidth / 2) {
            setCursorClass('left-cursor');
        } else {
            setCursorClass('right-cursor');
        }
    };
    let newLinks: ImageLink[] = [];


    // for (let i = 1; i <= loop; i++) {
    //     newLinks.push({ path: `./${floor}floor/${screenMode}/${i}.jpg` });
    // }
    const replaceWord = (text: string, search: string, replacement: string): string => {
        return text.replace(search, replacement);
      };
    console.log({newLink:newLinks,fileList:FileList})
    const renderFloorInfo = () => {
        switch (floor) {
            case 10:
                return;
            case 1:
                return (
                    <div>
                        <h1>{floor}Floor</h1>
                        차량 진입이 가능한 4.5미터의 층고를 자랑하는 1층은 370㎡의 넓은 공간에 자연광 쇼윈도와 3.5미터에 달하는 대형 거울이 배치되어 있습니다. 빌라 사보아의 문을 오마주한 대형 사이즈에 정문은 공간감을 극대화하면서도 유니크하게 설계되었습니다. 이 독창적인 디자인은 과거와 현재 실용성을 동시에 담아내고 있습니다.
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h1>{floor}Floor</h1>
                        2층은 다크 그레이 톤의 바닥과 인더스트리얼한 느낌을 주는 노출 천장으로 구성되어 있습니다. 이 공간의 가장 큰 특징은 빌라 라호슈의 창문과 고급 향수병에서 영감을 받아 제작된 대형 창문입니다. 이러한 창문은 단순한 채광 이상의 역할을 하며, 공간에 입체감을 더해주고, 세련된 분위기를 연출합니다. 창문을 통해 들어오는 빛은 마치 예술 작품처럼 공간에 머물며, 하루 종일 변화하는 자연광을 통해 다양한 감성을 느낄 수 있습니다. 이러한 디자인 요소는 2층을 단순한 공간이 아닌, 감각적이고 독창적인 경험을 선사하는 장소로 만들어 줍니다.
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h1>{floor}Floor</h1>
                        3층은 12미터 길이의 천창을 통해 풍부한 자연광이 들어오며, 높고 긴 가로 형태에 창이 배치되어 있어 넉넉하면서도 절제된 공간을 연출합니다. 특히, 층고가 최대 3.9미터에 달해 더욱 웅장한 느낌을 줍니다. 기본 골조가 철골로 만들어져 철골 골조 만에 현대적이고 산업적인 느낌을 동시에 갖추고 있습니다.
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h1>Other Space</h1>
                        폴딩도어로 전면 개방이 가능한 이 별채는 도로와 접해 있어 접근성이 뛰어납니다. 스페인산 빈티지 타일과 노출 천장이 어우러져 차분하면서도 고풍스러운 분위기를 자아내며, 외부 행인들의 호기심을 자극합니다.
                    </div>
                );
            case 5:
                return (
                    <div>
                        <h1>Stairs</h1>
                        계단과 복도는 1950~70년대 영국과 동유럽에서 제작된 빈티지 조명으로 장식되어 있습니다. 이 조명들은 공간에 빈티지 하면서도 절제된 감성을 연출합니다. 빈티지 조명의 독특한 디자인은 고유의 역사와 매력을 담고 있어, 이동 공간을 과거와 현재가 조화를 이루어 더욱 감각적인 공간으로 연출됩니다.
                    </div>
                );
            case 6:
                return (
                    <div>
                        <h1>OutSide</h1>
                        시간에 흐름이 온전히 느껴지는 회전계단이 있는 마당은 최대 10대의 차량을 수용할 수 있는 넓은 공간을 자랑합니다. 이 마당에는 12개의 세련된 외부 조명과 6개의 3미터 길이의 깃발을 설치할 수 있는 여건이 마련되어 있어, 다양한 행사를 품격 있게 연출할 수 있습니다.
                    </div>
                );
            default:
                return null;
        }
    };

// newLinks=FileList

    return (
        <>


            {/* <img src='./1floor/height/1.jpg'/> */}

            <div className={`${props.classname}`} id={props.id}>
                <div>

                    {renderFloorInfo()}
                </div>
                {screenMode == 'height' ? (
                    <div className="button_container">
                        <div className="button_left"> <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} /></div>
                        <div className="button_center"><SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} /></div>
                        <div className="button_right"> <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} /></div>
                    </div>
                ) :
                    <div className="button_center"><SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} /></div>
                }



                <div className="embla" ref={emblaRef} onClick={handleMouseClick}>
                    <div className="embla__container">
                        {FileList.map((link, index) => (
                            <div className="embla__slide" key={index}>
                                <img
                                    src={replaceWord(link, 'public', '.')}
                                    className={`image-container ${cursorClass}`}
                                    onMouseMove={handleMouseMove}
                                    style={{
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                        // cursor: 'pointer'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
