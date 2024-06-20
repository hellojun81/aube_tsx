import { ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta property="og:title" content="aubestudio" />
        <meta property="og:description" content="Anything is possible here." />
        <meta property="og:image" content="/preview.jpg" />
        <meta property="og:url" content="https://aubestudio.com" />
        <title>aubestudio</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  );
};

export default Layout;