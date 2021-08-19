import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getMyInfoAction, refreshInfo, getPostCount, getUnreadAlram } from './modules/user'
import { TopAppBar, Navbar, BackButton, WriteButton, WriteButtonWithNav } from './components/frame/index';
import { About, Login, SignUp, Profile, Newsfeed, Board, Search, Alarm, Messages } from './pages';
import { BoardSubNavbar1, BoardSubNavbar2, BoardGlobal, BoardLocal, BoardDetail, BoardForm, BoardUpdateForm} from './components/board/index';
import NewsfeedList from './components/newsfeed/NewsfeedList';
import NewsfeedWriteForm from './components/newsfeed/NewsfeedWriteForm';
import FollowingList from './components/profile/FollowingList';
import FollowerList from './components/profile/FollowerList';
import MyProfileUpdate from './components/profile/MyProfileUpdate';
import UserFeed from './components/profile/UserFeed';
import UserBoard from './components/profile/UserBoard';
import UserBookmark from './components/profile/UserBookmark';
import UserLocation from './components/profile/UserLocation';
import AlarmList from './components/alarm/AlarmList';
import BotAlarm from './components/alarm/BotAlarm';
import OtherMessages from "./components/message/OtherMessages";
import GroupMessages from "./components/message/GroupMessages";

import './App.css';

