import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './BoardSubNavbar2.css';

function BoardSubNavbar1({match}) {
  return (
      <div className = "container2">
        <div className="boardTabList">
          <div className="boardTab1">
          <Link to={"/board/subnav1/recipe"} className="link-light">한끼레시피</Link>
          </div>

          <div className="boardTab2">
          <Link to={"/board/subnav1/tip" } className="link-light">자취팁</Link>
          </div>

          <div className="boardTab3">
          <Link to={"/board/subnav1/deco" } className="link-light">홈데코</Link>
          </div>
        </div>

        {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
        {match.isExact && 
          <Redirect to="/board/subnav1/tip" />
        }
      </div>
  );
}

export default BoardSubNavbar1;