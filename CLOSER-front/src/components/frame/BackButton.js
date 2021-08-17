import React from 'react'
import { withRouter  } from 'react-router-dom';
import { RippleBackButton } from '../../styles/index';
import backButton from '../../assets/arrow-left-solid.svg'


const BackButton = ({ history, cclass, wrapclass}) => {
  
  const onClick = () => {

    setTimeout( function() {
      // 게시글 작성과 같은 일을 했다면 
      // 제출 시 created state를 달아 보냈으므로 이를 확인해서 다시 form으로 가지 않도록 두개 뒤로 이동
      console.log(history.location.state)
      if (history.location.state === 'created') {
        history.go(-2)
      // 뒤로가기를 하면 안되는 login, signup을 했을 경우
      } else if (history.location.state === 'signed') {
        history.block()
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