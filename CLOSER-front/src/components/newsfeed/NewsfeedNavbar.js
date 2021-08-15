import React from 'react';
import { Link } from 'react-router-dom';
import './NewsfeedNavbar.css';

function NewsfeedNavbar() {
  return (
    <div className="feedcontainer">
        <div className = "feedList">
            <div className = "feedNear">
              <Link to={"/newsfeed/near"} className="link-light">NEAR</Link>
            </div>

            <div className = "feedFavorite">
              <Link to={"/newsfeed/follow"} className="link-light" >FAVORITE</Link>
            </div>

            <div className = "feedHot">
              <Link to={"/newsfeed/total"} className="link-light">HOT</Link>
            </div>
        </div>
    </div>
  );
}

export default NewsfeedNavbar;