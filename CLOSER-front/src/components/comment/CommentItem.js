import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { deleteComment } from '../../modules/comment';
import { Container, Row, Col } from 'react-bootstrap';
import defaultProfile from '../../assets/user-on.svg';

const CommentItem = ({ comment }) => {

  const dispatch = useDispatch();

  const [writerInfo, setWriterInfo] = useState('')

  const [kindCategory, setKindCategory] = useState(0)

  const { userId } = useSelector((state) => state.user.userInfo)

  // n시간 전
  const [ timePeriod, setTimePeriod ] = useState("")

  // 댓글 작성자 정보 가져오기
  useEffect(() => {
    axios.post(`http://localhost:8080/user/profileinfo?userId=${comment.userId}`)
    .then((res) => {
      setWriterInfo(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.userId])

  // 몇시간 전
  useEffect(() => {
    const today = new Date();
    const timeValue = new Date(comment.created_at);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    const betweenTimeHour = Math.floor(betweenTime / 60);
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

    if (betweenTime < 1) setTimePeriod('방금전');
    else if (betweenTime < 60) {
      setTimePeriod(`${betweenTime}분전`);
    }
    else if (betweenTimeHour < 24) {
      setTimePeriod(`${betweenTimeHour}시간전`);
    }
    else if (betweenTimeDay < 365) {
        setTimePeriod(`${betweenTimeDay}일전`);
    }
    else {
      setTimePeriod(`${Math.floor(betweenTimeDay / 365)}년전`);
    }
  }, [comment.created_at]);

  // 댓글이 속한 게시판 종류
  useEffect(() =>{
    axios.get(`http://localhost:8080/board/comment/${comment.board_pk}`)
    .then((res) => {
      setKindCategory(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [comment.board_pk])

  // 댓글 삭제
  const onClickDelete = () => {
    axios.delete(`http://localhost:8080/board/${comment.board_pk}/comment/${comment.info_pk}/`, {
      data: {
        userId: userId
      }
    })
    .then((res) => {
      console.log(res);
      dispatch(deleteComment())
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
      <Container>
        <Row className="g-0 mb-1">
          <Col xs={2}>
            <div className="board-img-wrapper">
              <img src={writerInfo.profileImg} alt="profile" className="userprofile profile-img" onError={handleImgError} />
            </div>
          </Col>
          <Col xs={8}>
            <Row className="g-0 ps-1">
              <Link to = {`/profile/${writerInfo.userId}`}>
                {/* { kindCategory > 0 && kindCategory < 4 && board.badge !== 0 &&
                  <span style={{color: "#5552FF"}}><UserBadgeItem badge={board.badge}/></span>
                } */}
                { kindCategory >= 4 && kindCategory <= 6 &&
                  <span style={{color: "#5552FF", fontSize: "14px"}}>{writerInfo.addr.split(" ").slice(1, 3).join(" ")}</span>
                }
                <span className="text-dark fw-bold"> {writerInfo.nickname}</span>
              </Link>
            </Row>
            <Row className="g-0 ps-1">
              <span className="text-secondary" style={{fontSize: "14px"}}>{timePeriod}</span>
            </Row>
          </Col>
          <Col xs={2}>
            { userId === comment.userId &&
              <Row className="g-0 ps-1">
                <button className="ripple-button cbtn cbtn-sm cbtn-primary" onClick={onClickDelete}>삭제</button>
              </Row>
            }
          </Col>
        </Row>
        <Row className="g-0 mb-3 pb-3 border-bottom border-2">
          <div>{comment.reply}</div>
        </Row>
      </Container>
    </>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    info_pk: PropTypes.number,
    board_pk: PropTypes.number,
    kind_pk: PropTypes.number,
    // created_at: PropTypes.string,
    reply: PropTypes.string,
    userId: PropTypes.string,
    imgUrl: PropTypes.string,
  })
};


export default CommentItem;