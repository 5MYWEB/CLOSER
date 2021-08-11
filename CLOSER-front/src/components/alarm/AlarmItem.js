import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
function AlarmItem({ alarm, userId }) {

  const [ alarmLink, setAlarmLink ] = useState('')

  useEffect(() => {
    // 종류가 4면 팔로우 알림
    if(alarm.category_pk === 4){
      setAlarmLink(`/profile/${alarm.otherUserId}`)
    // 1, 2, 3 은 댓글, 좋아요, 북마크
    } else {
      setAlarmLink(`/board-detail/${alarm.board_pk}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {/* 다른 사람이 보낸 알림만 보여주기 */}
      {userId !== alarm.otherUserId &&
        <Link to={alarmLink}> 
          <div>종류(아이콘으로 대체): {alarm.category_pk}</div>
          <div>내용: {alarm.content}</div>
          <div>일시: {alarm.created_at}</div>
          <div>읽음(색깔로 대체): {alarm.visited ? 'O' : 'X' }</div>
          <br />
        </Link>
      }
    </div>
  )
}

AlarmItem.propTypes = {
  alarm: PropTypes.shape({
    alarm_pk: PropTypes.number,
    category_pk: PropTypes.number,
    userId: PropTypes.string,
    otherUserId: PropTypes.string,
    visited: PropTypes.bool,
    content: PropTypes.string,
    kind_pk: PropTypes.number,
    board_pk: PropTypes.number,
    bot_pk: PropTypes.number,
    created_at: PropTypes.string,
  }),
};

export default AlarmItem;