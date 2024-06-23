'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function Home() {
  const router = useRouter();
  const [imagesPath, setimagesPath] = useState('/images/jpg_bk')  //메인aubebuild이미지


  useEffect(() => {
    const windowHeight = window.innerHeight;        // 윈도우의 높이와 너비를 가져옵니다.
    const windowWidth = window.innerWidth;          // div 요소의 높이와 너비를 가져옵니다.
    if (windowHeight < windowWidth) {
      setimagesPath('/images/jpg_width')
    }
    const images = [
      imagesPath+'/1.jpg',
      imagesPath+'/2.jpg',
      imagesPath+'/3.jpg',
      imagesPath+'/4.jpg',
      imagesPath+'/5.jpg',
      imagesPath+'/6.jpg',
      imagesPath+'/7.jpg',
      imagesPath+'/8.jpg',
      imagesPath+'/9.jpg',
      imagesPath+'/10.jpg',
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const timer = setTimeout(() => {
      router.push('/main'); // 이동할 페이지 경로를 지정합니다.
    }, 2000); // 2000ms = 2초
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머를 정리합니다.
  }, [router]);

  return (
    <>
      <div className='c-intro'></div>
      <Script src='/script/intromove.js' id='tys-home-js' strategy="afterInteractive" />
      <Script src='/script/intro.js' id='tys-js' strategy="afterInteractive" />
    </>
  );
}
