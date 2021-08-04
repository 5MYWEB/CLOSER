import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { followAction } from '../../modules/user';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function FollowingItem({ following }) {

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.userInfo)

  // 팔로우 취소 버튼 클릭 시
  const onClickFollow = () => {
    axios.post(`http://localhost:8080/follow/${following.passiveUser}/follow`, {
      userId: userId,
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
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <img src="" alt="프로필 사진" />
          </Col>
          <Col xs={4}>
            <Link to={`/profile/${following.passiveUser}`}>{following.nickname}</Link>
          </Col>
          { following.activeUser === userId ?
            <Col xs={6}>
              <Row>
                <Col xs={{ span: 6, offset: 6 }}>
                  <button onClick={onClickFollow}>팔로우 취소</button>
                </Col>
              </Row>
            </Col>
            : <div></div>
          }
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