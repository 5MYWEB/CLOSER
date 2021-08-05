import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

function BoardItem({ board }) {

  // 댓글 개수
  const [listLength, setListLength] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${board.board_pk}/comment`)
    .then((res) => {
      setListLength(res.data.length)
    })
    .catch((err)=>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <br />
        <div>작성자 : {board.nickname}</div>
      <Link to={`/board-detail/${board.board_pk}`}>
        <div>제목: {board.title}</div>
        <div>내용 : {board.content}</div>
      </Link>
        <div>작성시간 : {board.created_at}</div>
        <div>댓글 {listLength}개</div>
    </>
  )
}

BoardItem.propTypes = {
  board: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default BoardItem;