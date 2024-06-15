import React, { useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoHeight from 'embla-carousel-auto-height'
import './style.css'
// import {
//   NextButton,
//   PrevButton,
//   usePrevNextButtons
// } from './EmblaCarouselArrowButtons'
// import { DotButton, useDotButton } from './EmblaCarouselDotButton'

type PropType = {
floor:number
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { floor } = props
  const emblaOptions = { loop: true } // 추가: 무한 루프 옵션 설정
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [AutoHeight()])
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi)

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick
  // } = usePrevNextButtons(emblaApi)
  let imageLinks
  if (windowSize.width < windowSize.height) {
    imageLinks = [
      { path: `./${floor}floor/height/1.jpg` , },
      { path: `./${floor}floor/height/2.jpg` , },
      { path: `./${floor}floor/height/3.jpg` , },
      { path: `./${floor}floor/height/4.jpg` , },
      { path: `./${floor}floor/height/5.jpg` , },
      { path: `./${floor}floor/height/6.jpg` , },
  
    ];
  } else {
    imageLinks = [
      { path: `./${floor}floor/width/1.jpg`, },
      { path: `./${floor}floor/width/2.jpg`, },
      { path: `./${floor}floor/width/3.jpg`, },
      { path: `./${floor}floor/width/4.jpg`, },
      { path: `./${floor}floor/width/5.jpg`, },
      { path: `./${floor}floor/width/6.jpg`, },
  
    ];
  }
  const renderFloorInfo = () => {
    switch (floor) {
      case 0:
        return <p>aube Studio는<br />
            성수동에 위치한 대지면적 215평에<br />
            3층규모의 건축물로써 실사용 면적 약 400평(마당포함)을<br />
            단독으로 사용 가능한 공간 이에요.</p>
      case 1:
        return <p><h1>{floor}floor</h1> 층고4.5M에 1층은 최초 1974년 공장을 목적으로 단층으로 건물이 건축되었습니다.</p>;
      case 2:
        return    <p> <h1>{floor}floor</h1> 층고3.2M에 2층 공간은 1986년 추가로 증축된 공간 입니다.</p>;
      case 3:
        return    <p> <h1>{floor}floor</h1>최대3.9M에 3층 공간은 2013년에 2층에 이어 추가로 증축된 공간입니다.</p>;
    }
  };

  return (
    <>
      
    <div className="embla">
    {floor !== 10 ? (
      <div>
        
        {renderFloorInfo()}
        </div>
      ) : null}
      <div className="embla__viewport" ref={emblaRef} >
        <div className="embla__container">
          {imageLinks.map((link,index) => (
           <div className="embla__slide" key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
               {/* <div className="embla__slide__number"> */}
                <img src={link.path} 
                style={{ 
                  // height: '100vh', 
                  maxWidth: '100%', 
                  objectFit: 'contain', 
                  cursor: 'pointer' }}
                />
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  )
}

export default EmblaCarousel
