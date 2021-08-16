import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { followAction } from '../../modules/user';
import defaultProfile from '../../assets/user-on.svg';
import { RippleButton } from '../../styles/index';
import '../../styles/theme.css'

function FollowerItem({ follower }) {

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.userInfo)
  let img = follower.profileImg;

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

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

  return (
      <Container className="my-3">
        <Row className="g-0 align-items-center mx-5 pb-3 border-bottom border-2">
          <Col xs={2} className="px-0">
            <Link to={`/profile/${follower.activeUser}`}>
              <div className="follow-img-wrapper">
                <img src={img} alt="userprofile" className="userprofile profile-img" onError={handleImgError}/>
              </div>
            </Link>
          </Col>
          <Col xs={7} className="px-0">
<Link to={`/profile/${follower.activeUser}`} className="text-dark px-3 fs-5">            {follower.nickname}</Link>
          </Col>
          { follower.passiveUser === userId ?
            <Col xs={3} className="d-flex justify-content-end">
              <RippleButton type="button" onClick={onClickFollow} cclass="cbtn cbtn-secondary" children="삭제"/>
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