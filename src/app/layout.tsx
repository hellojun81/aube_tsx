

import type { Metadata } from "next";
import Head from 'next/head';
import "./globals.css";
import React from 'react';
import ScrollToTopButton from './components/ScrollToTopButton';
// import { DefaultSeo } from 'next-seo';
// import SEO from '../../next-seo.config'


export const metadata: Metadata = {
  title: "aubestudio",
  // author:"어브 스튜디오",
  keywords:"어브 스튜디오, 성수동 스튜디오, 400평 스튜디오, 크리에이티브 공간, 이벤트, 렌탈 스튜디오,팝업,룩북",
  description: "성수동에 위치한 400평 규모에 현재와 과거가 조화롭게 믹스 되어있는 무엇이든 가능한 공간 이에요.",
  viewport: "width=device-width, initial-scale=1.0, user-scalable=no",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {/* <DefaultSeo {...SEO} /> */}
      <html lang="ko">
      {/* <Head>
      <title>aubestudio</title>
      <meta name="description" content="성수동에 위치한 400평 규모에 현재와 과거가 조화롭게 믹스 되어있는 무엇이든 가능한 공간 이에요." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="aubestudio" />
      <meta property="og:description" content="성수동에 위치한 400평 규모에 현재와 과거가 조화롭게 믹스 되어있는 무엇이든 가능한 공간 이에요." />
      <meta property="og:image" content="/main/main.jpg" />
      <meta property="og:url" content="https://aubestudio.co.kr" />
      <meta name="instagram:card" content="summary_large_image" />
      <meta name="instagram:title" content="aubestudio" />
      <meta name="instagram:description" content="성수동에 위치한 400평 규모에 현재와 과거가 조화롭게 믹스 되어있는 무엇이든 가능한 공간 이에요.." />
      <meta name="instagram:image" content="/main/main.jpg" />
    </Head> */}
        <body>
          {/* <Naverbar /> */}
          {children}


          <ScrollToTopButton />
        </body>
      </html>
    </>

  );
}
