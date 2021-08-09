import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, getSearchedList } from '../../modules/search';


// 부트스트랩 모달
function MyVerticallyCenteredModal(props) {

  const dispatch = useDispatch();

  // 카테고리 선택시 리덕스에 저장
  const onChangeCategory = (e) => {
    dispatch(setCategory(e.target.value))
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          게시판을 선택해주세요
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button onClick={onChangeCategory} value={0}>게시판 전체</button>
        <br />
        <button onClick={onChangeCategory} value={1}>자취게시판(전체)</button>
        <br />
        <button onClick={onChangeCategory} value={2}>한끼레시피</button>
        <button onClick={onChangeCategory} value={3}>자취꿀팁</button>
        <button onClick={onChangeCategory} value={4}>홈데코</button>
        <br />
        <button onClick={onChangeCategory} value={5}>지역게시판(전체)</button>
        <br />
        <button onClick={onChangeCategory} value={6}>공동구매</button>
        <button onClick={onChangeCategory} value={7}>클로저 모임</button>
        <button onClick={onChangeCategory} value={8}>도와주세요</button>
        <br />
        <button onClick={onChangeCategory} value={9}>뉴스피드</button>
      </Modal.Body>
      <button onClick={props.onHide}>선택완료</button>
    </Modal>
  );
}


// 검색창 컴포넌트
const SearchBar = () => {

  const dispatch = useDispatch();

  const { categoryName, categorySearchUrl } = useSelector((state) => state.search)

  // 모달창 끄고 켜기
  const [modalShow, setModalShow] = useState(false);

  // 검색 조건
  const [choice, setChoice] = useState(1);

  // 검색창 입력값
  const [text, setText] = useState('');

  // 검색창에 입력 시
  const onChangeInput = (e) => {
    setText(e.target.value)
  }

  // 검색 조건 선택 시
  const onChangeChoice = (e) => {
    setChoice(e.target.value)
  }

  // 검색 버튼 클릭 시
  const onClickSearch = () => {

    // 빈값인지 검사
    if(text === '') {
      alert('내용을 입력하세요')
      return false
    }

    // 두글자 이상인지 검사
    if(text.length < 2){
      alert('2글자 이상 입력하세요')
      return false
    }

    // 검색 실행
    axios.get(`http://localhost:8080/search${categorySearchUrl}`, {
      params: {
        choice: choice,
        keyword: text,
      }
    })
    .then((res) => {
      dispatch(getSearchedList(res.data))
      setText('')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          {categoryName}
        </Col>
        <Col>
          <button onClick={() => setModalShow(true)}>
            게시판 선택
          </button>
        </Col>
        <Col>
          <select id="kind" name="kind" value={choice} onChange={onChangeChoice}>
            <option value={1}>제목 + 내용</option>
            <option value={2}>닉네임</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col xs={10}>
          <input 
            type="text" 
            value={text}
            placeholder="검색어를 입력하세요"
            onChange={onChangeInput}/>
        </Col>
        <Col xs={2}>
          <button onClick={onClickSearch}>검색</button>
        </Col>
      </Row>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  )
}

export default SearchBar;