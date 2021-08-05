import React, { useEffect, useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import FollowerList from '../components/profile/FollowerList';
// import FollowingList from '../components/profile/FollowingList';
// import UserFeed from '../components/profile/UserFeed';
// import UserPost from '../components/profile/UserPost';
// import UserBookmark from '../components/profile/UserBookmark';

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
    <div className="container">
      {/* Row-1 : 뒤로가기 */}
      <Row>
        <a href="javascript:history.back();">뒤로가기</a>
      </Row>
      {/* Row-2 : 프로필사진, 닉네임, 자취기간, 위치, 프로필 수정 */}
      <Row>
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
          <Link to="/profile-update">프로필 수정</Link>
        </Col>
      </Row>
      {/* Row-3 : 뱃지 */}
      <Row>
        뱃지 컴포넌트, 라우터
      </Row>
      {/* Row-4 : 한줄소개 */}
      <Row>
        {userInfo.addr}
      </Row>
      {/* Row-5 : 팔로잉, 팔로워, 공유하기 */}
      <Row>
        <Col xs={3}>
          <Link to={`/${userInfo.userId}/following-list`}>팔로잉 {followingListLength}</Link>
        </Col>
        <Col xs={3}>
          <Link to={`/${userInfo.userId}/follower-list`}>팔로워 {followerListLength}</Link>
        </Col>
        <Col xs={{ span: 3, offset: 3 }}>
          공유하기 버튼
        </Col>
      </Row>
      {/* Row-6 : 내피드, 내포스트, 북마크 */}
      <Row>
        <Col>
          내피드 컴포넌트
        </Col>
        <Col>
          내포스트 컴포넌트
        </Col>
        <Col>
          북마크 컴포넌트
        </Col>
      </Row>
      
      
    </div>
  );
}

export default MyProfile;