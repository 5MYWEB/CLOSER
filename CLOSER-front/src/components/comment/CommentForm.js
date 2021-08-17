import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../../styles/theme.css'
import { Col } from 'react-bootstrap';
import { RippleButton } from '../../styles/index';
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

  // 텍스트가 빈 값인지 검사하는 함수
  const nullCheck = () => {
    if(text === ''){
      alert('내용을 입력해주세요!')
      return false
    }
    return true
  }

  // 댓글을 제출할때 작동하는 함수
  const onSubmit = (e) => {
    e.preventDefault();

    setTimeout( function() {

      if (nullCheck()){
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
      }

    }, 350);

  };

  return (
    <div className="comment-form-wrapper mx-2">
    {isLoggedIn &&
      <form onSubmit={onSubmit} className="d-flex flex-row">
        <Col xs={8}>
          <input 
            className="me-1"
            type="text" 
            value={text}
            maxLength={200} 
            placeholder="댓글을 입력하세요"
            onChange={onChangeText}
           />
        </Col>
        <Col xs={4} className="button-group m-0">
          <RippleButton type="submit" cclass="cbtn cbtn-lg cbtn-primary" children="업로드"/>
        </Col>
      </form>
      }
    </div>
  )
}

CommentForm.propTypes = {
  board_pk: PropTypes.number,
};

export default CommentForm;