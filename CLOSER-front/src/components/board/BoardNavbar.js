import React from 'react';
import { withRouter  } from 'react-router-dom';
import { RippleTabItem2 } from '../../styles/index';
import './BoardNavbar.css';

function BoardNavbar({ history }) {

  const children = [
    ['자취 게시판', '지역 게시판'],
    [
      '/board/subnav1/',
      '/board/subnav2/'
    ]
  ]

  const onClickTap = ( e ) => {
    history.push(e.target.getAttribute('addr'))
  }

  return (
    <div className="tabs-wrapper">
      <nav className="tabs">
        <RippleTabItem2 cclass="tab is-current" children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
        <RippleTabItem2 cclass="tab" children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
        <div className="nav-underline2"></div> 
      </nav>
    </div>
  );
}

export default withRouter(BoardNavbar);