import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { createFeed } from '../../modules/newsfeed';

const NewsfeedForm = () => {

  const dispatch = useDispatch();

  // 리덕스 user에서 userId 받아옴 
  const { userId } = useSelector((state) => state.user);

  const [text, setText] = useState('');

  // 사용자가 피드 내용을 입력할때 작동하는 함수
  const onChangeText = (e) => {
    setText(e.target.value)
  }

  // 피드를 제출할때 작동하는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/feed/', {
        userId: userId,
        content: text,
      })
    .then((res) => {
      console.log(res)
      dispatch(createFeed())
    })
    .catch((err) =>{
      console.log(err)
    })
    

    setText('')
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <input 
          type="text" 
          value={text}
          maxLength={200} 
          placeholder="무슨 생각을 하고 계신가요?"
          onChange={onChangeText} />
        <input type="submit" value="업로드" />
      </form>
    </>
  )
}

export default NewsfeedForm;