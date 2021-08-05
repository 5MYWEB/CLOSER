import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import { createComment } from '../../modules/comment';

const CommentForm = ({board_pk}) => {

  const dispatch = useDispatch();

  // 리덕스 user에서 userId 받아옴 
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);

  const [text, setText] = useState('');

  // 사용자가 댓글 내용을 입력할때 작동하는 함수
  const onChangeText = (e) => {
    setText(e.target.value)
  }

  // 댓글을 제출할때 작동하는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`http://localhost:8080/board/${board_pk}/comment`, {
        reply: text,
        userId: userInfo.userId
      })
    .then(() => {
      dispatch(createComment())
    })
    .catch((err) =>{
      console.log(err)
    })
    
    setText('')
  };

  return (
    <>
    {isLoggedIn &&
      <div>
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            value={text}
            maxLength={200} 
            placeholder="댓글을 입력하세요"
            onChange={onChangeText} />
          <input type="submit" value="업로드" />
        </form>
        <br />
      </div>
      }
    </>
  )
}

CommentForm.propTypes = {
  board_pk: PropTypes.number,
};

export default CommentForm;