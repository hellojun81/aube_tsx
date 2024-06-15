import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Console } from 'console';

interface AppProps {
    floor: number;
}

const App: React.FC<AppProps> = ({ floor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // console.log('floor', floor)
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
      case 1:
        return <p>층고4.5M에 1층은 최초 1974년 공장을 목적으로 단층으로 건물이 건축되었습니다.</p>;
      case 2:
        return <p>층고3.2M에 2층 공간은 1986년 추가로 증축된 공간 입니다.</p>;
      case 3:
        return <p>최대3.9M에 3층 공간은 2013년에 2층에 이어 추가로 증축된 공간입니다.</p>;
    }
  };




  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    // centerMode: true,
 
  };

  const handleImageClick = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <>
    {/* {floor !== 0 ? (
      <div style={{padding:'20px'}}>
        
        <h1>{floor}floor</h1>
        {renderFloorInfo()}
        </div>
      ) : null} */}

      {/* <div className='slidecontainer' style={{ 
        height: '80vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' ,
        width:'100%'
        // align-items: flex-start
        }}> */}
        <Slider {...settings}>
          {imageLinks.map((link, index) => (
               <div
               // onDoubleClick={() => handleImageClick({link.path})} 
               key={index}
               style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
               <img src={link.path} alt={`Slide ${index + 1}`} style={{ 
                 height: '100vh', 
                 maxWidth: '100%', 
                 objectFit: 'contain', 
                 cursor: 'pointer' 
               }}
               />
             </div>
          ))}
        </Slider>

      {/* </div> */}
 </>
);
   
};

export default App;
