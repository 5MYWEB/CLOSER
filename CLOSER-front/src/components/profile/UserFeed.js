import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardList } from '../../modules/board';
import axios from 'axios';
import BoardItem from '../board/BoardItem';

const UserFeed = ({ match }) => {

  const dispatch = useDispatch();
  
  const userId = match.params.id

  // 리덕스의 boardList, boardCreated, boardDeleted 불러옴
  const { boardList } = useSelector((state) => state.board);

  // 리덕스에 boardList가 state로 담김
  useEffect(() => {
    axios.get(`http://localhost:8080/user/feed/${userId}`)
    .then((res) => {
      dispatch(getBoardList(res));
    })
    .catch((err) =>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* 피드가 비어있지 않다면 피드목록을 불러옴*/}
      {boardList !== null && boardList.length > 0 ?
        <div>
          {boardList.map((board) => {
            return (
              <BoardItem key={board.board_pk} board={board} />
            );
          })}
        </div>
      :
        <div className="d-flex justify-content-center mt-1">작성한 피드가 없어요!</div>
    }
    </>
  )
};

export default UserFeed;