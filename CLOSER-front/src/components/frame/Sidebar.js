import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Home, About, Login, SignUp, Profile } from '../../pages';

const Menu = () => {
  return (
    <div>
      <h2>SideBar</h2>
      <ul>
        {/* <li>
          <Link to="/">홈</Link>
        </li> */}
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/">로그아웃</Link>
        </li>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>
          <Link to="/profile">프로필</Link>
        </li>
      </ul>
      <hr />

      {/* <Login setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <div>로그인 성공(&&)!</div>}
      {isLoggedIn ? <div>로그인 성공(삼항)!</div> : <div>로그인 실패!</div>}
      <SignUp setIsSignedUp={setIsSignedUp}/>
      {isSignedUp && <div>회원가입 성공(&&)!</div>} */}
    </div>

  )
}
export default Menu;