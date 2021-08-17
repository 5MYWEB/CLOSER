import React from 'react'
import { withRouter  } from 'react-router-dom';
import { RippleBackButton } from '../../styles/index';
import backButton from '../../assets/arrow-left-solid.svg'


const BackButton = ({ history, cclass, wrapclass}) => {
  
  // 뒤로가기를 막는 로직
  const url = history.location.pathname.split("/")[1];

  const onClick = () => {
    setTimeout( function() {
      console.log(history.location)
      // 게시글 작성과 같은 일을 했다면 
      // 제출 시 created state를 달아 보냈으므로 이를 확인해서 다시 form으로 가지 않도록 두개 뒤로 이동
      if (history.location.state === 'created') {
        console.log('?')
        history.go(-2)
      } else if (history.location.state === 'profile') {
        history.go(-3)
      } else {
        history.goBack();
      }
    }, 350);
  }

  return (
    <div className={wrapclass}>
      <RippleBackButton src={backButton} alt="backButton" cclass={`back-button ${cclass}`} onClick={onClick} />
    </div>
  )
}
export default withRouter(BackButton);