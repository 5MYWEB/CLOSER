import React from 'react';
import { Link, Route } from 'react-router-dom';

import BoardSubNavbar1 from './BoardSubNavbar1';
import BoardSubNavbar2 from './BoardSubNavbar2';

function BoardNavbar() {
  return (
      <div>
        <ul>
          <li>
            <Link to={ "/board-create-form/" }>글 작성</Link>
          </li>
          <li>
            <Link to={ "/board/subnav1/" }>자취 피플</Link>
          </li>
          <li>
            <Link to={"/board/subnav2/" }>지역 피플</Link>
          </li>
        </ul>

        <Route path="/board/subnav1/" component={BoardSubNavbar1} />
        <Route path="/board/subnav2/" component={BoardSubNavbar2} />

      </div>
  );
}

export default BoardNavbar;