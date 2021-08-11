import React, { useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserBadge from './UserBadge';

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
    <Container>
      {/* Row-1 : 뒤로가기 */}
      <Row>
        <a href="javascript:history.back();">뒤로가기</a>
      </Row>
      {/* Row-2 : 프로필사진, 닉네임, 자취기간, 위치, 프로필 수정 */}
      <Row>
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
      </Row>
      {/* Row-3 : 뱃지 */}
      <Row>
        <UserBadge userId={userInfo.userId}/>
      </Row>
      {/* Row-4 : 한줄소개 */}
      <Row>
        {userInfo.intro}
      </Row>
      {/* Row-5 : 팔로잉, 팔로워, 공유하기 */}
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
      {/* Row-6 : 내피드, 내포스트, 북마크 */}
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
      </Row>
    </Container>
  );
}

export default MyProfile;