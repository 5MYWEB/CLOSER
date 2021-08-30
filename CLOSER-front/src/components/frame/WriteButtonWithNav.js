import { withRouter  } from 'react-router-dom';
import { RippleIcon } from '../../styles/index';
import pencilSolid from '../../assets/pencil-alt-solid.svg'
import '../../styles/theme.css'

const WriteButton = ( {history, addr} ) => {

  const onClickWriteNewsfeed = () => {
    setTimeout( function() {
      history.push('/feed-create-form')
    }, 350);
  }

  const onClickWriteBoard = () => {
    setTimeout( function() {
      history.replace('/board-create-form')
    }, 350);
  }

  return (
    (addr === 'board')
    ? <RippleIcon src={pencilSolid} alt="pencilSolid" id="pencilSolid" cclass="write-button-with-nav" onClick={onClickWriteBoard}/>
    : <RippleIcon src={pencilSolid} alt="pencilSolid" id="pencilSolid" cclass="write-button-with-nav" onClick={onClickWriteNewsfeed} />
  )
}

export default withRouter(WriteButton);

