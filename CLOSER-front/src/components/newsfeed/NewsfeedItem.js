import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NewsfeedItem({ feed }) {

  return (
    <>
      <hr />
        <div>작성자 : {feed.userId}</div>
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
    feed_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default NewsfeedItem;