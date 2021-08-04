import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import FollowerItem from './FollowerItem';

const FollowerList = ({match}) => {

  const userId = match.params.id;

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
      <Link to={`/profile/${userId}`}>뒤로가기</Link>

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