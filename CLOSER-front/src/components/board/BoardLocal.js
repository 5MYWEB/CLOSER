import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getBoardList } from '../../modules/board';
import BoardItem from './BoardItem';
import { Row, Container } from 'react-bootstrap';

function BoardGlobal({ match }) {

  const name = match.params.name
  
  const dispatch = useDispatch();

  const { boardList, boardCreated, boardDeleted, boardUpdated } = useSelector((state) => state.board);
  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    console.log(userInfo.imgUrls);

    axios.post(`http://localhost:8080/board/lboard/${name}?location=${userInfo.addr}`)
    .then((res) => {
      dispatch(getBoardList(res));
    })
    .catch((err) =>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCreated, boardDeleted, boardUpdated, name])

  return (
    <>
      <div>
        <div className="ms-3 my-3 fw-bold">
          내 동네: {userInfo.addr.split(" ").slice(1, 3).join(" ")}
        </div>
        <div className="fs-3 ms-3 my-3 fw-bold">
          클로저 
          {
            name === 
            'purchase' ? <span>에서 <span className="fw-bolder" style={{color: "#5552FF"}}>공동구매</span>해요</span> 
            : name === 'getter' ? <span>에서 <span className="fw-bolder" style={{color: "#5552FF"}}>동네 모임</span> 구해봐요</span> 
            : name === 'sos' ? <span className="fw-bolder" style={{color: "#5552FF"}}> 도와주세요!</span> 
            : '' 
          }
        </div>
        {/* 목록이 비어있지 않다면 목록을 불러옴*/}
        {boardList && boardList.length !== 0 ? 
          <div>
            {boardList.map((board) => {
              return (
                <BoardItem key={board.board_pk} board={board} />
              );
            })}
          </div>
          : 
          <Container className="px-0">
            <Row className="g-0 mt-2">
              게시글이 없습니다:(
            </Row>
          </Container>
          }
      </div>
    </>
  )
}

export default BoardGlobal;