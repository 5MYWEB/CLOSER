import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBoard } from '../../modules/board';
import { likeBoard } from '../../modules/board';
import axios from 'axios';

import CommentList from '../comment/CommentList';
import UserBadgeItem from '../profile/UserBadgeItem';

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

  // 유저의 좋아요, 북마크 상태
  const [ liked, setLiked ] = useState(false)
  const [ bookmarked, setBookmarked] = useState(false)

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
      if(res.data.clicked === true){
        setLiked(true)
      }
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
      if(res.data.clicked === true){
        setBookmarked(true)
      }
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

  return (
    <>
      <a href="javascript:history.back();">뒤로가기</a>
      <div>글 번호 : {board.board_pk}</div>
      {board.kind_pk !== 7 && 
        <div>제목 : {board.title}</div>
      }
      <div>작성자 : {board.nickname}</div>
      <div>뱃지 : <UserBadgeItem badge={board.badge}/></div>
      <div>내용 : {board.content}</div>
      <div>작성시간 : {board.created_at}</div>
      <div>수정시간 : {board.updated_at}</div>
      { userId === board.userId &&
        <div>
          <Link to={`/board-update-form/${board.board_pk}/`}>
            <button>수정</button>
          </Link>
          <button onClick={onClickDelete}>삭제</button>
        </div>
      }
      <div>
        { liked
          ?
          <div>
            <button onClick={onClickLike}>좋아요 취소</button> {countLike}
          </div>
          : 
          <div>
            <button onClick={onClickLike}>좋아요</button> {countLike}
          </div>
        }
        
        { bookmarked
          ?
          <div>
            <button onClick={onClickBookmark}>북마크 취소</button> {countBookmark}
          </div>
          : 
          <div>
            <button onClick={onClickBookmark}>북마크</button> {countBookmark}
          </div>
        }
      </div>
      <div>
        <hr />
        <CommentList board_pk={Number(pk)} />
      </div>
    </>
  )
}

export default BoardDetail;