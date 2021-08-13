import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { followAction, getFollowInfoAction } from '../../modules/user';
import { Row, Col } from 'react-bootstrap';
import UserBadge from './UserBadge';
import userprofile from '../../assets/profile-user-demo.png';
import './MyProfile.css';

/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

function OtherProfile({ id }) {

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState([])
  const [isFollowed, setIsFollowed] = useState(false)

  const [followingListLength, setFollowingListLength] = useState(0)
  const [followerListLength, setFollowerListLength] = useState(0)

  const { userId } = useSelector((state) => state.user.userInfo)
  const { homeAlone } = useSelector((state) => state.user.userInfo)
  const { following } = useSelector((state) => state.user)

  const now = new Date();
  console.log(now);
  const year = now.getFullYear();

  const [annual, setAnnual] = useState(0)

  useEffect(() => {
    if(homeAlone != null){
      setAnnual(year - homeAlone + 1)  
      console.log(annual);
    }
  }, [])

  useEffect(() => {
    // 타인의 정보 가져오기
    axios.post(`http://localhost:8080/user/profileinfo?userId=${id}`)
    .then((res) => {
      setUserInfo(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

    // 내가 팔로우하고 있는 사람인지 여부 가져오기
    axios.post(`http://localhost:8080/follow/${id}/follow`, {
      userId: userId,
      flag: 'false',
    })
    .then((res) => {
      setIsFollowed(res.data.followed)
      dispatch(getFollowInfoAction())
    })
    .catch((err) => {
      console.log(err)
    })

    // 팔로잉, 팔로워 수 가져오기
    axios.post(`http://localhost:8080/follow/${id}/following`)
    .then((res) => {
      setFollowingListLength(res.data.length)
    })
    .catch((err) => {
      console.log(err)
    })

    axios.post(`http://localhost:8080/follow/${id}/follower`)
    .then((res) => {
      setFollowerListLength(res.data.length)
    })
    .catch((err) => {
      console.log(err)
    })


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [following])

  // 팔로우 / 팔로우 취소 버튼 클릭 시
  const onClickFollow = () => {
    axios.post(`http://localhost:8080/follow/${id}/follow`, {
      userId: userId,
      flag: 'true',
    })
    .then((res) => {
      console.log(res)
      dispatch(followAction())
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="container">

      <div className = "profilepart">

        <div className = "item2">
          <img src={userprofile} alt="userprofile" className="userprofile"/>
        </div>

        <div className = "item3">
          <h4 className="userName"> {userInfo.nickname}</h4>
        </div>

        <div className = "item4">
          <h6 className="userYear"> {annual} 년차</h6>
        </div>

        {/* <div className = "item5">
          <button class = "animated-button">
            <Link to="/profile-update" class="link-dark">프로필 수정</Link>
          </button>
        </div> */}

        <div className = "item6">
          <h6 className="userLocation"> {userInfo.addr}</h6>
        </div>

        <div className = "item7">
          <h6>요리왕</h6>
        </div>
        <div className = "item8">
          <h6>살림왕</h6>
        </div>

        <div className = "item9">
          <h6> {userInfo.intro}</h6>
        </div>

        <div className = "item10">
          <h6><Link to={`/${userInfo.userId}/following-list`} class="link-dark">팔로잉 {followingListLength}</Link></h6>
        </div>

        <div className = "item11">
          <h6><Link to={`/${userInfo.userId}/follower-list`} class="link-dark">팔로워 {followerListLength}</Link></h6>
        </div>

        {/* <div className = "item12">
          <button class = "animated-button">
            <Link to="" class="link-dark">프로필 공유</Link>
          </button>
        </div> */}
      </div>

      <div className="myprofilepost">
        <div className ="myfeed">
          <h7><Link to={`/profile/${userInfo.userId}/user-feed`} class="link-light" >내 피드</Link></h7>
        </div>

        <div className ="mypost">
          <Link to={`/profile/${userInfo.userId}/user-board`} class="link-light">내 포스트</Link>
        </div>

        <div className ="mybookmark">
          <Link to={`/profile/${userInfo.userId}/user-bookmark`} class="link-light">북마크</Link>
        </div>


      </div>

      {/* <Row>
        <Col xs={3}>
          <img src="" alt="프로필 사진"></img>
        </Col>
        <Col xs={6}>
          <Row>
            <Col>
              {userInfo.nickname}
            </Col>
            <Col>
              자취 {userInfo.homeAlone}년차
            </Col>
          </Row>
          <Row>
            {userInfo.addr}
          </Row>
        </Col>
        <Col xs={3}>
          {isFollowed ? <button onClick={onClickFollow}>팔로우 취소</button>
            : <button onClick={onClickFollow}>팔로우</button>
          }
        </Col>
      </Row>

      <Row>
        <UserBadge userId={id}/>
      </Row>

      <Row>
        {userInfo.intro}
      </Row>

      <Row>
        <Col xs={2}>
          <Link to={`/${userInfo.userId}/following-list`}>팔로잉 {followingListLength}</Link>
        </Col>
        <Col xs={2}>
          <Link to={`/${userInfo.userId}/follower-list`}>팔로워 {followerListLength}</Link>
        </Col>
        <Col xs={{ span: 6, offset: 2 }}>
          공유하기 버튼
        </Col>
      </Row>

      <Row>
        <Col>
          <Link to={`/profile/${userInfo.userId}/user-feed`}>내 피드</Link>
        </Col>
        <Col>
          <Link to={`/profile/${userInfo.userId}/user-board`}>내 포스트</Link>
        </Col>
        <Col>
          <Link to={`/profile/${userInfo.userId}/user-bookmark`}>북마크</Link>
        </Col>
      </Row> */}
      
      
    </div>
  );
}

OtherProfile.propTypes = {
  id: PropTypes.string,
}

export default OtherProfile;