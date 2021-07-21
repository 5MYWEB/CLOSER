import React from 'react';
import PropTypes from 'prop-types';

const FollowingList = ({header, data}) => {
  // Profile.js 에서 받아온 객체 타입 data를 매핑해주는 코드입니다.
  const Iteration = () => {
    const followings = data.map(following => <li key={following.key}>{following.nickname}</li>);
    return <ul>{followings}</ul>;
  };

  return (
    <div>
      <div>{header}</div>
      {Iteration()}
    </div>
  )
};

FollowingList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowingList;