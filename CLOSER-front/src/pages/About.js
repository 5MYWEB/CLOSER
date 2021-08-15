// About.js
import React from 'react';
import '../styles/theme.css'
import { RippleButton } from '../styles/index';
import  ChannelTalk  from '../pages/ChannelTalk';

/**
 * 함수형 컴포넌트 스니펫입니다.
 */
function About(){
   //채널 톡 고유키, 로그인 하지 않아도 이용할 수 있도록 설정
    ChannelTalk.boot({
    "pluginKey": "dc94467c-67fb-4db2-8837-0d7f05ee1e96" 
    });

    return (
      <div>
        <h1>About</h1>
        <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="버튼"/>
      </div>
    );
}



export default About;