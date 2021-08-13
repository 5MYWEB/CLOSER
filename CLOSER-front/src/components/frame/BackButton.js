import React from 'react'
import { withRouter  } from 'react-router-dom';
import { RippleBackButton } from '../../styles/index';
import backButton from '../../assets/arrow-left-solid.svg'


const BackButton = ({ history, cclass}) => {
  
  const onClick = ( ) => {
    setTimeout( function() {
      history.goBack();
    }, 350);
  }

  return (
    <div class="back-button-wrapper">
      <RippleBackButton src={backButton} alt="backButton" cclass={`back-button ${cclass}`} onClick={onClick} />
    </div>
  )
}
export default withRouter(BackButton);