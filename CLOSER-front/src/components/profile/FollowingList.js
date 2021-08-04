import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import axios from 'axios';

import FollowingItem from './FollowingItem';

const FollowingList = () => {

  const { userId } = useSelector((state) => state.user.userInfo)

  const [followingList, setFollowingList] = useState([])

  useEffect(() => {
    axios.post(`http://localhost:8080/follow/${userId}/following`)
    .then((res) => {
      setFollowingList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])


  return (
    <>
      <a href="javascript:history.back();">뒤로가기</a>

      {followingList.length !== 0 ? 
        <div>
          {followingList.map((following) => {
            return (
              <FollowingItem key={following.follow_pk} following={following} />
            );
          })}
        </div> :
        <div>
          아직 내가 팔로우하는 사람이 없습니다:(
        </div> }
    </>
  )
};



export default FollowingList;