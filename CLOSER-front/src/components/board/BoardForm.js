import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { createBoard } from '../../modules/board';

const BoardForm = () => {

  const dispatch = useDispatch();

  const history = useHistory();

  // 리덕스 user에서 userId 받아옴 
  const { userId } = useSelector((state) => state.user.userInfo );
  
  const [kind_pk, setKind] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 사용자가 게시물 내용을 입력할때 작동하는 함수
  const onChangeKind = (e) => {
    setKind(e.target.value)
  }
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  // 게시물을 제출할때 작동하는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/board/', {
        kind_pk: Number(kind_pk),
        userId: userId,
        title: title,
        content: content,
      })
    .then((res) => {
      dispatch(createBoard())
      console.log('생성은됨')
      history.push(`/board-detail/${res.data.board_pk}/`)
    })
    .catch((err) => {
      console.log(err)
    })

    setKind('')
    setTitle('')
    setContent('')
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <label htmlFor="kind">카테고리를 선택해주세요 : </label>
        <select id="kind" name="kind" value={kind_pk} onChange={onChangeKind}>
          <option defaultValue value="undefined"> -- 게시판 카태고리 -- </option>
          <option value={1}>한끼 레시피</option>
          <option value={2}>자취 팁</option>
          <option value={3}>홈 데코</option>
          <option value={4}>공동구매</option>
          <option value={5}>모임</option>
          <option value={6}>응급상황</option>
        </select>
        <input 
          type="text" 
          value={title}
          maxLength={100} 
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle} 
          required />
        <br />
        <textarea 
          value={content}
          placeholder="내용을 입력하세요" 
          maxLength={500} 
          onChange={onChangeContent}
          required />
        <br />
        <input type="submit" value="업로드" />
      </form>
    </>
  )
}

export default BoardForm;