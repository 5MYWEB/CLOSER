import React from 'react';
import { Link } from 'react-router-dom';
import './BoardSubNavbar2.css';

function BoardSubNavbar1() {
  return (
      <div className = "container2">
        <div className="boardTabList">
          <div className="boardTab1">
          <Link to={"/board/subnav1/recipe"} class="link-light">한끼레시피</Link>
          </div>

          <div className="boardTab2">
          <Link to={"/board/subnav1/tip" } class="link-light">자취팁</Link>
          </div>

          <div className="boardTab3">
          <Link to={"/board/subnav1/deco" } class="link-light">홈데코</Link>
          </div>
        </div>

        {/* <button class = "writeBtn">
          <Link to={ "/board-create-form/" } class="link-dark">글 작성</Link> 
        </button> */}
      </div>
  );
}

export default BoardSubNavbar1;