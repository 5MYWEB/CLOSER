import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';

function FollowerItem({ follower }) {

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <img src="" alt="프로필 사진" />
          </Col>
          <Col xs={4}>
            {follower.nickname}
          </Col>
          <Col xs={{ span: 2, offset: 2 }}>
            <button>삭제</button>
          </Col>
          <Col xs={2}>
            <button>차단</button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

FollowerItem.propTypes = {
  following: PropTypes.shape({
    activeUser: PropTypes.string,
    follow_pk: PropTypes.number,
    nickname: PropTypes.string,
    passiveUser: PropTypes.string,
    profileImg: PropTypes.string,
  })
}

export default FollowerItem;