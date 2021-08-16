import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RippleButton } from '../../styles/index';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../../styles/theme.css'

function BotAlarm() {
    const { userInfo, isLoggedIn } = useSelector((state) => state.user);
    const [ inputStatus, setInputStatus ] = useState('')
    const [text, setText] = useState('');
    const [alarmDay, setAlarmDay] = useState('')
    const [alarmDate, setAlarmDate] = useState('')
    const [alarmSelect, setRadio] = useState('');

    let week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    let today = new Date().getDay();
    let todayLabel = week[today];

    let date = new Date().getDate()
    let dummyDate = "2021-08-";
    let birthday = new Date(1995, 11, 17)


    const selectInputs = useRef();

    const handleClickRadioButton = (radioBtnName) => {
        setInputStatus(radioBtnName)
    }

    // 사용자가 알림 내용을 입력할때 작동하는 함수
    const onChangeText = (e) => {
        setText(e.target.value)
    }

    const onChangeDate = (e) => {
        // dummyDate + e.target.value
        
        setAlarmDate(e.target.value)
    }

    const onChangeDay = (e) => {
        // dummyDate + e.target.value
        console.log(e.target.value)
        setAlarmDay(e.target.value)
    }
    
    const [selected, setSelected] = useState();
    const selectedSetting = useRef();
    const handleSettingsChange = e => setSelected(e.target.id);

    const radioChange = (e) => {
        setRadio(e.target.value);
    }


    // 내용이 빈 값인지 검사하는 함수
    const nullCheck = () => {
        if (text === '') {
        alert('알림 내용을 입력해주세요!')
        return false
        }
        return true
    }

    // 데이터 빈 값 검사
    const checkExistData = (value, name) => {
        console.log(value)
        if (value === '') {
            alert(name + ' 입력해주세요!')
            return false;
        }
        return true;
    }

    // 자취시작연도 검사
    // const checkDayDate = (alarmDay) => {
    //     if (!checkExistData(alarmDay, "알림 날짜를")) {
    //         return false
    //     }
    //     return true
    // }

      // 피드를 제출할때 작동하는 함수
    const onSubmit = (e) => {
        e.preventDefault();
        // if(checkDayDate()){
            go();
        // }
    };

  // 백에 저장하는 메소드
    const go=() => {
        console.log("alarmDay: " + alarmDay);
        console.log("alarmDate: " + alarmDate);
        if(nullCheck()) {
            if(alarmDate == ""){
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
            else if(alarmDay == "") {
                axios.post(`http://localhost:8080/alarm/user_bot/${userInfo.userId}/create`, {
                    userId: userInfo.userId,
                    content: text,
                    alarm_date : dummyDate+alarmDate
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err)
                })
            }
                    
            
        // selected 
        // ? alert("Selected radio: " + selected) 
        // : alert("알림 받을 주기를 선택해주세요!");
        
        setText('')
                    
        }
        
    }

    if(isLoggedIn == true){
        return (
            <div className="page-wrapper">
                <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="d-flex row justify-content-between align-items-end mx-0">
                    <p className="row justify-content-center px-3 pt-4">알림 받고 싶은 정보와 날짜를 입력하면 </p>
                    <p className="row justify-content-center px-3 pt-3">클로저봇이 알려드려요 ! </p>
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

                {/* <RadioGroup className="d-flex justify-content-center align-items-end mx-0 my-4">
                    <RadioButton>매월</RadioButton>
                    <RadioButton>매주</RadioButton>
                </RadioGroup> */}

                <div className="d-flex justify-content-center align-items-end mx-0 my-4" >
                    <input 
                        type='radio' 
                        id ="radio1"
                        name='alarm' 
                        value={alarmSelect}
                        defaultValue="null" 
                        ref={selectedSetting} onClick={handleSettingsChange}

                    /> 매주 
                    <input
                        type='radio'
                        id ="radio2" 
                        name='alarm' 
                        value={alarmSelect}
                        defaultValue="null" 
                        ref={selectedSetting} onClick={handleSettingsChange}
                    /> 매월
                </div>

                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                    매월 : <select id="alarmDate" name="alarmDate" value={alarmDate} onChange = {onChangeDate} ref={selectInputs}>
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
                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                        <p> OR </p>
                </div> 
                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                    매주 : <select id="alarmDay" name="alarmDay" value={alarmDay} onChange = {onChangeDay} ref={selectInputs}>
                                <option defaultValue hidden> -- 요일 -- </option>
                                <option value="2">월</option>
                                <option value="3">화</option>
                                <option value="4">수</option>
                                <option value="5">목</option>
                                <option value="6">금</option>
                                <option value="7">토</option>
                                <option value="1">일</option>
                                </select> 요일
                </div>

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
                    <Link to={`/login/`} className="d-flex justify-content-center">
                        <RippleButton type="submit" cclass="cbtn cbtn-primary cbtn-light" children="로그인 하기"/>
                    </Link>
                </div>
            </div>
        );
    }
    
}

export default BotAlarm;