import React from 'react';
import { Link, Route } from 'react-router-dom';

import NewsfeedNear from './NewsfeedNear';
import NewsfeedFavorite from './NewsfeedFavorite';
import NewsfeedHot from './NewsfeedHot';

function NewsfeedNavbar() {
  return (
    <div>
      <nav className="Nav">
        <div className="Nav__container">
          <div className="Nav__right">
            <ul className="Nav__item-wrapper">
              <li className="Nav__item">
                <Link className="Nav__link" to={ "/newsfeed/near" }>NEAR</Link>
              </li>
              <li className="Nav__item">
                <Link className="Nav__link" to={"/newsfeed/favorite" }>FAVORITE</Link>
              </li>
              <li className="Nav__item">
                <Link className="Nav__link" to={"/newsfeed/hot" }>HOT</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <Route path="/newsfeed/near" component={NewsfeedNear}></Route>
      <Route path="/newsfeed/favorite" component={NewsfeedFavorite}></Route>
      <Route path="/newsfeed/hot" component={NewsfeedHot}></Route>
    </div>
  );
}

export default NewsfeedNavbar;