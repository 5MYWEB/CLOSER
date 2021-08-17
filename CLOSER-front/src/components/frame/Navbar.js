import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

const Navbar = ({externaladdr, history}) => {

  const [iconLight, setIconLight] = useState('');
  
  useEffect(() => {
    setIconLight(externaladdr)
  }, [externaladdr]);


  const onClick = (e) => {
      // now에 클릭한 아이콘의 id를 값으로 넣음
      setIconLight(e.target.id);
    }

  const onClickMessages = (e) => {
    // now에 클릭한 아이콘의 id를 값으로 넣음
    setIconLight(e.target.id);
    setTimeout( function () {
      history.push('/messages')
    }, 350);
  }

  return (
    <div className="d-flex nav-wrapper align-items-center justify-content-between">
      {
      iconLight === 'newsfeed'
      ? <Link to="/newsfeed"><RippleIcon src={newsfeedOn} alt="newsfeedOn" id="newsfeed"  onClick={onClick} /></Link>
      : <Link to="/newsfeed"><RippleIcon src={newsfeedOff} alt="newsfeedOff" id="newsfeed"  onClick={onClick} /></Link>
      }
      {
      iconLight === 'board'
      ? <Link to="/board"><RippleIcon src={boardOn} alt="boardOn" id="board" cclass="board" onClick={onClick} /></Link>
      : <Link to="/board"><RippleIcon src={boardOff} alt="boardOff" id="board" cclass="board" onClick={onClick} /></Link>
      }
      {
      iconLight === 'alerts'
      ? <Link to="/alarm"><RippleIcon src={alertsOn} alt="alertsOn" id="alerts" onClick={onClick} /></Link> 
      : <Link to="/alarm"><RippleIcon src={alertsOff} alt="alertsOff" id="alerts" onClick={onClick} /></Link>
      }
      {
      iconLight === 'messages'
          ? <RippleIcon src={messagesOn} alt="messagesOn" id="messages" onClick={onClickMessages} />
          : <RippleIcon src={messagedOff} alt="messagedOff" id="messages" onClick={onClickMessages} />
      }
    </div>
  )
}
export default withRouter(Navbar);