import React, { useRef, useEffect } from 'react';

const CustomSequenceSection = ({ imagesPath, imagesCount, imagesType, scrollContainerRef }) => {
  const canvasRef = useRef(null);

  const loadImage = (index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `${imagesPath}/${index}.${imagesType}`;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const drawImage = (ctx, image) => {
    const canvas = canvasRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imageAspectRatio = image.width / image.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imageAspectRatio > canvasAspectRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imageAspectRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imageAspectRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleScroll = async () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const scrollHeight = scrollContainerRef.current.scrollHeight;
        const clientHeight = scrollContainerRef.current.clientHeight;
        const progress = Math.min(scrollTop / (scrollHeight - clientHeight), 1);
        const imageIndex = Math.min(imagesCount - 1, Math.floor(progress * imagesCount));
        const image = await loadImage(imageIndex);
        drawImage(ctx, image);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [imagesPath, imagesCount, imagesType, scrollContainerRef]);

  return <canvas ref={canvasRef} width={800} height={600} style={{ display: 'block', margin: '0 auto' }} />;
};

export default CustomSequenceSection;
