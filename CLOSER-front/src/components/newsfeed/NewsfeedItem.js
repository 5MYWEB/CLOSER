import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function NewsfeedItem({ feed }) {

  const { userId } = useSelector((state) => state.user.userInfo)

  return (
    <>
      <hr />
        <div>작성자 : {feed.nickname}</div>
        <Link to={`/newsfeed-detail/${feed.board_pk}`}>
          <div>내용 : {feed.content}</div>
        </Link>
        <div>작성시간 : {feed.created_at}</div>
        <div>위치: {feed.location}</div>
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