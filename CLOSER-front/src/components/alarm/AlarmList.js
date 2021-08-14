import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AlarmItem from './AlarmItem';
import { getAlarmList } from '../../modules/user';
import './AlarmList.css';
import { RippleButton } from '../../styles/index';

function AlarmList({match}) {

  const type = match.params.type

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.userInfo)
  const { alarmList } = useSelector((state) => state.user)

  const [ unreadList, setUnreadList ] = useState([])

  const [ unreadCount, setUnreadCount ] = useState(null)
  


  useEffect(() => {
    axios.post(`http://localhost:8080/alarm`, {
      userId: userId
    })
    .then((res) => {
      dispatch(getAlarmList(res.data.reverse()))
    })
    .catch((err) => {
      console.log(err)
    })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadCount])

  useEffect(() => {
    if(alarmList !== null){
      setUnreadList(alarmList.filter((v) => (v.visited === false)))
    }
  }, [alarmList])

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


  return (
    <div>
      { type === "unread" && 
        <div className="read-button">
          <RippleButton  
            onClick={onClickAlarmClear} 
            type="button" 
            cclass="cbtn cbtn-sm cbtn-primary" 
            children="모두 읽음으로 표시"
          />   
        </div>
      }
      {/* 알림이 있다면 */}
      {alarmList
        ?
          type === "all"
          // 읽은 알림 리스트
            ?
              <div>
                {alarmList.map((alarm) => {
                  return (
                    <AlarmItem key={alarm.alarm_pk} alarm={alarm} userId={userId}/>
                  );
                })}
              </div>
            : 
            // 안읽은 알림 리스트
            <div>
              {unreadList.map((alarm) => {
                return (
                  <AlarmItem key={alarm.alarm_pk} alarm={alarm} userId={userId}/>
                );
              })}
            </div>
        : <p>알림이 없습니다:(</p>
      }
    </div>
  )
}

export default AlarmList;