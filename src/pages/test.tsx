import { motion, useAnimation, useViewportScroll } from 'framer-motion';

const App = () => {
  const { scrollY } = useViewportScroll();
  const controls = useAnimation();

  // scrollY 값에 따라 애니메이션 효과 제어
  scrollY.onChange(y => {
    if (y >= 100) { // 스크롤이 100px 이상일 때
      controls.start({ opacity: 1, y: 0 });
    } else { // 스크롤이 100px 미만일 때
      controls.start({ opacity: 0, y: -100 });
    }
  });

  return (
    <div>
      <motion.section
        // initial={{ opacity: 0, y: -100 }}
        // animate={controls}
        transition={{ duration: 0.5 }}
        style={{backgroundColor: 'lightgreen' , height: '100vh',position: 'fixed', width: '100%',  zIndex: -1 ,}}
      >
        <h2>Fixed Section</h2>
      </motion.section>

      <section style={{ height: '100vh', backgroundColor: 'red', marginTop: '100px' , zIndex: 2 }}>
        <h2>Content Below Fixed Section</h2>
      </section>

      {/* 다른 섹션들 */}
      <section style={{ height: '100vh', backgroundColor: 'blue' }}>
        <h2>More Content</h2>
      </section>
    </div>
  );
};

export default App;
