// About.js
import React from 'react';
import '../styles/theme.css'
import { RippleButton } from '../styles/index';

/**
 * 함수형 컴포넌트 스니펫입니다.
 */
const About = () => {
  return (
    <div>
      <h1>About</h1>
      <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="버튼"/>

      
    </div>
  );
};

export default About;