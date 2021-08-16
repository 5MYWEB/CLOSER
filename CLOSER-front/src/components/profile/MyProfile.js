import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/user-on.svg';
import UserBadge from './UserBadge';
import { RippleButton } from '../../styles/index';
import compassRegular from '../../assets/profile/compass-regular.svg';
import calendarRegular from '../../assets/profile/calendar-alt-regular.svg';
import '../../styles/theme.css'
import './MyProfile.css';

// import FollowerList from '../components/profile/FollowerList';
// import FollowingList from '../components/profile/FollowingList';
// import UserFeed from '../components/profile/UserFeed';
// import UserPost from '../components/profile/UserPost';
// import UserBookmark from '../components/profile/UserBookmark';


/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

function MyProfile({ history }) {
  // const imgRef = useRef(null);
  const { userInfo } = useSelector((state) => state.user);

  const now = new Date()

  let img = `https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/${userInfo.userId}/${userInfo.userId}_profile.jpg`

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }


  const onClickUpdate = () => {
    history.push('/profile-update')
  }

  return (
      <div className="page-wrapper">
        {/* 1. 프로필 사진, 뱃지와 수정 버튼 */}
        <div className="d-flex row justify-content-between align-items-end mx-0">
          {/* 프로필사진 */}
          <div className="col-3 px-0 d-flex justify-content-center">
            <div className="profile-img-wrapper">
              <img src={defaultProfile}  alt="userprofile" className="profile-img" onError={handleImgError}/>
            </div>
          </div>
          {/* 뱃지 */}
          <div className="col-5 px-0"><UserBadge wrapclass="px-3" cclass="profile-badge" userId={userInfo.userId} /></div>
          {/* 프로필수정버튼  */}
          <div className="col-4 px-0 d-flex justify-content-end">
            <RippleButton onClick={onClickUpdate} cclass="cbtn me-0 my-0 cbtn-sm cbtn-primary" children="프로필 수정"/>
          </div>

          {/* 2. 닉네임 */}
          <h2 className="row justify-content-start px-3 pt-3 pb-1">
            <div className="col px-0 text-start">{userInfo.nickname}</div>
          </h2>

          {/* 3. 아이디, 소개말 */}
          <p className="input-placeholder-style row justify-content-start px-3">
            @{userInfo.userId}
          </p>
          <p className="row justify-content-start px-3 pt-3">{userInfo.intro}</p>
          {/* 4. 위치, 자취년차 */}
          <div className="row light-font justify-content-start px-3 pt-3">
            <span className="p-0">
              <img src={compassRegular} alt="addr-icon" className="profile-icon ps-0 pe-2"/>
                <span>{userInfo.addr}</span>
              <img src={calendarRegular} alt="homeAlone-icon" className="profile-icon ps-4 pe-1"/>
              {userInfo.homeAlone === null
              ? <span> 마음만은 자취러 </span> 
              : <span> 자취 {now.getFullYear()-userInfo.homeAlone+1} 년차 </span>}
            </span>
          </div>

          <div className="row px-3 pt-3 bm-profile-info justify-content-between">
            <div className="row px-3 col-6 p-0">
              <div className="col-6 p-0">
                  <Link to={`/${userInfo.userId}/following-list`} className="link-dark">
                    {userInfo.following} 팔로잉
                  </Link>
              </div>
              <div className="col-6 p-0">
                <Link to={`/${userInfo.userId}/follower-list`} className="link-dark">
                  <div>{userInfo.follower} 팔로워</div>
                </Link>
              </div>
            </div>

            <div className="col-4 ps-0 pe-1 d-flex justify-content-end">
              <RippleButton cclass="cbtn me-0 my-0 cbtn-sm cbtn-light" children="프로필 공유"/>
            </div>
          </div>

        </div>



        <div className="myprofilepost">
          <div className ="myfeed">
            <Link to={`/profile/${userInfo.userId}/user-feed`} className="link-light" >내 피드</Link>
          </div>

          <div className ="mypost">
            <Link to={`/profile/${userInfo.userId}/user-board`} className="link-light">내 포스트</Link>
          </div>

          <div className ="mybookmark">
            <Link to={`/profile/${userInfo.userId}/user-bookmark`} className="link-light">북마크</Link>
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