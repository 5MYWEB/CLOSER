import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Home, About, Login, SignUp, Profile, Newsfeed } from '../../pages';

const Menu = () => {
  return (
    <div>
      <ul>
        {/* 상단 바 */}
        <li>
          <Link to="/">홈</Link>
        </li>
        {/* 사이드바(굳이 필요하진 않지만 있으면 소개하기 좋음) */}
        <li>
          <Link to="/about">소개</Link>
        </li>
        {/* 내비게이션바 */}
        <li>
          <Link to="/newsfeed">뉴스피드</Link>
        </li>
        {/* 여기부터 사이드바 */}
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/logout">로그아웃</Link>
        </li>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>
          <Link to="/profile">프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/newsfeed" component={Newsfeed} />

      {/* <Login setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <div>로그인 성공(&&)!</div>}
      {isLoggedIn ? <div>로그인 성공(삼항)!</div> : <div>로그인 실패!</div>}
      <SignUp setIsSignedUp={setIsSignedUp}/>
      {isSignedUp && <div>회원가입 성공(&&)!</div>} */}
    </div>

  )
}
export default Menu;