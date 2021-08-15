import React from 'react';
import { Redirect } from 'react-router';
import NewsfeedNavbar from '../components/newsfeed/NewsfeedNavbar';
import NewsfeedForm from '../components/newsfeed/NewsfeedForm';

function Newsfeed({match}) {

  return (
    <div>
      <NewsfeedForm />
      <NewsfeedNavbar/>

      {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
      {match.isExact && 
        <Redirect to="/newsfeed/near" />
      }
    </div>
  )
}

export default Newsfeed;