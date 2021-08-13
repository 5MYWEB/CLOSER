import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getMyInfoAction, refreshInfo } from './modules/user'
import { TopAppBar, Navbar, BackButton, CommentBar } from './components/frame/index';
import { Home, About, Login, SignUp, Profile, Newsfeed, Board, Search, Alarm, Messages } from './pages';
import NewsfeedList from './components/newsfeed/NewsfeedList';
import BoardSubNavbar1 from './components/board/BoardSubNavbar1';
import BoardSubNavbar2 from './components/board/BoardSubNavbar2';
import BoardGlobal from './components/board/BoardGlobal';
import BoardLocal from './components/board/BoardLocal';
import BoardDetail from './components/board/BoardDetail';
import BoardForm from './components/board/BoardForm';
import BoardUpdateForm from './components/board/BoardUpdateForm';
import FollowingList from './components/profile/FollowingList';
import FollowerList from './components/profile/FollowerList';
import MyProfileUpdate from './components/profile/MyProfileUpdate';
import UserFeed from './components/profile/UserFeed';
import UserBoard from './components/profile/UserBoard';
import UserBookmark from './components/profile/UserBookmark';
import UserLocation from './components/profile/UserLocation';

import './App.css';

function App( { location }) {
  const dispatch = useDispatch();
  const { isLoggedIn, decodedToken } = useSelector((state) => state.user);

  // 1. 현재 라우터가 어딜 보여주고 있는지 (ex. '/login')
  const now = '/' + location.pathname.split('/')[1]

  // 2.
  // TopAppBar를 변형하거나 보여주지 않는 페이지를 모아둔 오브젝트
  const noTopAppBarPages = {
    '/board-detail': <BackButton cclass="normal-backbutton" />,
    '/board-create-form': null,
    '/board-update-form': null,
    '/messages': <BackButton cclass="message-backbutton" />,
    '/profile': <BackButton cclass="normal-backbutton" />,
    '/profile-update': <BackButton />,
    '/change-location': <BackButton />
  }

  // NavBar를 변형하거나 보여주지 않는 페이지를 모아둔 오브젝트
  const noNavBarPages = {
    '/board-detail': <CommentBar/>,
    '/board-create-form': null,
    '/board-update-form': null,
    '/messages': null,
    '/profile': null,
    '/profile-update': null
  }

  // 3.
  // TopAppBar를 그대로 보여줄지, 변형하거나 보여주지 말지 결정하는 변수
  let isTopBar = true

  // NavBar를 그대로 보여줄지, 변형하거나 보여주지 말지 결정하는 변수
  let isNavBar = true

  // 1이 2에 있는지 확인해서 있으면 3의 값을 true로
  if (now in noTopAppBarPages) {
    isTopBar = false
  }

  if (now in noNavBarPages) {
    isNavBar = false
  }

  // 로그인 상태 유지
  // 로컬 스토리지에는 저장되어 있으나, 새로고침 등의 이유로 인해 isLoggedIn이 false인 경우
  if(localStorage.getItem("isLoggedIn") === 'true' && isLoggedIn === false){
    dispatch(refreshInfo());
  }

  useEffect(() => {
    if (isLoggedIn === true && decodedToken.UserId !== undefined){
      axios.post(`http://localhost:8080/user/profileinfo?userId=${decodedToken.UserId}`)
        .then((response) => {
          dispatch(getMyInfoAction(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decodedToken])

  return (
    <div>
      {/* TopAppBar를 보여주거나 변형하거나 / 숨김 */}
      { !isTopBar
      ? noTopAppBarPages[now]
      : <TopAppBar />
      }
      {/* <div className="my-auto view"> */}
      <div className={ "my-auto " + (isTopBar? "view" : "noTopview")}>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/newsfeed" component={Newsfeed} />
        <Route path="/newsfeed/:name" component={NewsfeedList} />
        <Route path="/board" component={Board} />
        <Route path="/search" component={Search} />
        <Route path="/alarm" component={Alarm} />
        <Route path="/messages" component={Messages} />
        <Route path="/board/subnav1/" component={BoardSubNavbar1} />
        <Route path="/board/subnav2/" component={BoardSubNavbar2} />
        <Route path="/board/subnav1/:name" component={BoardGlobal} />
        <Route path="/board/subnav2/:name" component={BoardLocal} />
        <Route path="/board-detail/:id" component={BoardDetail} />
        <Route path="/board-create-form/" component={BoardForm} />
        <Route path="/board-update-form/:id" component={BoardUpdateForm} />
        <Route path="/:id/following-list" component={FollowingList} />
        <Route path="/:id/follower-list" component={FollowerList} />
        <Route path="/profile-update" component={MyProfileUpdate} />
        <Route path="/profile/:id/user-feed" component={UserFeed} />
        <Route path="/profile/:id/user-board" component={UserBoard} />
        <Route path="/profile/:id/user-bookmark" component={UserBookmark} />
        <Route path="/change-location" component={UserLocation} />
      </div>
      {/* Navbar를 보여주거나 변형하거나 / 숨김 */}
      { !isNavBar
      ? noNavBarPages[now]
      : <Navbar />
      }

    </div>
  );
}

export default withRouter(App);
