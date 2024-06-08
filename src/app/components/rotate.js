import React from 'react';
import { Rotate } from 'react-scroll-rotate';

const ScrollRotateComponent = () => {
  return (
    <div style={{ height: '2000px', textAlign: 'center', paddingTop: '100px' }}>
      <Rotate from={0} to={360} loop>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          테스트
        </div>
      </Rotate>
    </div>
  );
};

export default ScrollRotateComponent;