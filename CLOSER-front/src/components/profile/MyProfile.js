import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/user-on.svg';
import UserBadge from './UserBadge';
import { changeUserNavbar } from '../../modules/user';
import { RippleButton, RippleTabItem } from '../../styles/index';
import compassRegular from '../../assets/profile/compass-regular.svg';
import calendarRegular from '../../assets/profile/calendar-alt-regular.svg';
import '../../styles/tab.css';
import '../../styles/theme.css';


function MyProfile({ history }) {
  const dispatch = useDispatch();

  // const imgRef = useRef(null);
  const { userInfo, imgUploaded, myNavbar } = useSelector((state) => state.user);

  const [profileImg, setProfileImg] = useState('')

  const now = new Date();

  useEffect(() => {
    setProfileImg(userInfo.profileImg)
  }, [userInfo])


  useEffect(() => {
    setProfileImg(`https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/${userInfo.userId}/${userInfo.userId}_profile.jpg`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUploaded])

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

  const onClickUpdate = () => {
    history.push('/profile-update')
  }
  
  const children = [
    ['내 피드', '내 포스트', '북마크'],
    [
      `/profile/${userInfo.userId}/user-feed`,
      `/profile/${userInfo.userId}/user-board`,
      `/profile/${userInfo.userId}/user-bookmark`
    ],
    [
      '/user-feed',
      '/user-board',
      '/user-bookmark',
    ]
  ]

  const onClickTap = ( e ) => {
    history.replace(e.target.getAttribute('addr'))

    if(e.target.getAttribute('addr') === children[1][0]) {
      dispatch(changeUserNavbar(children[2][0]))
    } else if(e.target.getAttribute('addr') === children[1][1]) {
      dispatch(changeUserNavbar(children[2][1]))
    } else if(e.target.getAttribute('addr') === children[1][2]) {
      dispatch(changeUserNavbar(children[2][2]))
    }
  }

  // onClickTap
  // ['내 피드', '내 포스트', '북마크']

  // 프로필 공유 로직
  const textInput = useRef();

  const copyLink = () => {
    const el = textInput.current
    el.select()
    document.execCommand('copy')
  }

  return (
      <div>
        <Redirect to={`/profile/${userInfo.userId}${myNavbar}`} />
        <div className="page-semi-wrapper">
          {/* 1. 프로필 사진, 뱃지와 수정 버튼 */}
          <div className="d-flex row justify-content-between align-items-end mx-0">
            {/* 프로필사진 */}
            <div className="col-3 px-0 d-flex justify-content-center">
              <div className="profile-img-wrapper">
                <img src={profileImg}  alt="userprofile" className="profile-img" onError={handleImgError}/>
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
                {userInfo.homeAlone === 0
                ? <span> 자취희망러 </span> 
                : <span> 자취 {now.getFullYear()-userInfo.homeAlone+1} 년차 </span>}
              </span>
            </div>

            <div className="row px-3 pt-3 justify-content-between">
              <div className="row px-3 col-6 p-0">
                <div className="col-6 p-0">
                  <Link to={`/following-list/${userInfo.userId}/`} className="link-dark">
                    {userInfo.following} 팔로잉
                  </Link>
                </div>
                <div className="col-6 p-0">
                  <Link to={`/follower-list/${userInfo.userId}/`} className="link-dark">
                    <div>{userInfo.follower} 팔로워</div>
                  </Link>
                </div>
              </div>

              <div className="col-4 ps-0 pe-1 d-flex justify-content-end">
                <input type="text" value={window.location.href} ref={textInput} readOnly  className="profile-share-link"/>
                <RippleButton cclass="cbtn me-0 my-0 cbtn-sm cbtn-light" children="프로필 공유" onClick={copyLink}/>
              </div>
            </div>
          </div>
        </div>
      
        <div className="tabs-wrapper">
          <nav className="tabs">
            <RippleTabItem cclass={ myNavbar === children[2][0]? "tab is-current" : "tab"} children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
            <RippleTabItem cclass={ myNavbar === children[2][1]? "tab is-current" : "tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
            <RippleTabItem cclass={ myNavbar === children[2][2]? "tab is-current" : "tab"} children={children[0][2]} onClick={onClickTap} addr={children[1][2]} />
            <div className="nav-underline"></div> 
          </nav>
        </div>
          
        
      </div>


  );
}

export default MyProfile;