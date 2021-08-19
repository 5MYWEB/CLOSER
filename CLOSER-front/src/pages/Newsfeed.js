import React from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import NewsfeedNavbar from '../components/newsfeed/NewsfeedNavbar';
import NewsfeedForm from '../components/newsfeed/NewsfeedForm';

function Newsfeed({match}) {

  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <NewsfeedForm />
      <NewsfeedNavbar/>
      
      {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
      {match.isExact &&
        isLoggedIn
          ? <Redirect to="/newsfeed/near" />
          : <Redirect to="/newsfeed/total" />
      }
    </div>
  )
}

export default Newsfeed;