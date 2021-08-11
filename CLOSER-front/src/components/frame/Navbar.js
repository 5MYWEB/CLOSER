import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RippleIcon } from '../../styles/index';
import newsfeedOn from '../../assets/newsfeed-on.svg'
import newsfeedOff from '../../assets/newsfeed-off.svg'
import boardOn from '../../assets/board-on.svg'
import boardOff from '../../assets/board-off.svg'
import alertsOn from '../../assets/alerts-on.svg'
import alertsOff from '../../assets/alerts-off.svg'
import messagesOn from '../../assets/messages-on.svg'
import messagedOff from '../../assets/messages-off.svg'

import './Navbar.css';
import '../../styles/theme.css'

const Menu = () => {

  const [iconLight, setIconLight] = useState('');

  const onClick = (e) => {
      // now에 클릭한 아이콘의 id를 값으로 넣음
      setIconLight(e.target.id);
    }


  return (
    <div className="d-flex nav-wrapper align-items-center justify-content-between">
      {
      iconLight === 'newsfeed'
      ? <Link to="/newsfeed"><RippleIcon src={newsfeedOn} alt="newsfeedOn" id="newsfeed" cclass="newsfeed" onClick={onClick} /></Link>
      : <Link to="/newsfeed"><RippleIcon src={newsfeedOff} alt="newsfeedOff" id="newsfeed" cclass="newsfeed" onClick={onClick} /></Link>
      }
      {
      iconLight === 'board'
          ? <Link to="/board"><RippleIcon src={boardOn} alt="boardOn" id="board" cclass="board" onClick={onClick} /></Link>
      : <Link to="/board"><RippleIcon src={boardOff} alt="boardOff" id="board" cclass="board" onClick={onClick} /></Link>
      }
      {
      iconLight === 'alerts'
      ? <RippleIcon src={alertsOn} alt="alertsOn" id="alerts" cclass="alerts" onClick={onClick} />
      : <RippleIcon src={alertsOff} alt="alertsOff" id="alerts" cclass="alerts" onClick={onClick} />
      }
      {
      iconLight === 'messages'
          ? <Link to="/messages"><RippleIcon src={messagesOn} alt="messagesOn" id="messages" cclass="messages" onClick={onClick} /></Link>
          : <Link to="/messages"><RippleIcon src={messagedOff} alt="messagedOff" id="messages" cclass="messages" onClick={onClick} /></Link>
      }
    </div>
  )
}
export default Menu;