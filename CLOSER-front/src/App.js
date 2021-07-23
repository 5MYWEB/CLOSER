import React from 'react';
// import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Home, About, Login, SignUp, Profile } from './pages';

function App() {
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  // const [ isSignedUp, setIsSignedUp ] = useState(false)

  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
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
      {/* <router-link class="nav-link" @click.native="deleteJWT" to="#">Logout</router-link> */}
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />

      {/* <Login setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <div>로그인 성공(&&)!</div>}
      {isLoggedIn ? <div>로그인 성공(삼항)!</div> : <div>로그인 실패!</div>}
      <SignUp setIsSignedUp={setIsSignedUp}/>
      {isSignedUp && <div>회원가입 성공(&&)!</div>} */}
    </div>
  );
}

export default App;
