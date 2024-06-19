'use client'
import Footer from "../components/footer/Footer1";
import Intro from "../components/footer/Intro";
import "../components/footer/style.css";
import { useEffect } from "react";
import Lenis from 'lenis';
import { Inter } from "next/font/google";
import './style.css'

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className={inter.className}>
    <main>
      <Intro />
      <Footer />
    </main>
    </div>
  );
}

export default Home;
