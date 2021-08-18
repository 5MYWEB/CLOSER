// About.js
import React from 'react';
import '../styles/theme.css'
import './About.css'
import { RippleButton } from '../styles/index';
// import ChannelTalk  from '../pages/ChannelTalk';

import closerbot from '../assets/closerbot.png'

/**
 * 함수형 컴포넌트 스니펫입니다.
 */
function About({ history }){

   //채널 톡 고유키, 로그인 하지 않아도 이용할 수 있도록 설정
    // ChannelTalk.boot({
    // "pluginKey": "dc94467c-67fb-4db2-8837-0d7f05ee1e96" 
    // });

    const goToNewsfeed = () => {
      setTimeout(function(){
        history.push('/newsfeed')
      },350)
    }

    const goToSignup = () => {
      setTimeout(function(){
        history.push('/signup')
      },350)
    }

    const goToLogin = () => {
      setTimeout(function(){
        history.push('/login')
      },350)
    }

    return (
      <>
        <h2>"<span className="text-main">클로저</span>에 오신 것을 환영합니다"</h2>
        <div className="center">
          <div className="circle pulse secondary d-flex justify-content-center align-items-center">
            <img src={closerbot} alt="closerbot" className="moving avatar closerbot-about" />
            <div className="shadow"></div> 
          </div>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="둘러보기" onClick={goToNewsfeed}/>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="회원가입" onClick={goToSignup}/>
          <RippleButton cclass="cbtn cbtn-lg cbtn-secondary" children="로그인" onClick={goToLogin}/>
        </div>
      </>
    );
}



export default About;