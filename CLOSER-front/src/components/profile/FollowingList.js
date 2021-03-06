import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import FollowingItem from './FollowingItem';
import { getFollowInfoAction } from '../../modules/user';

const FollowingList = ({match}) => {
  const dispatch = useDispatch();

  const userId = match.params.id;

  const { following } = useSelector((state) => state.user)

  const [followingList, setFollowingList] = useState([])

  // 내가 팔로잉하는 유저 목록 가져오기
  useEffect(() => {
    axios.post(`http://localhost:8080/follow/${userId}/following`)
    .then((res) => {
      setFollowingList(res.data)
      dispatch(getFollowInfoAction())
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [following])


  return (
    <>
      {followingList.length !== 0 ? 
        <div>
          <div className="g-0 align-items-center mx-5 my-2 fs-4">{followingList.length} 명을 <span style={{color: "#5552FF"}}>팔로우</span>하고 있습니다.</div>
          <br />
          {followingList.map((following) => {
            return (
              <FollowingItem key={following.follow_pk} following={following} />
            );
          })}
        </div> :
        <div className="g-0 align-items-center text-center pt-5 mx-5 my-2 fs-4">
          아무도 팔로우하지 않고 있어요:(
        </div> }
    </>
  )
};



export default FollowingList;