import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { likeBoard } from '../../modules/board';
import UserBadgeItem from '../profile/UserBadgeItem'
import { Row, Col, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import closerbot from '../../assets/closerbot.png'
// import '../../styles/bootstrap.min.css';

const BoardItem = React.forwardRef(({ board }, ref) => {
// function BoardItem({ board }, ref) {
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

  // 이미지 갯수
  const [ imgUrl, setImgUrl ] = useState("")

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
  }, []);

  // 이미지 링크 세팅
  useEffect(() => {
    if((board.board_pk <= 3 || board.board_pk == 7) && board.imgUrls !== []){
      setImgUrl(board.imgUrls[0])
    }
  }, [])

  // 지역 게시판 모집 중 여부
  useEffect(() => {
    if(board.board_pk >= 4 && board.board_pk <= 6){
      if(board.totalNum == board.gatherNum) {
        setIsJoin(false)
      }
    }
  }, [])

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
      <br />
      {/* 자취 게시판 */}
      <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
        <Card className="mx-2">
          <Row className="g-0">
            <Col xs={4}>
            { imgUrl
              ?
              <img src={imgUrl} className="img-fluid rounded-start" alt={board.title} />
              : 
              <img src={closerbot} className="img-fluid rounded-start" alt="기본이미지" />
            }
              
            </Col>
            <Col xs={8}>
              <Row className="mx-2">{board.title}</Row>
              <Row className="mx-2">
                <Col xs={8} className="px-0">
                {board.badge !== 0 && 
                  <span><UserBadgeItem badge={board.badge}/> </span>
                }
                {board.nickname}
                </Col>
                <Col xs={4} className="px-0 text-end">{timePeriod}</Col>
              </Row>
              <Row className="mx-2">
                <Col className="px-0 text-end">
                  <FontAwesomeIcon icon={faComment}/> { countComment }
                  &nbsp;&nbsp;     
                  <FontAwesomeIcon icon={faHeart}/> { countLike }
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faBookmark}/> {countBookmark}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Link>

      {/* 지역게시판 */}
      {/* <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
        <Card className="mx-2 p-2">
          <Row className="mx-2">
            { isJoin 
              ? <div className="px-0"><span style={{color: "#5552FF"}}>모집중</span> {board.title}</div>
              : <div className="px-0"><span style={{color: "#5552FF"}}>모집완료</span> {board.title}</div>
            }
          </Row>
          <Row className="mx-2">
            <FontAwesomeIcon icon={faUsers} className="px-0 my-auto"/> &nbsp;&nbsp; {board.gatherNum} / {board.totalNum} 참여
          </Row>
          <Row className="mx-2">
            <Col xs={8} className="px-0">
            {board.nickname}
            </Col>
            <Col xs={4} className="px-0 text-end">{timePeriod}</Col>
          </Row>
          <Row className="mx-2">
            <Col className="px-0 text-end">
              <FontAwesomeIcon icon={faComment}/> { countComment }
              &nbsp;&nbsp;     
              <FontAwesomeIcon icon={faHeart}/> { countLike }
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faBookmark}/> {countBookmark}
            </Col>
          </Row>
        </Card>
      </Link> */}

        {/* <div>작성자 : {board.nickname}</div>
        {board.badge !== 0 && 
          <div>뱃지 : <UserBadgeItem badge={board.badge}/></div>
        }
      <Link to={`/board-detail/${board.board_pk}`}>
        {board.title !== "" && 
          <div>제목: {board.title}</div>
        }
        <div>내용 : {board.content}</div>
      </Link>
        <div>작성시간 : {board.created_at}</div>
        <div>댓글 {countComment}
          &nbsp;|&nbsp;     
          { liked
            ?
            <span>
              <button onClick={onClickLike}>좋아요 취소</button> {countLike}
            </span>
            : 
            <span>
              <button onClick={onClickLike}>좋아요</button> {countLike}
            </span>
          }
          &nbsp;|&nbsp;
          { bookmarked
            ?
            <span>
              <button onClick={onClickBookmark}>북마크 취소</button> {countBookmark}
            </span>
            : 
            <span>
              <button onClick={onClickBookmark}>북마크</button> {countBookmark}
            </span>
          }
        </div> */}
    </Container>
  )
})

BoardItem.propTypes = {
  board: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default BoardItem;