import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Newsfeed } from '../../pages';

const Menu = () => {
  return (
    <div>
      {/* 하단 바 */}
      <h2>Navbar</h2>
      <ul>
        <Link to="/newsfeed">뉴스피드</Link>
        <p>게시판</p>
        <p>알림</p>
        <p>DM</p>
      </ul>
      <hr />
      <Route path="/newsfeed" component={Newsfeed} />
    </div>

  )
}
export default Menu;