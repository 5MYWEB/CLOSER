import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { likeBoard } from '../../modules/board';
import { Row, Col, Container, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import defaultProfile from '../../assets/user-on.svg';
import { faHeart as fasHeart, faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
// import '../../styles/bootstrap.min.css';

const NewsfeedItem = React.forwardRef(({ board, name }, ref) => {
// function NewsfeedItem({ board }, ref) {
  const dispatch = useDispatch();

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

  // 이미지 
  const [ imgUrls, setImgUrls ] = useState([])

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

    if (betweenTime < 1) setTimePeriod('방금 전');
    else if (betweenTime < 60) {
      setTimePeriod(`${betweenTime}분 전`);
    }
    else if (betweenTimeHour < 24) {
      setTimePeriod(`${betweenTimeHour}시간 전`);
    }
    else if (betweenTimeDay < 365) {
        setTimePeriod(`${betweenTimeDay}일 전`);
    }
    else {
      setTimePeriod(`${Math.floor(betweenTimeDay / 365)}년 전`);
    }
  }, [board.created_at]);

  // 이미지 링크 세팅
  useEffect(() => {
    if(board.imgUrls !== []){
      setImgUrls(board.imgUrls)
    }
  }, [board.imgUrls])

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

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
    <Container className="page-wrapper p-0" ref={ref}>
      <div className="px-4 py-3 bg-transparent border-bottom border-3">
        <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
          <Row className="g-0  align-items-start">
            <Col xs={2}>
              <div className="board-img-wrapper">
                <img src={writerInfo.profileImg} alt="profile" className="userprofile profile-img" onError={handleImgError} />
              </div>
            </Col>
            <Col xs={10}>
              <Row className="g-0 pb-4">
                {/* 주소와 이름 */}
                <Col xs={10} className="text-dark fw-bold"> 
                  { name === "near" &&
                    // 동만 표시
                    <span className="me-1" style={{color: "#5552FF", fontSize: "14px"}}>{board.location.split(" ").slice(2, 3)}</span>
                    // ㅇㅇ구 ㅇㅇ동
                    // <span className="me-1" style={{color: "#5552FF", fontSize: "14px"}}>{board.location.split(" ").slice(1, 3).join(" ")}</span>
                  }
                  {board.nickname}
                  
                </Col>
                {/* 작성시간 */}
                <Col xs={2} className="text-secondary" style={{fontSize: "14px", textAlign: "right"}}>{timePeriod}</Col>
              </Row>
              <Row className="g-0 mb-3">
                <div>{board.content}</div>
              </Row>
            </Col>
          </Row>
        </Link>

        { imgUrls.length > 0 &&
          <Carousel>
            {
              imgUrls.map((imgUrl, idx) =>{
                return (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100"
                      src={imgUrl}
                      alt={idx+1}
                      onError={handleImgError}
                    />
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        }

        <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
          <div className = "likeAndBookmark mt-2 d-flex justify-content-end align-items-center">
            <div className = "likePart" style={{fontSize: "20px"}}>
              <FontAwesomeIcon icon={faComment} className ="align-middle" alt="heart_full" style={{ color: "#5552FF"}}/> 
              <span className="ms-1 align-middle">{countComment}</span>
            </div>
          </Link>
          {/* 좋아요 */}
          { liked
            ?
            <div className = "likePart ms-3" style={{fontSize: "20px"}}>
              {/* <img className ="heart_full" alt="heart_full" src={heartFull} onClick={onClickLike} style={{height: "25px", width: "25px"}} /> {countLike} */}
              <FontAwesomeIcon icon={fasHeart} className ="heart_full align-middle" alt="heart_full" onClick={onClickLike} style={{ color: "#5552FF"}}/> 
              <span className="ms-1 align-middle">{countLike}</span>
            </div>
            : 
            <div className = "likePart ms-3" style={{fontSize: "20px"}}>
              {/* <img className ="heart_empty" alt="heart_empty" src={heartEmpty} onClick={onClickLike} style={{height: "25px", width: "25px"}} /> {countLike} */}
              <FontAwesomeIcon icon={faHeart} className ="heart_empty align-middle" alt="heart_empty" onClick={onClickLike} style={{ color: "#5552FF"}}/> 
              <span className="ms-1 align-middle">{countLike}</span>
            </div>
          }
          {/* 북마크 */}
          { bookmarked
            ?
            <div className = "bookmarkPart ms-3" style={{fontSize: "20px"}}>
              {/* <img className ="bookmark_full" alt="bookmark_full" src={bookmarkFull} onClick={onClickBookmark} style={{height: "25px", width: "25px"}} /> {countBookmark} */}
              <FontAwesomeIcon icon={fasBookmark} className ="bookmark_full align-middle" alt="bookmark_full" onClick={onClickBookmark} style={{ color: "#5552FF"}}/> 
              <span className="ms-1 align-middle">{countBookmark}</span>
            </div>
            : 
            <div className = "bookmarkPart ms-3" style={{fontSize: "20px"}}>
              {/* <img className ="bookmark_empty" alt="bookmark_empty" src={bookmarkEmpty} onClick={onClickBookmark} style={{height: "25px", width: "25px"}} /> {countBookmark} */}
              <FontAwesomeIcon icon={faBookmark} className ="bookmark_empty align-middle" alt="bookmark_empty" onClick={onClickBookmark} style={{ color: "#5552FF"}}/>
              <span className="ms-1 align-middle">{countBookmark}</span>
            </div>
          }
        </div>
        
      </div>
    </Container>     
  )
})

NewsfeedItem.propTypes = {
  board: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default NewsfeedItem;