import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './AlarmItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faBookmark, faUsers } from "@fortawesome/free-solid-svg-icons";
import defaultProfile from '../../assets/profile-user-demo.png'

function AlarmItem({ alarm, userId }) {

  const [ alarmLink, setAlarmLink ] = useState('')
  const [ profileImg, setProfileImg ] = useState('')
  const [ dateDiff, setDateDiff ] = useState(0)
  
  useEffect(() => {
    // 종류가 4면 팔로우 알림
    if(alarm.category_pk === 4){
      setAlarmLink(`/profile/${alarm.otherUserId}`)
      // 댓글, 좋아요, 북마크
    } else {
      setAlarmLink(`/board-detail/${alarm.board_pk}`)
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps

    axios.post(`http://localhost:8080/user/profileinfo?userId=${alarm.otherUserId}`)
    .then((res) => {
      setProfileImg(res.data.profileImg)
    })
    .catch((err) => {
      console.log(err)
    })

    // 날짜 차이 구하기
    var today = new Date();
    var createdTime = new Date(alarm.created_at);
    var dateDiff = Math.ceil((today.getTime()-createdTime.getTime())/(1000*3600*24));
    setDateDiff(dateDiff-1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }
  
  return (
    <div>
      {/* 다른 사람이 보낸 알림만 보여주기 */}
      {userId !== alarm.otherUserId &&
        <Link to={alarmLink}>
          <div className={"alarm-item " + (alarm.visited === true && "alarm-unread")}>
            <div className="row mx-0">
              <div className="col-3 px-0 alarm-profile d-flex justify-content-center">
                <img src={profileImg} alt="프로필사진" onError={handleImgError} className="alarm-profile-limit"/>
              </div>
              <div className="col px-0">
                <div className="row">
                  <div className="col-2 px-0 alarm-icon d-flex justify-content-center">
                    { alarm.category_pk === 1 && <FontAwesomeIcon icon={faComment} className="alarm-icon-comment"/> }
                    { alarm.category_pk === 2 && <FontAwesomeIcon icon={faHeart} className="alarm-icon-heart"/> }
                    { alarm.category_pk === 3 && <FontAwesomeIcon icon={faBookmark} className="alarm-icon-bookmark"/> }
                    { alarm.category_pk === 4 && <FontAwesomeIcon icon={faUsers} className="alarm-icon-users"/> }
                  </div>
                  <div className="col alarm-date">
                    {dateDiff >= 1
                      ?
                      <div>
                        {dateDiff}일 전
                      </div>
                      :
                        '오늘'
                    }
                  </div>
                </div>
                <div className="row mx-0 alarm-content">
                  {alarm.content}
                </div>
              </div>
            </div>
            {/* <div class="row mx-0">읽음(색깔로 대체): {alarm.visited ? 'O' : 'X' }</div> */}
          </div>
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