import React from 'react';
import { Redirect } from 'react-router';
import AlarmNavbar from '../components/alarm/AlarmNavbar';

function Alarm({match}) {

  return (
    <div>
      <AlarmNavbar />
      
      {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
      {match.isExact && 
        <Redirect to="/alarm/unread" />
      }
    </div>
  )
}

export default Alarm;