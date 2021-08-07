import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { createBoard } from '../../modules/board';

const BoardForm = () => {
  
  const dispatch = useDispatch();

  const history = useHistory();

  // 리덕스 user에서 userId 받아옴 
  const { userInfo } = useSelector((state) => state.user);
  
  // 게시물 정보
  const [kind, setKind] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [totalNum, setTotalNum] = useState(null)

  // 카테고리 바꿀때
  const onChangeKind = (e) => {
    setKind(e.target.value)
  }
  // 제목 바꿀때
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  // 내용 바꿀때
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }
  // 모집인원 바꿀때
  const onChangeTotalNum = (e) => {
    setTotalNum(e.target.value)
  }

  // 게시판 게시물 제출
  const onSubmitBoard = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/board/', {
      kind_pk: kind,
      userId: userInfo.userId,
      title: title,
      content: content,
      totalNum: totalNum,
    })
    .then((res) => {
      dispatch(createBoard())
      history.push(`/board-detail/${res.data.board_pk}/`)
    })
    .catch((err) => {
      console.log(err)
    })
  };

  return (
    <>

          <label htmlFor="kind">카테고리를 선택해주세요 : </label>
          <select id="kind" name="kind_pk" value={kind} onChange={onChangeKind} required>
            <option defaultValue value={0}> -- 게시판 카테고리 -- </option>
            <option value={1}>한끼레시피</option>
            <option value={2}>자취꿀팁</option>
            <option value={3}>홈데코</option>
            <option value={4}>공동구매</option>
            <option value={5}>모임</option>
            <option value={6}>도와주세요</option>
          </select>

          <input 
            type="text"
            name="title"
            value={title}
            maxLength={200} 
            placeholder="제목을 입력하세요"
            onChange={onChangeTitle} 
            required />
            <br />

        <textarea 
          value={content}
          name="content"
          placeholder="내용을 입력하세요" 
          maxLength={1000} 
          onChange={onChangeContent}
          required />
        <br />

        { 3 < Number(kind) && Number(kind) < 7
          ? 
          <div>
            <label htmlFor="totalNum">모집인원을 선택하세요 (2명 이상 5명 이하):</label>
              <br />
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} value={2} />2명
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} value={3} /> 3명
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} value={4} /> 4명
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} value={5} /> 5명
          </div>
          : ''
        }
        
        <button onClick={onSubmitBoard}>업로드</button>
    </>
  )
}

export default BoardForm;