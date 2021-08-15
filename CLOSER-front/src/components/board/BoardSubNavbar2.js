import React from 'react';
import { Link } from 'react-router-dom';
import './BoardSubNavbar2.css';

function BoardSubNavbar2() {
  return (
      <div className = "container2">
        <div className="boardTabList">
          <div className="boardTab1">
            <Link to={ "/board/subnav2/purchase" } className="link-light">공동구매</Link>
          </div>

          <div className="boardTab2">
            <Link to={"/board/subnav2/getter" } className="link-light">클로저 모임</Link>
          </div>

          <div className="boardTab3">
            <Link to={"/board/subnav2/sos" } className="link-light">도와주세요</Link>
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

export default BoardSubNavbar2;