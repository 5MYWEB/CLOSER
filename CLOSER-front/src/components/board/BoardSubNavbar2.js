import React from 'react';
import { Link, Route } from 'react-router-dom';

import BoardBuying from './BoardBuying';
import BoardGather from './BoardGather';
import BoardHelp from './BoardHelp';

function BoardSubNavbar2() {
  return (
      <div>
        <ul>
          <li>
            <Link to={ "/board/subnav2/buying" }>공동구매</Link>
          </li>
          <li>
            <Link to={"/board/subnav2/gather" }>클로저 모임</Link>
          </li>
          <li>
            <Link to={"/board/subnav2/help" }>도와주세요</Link>
          </li>
        </ul>
    
        <Route path="/board/subnav2/buying" component={BoardBuying} />
        <Route path="/board/subnav2/gather" component={BoardGather} />
        <Route path="/board/subnav2/help" component={BoardHelp} />

      </div>
  );
}

export default BoardSubNavbar2;