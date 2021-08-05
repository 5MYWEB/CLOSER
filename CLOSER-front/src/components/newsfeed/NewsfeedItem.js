import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

function NewsfeedItem({ feed }) {

  // 댓글 개수
  const [listLength, setListLength] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${feed.board_pk}/comment`)
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
      <hr />
        <div>작성자 : {feed.nickname}</div>
        <Link to={`/newsfeed-detail/${feed.board_pk}`}>
          <div>내용 : {feed.content}</div>
        </Link>
        <div>작성시간 : {feed.created_at}</div>
        <div>위치: {feed.location}</div>
        <div>댓글 {listLength}개</div>
    </>
  )
}

NewsfeedItem.propTypes = {
  feed: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    location: PropTypes.string,
    nickname: PropTypes.string
  }),
};

export default NewsfeedItem;