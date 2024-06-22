import React, { useRef, useEffect, RefCallback } from "react";
import dynamic from 'next/dynamic';
import { ScrollContainer } from "react-nice-scroll";
const App: React.FC = () => {
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const ScrollContainer = dynamic(() => import('react-nice-scroll').then(mod => mod.ScrollContainer), { ssr: false });
  // const SequenceSection = dynamic(() => import('react-nice-scroll').then(mod => mod.SequenceSection), { ssr: false });

  useEffect(() => {
    // 렌더링 후 titleRefs.current에 접근
    console.log('titleRefs', titleRefs);
    console.log('titleRefs length', titleRefs.current.length);
    console.log('titleRefs.current[0]', titleRefs.current[0]); // 첫 번째 요소 로그 출력
  }, []);

  const setTitleRef = (index: number): RefCallback<HTMLDivElement> => {
    return (el) => {
      titleRefs.current[index] = el;
    };
  };

  return (
    <ScrollContainer>
      <div>
        {["Title 1", "Title 2", "Title 3"].map((title, index) => (
          <div key={index} ref={setTitleRef(index)}>
            {title}
          </div>
        ))}
      </div>
    </ScrollContainer>
  );
};

export default App;
