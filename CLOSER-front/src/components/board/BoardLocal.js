import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getBoardList } from '../../modules/board';
import BoardItem from './BoardItem';

function BoardGlobal({ match }) {

  const name = match.params.name
  
  const dispatch = useDispatch();

  const { boardList, boardCreated, boardDeleted, boardUpdated } = useSelector((state) => state.board);
  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    axios.post(`http://localhost:8080/board/lboard/${name}`, {
      location: userInfo.addr
    })
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
        클로저 {name === 'purchase' ? '공동구매해요' : name ==='getter' ? '지역 소모임' : name === 'sos' ? '도와주세요!' : '' }
        {/* 피드가 비어있지 않다면 피드목록을 불러옴*/}
        {boardList && boardList.length !== 0 ? 
          <div>
            {boardList.map((board) => {
              return (
                <BoardItem key={board.board_pk} board={board} />
              );
            })}
          </div>
          : 
          <div>
            게시글이 없습니다:(
          </div>
          }
      </div>
    </>
  )
}

export default BoardGlobal;