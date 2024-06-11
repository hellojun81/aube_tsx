"use client"
import React, { useState } from 'react';
import {
    ScrollContainer,
    SequenceSection,
    HorizontalSection,
    gellyAnimation,
    parallaxAnimation,
    useGlobalState
  } from "react-nice-scroll";
import {ImageGallery} from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
// import './App.css'; // 추가 스타일을 정의할 CSS 파일

const images = [
  {
    original: './1floor/1.jpg',
    thumbnail: './1floor/2.jpg',
  },
  {
    original: './1floor/3.jpg',
    thumbnail: './1floor/4.jpg',
  },
  // 추가 이미지
];

const App = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDoubleClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return (
    <div className="App">
      <HorizontalSection >
        <div className="horizontal-section">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.original}
              alt={`Image ${index + 1}`}
              onDoubleClick={() => handleDoubleClick(index)}
              className="scroll-image"
            />
          ))}
        </div>
      </HorizontalSection>

      {isZoomed && (
        <div className="zoom-overlay" onClick={handleCloseZoom}>
          <ImageGallery
            items={images}
            startIndex={currentImageIndex}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
      )}
    </div>
  );
};

export default App;
