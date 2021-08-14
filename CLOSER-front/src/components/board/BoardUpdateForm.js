import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, FormSelect, InputGroup } from 'react-bootstrap';
import { updateBoard } from '../../modules/board';
import { RippleButton } from '../../styles/index';

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
    <Container>
      <form encType="multipart/form-data" onSubmit={onSubmit} className="m-5">
        <InputGroup className="mb-3">
          <label className="input-group-text fw-bolder" htmlFor="kind" style={{color: "#FFFFFF", backgroundColor: "#5552FF"}}>카테고리</label>
          {0 < kind && kind < 4 
          ?
          <FormSelect id="kind" name="kind" value={kind} onChange={onChangeKind}>
            <option defaultValue={ 1 === kind } value={1}>한끼 레시피</option>
            <option defaultValue={ 2 === kind } value={2}>자취 팁</option>
            <option defaultValue={ 3 === kind } value={3}>홈 데코</option>
          </FormSelect>
          :
          <FormSelect id="kind" name="kind" value={kind} onChange={onChangeKind}>
            <option defaultValue={ 4 === kind } value={4}>공동구매</option>
            <option defaultValue={ 5 === kind } value={5}>모임</option>
            <option defaultValue={ 6 === kind } value={6}>응급상황</option>
          </FormSelect>
          } 
        </InputGroup>

        <label htmlFor="title" className="form-label fw-bolder" style={{color: "#5552FF"}}>Title</label>
        <InputGroup className="mb-4">
          <input type="text" className="form-control m-0"
            value={title}
            maxLength={200} 
            onChange={onChangeTitle} 
            required />
        </InputGroup>

        <label htmlFor="content" className="form-label fw-bolder" style={{color: "#5552FF"}}>Content</label>
        <InputGroup className="mb-4">
          <textarea className="form-control" 
            value={content}
            maxLength={1000} 
            onChange={onChangeContent}
            required
            id="content" 
            style={{ height: "200px"}}/>
        </InputGroup>

          

        { 3 < Number(kind) && Number(kind) < 7
          ? 
          <div>
            <label htmlFor="totalNum" className="form-label fw-bolder" style={{color: "#5552FF"}}>모집인원 (2명 이상 5명 이하)</label>
            <InputGroup className="mb-3 d-flex justify-content-between">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio2" value={2} onClick={onChangeTotalNum} checked={ 2 === Number(totalNum) }/>
                <label className="form-check-label mx-1" for="inlineRadio2">2명</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio3" value={3} onClick={onChangeTotalNum} checked={ 3 === Number(totalNum) }/>
                <label className="form-check-label mx-1" for="inlineRadio3">3명</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio4" value={4} onClick={onChangeTotalNum} checked={ 4 === Number(totalNum) }/>
                <label className="form-check-label mx-1" for="inlineRadio4">4명</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio5" value={5} onClick={onChangeTotalNum} checked={ 5 === Number(totalNum) }/>
                <label className="form-check-label mx-1" for="inlineRadio5">5명</label>
              </div>
            </InputGroup>
          </div>
          : 
          ""
        }

        <div className="button-group mt-0">
          <RippleButton type="submit" cclass="cbtn cbtn-lg cbtn-primary" children="수정"/>
        </div>

        <Link to={`/board-detail/${pk}/`} className="d-flex justify-content-center">
          <RippleButton type="button" cclass="cbtn cbtn-none cbtn-lg" children="취소"/>
        </Link>

      </form>
    
    </Container>
    </>
  )
}

export default BoardUpdateForm;