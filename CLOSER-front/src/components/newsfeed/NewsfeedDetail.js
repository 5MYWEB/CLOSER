import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteFeed } from '../../modules/newsfeed';
import axios from 'axios';

const NewsfeedDetail = ({match}) => {
  const dispatch = useDispatch();
  
  // 현재 피드의 정보
  const [feed, setFeed] = useState({
    feed_pk: '',
    userId: '',
    content: '',
    created_at: '',
    location: '',
  })

  // 현재 피드의 pk
  const pk = match.params.id;

  // 현재 로그인한 사용자의 아이디 가져오기
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`http://localhost:8080/feed/${pk}`)
    .then((res) => {
      console.log(res)
      setFeed({
        ...feed,
        feed_pk: res.data.feed_pk,
        userId: res.data.userId,
        content: res.data.content,
        created_at: res.data.created_at,
        location: res.data.location,
      })
    })
    .catch((err) =>{
      console.log(err)
    })
  }, [feed, pk])

  // 삭제 버튼을 클릭했을 때 실행되는 함수
  const onClickDelete = () => {
    // 삭제 의사 확인
    if(window.confirm('정말로 피드를 삭제하시겠습니까?')){
      axios.delete(`http://localhost:8080/feed/${feed.feed_pk}`)
      .then((res) => {
        console.log(res);
        dispatch(deleteFeed())
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

  return (
    <>
      <div>글 번호 : {feed.feed_pk}</div>
      <div>작성자 : {feed.userId}</div>
      <div>내용 : {feed.content}</div>
      <div>작성시간 : {feed.created_at}</div>
      <div>위치: {feed.location}</div>
      { userId === feed.userId &&
        <button onClick={onClickDelete}>삭제</button>
      }
      <hr />
    </>
  )
}

export default NewsfeedDetail;