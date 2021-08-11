import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AlarmItem from './AlarmItem';
import { getAlarmList } from '../../modules/user';

function AlarmList() {

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.userInfo)
  const { alarmList } = useSelector((state) => state.user)
  const [unreadCount, setUnreadCount] = useState(null)
  
  // 모두 읽음으로 표시
  const onClickAlarmClear = () => {
    axios.post(`http://localhost:8080/alarm/read-all`, {
      userId: userId
    })
    .then((res) => {
      setUnreadCount(res.data.countAlarm)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    axios.post(`http://localhost:8080/alarm`, {
      userId: userId
    })
    .then((res) => {
      dispatch(getAlarmList(res.data))
    })
    .catch((err) => {
      console.log(err)
    })

    axios.post(`http://localhost:8080/alarm/unreadCount`, {
      userId: userId
    })
    .then((res) => {
      setUnreadCount(res.data.countAlarm)
    })
    .catch((err) => {
      console.log(err)
    })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadCount])


  return (
    <div>
      <div>안 읽은 알림: {unreadCount}</div>
      <button onClick={onClickAlarmClear}>모두 읽음으로 표시</button>
      <br />
      <br />
      {alarmList
        ?
        <div>
          {alarmList.map((alarm) => {
            return (
              <AlarmItem key={alarm.alarm_pk} alarm={alarm} userId={userId}/>
            );
          })}
        </div>
        :
        <p>알림이 없습니다:(</p>
      }
    </div>
  )
}

export default AlarmList;