import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import UserBadgeItem from '../profile/UserBadgeItem'
import { Row, Col, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart, faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import defaultBoardImg from '../../assets/house-emoji.png';
import '../../styles/bootstrap.min.css';
import '../../styles/theme.css'
import './BoardItem.css'

const BoardGlobalItem = React.forwardRef(({ board }, ref) => {

  // const dispatch = useDispatch();

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

  // 이미지 링크 세팅
  useEffect(() => {
    if(board.imgUrls !== []){
      setImgUrl(board.imgUrls[0])
    }
  }, [board.imgUrls])
  
  return (
    <Container ref={ref} className="px-0">
      <br />
      {/* 자취 게시판 */}
      <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
        <Card className="mx-2">
          <Row className="g-0 align-items-center">
            <Col xs={4}>
              <div className="p-2 m-2 d-flex justify-content-center align-items-center" style={{ border: "2px solid #5552FF", height: "80px"}}>
                { imgUrl
                  ?
                  <img src={imgUrl} className="img-fluid rounded-start cropped1" alt={board.title} />
                  : 
                  <img src={defaultBoardImg} className="img-fluid rounded-start cropped1"  alt="기본이미지" />
                }
              </div>
            </Col>
            <Col xs={8}>
              <Row className="mx-2 mt-1">
                <Col className="text-end px-0 text-secondary">{timePeriod}</Col>
              </Row>
              <Row className="mx-2 mb-3 mt-1">
                <Col className="px-0 mt-0 fs-5"> {board.title}</Col>
              </Row>
              <Row className="mx-2 mt-3 border-top border-2">
                <Col className="px-0 mt-1">
                  By.&nbsp;
                  {board.badge !== 0 && 
                    <span><UserBadgeItem badge={board.badge} cclass="board-badge"/> </span>
                  }
                  {board.nickname}
                </Col>
                <Col className="px-0 text-end my-1">
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
            </Col>
          </Row>
        </Card>
      </Link>
    </Container>
  )
})

BoardGlobalItem.propTypes = {
  board: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default BoardGlobalItem;