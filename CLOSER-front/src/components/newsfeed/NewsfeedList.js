import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BoardItem from '../board/BoardItem';
import { getBoardList } from '../../modules/board';
import axios from 'axios';

const NewsfeedHot = ({match}) => {

  const name = match.params.name
  
  const dispatch = useDispatch();
  
  // 리덕스의 boardList, boardCreated, boardDeleted 불러옴
  const { boardList, boardCreated, boardDeleted } = useSelector((state) => state.board);
  const { addr } = useSelector((state) => state.user.userInfo);

  // useEffect: 컴포넌트가 렌더될때 이 부분을 실행함
  // 전체 피드 리스트를 요청하고 응답을 액션함수로 보냄
  // 리덕스에 boardList가 state로 담김
  useEffect(() => {
    axios.get(`http://localhost:8080/board/feed/${name}`, {
      params: {
        location: addr
      }
    })
    .then((res) => {
      dispatch(getBoardList(res));
    })
    .catch((err) =>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCreated, boardDeleted, name])

  return (
    <>
      {name === 'total' ? '최신' : name ==='follow' ? '친구들의' : name === 'near' ? '근처에서 올라온' : '' } 피드
      {/* 피드가 비어있지 않다면 피드목록을 불러옴*/}
      {boardList && 
        <div>
          {boardList.map((board) => {
            return (
              <BoardItem key={board.board_pk} board={board}/>
            );
          })}
        </div>}
    </>
  )
}

export default NewsfeedHot;