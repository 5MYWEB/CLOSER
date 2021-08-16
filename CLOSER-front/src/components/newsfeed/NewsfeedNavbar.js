import React from 'react';
import { withRouter  } from 'react-router-dom';
import { RippleTabItem } from '../../styles/index';
import './NewsfeedNavbar.css';

function NewsfeedNavbar({ history }) {

  // 리플 탭 이동하는 주소
  const children = [
    ['NEAR', 'FAVORITE', 'HOT'],
    [
      `/newsfeed/near`,
      `/newsfeed/follow`,
      `/newsfeed/total`
    ]
  ]

  const onClickTap = ( e ) => {
    history.push(e.target.getAttribute('addr'))
  }

  return (
    <div className="tabs-wrapper">
      <nav className="tabs">
        <RippleTabItem cclass="tab is-current" children={children[0][0]} onClick={onClickTap} addr={children[1][0]} />
        <RippleTabItem cclass="tab" children={children[0][1]} onClick={onClickTap} addr={children[1][1]} />
        <RippleTabItem cclass="tab" children={children[0][2]} onClick={onClickTap} addr={children[1][2]} />
        <div className="nav-underline"></div> 
      </nav>
    </div>

  );
}
export default withRouter(NewsfeedNavbar);