import React from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { changeNavbar2 } from '../../modules/board';
import { RippleTabItem } from '../../styles/index';
import './BoardSubNavbar2.css';

function BoardSubNavbar2({match, history}) {

  const dispatch = useDispatch();

  const { boardNavbar2 } = useSelector((state) => state.board)

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
    dispatch(changeNavbar2(e.target.getAttribute('addr')))
    history.replace(e.target.getAttribute('addr'))
  }


  return (

      <div className="tabs-wrapper2">
        <nav className="tabs">
          <RippleTabItem cclass={ boardNavbar2 === children[1][0]? "tab is-current" : "tab"} children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
          <RippleTabItem cclass={ boardNavbar2 === children[1][1]? "tab is-current" : "tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
          <RippleTabItem cclass={ boardNavbar2 === children[1][2]? "tab is-current" : "tab"} children={children[0][2]} onClick={onClickTap} addr={children[1][2]} />
          <div className="nav-underline"></div> 
        </nav>

        {/* 기본 설정 */}
        {match.isExact && 
          <Redirect to={`${boardNavbar2}`} />
        }
      </div>
  );
}

export default BoardSubNavbar2;