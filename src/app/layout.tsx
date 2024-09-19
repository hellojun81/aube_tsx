

import type { Metadata } from "next";
import Head from 'next/head';
import "./globals.css";
import React from 'react';
import ScrollToTopButton from './components/ScrollToTopButton';
import Naverbar from '../app/components/Navbar'
// import { DefaultSeo } from 'next-seo';
// import SEO from '../../next-seo.config'



export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <html lang="ko">
        <head>
          <title>aubestudio(어브 스튜디오)</title>
          <meta name="keywords" content="어브 스튜디오, 성수동 스튜디오, 400평 스튜디오, 크리에이티브 공간, 이벤트, 렌탈 스튜디오,팝업,룩북" />
          <meta name="description" content="성수동에 위치한 400평 규모에 현재와 과거가 조화롭게 믹스 되어있는 무엇이든 가능한 공간 이에요." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <meta name="naver-site-verification" content="e808184e05e12a1bc6c1829b326f5d6bae1d63af" />
        </head>
        <body>

          {children}
          <ScrollToTopButton />
        </body>
      </html>
    </>

  );
}
