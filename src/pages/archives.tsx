import React, { useState, useEffect, useRef,useCallback } from 'react';
import './ArchivePage.css';  // Import the CSS for styling
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import useEmblaCarousel from 'embla-carousel-react';  // Correct hook import
// import '../app/carousel/newCarouse';
// import 'embla-carousel/embla-carousel.css';  // Import the Embla carousel styles

// Sample data for archive items
const archiveItems = [
  {
    id: 1,
    title: "Magazine",
    client: "dazedkorea",
    imageUrl: "/archives/20240919/main.jpg",
    folderPath: "/archives/20240919",  // Folder path containing images
  },
  {
    id: 2,
    title: "Magazine",
    client: "shinsegae",
    imageUrl: "/archives/20240918/main.jpg",
    folderPath: "/archives/20240918",
  },
  {
    id: 3,
    title: "Magazine",
    client: "singleskorea",
    imageUrl: "/archives/20240902/main.jpg",
    folderPath: "/archives/20240902",
  },
  {
    id: 4,
    title: "LookBook",
    client: "oio",
    imageUrl: "/archives/20240801/main.jpg",
    folderPath: "/archives/20240801",
  },
];

type EmblaCarouselProps = {
  slides: string[]; // 'slides'가 문자열 배열이라고 가정
};


// Embla Carousel component
const EmblaCarouselComponent: React.FC<EmblaCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);
  
    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);
  
    return (
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((src, index) => (
              <div className="embla__slide" key={index}>
                <img src={src} className="embla__slide__img" alt={`slide ${index}`} />
              </div>
            ))}
          </div>
        </div>
        {/* 좌우 화살표 추가 */}
        <button className="embla__button embla__button--prev" onClick={scrollPrev}>
          ◀
        </button>
        <button className="embla__button embla__button--next" onClick={scrollNext}>
          ▶
        </button>
      </div>
    );
  };
  

const ArchivePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  
  // Open modal and load images from the clicked folder
  const openDialog = async (folderPath:string) => {
    const images = await fetchImagesFromFolder(folderPath);
    setModalImages(images);
    setIsDialogOpen(true);
  };

  // Simulate fetching images from the folder (replace with real API call)
  const fetchImagesFromFolder = async (folderPath:string) => {
    return [
      `${folderPath}/1.jpg`,
      `${folderPath}/2.jpg`,
      `${folderPath}/3.jpg`,
    ];
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setModalImages([]);
  };

  return (
    
    <div className="archive-container">
      {archiveItems.map((item) => (
        <div key={item.id} className="archive-item" onClick={() => openDialog(item.folderPath)}>
          <img src={item.imageUrl} alt={item.title} className="archive-image" />
          <div className="archive-title"><span>{item.title}</span></div>
          <div className="archive-client">{item.client}</div>
        </div>
      ))}

      {/* Modal for image slideshow */}
      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogContent>
          <EmblaCarouselComponent slides={modalImages} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArchivePage;
