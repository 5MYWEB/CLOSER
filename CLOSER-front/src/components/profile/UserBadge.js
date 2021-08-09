import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserBadgeItem from './UserBadgeItem';

function UserBadge({userId}) {

  const [badgeList, SetbadgeList] = useState([])

  useEffect(() => {
    axios.post(`http://localhost:8080/user/profileinfo/?userId=${userId}`)
    .then((res) => {
      SetbadgeList(res.data.badge)
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line
  }, [])

  return (
    <div>
      {badgeList.length !== 0 
        ? 
        <div>
          뱃지 {badgeList.length} 개 획득!
          <br />
          {/* 인덱스로 쓸 값이 없을때 인덱스를 만들어 줄 수 있다 */}
          {badgeList.map((badge, index) => {
            return (
              <UserBadgeItem key={index} badge={badge} />
            );
          })}
        </div> 
        :
        '' 
      }
    </div>
  )
}

export default UserBadge;