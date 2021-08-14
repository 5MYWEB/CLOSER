import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserBadgeItem from './UserBadgeItem';

function UserBadge({userId, wrapclass, cclass}) {

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
    <span className={wrapclass}>
      {badgeList.length !== 0 
        ? 
        <span>
          {/* 인덱스로 쓸 값이 없을때 인덱스를 만들어 줄 수 있다 */}
          {badgeList.map((badge, index) => {
            return (
              <UserBadgeItem cclass={cclass} key={index} badge={badge} />
            );
          })}
        </span> 
        :
        null 
      }
    </span>
  )
}

export default UserBadge;