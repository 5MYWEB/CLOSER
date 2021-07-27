import React from 'react';
import PropTypes from 'prop-types';

function NewsfeedItem({ feed }) {

  return (
    <>
      <div>글 번호 : {feed.feedPk}</div>
      <div>작성자 : {feed.userId}</div>
      <div>내용 : {feed.content}</div>
      <div>작성시간 : {feed.created_at}</div>
      <div>위치: {feed.location}</div>
      <hr />
    </>
  )
}

NewsfeedItem.propTypes = {
  feed: PropTypes.shape({
    feedPk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default NewsfeedItem;