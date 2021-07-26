import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Home } from '../../pages';
import { Sidebar } from './'

const Menu = () => {
  return (
    <div>
      <h2>TopAppBar</h2>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/sidebar">사이드바</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/sidebar" component={Sidebar} />

      {/* <Login setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <div>로그인 성공(&&)!</div>}
      {isLoggedIn ? <div>로그인 성공(삼항)!</div> : <div>로그인 실패!</div>}
      <SignUp setIsSignedUp={setIsSignedUp}/>
      {isSignedUp && <div>회원가입 성공(&&)!</div>} */}
    </div>

  )
}
export default Menu;