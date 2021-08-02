import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Newsfeed, Board } from '../../pages';
import NewsfeedDetail from '../newsfeed/NewsfeedDetail'; // 뉴스피드 상세페이지

const Menu = () => {
  return (
    <div className="fixed-bottom">
      {/* 하단 바 */}
      <h2>Navbar</h2>
      <ul>
        <li><Link to="/newsfeed">뉴스피드</Link></li>
        <li><Link to="/board">게시판</Link></li>
        <li>알림</li>
        <li>DM</li>
      </ul>
      <Route path="/newsfeed" component={Newsfeed} />
      <Route path="/board" component={Board} />
      <Route path="/newsfeed-detail/:id" component={NewsfeedDetail}></Route>
    </div>

  )
}
export default Menu;