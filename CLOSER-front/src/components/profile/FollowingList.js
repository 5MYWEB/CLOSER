import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import FollowingItem from './FollowingItem';

const FollowingList = ({match}) => {

  const userId = match.params.id;

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
      <Link to={`/profile/${userId}`}>뒤로가기</Link>

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