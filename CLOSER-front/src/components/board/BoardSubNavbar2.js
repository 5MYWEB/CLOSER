import React from 'react';
import { Link } from 'react-router-dom';

function BoardSubNavbar2() {
  return (
      <div className = "container2">
        <ul>
          <li>
            <Link to={ "/board/subnav2/purchase" }>공동구매</Link>
          </li>
          <li>
            <Link to={"/board/subnav2/getter" }>클로저 모임</Link>
          </li>
          <li>
            <Link to={"/board/subnav2/sos" }>도와주세요</Link>
          </li>
        </ul>
      </div>
  );
}

export default BoardSubNavbar2;