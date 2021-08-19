import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart, faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import usersSolidImg from '../../assets/users-solid.svg';
import '../../styles/bootstrap.min.css';

const BoardLocalItem = React.forwardRef(({ board }, ref) => {

  // const dispatch = useDispatch();

  // 현재 로그인한 사용자의 아이디 가져오기
  const { userId } = useSelector((state) => state.user.userInfo);

  // 해당 글 쓴 사람 정보
  const [writerInfo, setWriterInfo] = useState('')

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

  
  // 댓글 작성자 정보 가져오기
  useEffect(() => {
    axios.post(`http://localhost:8080/user/profileinfo?userId=${board.userId}`)
    .then((res) => {
      setWriterInfo(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.userId])

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
    if(board.totalNum <= board.gatherNum) {
      setIsJoin(false)
    }
  }, [board.totalNum, board.gatherNum])

  return (
    <Container ref={ref} className="px-0">
      <br/>
      {/* 지역게시판 */}
      <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
        <Card className="mx-2 p-2">
          <Row className="mx-2">
            { isJoin === true
              ? <Col className="text-start px-0" style={{color: "#5552FF"}}>모집중</Col>
              : <Col className="text-start px-0" style={{color: "#5552FF"}}>모집완료</Col>
            }
            <Col className="text-end px-0 text-secondary">{timePeriod}</Col>
          </Row>
          <Row className="mx-2 mb-3 mt-1">
            <Col className="px-0 mt-0 fs-4"> {board.title}</Col>
          </Row>
          <Row className="mx-2">
            <h3 className="text-center"><img src={usersSolidImg} alt="참여인원" className="px-0" style={{width: "30px"}}/> &nbsp; {board.gatherNum} / {board.totalNum} 참여</h3>
          </Row>
          <Row className="mx-2 mt-3">
            <Col xs={8} className="px-0">
              By. <span style={{color: "#5552FF", fontSize: "14px"}}>{board.location.split(" ").slice(1, 3).join(" ")}</span> {writerInfo.nickname}
            </Col>
            <Col xs={4} className="px-0 text-end my-1">
              <div className = "likeAndBookmark">
                <div className = "likePart">
                  <FontAwesomeIcon icon={faComment} className ="align-middle" alt="heart_full" style={{ color: "#5552FF"}}/> 
                  <span className="ms-1 align-middle">{countComment}</span>
                </div>
                {/* 좋아요 */}
                { liked
                  ?
                  <div className = "likePart ms-2">
                    <FontAwesomeIcon icon={fasHeart} className ="heart_full align-middle" alt="heart_full" style={{ color: "#FF5D5D"}}/> 
                    <span className="ms-1 align-middle">{countLike}</span>
                  </div>
                  : 
                  <div className = "likePart ms-2">
                    <FontAwesomeIcon icon={faHeart} className ="heart_empty align-middle" alt="heart_empty" style={{ color: "#5552FF"}}/> 
                    <span className="ms-1 align-middle">{countLike}</span>
                  </div>
                }
                {/* 북마크 */}
                { bookmarked
                  ?
                  <div className = "bookmarkPart ms-2">
                    <FontAwesomeIcon icon={fasBookmark} className ="bookmark_full align-middle" alt="bookmark_full" style={{ color: "#3ED3A3"}}/> 
                    <span className="ms-1 align-middle">{countBookmark}</span>
                  </div>
                  : 
                  <div className = "bookmarkPart ms-2">
                    <FontAwesomeIcon icon={faBookmark} className ="bookmark_empty align-middle" alt="bookmark_empty" style={{ color: "#5552FF"}}/>
                    <span className="ms-1 align-middle">{countBookmark}</span>
                  </div>
                }
              </div>
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