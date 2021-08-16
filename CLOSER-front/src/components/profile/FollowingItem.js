import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { followAction } from '../../modules/user';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import defaultProfile from "../../assets/profile-user-demo.png";
import { RippleButton } from '../../styles/index';

function FollowingItem({ following }) {


  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.userInfo)
  let img = following.profileImg;

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

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

  return (
    <>
      <Container className="my-3">
        <Row className="g-0 align-items-center mx-5 pb-3 border-bottom border-2">
          <Col xs={2} className="px-0">
            <Link to={`/profile/${following.passiveUser}`}>
              <img src={img}  alt="userprofile" className="userprofile rounded-circle" onError={handleImgError} style={{width: "100%"}}/>
            </Link>
          </Col>
          <Col xs={6} className="px-0">
            <Link to={`/profile/${following.passiveUser}`} className="text-dark px-3 fs-5">{following.nickname}</Link>
          </Col>
          { following.activeUser === userId ?
            <Col xs={4} className="d-flex justify-content-end">
              <RippleButton type="button" onClick={onClickFollow} cclass="cbtn cbtn-secondary" children="언팔로우"/>
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