import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ArchivePage.css';  // Import the CSS for styling
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import useEmblaCarousel from 'embla-carousel-react';  // Correct hook import


const archiveItems = [
  {
    id: 1,
    title: "Magazine",
    client: "DAZED",
    imageUrl: "/archives/20240919/main.jpg",
    folderPath: "/archives/20240919",  // Folder path containing images
    imageCount: 5,
    movie: 'https://www.youtube.com/embed/vWoKW-vsS_g?si=BqYhrloCfw3LALqk?autoplay=1',
  },
  {
    id: 2,
    title: "Magazine",
    client: "GQ",
    imageUrl: "/archives/20240920/main.jpg",
    folderPath: "/archives/20240920",  // Folder path containing images
    imageCount: 5,
  },
  {
    id: 3,
    title: "Magazine",
    client: "SINGLES",
    imageUrl: "/archives/20240902/main.jpg",
    folderPath: "/archives/20240902",
    imageCount: 9
  },
  {
    id: 4,
    title: "Magazine",
    client: "SHINSEGAE",
    imageUrl: "/archives/20240918/main.jpg",
    folderPath: "/archives/20240918",
    imageCount: 5
  },
  {
    id: 5,
    title: "LookBook",
    client: "oio",
    imageUrl: "/archives/20240801/main.jpg",
    folderPath: "/archives/20240801",
    imageCount: 7
  },
  {
    id: 6,
    title: "LookBook",
    client: "NewBalance",
    imageUrl: "/archives/20240910/main.jpg",
    folderPath: "/archives/20240910",
    imageCount: 6
  },
];

// type EmblaCarouselProps = {
//   slides: string[]; // 'slides'가 문자열 배열이라고 가정
//   slideKey: string | number;
// };
interface EmblaCarouselComponentProps {
  slides: string[];
  index: number;
}

// Embla Carousel component
const EmblaCarouselComponent: React.FC<EmblaCarouselComponentProps> = ({ slides, index }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const newArchiveItems = archiveItems[index - 1];

  return (
    <>
      <button className="embla__button embla__button--prev" onClick={scrollPrev}>
        ◀
      </button>
      <button className="embla__button embla__button--next" onClick={scrollNext}>
        ▶
      </button>

      <div className="embla">
        {/* 좌우 화살표 추가 */}
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {newArchiveItems.movie ? (
              // movie가 있을 경우, 첫 번째 슬라이드로 YouTube 비디오 표시
              <>
                <div className="embla__slide" key={`youtube-${index}`}>
                  <iframe
                    src={`${newArchiveItems.movie}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                    
                  ></iframe>
                </div>
                {/* 다음 슬라이드부터 이미지 슬라이드 렌더링 */}
                {slides.map((src, idx) => (
                  <div className="embla__slide" key={idx}>
                    <img src={src} className="embla__slide__img" alt={`slide ${idx}`} />
                  </div>
                ))}
              </>
            ) : (
              // movie가 없을 경우 이미지 슬라이드만 렌더링
              slides.map((src, idx) => (
                <div className="embla__slide" key={idx}>
                  <img src={src} className="embla__slide__img" alt={`slide ${idx}`} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};



const ArchivePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [selectedItemId, setSelectedItemId] = React.useState<number | 0>(0);


  // Open modal and load images from the clicked folder
  const openDialog = async (folderPath: string, imageCount: number, itemId: number) => {
    const images = await fetchImagesFromFolder(folderPath, imageCount);
    // console.log({folderPath:folderPath,imageCount:imageCount})
    setSelectedItemId(itemId);
    setModalImages(images);
    setIsDialogOpen(true);
  };

  // Simulate fetching images from the folder (replace with real API call)
  const fetchImagesFromFolder = async (folderPath: string, imageCount: number) => {
    const images: string[] = [];

    for (let i = 1; i <= imageCount; i++) {
      images.push(`${folderPath}/${i}.jpg`);
    }

    return images;
  };


  const closeDialog = () => {
    setIsDialogOpen(false);
    setModalImages([]);
  };

  return (

    <div className="archive-container">
      {archiveItems.map((item) => (
        <>
        <div key={item.id} className="archive-item" onClick={() => openDialog(item.folderPath, item.imageCount, item.id)}>
          <img src={item.imageUrl} alt={item.title} className="archive-image" />
          <div className="archive-title">{item.title}</div>
          <div className="archive-client">{item.client}</div>
        </div>
       
          </>
      ))}

      {/* Modal for image slideshow */}
      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">Close</Button>
        </DialogActions>
        <DialogContent>
          <EmblaCarouselComponent slides={modalImages} index={selectedItemId} />
        </DialogContent>

      </Dialog>
    </div>
  );
};

export default ArchivePage;
