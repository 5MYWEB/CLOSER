import React from 'react';
import { useSelector } from 'react-redux';
import NewsfeedItem from './NewsfeedItem';

const NewsfeedFavorite = () => {
  // 리덕스 newsfeed state 연결
  const { mainFeeds } = useSelector((state) => state.newsfeed);
  return (
    <div>
      팔로잉 하는 사람들의 피드를 보여주는 공간입니다.
      {mainFeeds.map((c) => {
        return (
          <NewsfeedItem key={c.feedPk} feed={c} />
        );
      })}
    </div>
  )
}

export default NewsfeedFavorite;