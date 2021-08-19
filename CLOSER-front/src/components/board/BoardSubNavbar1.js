import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { RippleTabItem } from '../../styles/index';
import './BoardSubNavbar2.css';

function BoardSubNavbar1({match, history}) {

  const [nowTab, setNowTab] = useState(`/newsfeed/tip`)

  // 리플 탭 이동하는 주소
  const children = [
    ['한끼레시피', '자취팁', '홈데코'],
    [
      '/board/subnav1/recipe',
      '/board/subnav1/tip',
      '/board/subnav1/deco'
    ]
  ]

  const onClickTap = ( e ) => {
    setNowTab(e.target.getAttribute('addr'))
    history.replace(e.target.getAttribute('addr'))
  }

  return (
    <div className="tabs-wrapper2">
      <nav className="tabs">
        <RippleTabItem cclass="tab is-current" children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
        <RippleTabItem cclass={ nowTab === children[1][1]? "tab is-current" : "tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
        <RippleTabItem cclass={ nowTab === children[1][2]? "tab is-current" : "tab"} children={children[0][2]} onClick={onClickTap} addr={children[1][2]} />
        <div className="nav-underline"></div> 
      </nav>

      {/* 기본 설정 */}
      {match.isExact && 
        <Redirect to="/board/subnav1/tip" />
      }
    </div>
  );
}

export default BoardSubNavbar1;