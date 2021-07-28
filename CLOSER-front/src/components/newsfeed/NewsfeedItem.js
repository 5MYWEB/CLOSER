import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { deleteFeed } from '../../modules/newsfeed';
import axios from 'axios';

function NewsfeedItem({ feed }) {
  const dispatch = useDispatch();

  // 현재 로그인한 사용자의 아이디 가져오기
  const { userId } = useSelector((state) => state.user);

  // 삭제 버튼을 클릭했을 때 실행되는 함수
  const onClickDelete = () => {
    axios.delete(`http://localhost:8080/feed/${feed.feed_pk}`)
    .then((res) => {
      console.log(res)
      dispatch(deleteFeed())
    })
    .catch((err) => {
      console.log(err)
    })
  };

  return (
    <>
      <div>글 번호 : {feed.feed_pk}</div>
      <div>작성자 : {feed.userId}</div>
      <div>내용 : {feed.content}</div>
      <div>작성시간 : {feed.created_at}</div>
      <div>위치: {feed.location}</div>
      { userId === feed.userId &&
        <button onClick={onClickDelete}>삭제</button>
      }
      <hr />
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