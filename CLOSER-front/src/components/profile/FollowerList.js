import React from 'react';
import PropTypes from 'prop-types';

const FollowerList = ({header, data}) => {
  // Profile.js 에서 받아온 객체 타입 data를 매핑해주는 코드입니다.
  const Iteration = () => {
    const followers = data.map(follower => <li key={follower.key}>{follower.nickname}</li>);
    return <ul>{followers}</ul>;
  };

  return (
    <div>
      <div>{header}</div>
      {Iteration()}
    </div>
  )
};

FollowerList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowerList;