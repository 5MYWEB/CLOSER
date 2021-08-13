import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCommentList } from '../../modules/comment';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const CommentList = ({board_pk}) => {

  const dispatch = useDispatch();

  const { commentList, commentDeleted, commentCreated } = useSelector((state) => state.comment);

  // 댓글 개수
  const [listLength, setListLength] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${board_pk}/comment`)
    .then((res) => {
      dispatch(getCommentList(res));
      setListLength(res.data.length)
    })
    .catch((err)=>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentDeleted, commentCreated])

  return (
    <>
      <div>댓글 {listLength}개</div>
      <br />

      {commentList && 
        <div>
          {commentList.map((comment) => {
            return (
              <CommentItem key={comment.info_pk} comment={comment} />
            );
          })}
        </div>}
        
        <div>
          <CommentForm board_pk={Number(board_pk)}/>
        </div>
    </>
  )
}

CommentList.propTypes = {
  board_pk: PropTypes.number,
};

export default CommentList;