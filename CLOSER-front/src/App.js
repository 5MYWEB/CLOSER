import Login from './pages/login';
import SignUp from './pages/signup';
import React, { useState } from 'react';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ isSignedUp, setIsSignedUp ] = useState(false)

  return (
    <div>
      <Login setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <div>로그인 성공(&&)!</div>}
      {isLoggedIn ? <div>로그인 성공(삼항)!</div> : <div>로그인 실패!</div>}
      <SignUp setIsSignedUp={setIsSignedUp}/>
      {isSignedUp && <div>회원가입 성공(&&)!</div>}
    </div>
  );
}

export default App;
