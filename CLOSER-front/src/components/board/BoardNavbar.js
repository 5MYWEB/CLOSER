import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeNavbar0 } from '../../modules/board';
import { RippleTabItem2 } from '../../styles/index';
import './BoardNavbar.css';

function BoardNavbar({ history }) {

  const dispatch = useDispatch();

  const { boardNavbar0 } = useSelector((state) => state.board)

  const children = [
    ['자취 게시판', '지역 게시판'],
    [
      '/board/subnav1/',
      '/board/subnav2/'
    ]
  ]

  const onClickTap = ( e ) => {
    dispatch(changeNavbar0(e.target.getAttribute('addr')))
    history.replace(e.target.getAttribute('addr'))
  }

  return (
    <div className="tabs-wrapper2">
      <nav className="tabs">
        <RippleTabItem2 cclass={boardNavbar0 === children[1][0]? "tab is-current":"tab"} children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
        <RippleTabItem2 cclass={boardNavbar0 === children[1][1]? "tab is-current":"tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
        <div className="nav-underline2"></div> 
      </nav>
    </div>

  );
}

export default withRouter(BoardNavbar);