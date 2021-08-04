import React from 'react';
import { Route } from 'react-router-dom';
// import React, { useState } from 'react';
import { TopAppBar, Navbar } from './components/frame/index';
import { Home, About, Login, SignUp, Profile, Newsfeed, Board } from './pages';
import NewsfeedDetail from './components/newsfeed/NewsfeedDetail'; // 뉴스피드 상세페이지
import BoardDetail from './components/board/BoardDetail'; // 게시판 상세페이지
import BoardForm from './components/board/BoardForm';

import './App.css';

function App() {
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  // const [ isSignedUp, setIsSignedUp ] = useState(false)

  return (
    <div>
      <TopAppBar />
      <div className="view my-auto">
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/newsfeed" component={Newsfeed} />
        <Route path="/board" component={Board} />
        <Route path="/newsfeed-detail/:id" component={NewsfeedDetail}></Route>
        <Route path="/board-detail/:id" component={BoardDetail}></Route>
        <Route path="/board-create-form/" component={BoardForm} />
        <Route path="/board-update-form/:id" component={BoardUpdateForm} />

      </div>
      <Navbar />
    </div>
  );
}

export default App;
