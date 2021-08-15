import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { likeBoard } from '../../modules/board';
import { Row, Col, Container, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import defaultProfile from '../../assets/profile-user-demo.png';
// import '../../styles/bootstrap.min.css';

const NewsfeedItem = React.forwardRef(({ board }, ref) => {
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
  const [ imgUrls, setImgUrls ] = useState("")

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

  // 이미지 링크 세팅
  useEffect(() => {
    if(board.imgUrls !== []){
      setImgUrls(board.imgUrls)
    }
  }, [board.board_pk, board.imgUrls])

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

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

  return (
    <Container className="page-wrapper p-0" ref={ref}>
      <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
      <ListGroupItem className="px-5 py-3 bg-transparent">
        {/* <div className="mx-5"> */}
          <Row className="g-0 pb-3 mb-3 border-bottom border-2">
            <Col xs={2}>
              <img src={writerInfo.profileImg} alt="profile" className="userprofile" onError={handleImgError} style={{height: "100%"}} />
            </Col>
            <Col xs={10}>
              <Row className="g-0 ps-1">
                <Link to = {`/profile/${board.userId}`}>
                  <span className="text-dark fw-bold"> {board.nickname}</span>
                </Link>
              </Row>
              <Row className="g-0 ps-1">
                <span className="text-secondary" style={{fontSize: "14px"}}>{timePeriod}</span>
              </Row>
            </Col>
          </Row>
          <Row className="g-0 mb-3">
            <div>{board.content}</div>
          </Row>
          <Row className="g-0 mb-3">
            {imgUrls.length === 1 
              ?
              <Col>
                <img src={imgUrls[0]} alt="feedImage" onError={handleImgError} style={{height: "100%"}} />
              </Col>
              :
              imgUrls.length === 2
              ?
                <Row className="g-0">
                  <Col xs={6} >
                    <img src={imgUrls[0]} alt="feedImage" onError={handleImgError} style={{height: "100%"}} />
                  </Col>
                  <Col xs={6}>
                    <img src={imgUrls[1]} alt="feedImage" onError={handleImgError} style={{height: "100%"}} />
                  </Col>
                </Row>
              :
                imgUrls.length === 3
              ?
                <div>
                  <Col xs={6}>
                    <img src={imgUrls[0]} alt="feedImage" onError={handleImgError} style={{height: "100%"}} />
                  </Col>
                  <Col xs={6}>
                    <img src={imgUrls[1]} alt="feedImage" onError={handleImgError} style={{height: "100%"}} />
                  </Col>
                </div>
              :
                imgUrls.length === 4
              ?
              <div>4</div>
            :""  
            }
            
          </Row>

          <div className="d-flex justify-content-between align-items-center" style={{borderBottomColor: "#5552FF"}}>
            <div className = "likeAndBookmark">
              <FontAwesomeIcon icon={faComment}/> { countComment }
              &nbsp;&nbsp;     
              <FontAwesomeIcon icon={faHeart}/> { countLike }
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faBookmark}/> {countBookmark}
            </div>
          </div>
        {/* </div> */}
        </ListGroupItem>
      </Link>
    </Container>     
    // <Container ref={ref} className="px-0">
    //   {/* 뉴스피드 */}
    //   <Link to={`/board-detail/${board.board_pk}`} className="text-decoration-none text-dark">
    //     <ListGroupItem className="px-5 py-3 bg-transparent">
    //       <Row className="g-0">
    //         <Col>
    //           {board.content}
    //         </Col>
    //       </Row>
    //       { board.imgUrls !== [] &&
    //         <Row className="g-0">
    //           <Col>
    //             {board.imgUrls[0]}
    //           </Col>
    //         </Row>
    //       }
    //       <Row className="g-0">
    //         <Col xs={2}>
    //           <img src={profileImg} alt="profile-img"/>
    //         </Col>
    //         <Col xs={8} className="px-0">
    //           By. {board.nickname}
    //           { board.kind_pk == 7 &&
    //             <span>{board.location}</span>
    //           }
    //         </Col>
    //         <Col xs={2} className="px-0 text-secondary text-end">{timePeriod}</Col>
    //       </Row>
    //       <Row className="g-0">
    //         <Col className="px-0 my-1 text-end">
    //           <FontAwesomeIcon icon={faComment}/> { countComment }
    //           &nbsp;&nbsp;     
    //           <FontAwesomeIcon icon={faHeart}/> { countLike }
    //           &nbsp;&nbsp;
    //           <FontAwesomeIcon icon={faBookmark}/> {countBookmark}
    //         </Col>
    //       </Row>
    //     </ListGroupItem>
    //   </Link>
    // </Container>
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