import React, { useEffect, useState, useRef} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultProfile from '../../assets/profile-user-demo.png'
import UserBadge from './UserBadge';
import backarrow from '../../assets/arrow-left-solid.svg';
import userprofile from '../../assets/profile-user-demo.png';
import './MyProfile.css';

// import FollowerList from '../components/profile/FollowerList';
// import FollowingList from '../components/profile/FollowingList';
// import UserFeed from '../components/profile/UserFeed';
// import UserPost from '../components/profile/UserPost';
// import UserBookmark from '../components/profile/UserBookmark';


/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

function MyProfile() {
  const imgRef = useRef(null);
  const { userInfo } = useSelector((state) => state.user);

  const now = new Date();
  console.log(now);
  const year = now.getFullYear();

  const [followingListLength, setFollowingListLength] = useState(0)
  const [followerListLength, setFollowerListLength] = useState(0)
  const [annual, setAnnual] = useState(0)

  let img = `https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/${userInfo.userId}/${userInfo.userId}_profile.jpg`

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

    setAnnual(year - userInfo.homeAlone + 1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

  return (
    <div className="container"> 
      {/* Row-1 : 뒤로가기 */}
      <div className = "profilepart">

        <div className = "item2">
          <img ref={imgRef} src={img}  alt="userprofile" className="userprofile" onError={handleImgError}/>


        </div>

        <div className = "item3">
          <h4 className="userName"> {userInfo.nickname}</h4>
        </div>

        <div className = "item4">
          <h6 className="userYear"> {annual} 년차</h6>
        </div>

        <div className = "item5">
          <button class = "animated-button">
            <Link to="/profile-update" class="link-dark">프로필 수정</Link>
          </button>
        </div>

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

        <div className = "item12">
          <button class = "animated-button">
            <Link to="" class="link-dark">프로필 공유</Link>
          </button>
        </div>
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

      {/* <Row>
        뱃지 컴포넌트, 라우터
      </Row> */}

      {/* Row-4 : 한줄소개 */}
{/* 
      <Row>
        {userInfo.addr}
      </Row> */}

      {/* Row-5 : 팔로잉, 팔로워, 공유하기 */}
{/* 
      <Row>
        <Col xs={3}>
          <Link to={`/${userInfo.userId}/following-list`}>팔로잉 {followingListLength}</Link>
        </div>

        <div className = "item11">
          <Link to={`/${userInfo.userId}/follower-list`}>팔로워 {followerListLength}</Link>
        </Col>
        <Col xs={{ span: 3, offset: 3 }}>
          공유하기 버튼
        </Col>
      </Row> */}
      
      {/* Row-6 : 내피드, 내포스트, 북마크 */}
      {/* <Row>
        <Col>
          <Link to={`/profile/${userInfo.userId}/user-feed`}>내 피드</Link>
        </div>

        <div className ="mypost">
          <Link to={`/profile/${userInfo.userId}/user-board`}>내 포스트</Link>
        </div>

        <div className ="mybookmark">
          <Link to={`/profile/${userInfo.userId}/user-bookmark`}>북마크</Link>
        </Col>
      </Row> */}
      
      
    </div>


  );
}

export default MyProfile;