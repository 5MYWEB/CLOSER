import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteBoard } from '../../modules/board';
import axios from 'axios';

const BoardDetail = ({match}) => {
  const dispatch = useDispatch();
  
  // 현재 피드의 정보
  const [board, setBoard] = useState({
    board_pk: '',
    userId: '',
    content: '',
    created_at: '',
    location: '',
  })

  // 현재 피드의 pk
  const pk = match.params.id;

  // 현재 로그인한 사용자의 아이디 가져오기
  const { userId } = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${pk}`)
    .then((res) => {
      console.log(res)
      setBoard({
        ...board,
        board_pk: res.data.board_pk,
        userId: res.data.userId,
        content: res.data.content,
        created_at: res.data.created_at,
        location: res.data.location,
      })
    })
    .catch((err) =>{
      console.log(err)
    })
  }, [])

  // 수정 버튼을 클릭했을 때 실행되는 함수
  const onClickUpdate = () => {

  }

  // 삭제 버튼을 클릭했을 때 실행되는 함수
  const onClickDelete = () => {
    // 삭제 의사 확인
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios.delete(`http://localhost:8080/board/${board.board_pk}`, { userId: userId })
      .then((res) => {
        console.log(res);
        dispatch(deleteBoard())
        alert('게시물이 삭제되었습니다.')
        // 삭제 후 페이지 뒤로가기
        // eslint-disable-next-line no-script-url
        return window.location.href = 'javascript:history.back();'
      })
      .catch((err) => {
        console.log(err)
      })
    }
  };

  return (
    <>
      <div>글 번호 : {board.board_pk}</div>
      <div>작성자 : {board.userId}</div>
      <div>내용 : {board.content}</div>
      <div>작성시간 : {board.created_at}</div>
      { userId === board.userId &&
        <div>
          <button onClick={onClickUpdate}>수정</button>
          <button onClick={onClickDelete}>삭제</button>
        </div>
      }
      <hr />
    </>
  )
}

export default BoardDetail;