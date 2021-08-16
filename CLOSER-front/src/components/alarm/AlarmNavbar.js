import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AlarmNavbar.css';

function AlarmNavbar() {

  const { alarmList, userInfo } = useSelector((state) => state.user);

  const [ unreadCount, setUnreadCount ] = useState(0);

  useEffect(() => {
    // 안읽은 알림 개수
    axios.post(`http://localhost:8080/alarm/unreadCount`, {
      userId: userInfo.userId
    })
    .then((res) => {
      setUnreadCount(res.data.countAlarm)
    })
    .catch((err) => {
      console.log(err)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alarmList])


  return(
    <div className="alarmcontainer">
      <div className="tabList">
        <div className="alarm-read">
          <Link to="/alarm/unread/" className="link-light">
            <div>
              미확인
              { unreadCount > 0 &&
                <span className="badge rounded-pill bg-danger m-1">{unreadCount}</span>
              }
            </div>
          </Link>
        </div>
        <div className="alarm-all">
          <Link to="/alarm/all/" className="link-light">전체</Link>
        </div>
      </div>
    </div>

  )
}

export default AlarmNavbar;