import React from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { changeNavbar1 } from '../../modules/board';
import { RippleTabItem } from '../../styles/index';
import './BoardSubNavbar2.css';

function BoardSubNavbar1({match, history}) {

  const dispatch = useDispatch();

  const { boardNavbar1 } = useSelector((state) => state.board)

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
    dispatch(changeNavbar1(e.target.getAttribute('addr')))
    history.replace(e.target.getAttribute('addr'))
  }

  return (
    <div className="tabs-wrapper2">
      <nav className="tabs">
        <RippleTabItem cclass={ boardNavbar1 === children[1][0]? "tab is-current" : "tab"} children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
        <RippleTabItem cclass={ boardNavbar1 === children[1][1]? "tab is-current" : "tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
        <RippleTabItem cclass={ boardNavbar1 === children[1][2]? "tab is-current" : "tab"} children={children[0][2]} onClick={onClickTap} addr={children[1][2]} />
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