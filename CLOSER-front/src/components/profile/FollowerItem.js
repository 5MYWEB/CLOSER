import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { followAction } from '../../modules/user';

function FollowerItem({ follower }) {

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.userInfo)

    // 삭제 버튼 클릭 시(타인이 나를 팔로우 하는 것을 취소시킴)
  const onClickFollow = () => {
    axios.post(`http://localhost:8080/follow/${userId}/follow`, {
      userId: follower.activeUser,
      flag: 'true',
    })
    .then((res) => {
      console.log(res)
      dispatch(followAction())
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    
      <Container>
        <Row>
          <Col xs={2}>
            <img src="" alt="프로필 사진" />
          </Col>
          <Col xs={4}>
            <Link to={`/profile/${follower.activeUser}`}>{follower.nickname}</Link>
          </Col>
          { follower.passiveUser === userId ?
            <Col xs={6}>
              <Row>
                <Col xs={{ span: 4, offset: 4 }}>
                  <button onClick={onClickFollow}>삭제</button>
                </Col>
                <Col xs={4}>
                  <button>차단(보류)</button>
                </Col>
              </Row>
            </Col>
            : <div></div>
          }
        </Row>
      </Container>

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