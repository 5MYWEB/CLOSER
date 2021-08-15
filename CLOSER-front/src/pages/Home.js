import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const { isLoggedIn, userInfo } = useSelector((state) => (state.user))

  return (
    <div>
      { isLoggedIn
        ?
        <span>
          "{userInfo.nickname}님 반갑습니다."

        </span>
        :
        <span>
          "로그인 해주세요."
        </span>
      }
    </div>
  );
};

export default Home;