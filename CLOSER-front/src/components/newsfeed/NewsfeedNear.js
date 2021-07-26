import React from 'react';
import { useSelector } from 'react-redux';

import NewsfeedItem from './NewsfeedItem';

function NewsfeedNear() {
  // 리덕스 newsfeed state 연결
  const { mainFeeds } = useSelector((state) => state.newsfeed);
  return (
    <div>
      근처에서 올라온 피드를 보여주는 공간입니다.
      {mainFeeds.map((c) => {
        return (
          <NewsfeedItem key={c.feedPk} feed={c} />
        );
      })}
    </div>
  )
}

export default NewsfeedNear;