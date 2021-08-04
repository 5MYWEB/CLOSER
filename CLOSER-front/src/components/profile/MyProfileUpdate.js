import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyProfileUpdate = () => {
  
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Container>
      {/* Row-1 : 뒤로가기 */}
      <Row>
        <Link to={`/profile/${userInfo.userId}`}>뒤로가기</Link>
      </Row>
      {/* Row-2 : 프로필사진 */}
      <Row className="justify-content-center">
        <Col xs={5} >
          <img src="" alt="프로필 사진" />
        </Col>
      </Row>
      {/* Row-3 : 닉네임 */}
      <Row className="justify-content-center">
        <Col xs={4}>
          {userInfo.nickname}
        </Col>
        <Col xs={4}>
          <button>중복체크</button>
        </Col>
      </Row>
      {/* Row-4 : 자취기간 */}
      <Row>
        <Col>
          {userInfo.homeAlone}
        </Col>
      </Row>
      {/* Row-5 : 위치 */}
      <Row>
        <Col>
          {userInfo.addr}
        </Col>
      </Row>
      {/* Row-6 : 한줄소개 */}
      <Row>
        <Col>
          {userInfo.intro}
        </Col>
      </Row>
      {/* Row-7 : 취소, 저장 */}
      <Row>
        <Col>
          <Link to={`/profile/${userInfo.userId}`}><button>취소</button></Link>
        </Col>
        <Col>
          <button>저장</button>
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfileUpdate;