import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RippleTabItem2 } from '../../styles/index';
import './AlarmNavbar.css';
import '../../styles/theme.css'

function AlarmNavbar({history}) {

  const { unreadAlarmCount } = useSelector((state) => state.user);
  const [nowTab, setNowTab] = useState('/alarm/unread/')
  // const unreadCountPill =div <span className="badge rounded-pill bg-danger m-1 alarm-fixed">{unreadCount}</span>

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
    { unreadAlarmCount > 0 &&
      <span className="badge rounded-pill bg-danger m-1 alarm-fixed">{unreadAlarmCount}</span>
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