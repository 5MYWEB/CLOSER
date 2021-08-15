import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './BoardSubNavbar2.css';

function BoardSubNavbar2({match}) {
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

        {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
        {match.isExact && 
          <Redirect to="/board/subnav2/getter" />
        }
      </div>
  );
}

export default BoardSubNavbar2;