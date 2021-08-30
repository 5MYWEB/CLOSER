import React from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import BoardNavbar from '../components/board/BoardNavbar'

function Newsfeed({match}) {

  const { boardNavbar0 }  = useSelector((state) => state.board);

  return (
    <div>
      <BoardNavbar/>
            
      {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
      {match.isExact && 
        <Redirect to={`${boardNavbar0}`} />
      }
    </div>
  )
}

export default Newsfeed;