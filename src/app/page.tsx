'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function Home() {
  const router = useRouter();
  const [imagesPaths, setImagesPaths] = useState([
    '/99floor/1.jpg',
    '/99floor/2-1.jpg',
    '/99floor/2-2.jpg',
    // 추가 이미지 경로를 여기에 추가
  ]);

  useEffect(() => {
// 이미지 프리로드
const preloadImages = (srcs: string[]) => {
  srcs.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

preloadImages(imagesPaths);

    const timer = setTimeout(() => {
      router.push('/main'); // 이동할 페이지 경로를 지정합니다.
    }, 1200); // 1200ms = 1.2초

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머를 정리합니다.
  }, [router, imagesPaths]);
  return (
    <>
      <div className='c-intro'></div>
      <Script src='/script/intromove.js' id='tys-home-js' strategy="afterInteractive" />
      <Script src='/script/intro.js' id='tys-js' strategy="afterInteractive" />
    </>
  );
}
