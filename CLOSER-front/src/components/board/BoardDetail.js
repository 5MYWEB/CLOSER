import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBoard } from '../../modules/board';
import { likeBoard } from '../../modules/board';
import axios from 'axios';

import CommentList from '../comment/CommentList';
import UserBadgeItem from '../profile/UserBadgeItem';

import './BoardDetail.css';
import heartEmpty from '../../assets/heart_empty.png';
import heartFull from '../../assets/heart_full.png';
import bookmarkEmpty from '../../assets/bookmark_empty.png';
import bookmarkFull from '../../assets/bookmark_full.png';

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

  return (
    <div className="container">
      <div className="board-main">
      {/* <div>글 번호 : {board.board_pk}</div> */}
      {board.kind_pk !== 7 && 
        <div>제목 : {board.title}</div>
      }
      <div>작성자 : {board.nickname}</div>

      { board.kind_pk > 0 && board.kind_pk < 4 && board.badge !== 0 &&
        <div>뱃지 : <UserBadgeItem badge={board.badge}/></div>
      }
      <div>작성시간 : {board.created_at}</div>
      <div>내용 : {board.content}</div>
      {board.kind_pk !== 7 && 
        <div>수정시간 : {board.updated_at}</div>
      }
      {/* 지역게시판 인원모으기: 글쓴이한테는 버튼이 안 보임 */}
      <div>
        {board.kind_pk > 3 && board.kind_pk < 7
          ? 
            board.gatherNum >= board.totalNum
              ?
              <div>참여현황: {board.gatherNum} / {board.totalNum} 모집완료!</div>
              : 
              <div>참여현황: {board.gatherNum} / {board.totalNum}</div>
          : ''
        }
        { userId !== board.userId && board.kind_pk > 3 && board.kind_pk < 7
          ?
            joined
            ?
            <button onClick={onClickJoin}>빠지기</button>
            :
            <button onClick={onClickJoin}>참여하기!</button>
          : ''
        }
      </div>
      
      {/* 수정 및 삭제 */}

      { userId === board.userId &&
        <div>
          <Link to={`/board-update-form/${board.board_pk}/`}>
            <button>수정</button>
          </Link>
          <button onClick={onClickDelete}>삭제</button>
        </div>
      }
      <div className = "likeAndBookmark">
        {/* 좋아요 */}
        { liked
          ?
          <div className = "likePart">
            <img className ="heart_full" src={heartFull} onClick={onClickLike}></img> {countLike}
          </div>
          : 
          <div className = "likePart">
            <img className ="heart_empty" src={heartEmpty} onClick={onClickLike}></img> {countLike}
          </div>
        }
        {/* 북마크 */}
        { bookmarked
          ?
          <div className = "bookmarkPart">
            <img className ="bookmark_full" src={bookmarkFull} onClick={onClickBookmark}></img> {countBookmark}
          </div>
          : 
          <div className = "bookmarkPart">
            <img className ="bookmark_empty" src={bookmarkEmpty} onClick={onClickBookmark}></img> {countBookmark}
          </div>
        }
      </div>
      <div>

      </div>
        <hr />
        <CommentList board_pk={Number(pk)} />
      </div>     
    </div>
  )
}

export default BoardDetail;