import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { createBoard } from '../../modules/board';

const NewsfeedForm = () => {

  const dispatch = useDispatch();

  // 리덕스 user에서 userId 받아옴 
  const { userId } = useSelector((state) => state.user.userInfo);
  const { isLoggedIn } = useSelector((state) => state.user);

  const [text, setText] = useState('');

  // 사용자가 피드 내용을 입력할때 작동하는 함수
  const onChangeText = (e) => {
    setText(e.target.value)
  }

  // 텍스트가 빈 값인지 검사하는 함수
  const nullCheck = () => {
    if(text === ''){
      alert('댓글을 입력해주세요!')
      return false
    }
    return true
  }

  // 피드를 제출할때 작동하는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (nullCheck()){
      axios.post('http://localhost:8080/board/', {
          kind_pk: 7,
          userId: userId,
          title: null,
          content: text,
        })
      .then(() => {
        dispatch(createBoard())
      })
      .catch((err) =>{
        console.log(err)
      })
      setText('')
    }
  };

  return (
    <>
      {isLoggedIn &&
        <div>
          <form encType="multipart/form-data" onSubmit={onSubmit}>
            <input 
              type="text" 
              value={text}
              maxLength={500} 
              placeholder="무슨 생각을 하고 계신가요?"
              onChange={onChangeText} />
            <input type="submit" value="업로드" />
          </form>
          <br />
        </div>
      }
    </>
  )
}

export default NewsfeedForm;