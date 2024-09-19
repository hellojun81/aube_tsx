
// pages/_app.tsx
import './app.css'; // 전역 스타일
import Naverbar from '../app/components/Navbar'
import type { AppProps } from 'next/app'; // AppProps 타입 임포트
function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
    <Naverbar />
     <Component {...pageProps} />;
     </>
  )
}

export default MyApp;


