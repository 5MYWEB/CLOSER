import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RippleButton } from '../../styles/index';
import '../../styles/theme.css'

function BotAlarm() {
    const { userInfo, isLoggedIn } = useSelector((state) => state.user);

    var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    var today = new Date().getDay();
    var todayLabel = week[today];

    var date = new Date().getDate()

    if(isLoggedIn == true){
        return (
            <div className="page-wrapper">
                <div className="d-flex row justify-content-between align-items-end mx-0">
                    <p className="row justify-content-center px-3 pt-4">알림 받고 싶은 정보와 날짜를 입력하면 </p>
                    <p className="row justify-content-center px-3 pt-3">클로저봇이 알려드려요 ! </p>
                </div>

                <div className="d-flex row justify-content-center align-items-end pt-3 mx-0 my-4">
                    <input 
                        placeholder="알림 받고 싶은 내용을 입력하세요.                   ex) 전기세 납부"
                        type="text"
                    >
                    </input>
                </div>

                <div className="d-flex justify-content-center align-items-end mx-0 my-4">
                    매월 : <select id="alarmDay" name="alarmDay">
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
                    매주 : <select id="alarmDate" name="alarmDate">
                                <option defaultValue hidden> -- 요일 -- </option>
                                <option value="mon">월</option>
                                <option value="tue">화</option>
                                <option value="3">수</option>
                                <option value="4">목</option>
                                <option value="5">금</option>
                                <option value="6">토</option>
                                <option value="7">일</option>
                                </select> 요일
                </div>

                <div className="d-flex row justify-content-center align-items-end pt-3 mx-0">
                    <RippleButton type="submit" cclass="cbtn cbtn-primary cbtn-lg" children="알림 받기"/>
                </div>
                
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