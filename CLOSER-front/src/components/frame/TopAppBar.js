import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Sidebar } from './'
import { Home, About, Login, SignUp, Profile } from '../../pages';

import './Sidebar.css';

const TopAppBar = () => {
  const [status, setStatus] = useState(false);

  return (
    <div>
      <h2>TopAppBar</h2>
      <ul>
        <li>
          <p onClick={() => {setStatus(false)}}>홈</p>
        </li>
        <li>
          <button onClick={() => {setStatus(!status)} }>사이드바</button>
        </li>
      </ul>
      <hr />
      {status? <Sidebar class="sidebar-menu"/> : null }
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />

      {/* <Login setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <div>로그인 성공(&&)!</div>}
      {isLoggedIn ? <div>로그인 성공(삼항)!</div> : <div>로그인 실패!</div>}
      <SignUp setIsSignedUp={setIsSignedUp}/>
      {isSignedUp && <div>회원가입 성공(&&)!</div>} */}
    </div>

  )
}
export default TopAppBar;