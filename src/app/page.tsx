'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function Home() {
  const router = useRouter();
  const [imagesPath, setimagesPath] = useState('/99floor/height')  //메인aubebuild이미지


  useEffect(() => {
// 이미지 프리로드
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    preloadImage(imagesPath);

    const timer = setTimeout(() => {
      router.push('/main'); // 이동할 페이지 경로를 지정합니다.
    }, 1200); // 1200ms = 1.2초

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머를 정리합니다.
  }, [router, imagesPath]);
  return (
    <>
      <div className='c-intro'></div>
      <Script src='/script/intromove.js' id='tys-home-js' strategy="afterInteractive" />
      <Script src='/script/intro.js' id='tys-js' strategy="afterInteractive" />
    </>
  );
}
