import React from 'react';
import { Link } from 'react-router-dom';
// import { Newsfeed, Board } from '../../pages';
// import NewsfeedDetail from '../newsfeed/NewsfeedDetail'; // 뉴스피드 상세페이지
// import BoardDetail from '../board/BoardDetail'; // 게시판 상세페이지
// import BoardForm from '../board/BoardForm';

const Menu = () => {
  return (
    <div className="fixed-bottom">
      {/* 하단 바 */}
      {/* <Route path="/newsfeed" component={Newsfeed} />
      <Route path="/board" component={Board} />
      <Route path="/newsfeed-detail/:id" component={NewsfeedDetail}></Route>
      <Route path="/board-detail/:id" component={BoardDetail}></Route>
      <Route path="/board-create-form/" component={BoardForm} /> */}
      
      <div className="d-flex">
        <ul className="row">
          <li className="col"><Link to="/newsfeed">뉴스피드</Link></li>
          <li className="col"><Link to="/board">게시판</Link></li>
          <li className="col">알림</li>
          <li className="col">DM</li>
        </ul>
      </div>
    </div>

  )
}
export default Menu;