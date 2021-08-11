import React, { useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
<<<<<<< Updated upstream
import UserBadge from './UserBadge';
=======
import backarrow from '../../assets/left-arrow.png';
import userprofile from '../../assets/profile-user-demo.png';
import './MyProfile.css';

// import FollowerList from '../components/profile/FollowerList';
// import FollowingList from '../components/profile/FollowingList';
// import UserFeed from '../components/profile/UserFeed';
// import UserPost from '../components/profile/UserPost';
// import UserBookmark from '../components/profile/UserBookmark';
>>>>>>> Stashed changes

/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

function MyProfile() {

  const { userInfo } = useSelector((state) => state.user);

  const [followingListLength, setFollowingListLength] = useState(0)
  const [followerListLength, setFollowerListLength] = useState(0)

  // 팔로잉, 팔로워 수 가져오기
  useEffect(() => {
    axios.post(`http://localhost:8080/follow/${userInfo.userId}/following`)
    .then((res) => {
      setFollowingListLength(res.data.length)
    })
    .catch((err) => {
      console.log(err)
    })

    axios.post(`http://localhost:8080/follow/${userInfo.userId}/follower`)
    .then((res) => {
      setFollowerListLength(res.data.length)
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
<<<<<<< Updated upstream
    <Container>
=======
    <div className="container"> 
>>>>>>> Stashed changes
      {/* Row-1 : 뒤로가기 */}
      <div className = "profilepart">
        <div className = "item1">
          <div className = "">
            <a href="javascript:history.back();">
              <img src={backarrow} alt="backarrow" className="backarrow" />
            </a>
          </div>
        </div>

        <div className = "item2">
          <img src={userprofile} alt="userprofile" className="userprofile"/>
        </div>

        <div className = "item3">
          {userInfo.nickname}
        </div>

        <div className = "item4">
          {userInfo.homeAlone}년차
        </div>

        <div className = "item5">
          <Link to="/profile-update">프로필 수정</Link>
        </div>

        <div className = "item6">
          위치
        </div>

        <div className = "item7">
          뱃지1
        </div>
        <div className = "item8">
          뱃지2
        </div>

        <div className = "item9">
          한줄소개
        </div>

        <div className = "item10">
          <Link to={`/${userInfo.userId}/following-list`}>팔로잉 {followingListLength}</Link>
        </div>

        <div className = "item11">
          <Link to={`/${userInfo.userId}/follower-list`}>팔로워 {followerListLength}</Link>
        </div>

        <div className = "item12">
          프로필 공유
        </div>
      </div>

      <div className="myprofilepost">
        <div className ="myfeed">
          <Link to={`/profile/${userInfo.userId}/user-feed`}>내 피드</Link>
        </div>

        <div className ="mypost">
          <Link to={`/profile/${userInfo.userId}/user-board`}>내 포스트</Link>
        </div>

        <div className ="mybookmark">
          <Link to={`/profile/${userInfo.userId}/user-bookmark`}>북마크</Link>
        </div>


      </div>
  

      {/* 프로필 사진 / 닉네임, 자취기간 // 위치 / 프로필 수정  */}

      {/* Row-2 : 프로필사진, 닉네임, 자취기간, 위치, 프로필 수정 */}
      {/* <Row>
        <Col xs={3}>
          <img src={userInfo.profileImg} alt="프로필 사진"></img>
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
          <Link to="/profile-update">프로필 수정</Link>
        </Col>
      </Row> */}

      {/* Row-3 : 뱃지 */}
<<<<<<< Updated upstream
      <Row>
        <UserBadge userId={userInfo.userId}/>
      </Row>
=======

      {/* <Row>
        뱃지 컴포넌트, 라우터
      </Row> */}

>>>>>>> Stashed changes
      {/* Row-4 : 한줄소개 */}
{/* 
      <Row>
<<<<<<< Updated upstream
        {userInfo.intro}
      </Row>
=======
        {userInfo.addr}
      </Row> */}

>>>>>>> Stashed changes
      {/* Row-5 : 팔로잉, 팔로워, 공유하기 */}
{/* 
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
      </Row> */}
      
      {/* Row-6 : 내피드, 내포스트, 북마크 */}
      {/* <Row>
        <Col>
          <Link to={`/profile/${userInfo.userId}/user-feed`}>내 피드</Link>
        </Col>
        <Col>
          <Link to={`/profile/${userInfo.userId}/user-board`}>내 포스트</Link>
        </Col>
        <Col>
          <Link to={`/profile/${userInfo.userId}/user-bookmark`}>북마크</Link>
        </Col>
<<<<<<< Updated upstream
      </Row>
    </Container>
=======
      </Row> */}
      
      
    </div>


>>>>>>> Stashed changes
  );
}

export default MyProfile;