import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getBoardList, getWeekBestList } from '../../modules/board';
import BoardItem from './BoardItem';

function BoardRecipe() {

  const dispatch = useDispatch();

  const { boardList, boardCreated, boardDeleted, boardUpdated } = useSelector((state) => state.board);

  useEffect(() => {
    axios.post('http://localhost:8080/board/gBoard/recipe/weekbest')
    .then((res) => {
      dispatch(getWeekBestList(res));
      console.log(res)
    })
    .catch((err) =>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCreated, boardDeleted])

  useEffect(() => {
    axios.post('http://localhost:8080/board/gBoard/recipe/new')
    .then((res) => {
      dispatch(getBoardList(res));
      console.log(res)
    })
    .catch((err) =>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCreated, boardDeleted])

  return (
    <>
      <div>
        이번주 베스트 레시피
        {/* 피드가 비어있지 않다면 피드목록을 불러옴*/}
        {boardList && 
          <div>
            {boardList.map((board) => {
              return (
                <BoardItem key={board.board_pk} board={board} />
              );
            })}
          </div>}
      </div>
      <hr />
      <div>
        레시피 최신순/인기순(토글 구현 필요)
        {/* 피드가 비어있지 않다면 피드목록을 불러옴*/}
        {boardList && 
          <div>
            {boardList.map((board) => {
              return (
                <BoardItem key={board.board_pk} board={board} />
              );
            })}
          </div>}
      </div>
    </>
  )
}

export default BoardRecipe;