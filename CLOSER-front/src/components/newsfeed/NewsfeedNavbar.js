import React from 'react';
import { Link } from 'react-router-dom';

function NewsfeedNavbar() {
  return (
    <div>
        <div>
            <ul>
              <li>
                <Link to={"/newsfeed/near"}>NEAR</Link>
              </li>
              <li>
                <Link to={"/newsfeed/follow"}>FAVORITE</Link>
              </li>
              <li>
                <Link to={"/newsfeed/total"}>HOT</Link>
              </li>
            </ul>
        </div>
    </div>
  );
}

export default NewsfeedNavbar;