import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { updateBoard } from '../../modules/board';

const BoardUpdateForm = ({match}) => {

  const pk = match.params.id;

  const dispatch = useDispatch();

  const history = useHistory();

  // 리덕스 user에서 userId 받아옴 
  const { userId } = useSelector((state) => state.user.userInfo);
  
  const [kind_pk, setKind] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 원래 내용을 state에 담아줌
  useEffect(() => {
    axios.get(`http://localhost:8080/board/${pk}`)
    .then((res) => {
      setKind(res.data.kind_pk)
      setTitle(res.data.title)
      setContent(res.data.content)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

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

    axios.put(`http://localhost:8080/board/${pk}`, {
        kind_pk: Number(kind_pk),
        userId: userId,
        title: title,
        content: content,
      })
    .then((res) => {
      dispatch(updateBoard())
      history.push(`/board-detail/${pk}/`)
    })
    .catch((err) =>{
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
          <option value="undefined"> -- 게시판 카태고리 -- </option>
          <option defaultValue={ 1 === kind_pk } value={1}>한끼 레시피</option>
          <option defaultValue={ 2 === kind_pk } value={2}>자취 팁</option>
          <option defaultValue={ 3 === kind_pk } value={3}>홈 데코</option>
          <option defaultValue={ 4 === kind_pk } value={4}>공동구매</option>
          <option defaultValue={ 5 === kind_pk } value={5}>모임</option>
          <option defaultValue={ 6 === kind_pk } value={6}>응급상황</option>
        </select>
        <input 
          type="text" 
          value={title}
          maxLength={100} 
          onChange={onChangeTitle} 
          required />
        <br />
        <textarea 
          value={content}
          maxLength={500} 
          onChange={onChangeContent}
          required />
        <br />
        <input type="submit" value="수정" />
        <Link to={`/board-detail/${pk}/`}>
          <button>취소</button>
        </Link>
      </form>
    </>
  )
}

export default BoardUpdateForm;