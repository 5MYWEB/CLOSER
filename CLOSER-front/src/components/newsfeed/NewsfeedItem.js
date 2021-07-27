import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

function NewsfeedItem({ feed }) {

  return (
    <div>
      {feed.feedPk}
      <br />
      {feed.userId}
      <br />
      {feed.content}
      <br />
      {feed.created_at}
      <br />
      {feed.updated_at}
      <br />
      {feed.location}
    </div>
  )
}

NewsfeedItem.propTypes = {
  feed: PropTypes.shape({
    feedPk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.object,
    updated_at: PropTypes.object,
    location: PropTypes.string,
  }),
};

export default NewsfeedItem;