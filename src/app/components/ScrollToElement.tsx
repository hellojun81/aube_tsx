'use client'; // Next.js에서 클라이언트 사이드 렌더링을 위해 추가

import { useEffect } from "react";

const ScrollToElement = () => {
  useEffect(() => {
    const hash = window.location.hash; // URL의 해시 값 가져오기
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" }); // 요소가 렌더링된 후 스크롤
        }, 100); // 페이지가 렌더링된 후 100ms 딜레이 후 스크롤
      }
    }
  }, []);

  return null;
};

export default ScrollToElement;
