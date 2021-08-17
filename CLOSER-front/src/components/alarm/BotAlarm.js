import React, { useState, useRef } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RippleButton } from '../../styles/index';
import '../../styles/theme.css'


function BotAlarm( { history }) {
    const { userInfo, isLoggedIn } = useSelector((state) => state.user);
    const [text, setText] = useState('');
    const [alarmDay, setAlarmDay] = useState('')
    const [alarmDate, setAlarmDate] = useState('')
    const [nowRadio, setNowRadio] =  useState('day');
    let dummyDate = "2021-08-";

    const selectInputs = useRef();
    const dayRadioBtn = useRef();
    const dateRadioBtn = useRef();

    const onChangeText = (e) => {
        const { value } = e.target;
        setText(value)
    }

    const onChangeDayRadio = (e) => {
        setNowRadio('day')
    }

    const onChangeDateRadio = (e) => {
        setNowRadio('date')
    }

    const onChangeDate = (e) => {
        setAlarmDate(e.target.value)
    }

    const onChangeDay = (e) => {
        setAlarmDay(e.target.value)
    }

    //데이터 빈 값 검사
    const checkExistData = (value, name) => {
        // console.log(value)
        if (value === '') {
            alert(name + ' 입력해주세요!')
            return false;
        }
        return true;
    }

    function checkAll() {
        if (checkExistData(text, '알림 받을 내용을')) {
            return false
        } else if (nowRadio === 'day') {
            if (checkExistData(alarmDay, '알림 받을 요일을')) {
                return false
            }
        } else if (nowRadio === 'date') {
            if (checkExistData(alarmDate, '알림 받을 날짜를')) {
                return false
            }
        }
        return true;
    }


      // 피드를 제출할때 작동하는 함수
    const onSubmit = (e) => {
        e.preventDefault();
        if (checkAll() === true) {
            go();
        }
        

    };

  // 백에 저장하는 메소드
    const go= () => {
        // console.log("alarmDay: " + alarmDay);
        // console.log("alarmDate: " + alarmDate);
            
            if(nowRadio === "date"){
                axios.post(`http://localhost:8080/alarm/user_bot/${userInfo.userId}/create`, {
                userId: userInfo.userId,
                content: text,
                alarm_day: alarmDay
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
            }
            else if(nowRadio === "day") {
                axios.post(`http://localhost:8080/alarm/user_bot/${userInfo.userId}/create`, {
                    userId: userInfo.userId,
                    content: text,
                    alarm_date : dummyDate+alarmDate
                })
                .then((res) => {
                    console.log(res);
                    // window.alert('알림이 설정되었습니다')
                    // history.goback()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        setText('')
    }


    // 로그인안했을때 로그인 유도 버튼
    const onClickLogin = () =>{
        setTimeout( function() {
            history.push('/login')
        }, 350);
    }


    if(isLoggedIn === true){
        return (
            <div className="page-wrapper">
                <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="d-flex row justify-content-center align-items-center mx-0">
                    <div className="pt-4">받고싶은<span className="fw-bolder" style={{color: "#5552FF", fontSize:"1.3em"}}> 알림</span>과 <span className="fw-bolder" style={{color: "#5552FF" , fontSize:"1.3em"}}>날짜</span>를 입력하면 </div>
                    <div className="pt-3"><span className="fw-bolder" style={{color: "#5552FF" , fontSize:"1.3em"}}>클로저봇</span>이 알려드려요 ! </div>
                </div>

                <div className="d-flex row justify-content-center align-items-end pt-3 mx-0 my-4">
                    <input 
                        placeholder="알림 받고 싶은 내용을 입력하세요.                   ex) 전기세 납부"
                        type="text"
                        value={text}
                        maxLength={30}
                        onChange={onChangeText}
                    >
                    </input>
                </div>

                <div className="d-flex row justify-content-center align-items-center mx-0 my-4" >
                    <div className="justify-content-center align-items-center d-flex row form-check col-5">
                        <input
                        className="form-check-label col-1 my-auto mx-0"
                        type='radio' 
                        name='dayInput' 
                        defaultValue="null" 
                        checked = {nowRadio==="day"}
                        onChange={onChangeDayRadio}
                        ref={dayRadioBtn}
                        /> 
                        <label className="col-3" for="dayRadio">매월</label>
                    </div>
                    <div className="d-flex row form-check col-5">
                        <input
                        className="form-check-label col-1 my-auto mx-0"
                        type='radio' 
                        name='dateInput' 
                        defaultValue="null" 
                        checked = {nowRadio==="date"}
                        onChange={onChangeDateRadio}
                        ref={dateRadioBtn}
                        />
                        <label className="col-3" for="dateRadio">매주</label>
                    </div>
                </div>

                {nowRadio === 'day'
                ?                 
                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                    <select id="alarmDate" name="alarmDate" value={alarmDate} onChange = {onChangeDate} ref={selectInputs}>
                        <option defaultValue hidden> -- 일 -- </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select> 일
                </div>

                : 
                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                    <select id="alarmDay" name="alarmDay" value={alarmDay} onChange = {onChangeDay} ref={selectInputs}>
                        <option defaultValue hidden> -- 요일 -- </option>
                        <option value="2">월</option>
                        <option value="3">화</option>
                        <option value="4">수</option>
                        <option value="5">목</option>
                        <option value="6">금</option>
                        <option value="7">토</option>
                        <option value="1">일</option>
                    </select>요일
                </div>
                }
                <div className="d-flex row justify-content-center align-items-end pt-3 mx-0">
                    <RippleButton type="submit" cclass="cbtn cbtn-primary cbtn-lg" children="알림 받기"/>
                </div>
                </form>
            </div>
        );
    }else{
        return (
            <div className="page-wrapper">
                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                    로그인이 필요한 서비스입니다. 
                </div>

                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                    <RippleButton type="submit" cclass="cbtn cbtn-md cbtn-primary" onClick={onClickLogin} children="로그인 하기"/>
                </div>
            </div>
        );
    }
}



export default withRouter(BotAlarm);