import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/theme.css';
import './BoardNavbar.css';

function BoardNavbar() {
  return (
    <div className="boardcontainer">
      <div className="tabList">
        <div className = "board1">
          <Link to={ "/board/subnav1/" } class="link-light" >자취 게시판</Link>
        </div>

        <div className = "board2">
        <Link to={"/board/subnav2/" } class="link-light" >지역 게시판</Link>
        </div>
      </div>
    
    {/* <div>
      <button class = "writeBtn">
        <Link to={ "/board-create-form/" } class="link-dark">글 작성</Link> 
      </button>
    </div> */}

    </div>
  );
}

export default BoardNavbar;