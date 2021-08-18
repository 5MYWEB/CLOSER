import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FollowerItem from './FollowerItem';
import { getFollowInfoAction } from '../../modules/user';

const FollowerList = ({match}) => {
  const dispatch = useDispatch();

  const userId = match.params.id;

  const { following } = useSelector((state) => state.user)

  const [followerList, setFollowerList] = useState([])

  // 나를 팔로잉하는 유저 목록 가져오기
  useEffect(() => {
    axios.post(`http://localhost:8080/follow/${userId}/follower`)
    .then((res) => {
      setFollowerList(res.data)
      dispatch(getFollowInfoAction())
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [following])


  return (
    <>
      {followerList.length !== 0 ? 
        <div>
          <div className="g-0 align-items-center mx-5 my-2 fs-4">{followerList.length} 명이 나를 <span style={{color: "#5552FF"}}>팔로우</span>합니다.</div>
          <br />
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