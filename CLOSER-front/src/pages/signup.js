import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios'

function SignUp(props) {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
    email: '',
    addr: {
      city: '',
      gu: '',
      dong: ''
    },
    // addr: '',
    // 번호만 입력받기
    phone: '',
    //HowLongLiveAlone
    homeAlone: ''
  });

  // 구조분해 할당
  let { userId, nickname, password, email, addr, phone, homeAlone } = userInfo;

  // 몇년차인지 표시하기 
  const date = new Date();

  // 주소 전체응

  // DOM 선택
  const radioBtn = useRef();
  const selectInputs = useRef();

  const onChange=useCallback(
    e => {

      // select를 누르면 radio가 초기화
      if (e.target.type === 'select-one') {
        radioBtn.current.checked = false;
      };

      const { name, value } = e.target;
      // console.log(name, value);

      // 주소만 구조가 다르므로 name이 주소 속성이면
      if (Object.keys(addr).includes(name)) {
        setUserInfo({
          ...userInfo,
          addr: {
            ...userInfo.addr,
            [name]: value
          }
        });
      } else {
        setUserInfo({
          ...userInfo,
          [name]: value
        });
      }
    },
    [userInfo]
  );
  
    // 데이터 빈 값 검사
    const checkExistData = (value, name) => {
      console.log(value)
      if (value === '') {
        alert(name + ' 입력해주세요!')
        return false;
      }
      return true;
    }
  
    // 아이디 검사
    const checkUserId = (id) => {
      if (!checkExistData(id, '아이디를')) {
        return false
      }
      // var idRegExp = /^[a-zA-z0-9]{4,12}$/; //아이디 유효성 검사
      // if (!idRegExp.test(id)) {
      //     alert("아이디는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!");
      //     form.userId.value = "";
      //     form.userId.focus();
      //     return false;
      // }
      return true
    }
  
    // 닉네임 검사
    const checkNickname = (nickname) => {
      if (!checkExistData(nickname, '닉네임을')) {
        return false
      }
      return true
    }

    // 비밀번호 검사
    const checkPassword = (password) => {
      if (!checkExistData(password, '비밀번호를')) {
        return false
      }
      return true
      // var password1RegExp = /^[a-zA-z0-9]{4,12}$/; //비밀번호 유효성 검사
      // if (!password1RegExp.test(password1)) {
      //     alert("비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!");
      //     form.password1.value = "";
      //     form.password1.focus();
      //     return false;
    }

    // 이메일 검사
    const checkEmail = (email) => {
      if (!checkExistData(email, '이메일을')) {
        return false
      }
      return true
    }

    // 주소 검사
    
    const checkAddr = (addr) => {
      let { city, gu, dong } = addr;
      if (!checkExistData(city, '시를')) {
        return false
      } else if (!checkExistData(gu, '구를')) {
        return false
      } else if (!checkExistData(dong, '동을')) {
        return false
      }
      return true
    }

    // 폰번호 검사
    const checkPhone = (phone) => {
      if (!checkExistData(phone, "전화번호를")) {
        return false
      }
      return true
    }

    // 자취시작연도 검사
    const checkHomeAlone = (homeAlone) => {
      if (!checkExistData(homeAlone, "자취시작년도를")) {
        return false
      }
      return true
    }

    // 모든 검사
    function checkAll() {
      if (!checkUserId(userId)) {
        return false;
      } else if (!checkNickname(nickname)) {
        return false;
      } else if (!checkPassword(password)) {
        return false;
      } else if (!checkEmail(email)) {
        return false;
      } else if (!checkAddr(addr)) {
        return false;
      } else if (!checkPhone(phone)) {
        return false;
      } else if (!checkHomeAlone(homeAlone)) {
        return false;
      }
      return true;
    }

  // 회원가입 함수
  const signup = (userInfo) => {
    const request = axios.post('http://localhost:8080/user/regist', userInfo )
      .then((response) =>{
        console.log(response);
        console.log(request);
      })
    return null
  };

  // 제출버튼 클릭 시 실행되는 함수
  const onSubmit=(
    e => {
      e.preventDefault();
      
      if (checkAll() === true) {
        // 자취 n년차 int 형변환
        userInfo.homeAlone *= 1

        // 백으로 보내질 주소(공백으로 구분)
        userInfo.addr = String(userInfo.addr.city + ' ' + userInfo.addr.gu + ' ' + userInfo.addr.dong);

        console.log(userInfo)

        // 회원가입 함수의 파라미터 설정

        // 회원가입 함수 실행
        signup(userInfo);

        // props.setIsSignedUp(true);
      }
    }
  )

  return (
    <form onSubmit={onSubmit}>
      <p>아이디를 입력하세요</p>
      <input
        type="text"
        name="userId"
        value={userId}
        onChange={onChange}
      />
      <p>닉네임을 입력하세요</p>
      <input
        type="text"
        name="nickname"
        value={nickname}
        onChange={onChange}
      />
      <p>비밀번호를 입력하세요</p>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <p>이메일을 입력하세요</p>
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
      />
      <p>주소를 입력하세요</p>
      <label htmlFor="city">Choose a City:</label>
      <select id="city" name="city" value={addr.city} onChange={onChange}>
        <option defaultValue value="undefined"> -- 시를 선택해주세요 -- </option>
        <option value="서울시">서울시</option>
        <option value="용인시">용인시</option>
        <option value="인천시">인천시</option>
        <option value="부산시">부산시</option>
      </select>
      <label htmlFor="gu">Choose a gu:</label>
      <select id="gu" name="gu" value={addr.gu} onChange={onChange}>
      <option defaultValue value="undefined"> -- 구를 선택해주세요 -- </option>
        <option value="동작구">동작구</option>
        <option value="마포구">마포구</option>
        <option value="서대문구">서대문구</option>
        <option value="동구">동구</option>
      </select>
      <label htmlFor="dong">Choose a dong:</label>
      <select id="dong" name="dong" value={addr.dong} onChange={onChange}>
        <option defaultValue value="undefined"> -- 동을 선택해주세요 -- </option>
        <option value="염리동">염리동</option>
        <option value="동교동">동교동</option>
        <option value="서교동">서교동</option>
        <option value="둔산동">둔산동</option>
      </select>

      <p>휴대전화 번호를 입력하세요</p>
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <p>자취 몇년차이신가요?</p>
      <p>언제 자취를 시작하셨나요?</p>
      <label htmlFor="homeAlone">When did you start living alone</label>
      <input
        type='radio' 
        name='homeAlone' 
        value="null" 
        onChange={onChange}
        ref={radioBtn}
      /> 자취하지 않음 / 준비중
      <select id="homeAlone" name="homeAlone" value={homeAlone} onChange={onChange} ref={selectInputs}>
        <option defaultValue value="undefined"> -- 연도를 선택해주세요 -- </option>
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
      <p>자취{date.getFullYear()-homeAlone+1}년차!</p>

      <button type="submit">
        Signup
      </button>
    </form>
  )
  
}

export default SignUp;