import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function BoardItem({ board }) {

  return (
    <>
      <br />
        <div>작성자 : {board.userId}</div>
      <Link to={`/board-detail/${board.board_pk}`}>
        <div>제목: {board.title}</div>
        <div>내용 : {board.content}</div>
      </Link>
        <div>작성시간 : {board.created_at}</div>
    </>
  )
}

BoardItem.propTypes = {
  board: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default BoardItem;