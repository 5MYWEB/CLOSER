import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';

function FollowingItem({ following }) {

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <img src="" alt="프로필 사진" />
          </Col>
          <Col xs={4}>
            {following.nickname}
          </Col>
          <Col xs={{ span: 3, offset: 3 }}>
            <button>팔로우 취소</button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

FollowingItem.propTypes = {
  following: PropTypes.shape({
    activeUser: PropTypes.string,
    follow_pk: PropTypes.number,
    nickname: PropTypes.string,
    passiveUser: PropTypes.string,
    profileImg: PropTypes.string,
  })
}

export default FollowingItem;