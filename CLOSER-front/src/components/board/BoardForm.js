import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, FormSelect, InputGroup } from 'react-bootstrap';
import { createBoard } from '../../modules/board';
import { RippleButton } from '../../styles/index';

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

  const onClickCancel = () => {
    history.goBack();
  }

  // 게시판 게시물 제출
  const onSubmitBoard = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/board/', {
      kind_pk: Number(kind),
      userId: userInfo.userId,
      title: title,
      content: content,
      totalNum: Number(totalNum),
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
      <Container>
        <div className="m-5">
          <InputGroup className="mb-3">
          <label className="input-group-text fw-bolder" htmlFor="kind" style={{color: "#FFFFFF", backgroundColor: "#5552FF"}}>카테고리</label>
            <FormSelect id="kind" name="kind_pk" value={kind} onChange={onChangeKind} required>
              <option defaultValue value={0}> -- 게시판 카테고리 -- </option>
              <option value={1}>한끼레시피</option>
              <option value={2}>자취꿀팁</option>
              <option value={3}>홈데코</option>
              <option value={4}>공동구매</option>
              <option value={5}>모임</option>
              <option value={6}>도와주세요</option>
            </FormSelect>
          </InputGroup>

          <label htmlFor="title" className="form-label fw-bolder" style={{color: "#5552FF"}}>Title</label>
          <InputGroup className="mb-4">
            <input type="text" className="form-control m-0"
              name="title"
              value={title}
              maxLength={200} 
              placeholder="제목을 입력하세요"
              onChange={onChangeTitle} 
              required />
          </InputGroup>

          <label htmlFor="content" className="form-label fw-bolder" style={{color: "#5552FF"}}>Content</label>
          <InputGroup className="mb-4">
            <textarea className="form-control" 
              value={content}
              name="content"
              maxLength={1000} 
              onChange={onChangeContent}
              id="content" 
              style={{ height: "200px"}}
              required
            />
          </InputGroup>

          { 3 < Number(kind) && Number(kind) < 7
            ? 
            <div>        
              <label htmlFor="totalNum" className="form-label fw-bolder" style={{color: "#5552FF"}}>모집인원 (2명 이상 5명 이하)</label>
              <InputGroup className="mb-3 d-flex justify-content-between">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio2" value={2} onClick={onChangeTotalNum}/>
                  <label className="form-check-label mx-1" for="inlineRadio2">2명</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio3" value={3} onClick={onChangeTotalNum}/>
                  <label className="form-check-label mx-1" for="inlineRadio3">3명</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio4" value={4} onClick={onChangeTotalNum}/>
                  <label className="form-check-label mx-1" for="inlineRadio4">4명</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio5" value={5} onClick={onChangeTotalNum}/>
                  <label className="form-check-label mx-1" for="inlineRadio5">5명</label>
                </div>
              </InputGroup>
            </div>
            : 
            <div>        
              <label htmlFor="image-upload" className="form-label fw-bolder" style={{color: "#5552FF"}}>Image</label>
              <InputGroup className="mb-4">
                사진 입력 들어가야해요 호영님
              </InputGroup>
            </div>
          }

          <div className="button-group mt-0">
            <button className="ripple-button cbtn cbtn-lg cbtn-primary" onClick={onSubmitBoard} >업로드</button>
          </div>
          <div className="d-flex justify-content-center">
            <RippleButton type="button" cclass="cbtn cbtn-none cbtn-lg" onClick={onClickCancel} children="취소"/>
          </div>
        </div>
      </Container>
    </>
  )
}

export default BoardForm;