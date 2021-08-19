import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeNewsfeedNavbar } from '../../modules/board';
import { RippleTabItem } from '../../styles/index';
import './NewsfeedNavbar.css';

function NewsfeedNavbar({ history }) {

  const dispatch = useDispatch();

  const { newsfeedNavbar } = useSelector((state) => state.board)
  
  // 리플 탭 이동하는 주소
  const children = [
    ['NEAR', 'FAVORITE', 'ALL'],
    [
      '/newsfeed/near',
      '/newsfeed/follow',
      '/newsfeed/total'
    ]
  ]

  const onClickTap = ( e ) => {
    dispatch(changeNewsfeedNavbar(e.target.getAttribute('addr')))
    history.replace(e.target.getAttribute('addr'))
  }

  return (
    <div className="tabs-wrapper">
      <nav className="tabs">
        {/* default tab이 바깥을 눌렀을때 다시 강조표시되지않도록 */}
        <RippleTabItem cclass={ newsfeedNavbar === children[1][0]? "tab is-current" : "tab"} children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
        <RippleTabItem cclass={ newsfeedNavbar === children[1][1]? "tab is-current" : "tab"} children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
        <RippleTabItem cclass={ newsfeedNavbar === children[1][2]? "tab is-current" : "tab"} children={children[0][2]} onClick={onClickTap} addr={children[1][2]} />
        <div className="nav-underline"></div> 
      </nav>
    </div>

  );
}
export default withRouter(NewsfeedNavbar);