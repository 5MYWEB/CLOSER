import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewsfeedItem from './NewsfeedItem';
import { getFeedList } from '../../modules/newsfeed';
import axios from 'axios';

const NewsfeedHot = () => {
  
  const dispatch = useDispatch();
  
  // 리덕스의 feedList, feedCreated, feedDeleted 불러옴
  const { feedList } = useSelector((state) => state.newsfeed);

  // useEffect: 컴포넌트가 렌더될때 이 부분을 실행함
  // 전체 피드 리스트를 요청하고 응답을 액션함수로 보냄
  // 리덕스에 feedList가 state로 담김
  useEffect(() => {
    axios.get('http://localhost:8080/feed/total')
    .then((res) => {
      dispatch(getFeedList(res));
    })
    .catch((err) =>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      좋아요와 댓글이 많이 달린 피드를 보여주는 공간입니다.
      {/* 피드가 비어있지 않다면 피드목록을 불러옴*/}
      {feedList && 
        <div>
          {feedList.map((feed) => {
            return (
              <NewsfeedItem key={feed.feed_pk} feed={feed} />
            );
          })}
        </div>}
    </>
  )
}

export default NewsfeedHot;