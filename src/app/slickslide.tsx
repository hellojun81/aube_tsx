import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import './App.css'; // 스타일 파일

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
    // setCurrentImage(imageSrc);
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <section className="floor1"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <Slider {...settings}>
          <div onClick={() => handleImageClick('/j2w/01.jpg')}>
            <img src="/j2w/01.jpg" alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
          </div>
          <div onClick={() => handleImageClick('/j2w/02.jpg')}>
            <img src="/j2w/02.jpg" alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
          </div>
          <div onClick={() => handleImageClick('/j2w/03.jpg')}>
            <img src="/j2w/03.jpg" alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
          </div>
          <div onClick={() => handleImageClick('/j2w/04.jpg')}>
            <img src="/j2w/04.jpg" alt="Slide 4" style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
          </div>
        </Slider>
      </div>

      {isModalOpen && currentImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={currentImage} alt="Zoomed" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </section>
  );
};

export default App;
