import React from 'react';

function UserBadge({userId}) {

  return (
    <div>
      {/* {followerList.length !== 0 ? 
        <div>
          {followerList.length} 명이 나를 팔로우합니다.
          {followerList.map((follower) => {
            return (
              <FollowerItem key={follower.follow_pk} follower={follower} />
            );
          })}
        </div> :
        <div>
          아직 나를 팔로우하는 사람이 없습니다:(
        </div> } */}
    </div>
  )
}

export default UserBadge;