'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
export default function Home() {
  const router = useRouter();

  useEffect(() => {

    const images = [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg',
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
