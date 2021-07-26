import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Newsfeed } from '../../pages';

const Menu = () => {
  return (
    <div>
      {/* 하단 바 */}
      <h2>Navbar</h2>
      <ul>
        <Link to="/newsfeed">뉴스피드</Link>
        <p>게시판</p>
        <p>알림</p>
        <p>DM</p>
      </ul>
      <hr />
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