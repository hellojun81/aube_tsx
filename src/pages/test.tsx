// pages/index.tsx
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import fs from 'fs';
import path from 'path';
import AutoHeight from 'embla-carousel-auto-height';
import './style.css';

type Props = {
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

const Home: React.FC<Props> = ({ fileCount }) => {
  const floor = '1';
  const screenMode = 'height';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const emblaOptions = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [AutoHeight()]);
  const [cursorClass, setCursorClass] = useState<string>('');
  
  const [imageLinks, setImageLinks] = useState<ImageLink[]>([
    { path: '/1floor/height/1.jpg' }
  ]);
  const scrollToPrevious = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollToNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div>
      <h1>File Count in Directory: {fileCount}</h1>
      <div className="embla" ref={emblaRef} onClick={handleMouseClick}>
        <div className="embla__container">
          <div className="embla__slide">
            <img
              src="/1floor/height/1.jpg"
              className={`image-container ${cursorClass}`}
              alt="Image 1"
              onMouseMove={handleMouseMove}
            />
          </div>
          <div className="embla__slide">
            <img
              src="/1floor/height/2.jpg"
              className={`image-container ${cursorClass}`}
              alt="Image 2"
              onMouseMove={handleMouseMove}
            />
          </div>
          <div className="embla__slide">
            <img
              src="/1floor/height/3.jpg"
              className={`image-container ${cursorClass}`}
              alt="Image 3"
              onMouseMove={handleMouseMove}
            />
          </div>
          {/* Add more slides as needed */}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const directoryPath = path.join(process.cwd(), 'public', '1floor', 'height'); // 폴더 경로 설정
  let fileCount = 0;

  try {
    const files = fs.readdirSync(directoryPath);
    fileCount = files.length;
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  return {
    props: {
      fileCount,
    },
  };
};

export default Home;