function App( { location, history }) {
  const dispatch = useDispatch();
  
  const { isLoggedIn, decodedToken } = useSelector((state) => state.user);

  const pathElements = location.pathname.split('/')

  // 1. 현재 라우터가 어딜 보여주고 있는지 (ex. '/login')
  let now = ''

  if (pathElements.length === 4) {
    if (pathElements[2] === decodedToken.user_id) {
      pathElements[2] = 'my'
    } else {
      pathElements[2] = 'other'
    }

    now = pathElements.join('/')
  } else {
    now = '/' + location.pathname.split('/')[1]
  }

  // 2.
  // TopAppBar를 변형하거나 보여주지 않는 페이지를 모아둔 오브젝트
  const noTopAppBarPages = {
    '/login': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/signup': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/about': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/bot': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/search': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/board-detail': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/board-detail/other/': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/board-detail/other/tip': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/board-create-form': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/board-update-form/other/': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/feed-create-form': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/messages': <BackButton cclass="message-backbutton" />,
    '/Omessages': <BackButton cclass="message-backbutton" />,
    '/profile': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/following-list/my/': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/follower-list/my/': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/following-list': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/follower-list': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/profile/my/user-feed': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/profile/my/user-board': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/profile/my/user-bookmark': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/profile/other/user-feed': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/profile/other/user-board': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/profile/other/user-bookmark': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton" />,
    '/profile-update': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton"/>,
    '/change-location': <BackButton wrapclass="back-button-wrapper" cclass="normal-backbutton"/>
  }

  const butNormalViewPages = {
    '/board-detail': null
  }

  // NavBar를 변형하거나 보여주지 않는 페이지를 모아둔 오브젝트
  const noNavBarPages = {
    '/login': null,
    '/signup': null,
    '/about': null,
    '/bot': null,
    '/search': null,
    '/board/other/tip': <div><Navbar externaladdr='board'/><WriteButtonWithNav addr='board' /></div>,
    '/board/other/recipe': <div><Navbar externaladdr='board'/><WriteButtonWithNav addr='board' /></div>,
    '/board/other/deco': <div><Navbar externaladdr='board'/><WriteButtonWithNav addr='board' /></div>,
    '/board/other/getter': <div><Navbar externaladdr='board'/><WriteButtonWithNav addr='board' /></div>,
    '/board/other/purchase': <div><Navbar externaladdr='board'/><WriteButtonWithNav addr='board' /></div>,
    '/board/other/sos': <div><Navbar externaladdr='board'/><WriteButtonWithNav addr='board' /></div>,
    '/board-detail': null,
    '/board-detail/other/': null,
    '/board-detail/other/tip': null,
    '/board-create-form': null,
    '/board-update-form/other/': null,
    '/newsfeed': <div><Navbar externaladdr='newsfeed'/><WriteButtonWithNav addr='newsfeed' /></div>,
    '/feed-create-form': null,
    '/alarm': <Navbar externaladdr='alerts'/>,
    '/messages': null,
    '/Omessages': null,
    '/profile': null,
    '/following-list/my/': null,
    '/follower-list/my/': null,
    '/following-list/other/': null,
    '/follower-list': null,
    '/profile-update': null,
    '/profile/my/user-board': <WriteButton addr='board' />,
    '/profile/my/user-feed': <WriteButton addr='feed' />,
    '/profile/my/user-bookmark': null,
    '/profile/other/user-board': null,
    '/profile/other/user-feed': null,
    '/profile/other/user-bookmark': null,
    '/change-location': null
    
  }

  // 로그인이 필요한 페이지들
  const loginRequiredPages = [
    '/alarm',
    '/alarm/my/',
    '/alarm/other/',
    '/board-create-form',
    '/feed-create-form',
    '/board-update-form/my/',
    '/board-update-form/other/',
    '/profile-update',
    '/change-location',
    '/bot',
    '/messages',
    '/Omessages/my',
    '/Omessages/other',
    '/messages/my',
    '/messages/other',
  ]


  // 3.
  // TopAppBar를 그대로 보여줄지, 변형하거나 보여주지 말지 결정하는 변수
  let isTopBar = true
  
  // NavBar를 그대로 보여줄지, 변형하거나 보여주지 말지 결정하는 변수
  let isNavBar = true
  
  // TopAppBar나 NavBar가 없어도 다른 요소가 있어서 noTopView가 아닌 그냥 view를 적용해야할 때
  let isNormalView = false

  // 1이 2에 있는지 확인해서 있으면 3의 값을 true로
  if (now in noTopAppBarPages) {
    isTopBar = false
  }

  if (now in noNavBarPages) {
    isNavBar = false
  }

  if (now in butNormalViewPages) {
    isNormalView = true
  }

  // 로그인이 필요한 페이지에 로그인하지 않고 들어가면 로그인 하라는 페이지 나옴
  if (loginRequiredPages.includes(now) && !isLoggedIn) {
    setTimeout( function (){
      history.push('/about')
    }, 350)
  }

  // 로그인 상태 유지
  // 로컬 스토리지에는 저장되어 있으나, 새로고침 등의 이유로 인해 isLoggedIn이 false인 경우
  if(localStorage.getItem("isLoggedIn") === 'true' && isLoggedIn === false){
    dispatch(refreshInfo());
  }

  useEffect(() => {
    if (isLoggedIn === true && decodedToken.user_id !== undefined && decodedToken.user_id !== null){
      axios.post(`http://localhost:8080/user/profileinfo?userId=${decodedToken.user_id}`)
      .then((res) => {
        dispatch(getMyInfoAction(res.data))
        axios.get(`http://localhost:8080/user/totalBoard/${decodedToken.user_id}`)
          .then((res) => {
            dispatch(getPostCount(res.data))
            axios.post(`http://localhost:8080/alarm/unreadCount`, {
                userId: decodedToken.user_id
              })
              .then((res) => {
                dispatch(getUnreadAlram(res.data.countAlarm))
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
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
      <div className={ "my-auto " + 
        (
        // messages는 topappbar와 navbar 둘 다 없는 화면
        now === '/messages' || now === '/Omessages'? "" :
        // 탑바가 있거나, 없더라도 노말뷰를 원하는 페이지목록에 들어가 있으면
        // 다른 컴포넌트가 그 자리를 차지) view를 제공,
        // 아니면 noTopview를 제공
        (isTopBar || isNormalView? "view" : "noTopview")
        )
      }>
        { isLoggedIn
        ? <Route path="/" exact={true} component={Newsfeed} />
        : <Route path="/" exact={true} component={Login} />}
        
        
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/newsfeed" component={Newsfeed} />
        <Route path="/newsfeed/:name" component={NewsfeedList} />
        <Route path="/feed-create-form" component={NewsfeedWriteForm} />
        <Route path="/board" component={Board} />
        <Route path="/search" component={Search} />
        <Route path="/alarm" component={Alarm} />
        <Route exact path="/messages" component={Messages} />
        <Route path="/board/subnav1/" component={BoardSubNavbar1} />
        <Route path="/board/subnav2/" component={BoardSubNavbar2} />
        <Route path="/board/subnav1/:name" component={BoardGlobal} />
        <Route path="/board/subnav2/:name" component={BoardLocal} />
        <Route path="/board-detail/:id" component={BoardDetail} />
        <Route path="/board-create-form/" component={BoardForm} />
        <Route path="/board-update-form/:id" component={BoardUpdateForm} />
        <Route path="/following-list/:id" component={FollowingList} />
        <Route path="/follower-list/:id" component={FollowerList} />
        <Route path="/profile-update" component={MyProfileUpdate} />
        <Route path="/profile/:id/user-feed" component={UserFeed} />
        <Route path="/profile/:id/user-board" component={UserBoard} />
        <Route path="/profile/:id/user-bookmark" component={UserBookmark} />
        <Route path="/change-location" component={UserLocation} />
        <Route path="/alarm/:type" component={AlarmList} />
        <Route path="/bot" component={BotAlarm} />
        <Route path="/Omessages/:id" component={OtherMessages} />
        <Route path="/messages/:board_pk" component={GroupMessages} />

      </div>
      {/* Navbar를 보여주거나 변형하거나 / 숨김 */}
      { !isNavBar
      ? noNavBarPages[now]
      // : <Navbar />
      // 테스트용
      : <><Navbar /><p>{now}</p></>
      }
    </div>
  );
}

export default withRouter(App);
