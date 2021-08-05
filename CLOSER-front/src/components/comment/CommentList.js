import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CommentItem from './CommentItem';
import { getCommentList } from '../../modules/comment';
import PropTypes from 'prop-types';

const CommentList = ({board_pk}) => {

  const dispatch = useDispatch();

  const { commentList } = useSelector((state) => state.comment);
  const { commentDeleted } = useSelector((state) => state.comment);

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${board_pk}/comment`)
    .then((res) => {
      dispatch(getCommentList(res));
    })
    .catch((err)=>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentDeleted])

  return (
    <>
      {commentList && 
        <div>
          {commentList.map((comment) => {
            return (
              <CommentItem key={comment.info_pk} comment={comment} />
            );
          })}
        </div>}
    </>
  )
}

CommentList.propTypes = {
  board_pk: PropTypes.number,
};

export default CommentList;