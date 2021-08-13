import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { likeBoard } from '../../modules/board';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import usersSolidImg from '../../assets/users-solid.svg';
import '../../styles/bootstrap.min.css';

const BoardLocalItem = React.forwardRef(({ board }, ref) => {

  const dispatch = useDispatch();

  // 현재 로그인한 사용자의 아이디 가져오기
  const { userId } = useSelector((state) => state.user.userInfo);

  // 좋아요, 북마크를 눌렀을때 상태 반영 
  const { boardLiked } = useSelector((state) => state.board);

  // 유저의 좋아요, 북마크 상태
  const [ liked, setLiked ] = useState(false)
  const [ bookmarked, setBookmarked] = useState(false)

  // 좋아요, 댓글, 북마크 갯수
  const [countLike, setCountLike] = useState(0)
  const [countBookmark, setCountBookmark] = useState(0)
  const [countComment, setCountComment] = useState(0)

  // n시간 전
  const [ timePeriod, setTimePeriod ] = useState("")

  // 모집 여부
  const [ isJoin, setIsJoin ] = useState(true)

  useEffect(() => {
    return () => setLiked(false); // cleanup function을 이용
  }, []);
  useEffect(() => {
    return () => setCountBookmark(false); // cleanup function을 이용
  }, []);
  useEffect(() => {
    // 좋아요 조회
    axios.post(`http://localhost:8080/board/${board.board_pk}/info`, {
      kind_pk: 2,
      userId: userId,
      flag: "false",
    })
    .then((res) => {
      if(res.data.clicked === true){
        setLiked(true)
      }
    })
    .catch((err) => {
      console.log(err)
    })

    // 북마크 조회
    axios.post(`http://localhost:8080/board/${board.board_pk}/info`, {
      kind_pk: 3,
      userId: userId,
      flag: "false",
    })
    .then((res) => {
      if(res.data.clicked === true){
        setBookmarked(true)
      }
    })
    .catch((err) => {
      console.log(err)
    })

    // 댓글, 좋아요, 북마크 개수
    axios.post(`http://localhost:8080/board/${board.board_pk}/info-cnt`)
    .then((res) => {
      setCountLike(res.data.countLike)
      setCountBookmark(res.data.countBookmark)
      setCountComment(res.data.countComment)
    })
    .catch((err) => {
      console.log(err)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardLiked])

  // 몇시간 전
  useEffect(() => {
    const today = new Date();
    const timeValue = new Date(board.created_at);

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
  }, [board.created_at]);

  // 지역 게시판 모집 중 여부
  useEffect(() => {
    if(board.board_pk >= 4 && board.board_pk <= 6){
      if(board.totalNum === board.gatherNum) {
        setIsJoin(false)
      }
    }
  }, [board.board_pk, board.totalNum, board.gatherNum])

  // 좋아요 버튼을 눌렀을 때
  const onClickLike = () => {
    axios.post(`http://localhost:8080/board/${board.board_pk}/info`, {
      kind_pk: 2,
      userId: userId,
      flag: "true",
    })
    .then(() => {
      setLiked(!liked)
      dispatch(likeBoard())
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // 북마크 버튼을 눌렀을 때
  const onClickBookmark = () => {
    axios.post(`http://localhost:8080/board/${board.board_pk}/info`, {
      kind_pk: 3,
      userId: userId,
      flag: "true",
    })
    .then(() => {
      setBookmarked(!bookmarked)
      dispatch(likeBoard())
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Container ref={ref} className="px-0">
      {/* 지역게시판 */}
      <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
        <Card className="mx-2 p-2">
          <Row className="mx-2">
            <Col className="text-start px-0" style={{color: "#5552FF"}}>모집중</Col>
            <Col className="text-end px-0 text-secondary">{timePeriod}</Col>
          </Row>
          <Row className="mx-2 mb-3 mt-1">
            { isJoin 
              ? <Col className="px-0 mt-0 fs-4"> {board.title}</Col>
              : <Col className="px-0 mt-0 fs-4"><span style={{color: "#5552FF"}}>모집완료</span> {board.title}</Col>
            }
          </Row>
          <Row className="mx-2">
            <h3 className="text-center"><img src={usersSolidImg} alt="참여인원" className="px-0" style={{width: "30px"}}/> &nbsp; {board.gatherNum} / {board.totalNum} 참여</h3>
          </Row>
          <Row className="mx-2 mt-3">
            <Col className="px-0">
              By. {board.nickname}
            </Col>
            <Col className="px-0 text-end">
              <FontAwesomeIcon icon={faComment}/> { countComment }
              &nbsp;&nbsp;     
              <FontAwesomeIcon icon={faHeart}/> { countLike }
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faBookmark}/> {countBookmark}
            </Col>
          </Row>
        </Card>
      </Link>
    </Container>
  )
})

BoardLocalItem.propTypes = {
  board: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default BoardLocalItem;