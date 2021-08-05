import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { deleteComment } from '../../modules/comment';

const CommentItem = ({ comment }) => {

  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('')

  const { userId } = useSelector((state) => state.user.userInfo)

  // 댓글 작성자 정보 가져오기
  useEffect(() => {
    axios.post(`http://localhost:8080/user/profileinfo?userId=${comment.userId}`)
    .then((res) => {
      setNickname(res.data.nickname)
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 댓글 삭제
  const onClickDelete = () => {
    axios.delete(`http://localhost:8080/board/${comment.board_pk}/comment/${comment.info_pk}/`, {
      data: {
        userId: userId
      }
    })
    .then((res) => {
      console.log(res);
      dispatch(deleteComment())
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
        <div>작성자 : {nickname}</div>
        <div>내용 : {comment.reply}</div>
        {/* <div>작성시간 : {comment.created_at}</div> */}
        { userId === comment.userId &&
          <button onClick={onClickDelete}>삭제</button>
        }
        <br />
    </>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    info_pk: PropTypes.number,
    board_pk: PropTypes.number,
    kind_pk: PropTypes.number,
    // created_at: PropTypes.string,
    reply: PropTypes.string,
    userId: PropTypes.string,
    imgUrl: PropTypes.string,
  })
};


export default CommentItem;