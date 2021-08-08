import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

function BoardItem({ board }) {


  // 좋아요, 댓글, 북마크 갯수
  const [countLike, setCountLike] = useState(0)
  const [countBookmark, setCountBookmark] = useState(0)
  const [countComment, setCountComment] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${board.board_pk}/comment`)
    .then((res) => {
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.post(`http://localhost:8080/board/${board.board_pk}/info-cnt`)
    .then((res) => {
      setCountLike(res.data.countLike)
      setCountBookmark(res.data.countBookmark)
      setCountComment(res.data.countComment)
    })
    .catch((err) => {
      console.log(err)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <br />
        <div>작성자 : {board.nickname}</div>
      <Link to={`/board-detail/${board.board_pk}`}>
        {board.title !== null && 
          <div>제목: {board.title}</div>
        }
        <div>내용 : {board.content}</div>
      </Link>
        <div>작성시간 : {board.created_at}</div>
        <div>댓글 {countComment} | 좋아요 {countLike} | 북마크 {countBookmark}</div>
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