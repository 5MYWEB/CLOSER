import React from 'react';
import { Redirect } from 'react-router';
import BoardNavbar from '../components/board/BoardNavbar'

function Newsfeed({match}) {

  return (
    <div>
      <BoardNavbar/>
            
      {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
      {match.isExact && 
        <Redirect to="/board/subnav1/tip" />
      }
    </div>
  )
}

export default Newsfeed;