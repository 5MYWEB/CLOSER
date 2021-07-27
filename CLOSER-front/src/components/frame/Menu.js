import React from 'react';
import { Route, Link } from 'react-router-dom';

import { Home, Newsfeed } from '../../pages';

const Menu = () => {
  return (
    <div>
      <ul>
        {/* 상단 바 */}
        <li>
          <Link to="/">홈</Link>
        </li>
        {/* 내비게이션바 */}
        <li>
          <Link to="/newsfeed">뉴스피드</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/newsfeed" component={Newsfeed} />
      <Route path="/board" component={Board} />

      {/* <Login setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <div>로그인 성공(&&)!</div>}
      {isLoggedIn ? <div>로그인 성공(삼항)!</div> : <div>로그인 실패!</div>}
      <SignUp setIsSignedUp={setIsSignedUp}/>
      {isSignedUp && <div>회원가입 성공(&&)!</div>} */}
    </div>

  )
}
export default Menu;