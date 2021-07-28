import React from 'react';
import { Link, Route } from 'react-router-dom';

import NewsfeedNear from './NewsfeedNear';
import NewsfeedFavorite from './NewsfeedFavorite';
import NewsfeedHot from './NewsfeedHot';

function NewsfeedNavbar() {
  return (
    <div>
        <div>
            <ul>
              <li>
                <Link to={"/newsfeed/near"}>NEAR(구현중 - 위치정보 필요)</Link>
              </li>
              <li>
                <Link to={"/newsfeed/favorite"}>FAVORITE(구현중 - 유저정보 필요)</Link>
              </li>
              <li>
                <Link to={"/newsfeed/hot"}>HOT</Link>
              </li>
            </ul>
        </div>
        
      <Route path="/newsfeed/near" component={NewsfeedNear}></Route>
      <Route path="/newsfeed/favorite" component={NewsfeedFavorite}></Route>
      <Route path="/newsfeed/hot" component={NewsfeedHot}></Route>
    </div>
  );
}

export default NewsfeedNavbar;