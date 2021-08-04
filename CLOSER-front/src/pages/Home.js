import React from 'react';
import { useSelector } from 'react-redux'
// import { useSelector, connect } from 'react-redux'

const Home = () => {
  const user = useSelector((state) => state.user)
  const { isLoggedIn, userId, userToken } = user
  // console.log(user)
  // console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

  return (
    <div>
      <h1>Home</h1>
      <p>isLoggedIn: { isLoggedIn }</p>
      <p>userId: { userId }</p>
      <p>userToken: { userToken }</p>
    </div>
  );
};

export default Home;