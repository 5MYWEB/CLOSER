import React from 'react';
import { Route } from 'react-router-dom';
import { TopAppBar, Navbar } from './components/frame/index';
import { Home, About, Login, SignUp, Profile, Newsfeed, Board } from './pages';
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

import './App.css';

function App() {


  return (
    <div>
      <TopAppBar />
      <div className="view my-auto">
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/newsfeed" component={Newsfeed} />
        <Route path="/newsfeed/:name" component={NewsfeedList}></Route>
        <Route path="/board" component={Board} />
        <Route path="/board/subnav1/" component={BoardSubNavbar1} />
        <Route path="/board/subnav2/" component={BoardSubNavbar2} />
        <Route path="/board/subnav1/:name" component={BoardGlobal} />
        <Route path="/board/subnav2/:name" component={BoardLocal} />
        <Route path="/board-detail/:id" component={BoardDetail}></Route>
        <Route path="/board-create-form/" component={BoardForm} />
        <Route path="/board-update-form/:id" component={BoardUpdateForm} />
        <Route path="/:id/following-list" component={FollowingList} />
        <Route path="/:id/follower-list" component={FollowerList} />
        <Route path="/profile-update" component={MyProfileUpdate} />
        <Route path="/profile/:id/user-feed" component={UserFeed} />
        <Route path="/profile/:id/user-board" component={UserBoard} />
        <Route path="/profile/:id/user-bookmark" component={UserBookmark} />
      </div>
      <Navbar />
    </div>
  );
}

export default App;
