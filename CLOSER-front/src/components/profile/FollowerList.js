import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import axios from 'axios';

import FollowerItem from './FollowerItem';

const FollowerList = () => {

  const { userId } = useSelector((state) => state.user.userInfo)

  const [followerList, setFollowerList] = useState([])

  useEffect(() => {
    axios.post(`http://localhost:8080/follow/${userId}/follower`)
    .then((res) => {
      setFollowerList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])


  return (
    <>
      <a href="javascript:history.back();">뒤로가기</a>

      {followerList.length !== 0 ? 
        <div>
          {followerList.map((follower) => {
            return (
              <FollowerItem key={follower.follow_pk} follower={follower} />
            );
          })}
        </div> :
        <div>
          아직 나를 팔로우하는 사람이 없습니다:(
        </div> }
    </>
  )
};


export default FollowerList;