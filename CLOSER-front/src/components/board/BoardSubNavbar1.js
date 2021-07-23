import React from 'react';
import { Link, Route } from 'react-router-dom';

import BoardRecipe from './BoardRecipe';
import BoardTip from './BoardTip';
import BoardHomeDeco from './BoardHomeDeco';

function BoardSubNavbar1() {
  return (
      <div>
        <ul>
          <li>
            <Link to={ "/board/subnav1/recipe" }>한끼레시피</Link>
          </li>
          <li>
            <Link to={"/board/subnav1/tip" }>자취팁</Link>
          </li>
          <li>
            <Link to={"/board/subnav1/homedeco" }>홈데코</Link>
          </li>
        </ul>
    
        <Route path="/board/subnav1/recipe" component={BoardRecipe} />
        <Route path="/board/subnav1/tip" component={BoardTip} />
        <Route path="/board/subnav1/homedeco" component={BoardHomeDeco} />

      </div>
  );
}

export default BoardSubNavbar1;