

import type { Metadata } from "next";
// import Head from 'next/head';
import "./globals.css";
import React from 'react';
import ScrollToTopButton from './components/ScrollToTopButton';
// import App from "./page";
// import Menu from '@/app/components/menu'


export const metadata: Metadata = {
  title: "aubestudio",
  description: "everything is possible.",
  // viewport: "width=device-width, initial-scale=1.0, user-scalable=no",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="ko">
        <body>
          {/* <Naverbar /> */}
          {children}


          <ScrollToTopButton />
        </body>
      </html>
    </>

  );
}
