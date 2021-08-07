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
  
  // 게시물 정보
  const [kind, setKind] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [totalNum, setTotalNum] = useState(null)

  // 원래 내용을 state에 담아줌
  useEffect(() => {
    axios.get(`http://localhost:8080/board/${pk}`)
    .then((res) => {
      setKind(res.data.kind_pk)
      setTitle(res.data.title)
      setContent(res.data.content)
      setTotalNum(res.data.totalNum)
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // 모집인원 바꿀때
  const onChangeTotalNum = (e) => {
    setTotalNum(e.target.value)
  }

  // 게시물을 제출할때 작동하는 함수
  const onSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/board/${pk}`, {
        kind_pk: Number(kind),
        userId: userId,
        title: title,
        content: content,
        totalNum: totalNum,
      })
    .then(() => {
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
        {0 < kind && kind < 4 
          ?
          <select id="kind" name="kind" value={kind} onChange={onChangeKind}>
            <option value="undefined"> -- 게시판 카테고리 -- </option>
            <option defaultValue={ 1 === kind } value={1}>한끼 레시피</option>
            <option defaultValue={ 2 === kind } value={2}>자취 팁</option>
            <option defaultValue={ 3 === kind } value={3}>홈 데코</option>
          </select>
          :
          <select id="kind" name="kind" value={kind} onChange={onChangeKind}>
            <option value="undefined"> -- 게시판 카테고리 -- </option>
            <option defaultValue={ 4 === kind } value={4}>공동구매</option>
            <option defaultValue={ 5 === kind } value={5}>모임</option>
            <option defaultValue={ 6 === kind } value={6}>응급상황</option>
          </select>
        }


        <input 
          type="text" 
          value={title}
          maxLength={200} 
          onChange={onChangeTitle} 
          required />
        <br />

        <textarea 
          value={content}
          maxLength={1000} 
          onChange={onChangeContent}
          required />
        <br />

        { 3 < Number(kind) && Number(kind) < 7
          ? 
          <div>
            <label htmlFor="totalNum">모집인원을 선택하세요 (2명 이상 5명 이하):</label>
              <br />
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} checked={ 2 === totalNum } value={2} />2명
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} checked={ 3 === totalNum } value={3} /> 3명
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} checked={ 4 === totalNum } value={4} /> 4명
              <input type="radio" name="totalNum" onClick={onChangeTotalNum} checked={ 5 === totalNum } value={5} /> 5명
          </div>
          : ''
        }
        
        <input type="submit" value="수정" />
        <Link to={`/board-detail/${pk}/`}>
          <button>취소</button>
        </Link>
      </form>
    </>
  )
}

export default BoardUpdateForm;