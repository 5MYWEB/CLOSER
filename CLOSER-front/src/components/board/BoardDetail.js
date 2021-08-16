import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBoard } from '../../modules/board';
import { likeBoard } from '../../modules/board';
import axios from 'axios';
import CommentList from '../comment/CommentList';
import UserBadgeItem from '../profile/UserBadgeItem';
import './BoardDetail.css';
import defaultProfile from '../../assets/profile-user-demo.png';
import usersSolidImg from '../../assets/users-solid.svg';
import { Row, Col, Container, Card, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart, faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

const BoardDetail = ({match}) => {
  const dispatch = useDispatch();

  // 현재 게시글의 정보
  const [board, setBoard] = useState({
    board_pk: null,
    kind_pk: null,
    title: '',
    userId: '',
    content: '',
    created_at: '',
    updated_at: '',
    location: '',
    nickname: '',
    badge: null,
    imgUrls: [],
  })

  // 현재 게시글의 pk
  const pk = match.params.id;

  // 현재 로그인한 사용자의 아이디 가져오기
  const { userId } = useSelector((state) => state.user.userInfo);

  // 좋아요, 북마크를 눌렀을때 상태 반영 
  const { boardLiked } = useSelector((state) => state.board);

  // 좋아요, 댓글, 북마크 갯수
  const [countLike, setCountLike] = useState(0)
  const [countBookmark, setCountBookmark] = useState(0)

  // 유저의 좋아요, 북마크, 참여 상태
  const [ liked, setLiked ] = useState(false)
  const [ bookmarked, setBookmarked] = useState(false)
  const [ joined, setJoined] = useState(false)

  // n시간 전
  const [ timePeriod, setTimePeriod ] = useState("")

  // 해당 게시글 쓴 사람의 프로필
  const [ writerProfile, setWriterProfile ] = useState("")

  // 이미지 
  const [ imgUrls, setImgUrls ] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${pk}`)
    .then((res) => {
      setBoard({
        ...board,
        board_pk: res.data.board_pk,
        kind_pk: res.data.kind_pk,
        title: res.data.title,
        userId: res.data.userId,
        content: res.data.content,
        created_at: res.data.created_at,
        updated_at: res.data.updated_at,
        location: res.data.location,
        nickname: res.data.nickname,
        badge: res.data.badge,
        totalNum: res.data.totalNum,
        gatherNum: res.data.gatherNum,
        imgUrls: res.data.imgUrls,
      })
    })
    .catch((err) =>{
      console.log(err)
    })

    // 좋아요 눌렀는지
    axios.post(`http://localhost:8080/board/${pk}/info`, {
      kind_pk: 2,
      userId: userId,
      flag: "false",
    })
    .then((res) => {
      setLiked(res.data.clicked)
    })
    .catch((err) => {
      console.log(err)
    })

    // 북마크 눌렀는지
    axios.post(`http://localhost:8080/board/${pk}/info`, {
      kind_pk: 3,
      userId: userId,
      flag: "false",
    })
    .then((res) => {
      setBookmarked(res.data.clicked)
    })
    .catch((err) => {
      console.log(err)
    })

    // 참여했는지
    axios.post(`http://localhost:8080/board/${pk}/join`, {
      userId: userId,
      flag: "false",
    })
    .then((res) => {
      setJoined(res.data.joined)
    })
    .catch((err) => {
      console.log(err)
    })

    // 댓글 좋아요 북마크 개수
    axios.post(`http://localhost:8080/board/${pk}/info-cnt`)
    .then((res) => {
      setCountLike(res.data.countLike)
      setCountBookmark(res.data.countBookmark)
    })
    .catch((err) => {
      console.log(err)
    })

    // eslint-disable-next-line
  }, [boardLiked])

  // 해당 유저의 프로필 사진
  useEffect(() => {
    setWriterProfile(`https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/${board.userId}/${board.userId}_profile.jpg`)
  }, [board.userId])

  // 몇시간 전
  useEffect(() => {
    const today = new Date();
    const timeValue = new Date(board.updated_at);

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
  }, [board.updated_at]);

  // 이미지 링크 세팅
  useEffect(() => {
    if(board.imgUrls !== []){
      setImgUrls(board.imgUrls)
    }
  }, [board.imgUrls])


  // 삭제 버튼을 클릭했을 때 실행되는 함수
  const onClickDelete = () => {
    // 삭제 의사 확인
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios.delete(`http://localhost:8080/board/${board.board_pk}/`, {
        data : {
          userId: userId
        }
      })
      .then(() => {
        dispatch(deleteBoard())
        alert('게시물이 삭제되었습니다.')
        // 삭제 후 페이지 뒤로가기
        // eslint-disable-next-line no-script-url
        return window.location.href = 'javascript:history.back();'
      })
      .catch((err) => {
        console.log(err)
      })
    }
  };

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

  // 참여하기 버튼을 눌렀을 때
  const onClickJoin = () => {
    axios.post(`http://localhost:8080/board/${board.board_pk}/join`, {
      userId: userId,
      flag: 'true',
    })
    .then(() => {
      setJoined(!joined)
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
    <Container className="page-wrapper">
      <div className="mx-5">
        <Row className="g-0 mb-3">
          {board.kind_pk !== 7 && 
            <div className="fw-bolder" style={{fontSize: "20px"}}>{board.title}</div>
          }
        </Row>
        <Row className="g-0 pb-3 mb-3 border-bottom border-2">
          <Col xs={2}>
            <img src={writerProfile} alt="profile" className="userprofile" onError={handleImgError} style={{height: "100%"}} />
          </Col>
          <Col xs={10}>
            <Row className="g-0 ps-1">
              <Link to = {`/profile/${board.userId}`}>
                { board.kind_pk > 0 && board.kind_pk < 4 && board.badge !== 0 &&
                  <span style={{color: "#5552FF"}}><UserBadgeItem badge={board.badge}/></span>
                }
                { board.kind_pk >= 4 && board.kind_pk <= 6 &&
                  <span style={{color: "#5552FF", fontSize: "14px"}}>{board.location.split(' ').slice(1, 3).join(' ')}</span>
                }
                <span className="text-dark fw-bold"> {board.nickname}</span>
              </Link>
            </Row>
            <Row className="g-0 ps-1">
              <span className="text-secondary" style={{fontSize: "14px"}}>{timePeriod}</span>
            </Row>
          </Col>
        </Row>
        <Row className="g-0 mb-3 fs-6">
          <div>{board.content}</div>
        </Row>
        
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

        {/* 지역게시판 인원모으기: 글쓴이한테는 버튼이 안 보임 */}
        <div className="g-0 mb-3">
          {board.kind_pk > 3 && board.kind_pk < 7 &&
            <Card className="mx-2 p-2">
              <Row className="mx-2">
                { board.gatherNum >= board.totalNum 
                  ? <Col className="text-start px-0" style={{color: "#5552FF"}}>모집완료</Col>
                  : <Col className="text-start px-0" style={{color: "#5552FF"}}>모집중</Col>
                }
              </Row>
              <Row className="mx-2 my-2">
                <h3 className="text-center"><img src={usersSolidImg} alt="참여인원" className="px-0" style={{width: "30px"}}/> &nbsp; {board.gatherNum} / {board.totalNum} 참여</h3>
              </Row>
              <Row>
                { userId !== board.userId
                  ?
                    !joined
                    ?
                      board.gatherNum >= board.totalNum 
                      ?
                        <div className="button-group mt-0">
                          <button className="ripple-button cbtn cbtn-lg cbtn-outline-primary" onClick={onClickJoin} disabled>참여하기</button>
                        </div>
                      :
                        <div className="button-group mt-0">
                          <button className="ripple-button cbtn cbtn-lg cbtn-primary" onClick={onClickJoin}>참여하기</button>
                        </div>
                    :
                    <div className="button-group mt-0">
                      <button className="ripple-button cbtn cbtn-lg cbtn-secondary" onClick={onClickJoin} >빠지기</button>
                    </div>
                  : ''
                }
              </Row>
            </Card>
          }
        </div>

        <div className="d-flex justify-content-between align-items-center border-bottom border-2 border-secondary pb-1 mb-3" style={{borderBottomColor: "#5552FF"}}>
          <div className = "likeAndBookmark">
            {/* 좋아요 */}
            { liked
              ?
              <div className = "likePart ms-2" style={{fontSize: "22px"}}>
                {/* <img className ="heart_full" alt="heart_full" src={heartFull} onClick={onClickLike} style={{height: "25px", width: "25px"}} /> {countLike} */}
                <FontAwesomeIcon icon={fasHeart} className ="heart_full align-middle" alt="heart_full" onClick={onClickLike} style={{ color: "#5552FF"}}/> 
                <span className="ms-1 align-middle">{countLike}</span>
              </div>
              : 
              <div className = "likePart ms-2" style={{fontSize: "22px"}}>
                {/* <img className ="heart_empty" alt="heart_empty" src={heartEmpty} onClick={onClickLike} style={{height: "25px", width: "25px"}} /> {countLike} */}
                <FontAwesomeIcon icon={faHeart} className ="heart_empty align-middle" alt="heart_empty" onClick={onClickLike} style={{ color: "#5552FF"}}/> 
                <span className="ms-1 align-middle">{countLike}</span>
              </div>
            }
            {/* 북마크 */}
            { bookmarked
              ?
              <div className = "bookmarkPart ms-3" style={{fontSize: "22px"}}>
                {/* <img className ="bookmark_full" alt="bookmark_full" src={bookmarkFull} onClick={onClickBookmark} style={{height: "25px", width: "25px"}} /> {countBookmark} */}
                <FontAwesomeIcon icon={fasBookmark} className ="bookmark_full align-middle" alt="bookmark_full" onClick={onClickBookmark} style={{ color: "#5552FF"}}/> 
                <span className="ms-1 align-middle">{countBookmark}</span>
              </div>
              : 
              <div className = "bookmarkPart ms-3" style={{fontSize: "22px"}}>
                {/* <img className ="bookmark_empty" alt="bookmark_empty" src={bookmarkEmpty} onClick={onClickBookmark} style={{height: "25px", width: "25px"}} /> {countBookmark} */}
                <FontAwesomeIcon icon={faBookmark} className ="bookmark_empty align-middle" alt="bookmark_empty" onClick={onClickBookmark} style={{ color: "#5552FF"}}/>
                <span className="ms-1 align-middle">{countBookmark}</span>
              </div>
            }
          </div>
          {/* 수정 및 삭제 */}
          { userId === board.userId &&
            <div>
              {
                board.kind_pk !== 7 &&
                  <Link to={`/board-update-form/${board.board_pk}/`}>
                    <button className="ripple-button cbtn cbtn-sm cbtn-primary mx-1 fw-bold">수정</button>
                  </Link>
              }
              <button className="ripple-button cbtn cbtn-sm cbtn-secondary mx-1 fw-bold" onClick={onClickDelete}>삭제</button> 
            </div>
          }
        </div>
        
        <CommentList board_pk={Number(pk)} />
      </div>
    </Container>     
  )
}

export default BoardDetail;