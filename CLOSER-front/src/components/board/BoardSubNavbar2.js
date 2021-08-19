import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { RippleTabItem } from '../../styles/index';
import './BoardSubNavbar2.css';

function BoardSubNavbar2({match, history}) {

  const [nowTab, setNowTab] = useState(`/newsfeed/tip`)

  // 리플 탭 이동하는 주소
  const children = [
    ['공동구매', '클로저 모임', '도와주세요'],
    [
      '/board/subnav2/purchase',
      '/board/subnav2/getter',
      '/board/subnav2/sos'
    ]
  ]

  const onClickTap = ( e ) => {
    setNowTab(e.target.getAttribute('addr'))
    history.replace(e.target.getAttribute('addr'))
  }

  return (

      <div className="tabs-wrapper2">
        <nav className="tabs">
          <RippleTabItem cclass="tab" children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
          <RippleTabItem cclass={ nowTab === children[1][1]? "tab is-current" : "tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
          <RippleTabItem cclass={ nowTab === children[1][2]? "tab is-current" : "tab"} children={children[0][2]} onClick={onClickTap} addr={children[1][2]} />
          <div className="nav-underline"></div> 
        </nav>

        {/* 정확히 /alarm으로 들어오면, /alarm/unread로 리다이렉트해줌 */}
        {match.isExact && 
          <Redirect to="/board/subnav2/getter" />
        }
      </div>
  );
}

export default BoardSubNavbar2;