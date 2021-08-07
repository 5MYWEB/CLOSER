import React from 'react';
import { Link } from 'react-router-dom';

function BoardSubNavbar1() {
  return (
      <div>
        <ul>
          <li>
            <Link to={"/board/subnav1/recipe"}>한끼레시피</Link>
          </li>
          <li>
            <Link to={"/board/subnav1/tip" }>자취팁</Link>
          </li>
          <li>
            <Link to={"/board/subnav1/deco" }>홈데코</Link>
          </li>
        </ul>
      </div>
  );
}

export default BoardSubNavbar1;