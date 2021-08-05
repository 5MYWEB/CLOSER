import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardList } from '../../modules/board';
import axios from 'axios';
import BoardItem from '../board/BoardItem';

const UserBookmark = ({ match }) => {

  const dispatch = useDispatch();
  
  const userId = match.params.id

  // 리덕스의 feedList, feedCreated, feedDeleted 불러옴
  const { boardList } = useSelector((state) => state.board);

  // 리덕스에 feedList가 state로 담김
  useEffect(() => {
    axios.get(`http://localhost:8080/user/bookmark/${userId}`)
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
      {boardList && 
        <div>
          {boardList.map((board) => {
            return (
              <BoardItem key={board.board_pk} board={board} />
            );
          })}
        </div>}
    </>
  )
};

export default UserBookmark;