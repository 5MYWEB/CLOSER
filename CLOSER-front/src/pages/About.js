// About.js
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/theme.css'
import './About.css'
import { RippleButton } from '../styles/index';
// import ChannelTalk  from '../pages/ChannelTalk';
import { forLogoutUser } from '../modules/board'; 

import closerbot from '../assets/closerbot.png'
import newsfeedOn from '../assets/newsfeed-on.svg'
import boardOn from '../assets/board-on.svg'
import alertsOn from '../assets/alerts-on.svg'
import messagesOn from '../assets/messages-on.svg'

/**
 * 함수형 컴포넌트 스니펫입니다.
 */
function About({ history }){

  const dispatch = useDispatch();

   //채널 톡 고유키, 로그인 하지 않아도 이용할 수 있도록 설정
    // ChannelTalk.boot({
    // "pluginKey": "dc94467c-67fb-4db2-8837-0d7f05ee1e96" 
    // });

    useEffect(() => {
      dispatch(forLogoutUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const goToNewsfeed = () => {
      setTimeout(function(){
        history.push('/newsfeed')
      },350)
    }

    const anchor = useRef();

    const {isLoggedIn, userInfo} = useSelector((state) => state.user);

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

    const goToHome = () => {
      setTimeout(function(){
        history.push('/newsfeed/near')
      },350)
    }

    const goToProfile = () => {
      setTimeout(function(){
        history.push(`/profile/${userInfo.userId}`)
      },350)
    }

    return (
      <div className="page-wrapper">
        <section>
          <h2 className="welcome-text">"<span className="text-main">클로저</span>에 오신 것을 환영합니다"</h2>
          <div className="center">
            <div className="circle pulse secondary d-flex justify-content-center align-items-center">
              <img src={closerbot} alt="closerbot" className="moving avatar closerbot-about" />
            </div>
          </div>

          { isLoggedIn
            ?
              <div className="d-flex flex-column justify-content-center align-items-center">
                <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="메인으로" onClick={goToHome}/>
                <RippleButton cclass="cbtn cbtn-lg cbtn-light" children="내 프로필" onClick={goToProfile}/>
              </div>
            :
              <div className="d-flex flex-column justify-content-center align-items-center">
                <RippleButton cclass="cbtn cbtn-lg cbtn-light" children="둘러보기" onClick={goToNewsfeed}/>
                <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="회원가입" onClick={goToSignup}/>
                <RippleButton cclass="cbtn cbtn-lg cbtn-secondary" children="로그인" onClick={goToLogin}/>
              </div>
          }

          <a href="#bottom" id="top" ref={anchor} data-target="anchor">
          <div className="chevron-container d-flex flex-column justify-content-center align-items-center mx-auto my-5">
            <div className="chevron"></div>
            <div className="chevron"></div>
            <div className="chevron"></div>
          </div>
          </a>
        </section>
        <section>
          <h2 className="py-5">"<span className="text-main">클로저</span>는
          <span className="text-main"> 동네인증</span>기반
          <br/><span className="text-main">자취 커뮤니티</span> 서비스입니다"</h2>
          
          <div className="d-flex row justify-content-around">
              <img src={newsfeedOn} alt="newsfeedOn" className="pe-3 moving avatar icon-purse" />
              <img src={boardOn} alt="boardOn" className="pe-3 moving avatar icon-purse" />
              <img src={alertsOn} alt="alertsOn" className="pe-3 moving avatar icon-purse" />
              <img src={messagesOn} alt="messagesOn" className="pe-3 moving avatar icon-purse" />
          </div>
          <div className="d-flex row justify-content-around pb-5 mb-5">
            <div className="circle2 pulse2 light" />
            <div className="circle2 pulse2 light" />
            <div className="circle2 pulse2 light" />
            <div className="circle2 pulse2 light" />
          </div>

          {/* 뉴스피드 */}
          <div className="d-flex justify-content-center align-items-center py-2">
            <img src={newsfeedOn} alt="newsfeedOn" className="pe-3 moving avatar icon-about" />
            <h2 className="py-3"><span className="text-main">지역 기반 뉴스피드</span>
            로<br/> 이웃과 실시간 교류!</h2>
          </div>
          <div className="mx-1 input-bolder p-3">
            <p className="py-0 my-0"><span className="text-main">NEAR</span> : 근처 이웃들의 뉴스피드</p>
            <p className="py-0 my-0"><span className="text-main">ALL</span> : 모든 뉴스피드 게시글</p>
            <p className="py-0 my-0"><span className="text-main">FAVORITE</span> : 내가 팔로우한 사람들의 뉴스피드</p>
          </div>
        </section>
        <section>
            {/* 게시판 */}
          <div className="d-flex justify-content-around align-items-center pb-2 pt-5">
            <img src={boardOn} alt="boardOn" className="px-3 moving avatar icon-about" />
            <div className="py-3 px-4">
              <h2><span className="text-main">자취게시판</span>에서<br/>꿀팁은 폭넓게,<br/></h2>
              <h2><span className="text-main">지역게시판</span>에서 <br/> 모임은 가깝게!</h2>
            </div>
          </div>
          <div className="mx-1 input-bolder p-3 mt-4">
            <h3 className="text-main my-2">자취게시판</h3>
            <p className="py-0 my-0"><span className="text-main">한끼레시피</span> : 프로 자취러들의 요리레시피</p>
            <p className="py-0 my-0"><span className="text-main">자취팁</span> : 자취생에게 필요한 꿀팁만 모아모아!</p>
            <p className="py-0 my-0"><span className="text-main">홈데코팁</span> : 설레는 첫 자취, 꾸미기를 도와줄게!</p>
          </div>
          <div className="mx-1 input-bolder p-3 mt-4">
            <h3 className="text-main my-2">지역게시판</h3>
            <p className="py-0 my-0"><span className="text-main">공동구매</span> : 1인 가구, 여럿이 사서 하나씩 갖자!</p>
            <p className="py-0 my-0"><span className="text-main">클로저모임</span> : 동네 친구가 필요하다면!</p>
            <p className="py-0 my-0"><span className="text-main">도와주세요</span> : 이웃이어야 가능한 부탁!</p>
          </div>     
        </section>
        <section>
          {/* 알림 */}
          <div className="d-flex justify-content-center align-items-center pb-2 pt-5">
              <img src={alertsOn} alt="alertsOn" className="pe-3 moving avatar icon-about" />
              <h2 className="py-3">SNS 알람과 함께,<br/><span className="text-main">집안일 알림</span>
              을 받아보세요!</h2>
            </div>
            <div className="mx-1 input-bolder p-3 mt-4">
                <h3 className="text-main my-2">클로저봇</h3>
                <p className="py-0 my-0">공과금 납부일, 분리수거 배출일 등<br/><span className="text-main">자취생이 까먹기 쉬운 날짜</span>를 <br/> 클로저봇이 매주 혹은 매달 알려드려요!</p>
              </div>

              
          {/* 메시지 */}
            <div className="d-flex justify-content-center align-items-center pb-2 pt-5">
              <img src={messagesOn} alt="messagesOn" className="pe-3 moving avatar icon-about" />
              <div className="py-3 ">
                <h2>뉴스피드에서<br/> 친해진 이웃은<span className="text-main"> 1:1 채팅,</span></h2>
                <h2>클로저 모임으로 <br/>만난 이웃은<span className="text-main"> 단체 채팅!</span></h2>
              </div>
            </div>   

        </section>
        <section>
          <h2 className="pt-5 my-5">"지금, 이웃과 <span className="text-main">클로저</span>해보세요!"</h2>
          <div className="center">
            <div className="circle pulse secondary d-flex justify-content-center align-items-center">
              <img src={closerbot} alt="closerbot" className="moving avatar closerbot-about" />
            </div>
          </div>

          {/* <div className="d-flex flex-column justify-content-center align-items-center">
            <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="둘러보기" onClick={goToNewsfeed}/>
          </div> */}
          { isLoggedIn
            ?
              <div className="d-flex flex-column justify-content-center align-items-center">
                <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="메인으로" onClick={goToHome}/>
                <RippleButton cclass="cbtn cbtn-lg cbtn-light" children="내 프로필" onClick={goToProfile}/>
              </div>
            :
              <div className="d-flex flex-column justify-content-center align-items-center">
                <RippleButton cclass="cbtn cbtn-lg cbtn-primary" children="회원가입" onClick={goToSignup}/>
                <RippleButton cclass="cbtn cbtn-lg cbtn-secondary" children="로그인" onClick={goToLogin}/>
              </div>
          }
        </section>
      </div>
    );
}



export default About;