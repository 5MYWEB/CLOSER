import React, {useState, useRef, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getMyInfoAction } from '../../modules/user';

const MyProfileUpdate = () => {

  const dispatch = useDispatch();
  // DOM 선택
  const selectInputs = useRef();

  // 자취 년차 표기용
  const date = new Date();
  
  // 기존 정보
  const { userInfo } = useSelector((state) => state.user);

  // 수정할 정보의 초기값은 기존 정보와 동일하다.
  const [changedUserinfo, setChangedUserInfo] = useState({
    userId: userInfo.userId,
    nickname: userInfo.nickname,
    password: userInfo.password,
    email: userInfo.email,
    homeAlone: userInfo.homeAlone,
    intro: userInfo.intro,
    profileImg: userInfo.profileImg,
    phone: userInfo.phone,
    badge: userInfo.badge,
    addr: userInfo.addr,
  })

  // 중복확인이 성공했으면 true
  const [doubleChecked, setDoubleChecked] = useState(true)

  // 값이 바뀌었으면 true
  const [changed, setChanged] = useState(false)

  // 닉네임 변경
  const onChangeNickname = (e) => {
    setChangedUserInfo({
      ...changedUserinfo,
      nickname: e.target.value
    })
    setDoubleChecked(false)
    setChanged(true)
  }

  // 닉네임 중복체크
  const onDoubleCheck = () => {
    axios.post(`http://localhost:8080/user/userNicknameCheck?nickname=${changedUserinfo.nickname}`)
    .then((res) => {
      alert(res.data)
      setDoubleChecked(true)
    })
    .catch((err) => {
      alert(err.response.data)
    })
  }

  // 자취기간 변경
  const onChangeHomeAlone = (e) => {
    setChangedUserInfo({
      ...changedUserinfo,
      homeAlone: Number(e.target.value)
    })
    setChanged(true)
  }

  // 한줄소개, 위치 변경
  const onChange = (e) => {
    const { name, value } = e.target;
    setChangedUserInfo({
      ...changedUserinfo,
      [name]: value
    })
    setChanged(true)
  }

  // 저장
  const onClickSave = () => {
    if (doubleChecked === true){
      // 수정 요청
      axios.put('http://localhost:8080/user/mypage', changedUserinfo)
      .then((res) => {
        console.log(res)
        // 정보다시 받아오는 요청
        axios.post(`http://localhost:8080/user/profileinfo?userId=${userInfo.userId}`)
        .then((res) => {
          dispatch(getMyInfoAction(res.data))
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    } else{
      alert('닉네임 중복체크를 해주세요!')
    }
  }

  return (
    <Container>
      {/* Row-0 : 뒤로가기 */}
      <Row>
        <Link to={`/profile/${userInfo.userId}`}>뒤로가기</Link>
      </Row>
      {/* Row-1 : 프로필사진 */}
      <Row className="justify-content-center">
        <Col xs={5} >
          <img src={fileUrl} alt="프로필사진"></img>
          <input type="file" onChange={processImage}></input>
        </Col>
      </Row>
      <br />

      {/* Row-2: 닉네임 */}
      닉네임
      <Row className="justify-content-center">
        <Col xs={8}>
          <input 
            type="text"
            value={changedUserinfo.nickname}
            name="nickname"
            onChange={onChangeNickname}
          />
        </Col>
        <Col xs={4} className="align-self-center">
          {doubleChecked ? 
            <button disabled onClick={onDoubleCheck}>중복체크</button>
            :
            <button onClick={onDoubleCheck}>중복체크</button>
          }
        </Col>
      </Row>
      <br />

      {/* Row-3 : 자취기간 */}
      자취기간: {date.getFullYear()-changedUserinfo.homeAlone+1} 년차
      <Row className="justify-content-center">
        <Col>
          저는 자취를
          <select id="homeAlone" name="homeAlone" value={changedUserinfo.homeAlone} onChange={onChangeHomeAlone} ref={selectInputs}>
            <option defaultValue value="undefined"> -- 년도 -- </option>
            <option value="2021">2021년</option>
            <option value="2020">2020년</option>
            <option value="2019">2019년</option>
            <option value="2018">2018년</option>
            <option value="2017">2017년</option>
            <option value="2016">2016년</option>
            <option value="2015">2015년</option>
            <option value="2014">2014년</option>
            <option value="2013">2013년</option>
            <option value="2012">2012년 이전</option>
          </select>
          부터 했어요!
        </Col>
      </Row >
      <br />

      {/* Row-5 : 한줄소개 */}
      한줄 소개
      <Row className="justify-content-center">
        <Col>
          <input 
            type="text"
            value={changedUserinfo.intro}
            name="intro"
            onChange={onChange}
          />
        </Col>
      </Row>
      {/* Row-6 : 취소, 저장 */}
      <Row className="justify-content-center">
        <Col >
          <Link to={`/profile/${userInfo.userId}`}><button>취소</button></Link>
        </Col>
        <Col>
          {changed ? 
            <button onClick={onClickSave}>저장</button>
            :
            <button disabled onClick={onClickSave}>저장</button>
          }
          
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfileUpdate;