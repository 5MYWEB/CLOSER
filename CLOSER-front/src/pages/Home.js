import React from 'react';
import { useSelector } from 'react-redux'
// import { useSelector, connect } from 'react-redux'

const Home = () => {
  const { userInfo, isLoggedIn, userToken  } = useSelector((state) => state.user)
  // console.log(user)
  // console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

  return (
    <div>
      <h1>Home</h1>
      <p>isLoggedIn:{isLoggedIn ? 'true' : 'false'}</p>
      <p>userId: { userInfo.userId }</p>
      <p>userToken: { userToken }</p>
    </div>
  );
};

export default Home;