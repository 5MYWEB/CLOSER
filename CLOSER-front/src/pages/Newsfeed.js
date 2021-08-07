import React from 'react';
import NewsfeedNavbar from '../components/newsfeed/NewsfeedNavbar';
import NewsfeedForm from '../components/newsfeed/NewsfeedForm';

function Newsfeed({ match }) {
  console.log(match.path)

  return (
    <div>
      <NewsfeedForm />
      <NewsfeedNavbar/>
    </div>
  )
}

export default Newsfeed;