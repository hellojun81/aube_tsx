// pages/404.tsx
import { NextPage } from 'next';
import Head from 'next/head';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <main>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </main>
    </>
  );
};

export default Custom404;
