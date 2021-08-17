import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { RippleTabItem2 } from '../../styles/index';
import './AlarmNavbar.css';
import '../../styles/theme.css'

function AlarmNavbar({history}) {

  const { alarmList, userInfo } = useSelector((state) => state.user);
  const [ unreadCount, setUnreadCount ] = useState(0);
  const [nowTab, setNowTab] = useState('/alarm/unread/')

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

  const children = [
    ['미확인', '전체'],
    [
      '/alarm/unread/',
      '/alarm/all/'
    ]
  ]

  const onClickTap = ( e ) => {
    history.replace(e.target.getAttribute('addr'))
    setNowTab(e.target.getAttribute('addr'))
  }


  return(
  <div className="tabs-wrapper2">
    { unreadCount > 0 &&
      <span className="badge rounded-pill bg-danger m-1 alarm-fixed">{unreadCount}</span>
    }
    <nav className="tabs">
      <RippleTabItem2 cclass={nowTab === children[1][0]? "tab is-current":"tab"} children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
      <RippleTabItem2 cclass={nowTab === children[1][1]? "tab is-current":"tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
      <div className="nav-underline2"></div> 
    </nav>
  </div>


  )
}

export default withRouter(AlarmNavbar);