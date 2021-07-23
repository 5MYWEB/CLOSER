import React, { useState, useCallback } from 'react';
import axios from 'axios';

function Login(props) {
  const [userInputs, setUserInputs] = useState({
    userId: '',
    password: ''
  });

  const { userId, password } = userInputs;

  const onChange=useCallback(
    e => {
      const { name, value } = e.target;
      console.log(name, value);
      setUserInputs({
        ...userInputs,
        [name]: value
      });
    },
    [userInputs]
  );

  // 데이터 빈 값 검사
  const checkExistData = (value, name) => {
    console.log(value)
    if (value === '') {
      alert(name + " 입력해주세요!")
      return false;
    }
    return true;
  }

  // 아이디 검사
  const checkUserId = (id) => {
    if (!checkExistData(id, "아이디를")) {
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

  // 비밀번호 검사
  const checkPassword = (password) => {
    if (!checkExistData(password, "비밀번호를")) {
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

  // 모든 검사
  function checkAll() {
    if (!checkUserId(userId)) {
      return false;
    } else if (!checkPassword(password)) {
      return false;
    }
    return true;
  }

  // 검사 통과 후 진행되는 로그인
  const login = () => {
    const request = axios.post('http://localhost:8080/user/login', userInputs )
      .then((response) =>{
        console.log(response)
        console.log(request)
      })
    return null
  };
    
  // 제출 시 검사 함수 실행 후 로그인 함수 실행
  const onSubmit=(
    e => {
      e.preventDefault();
      if (checkAll() === true) {
        login();
      }
      props.setIsLoggedIn(true);
    }
  )

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit">
          Login
        </button>
      </form>
      <button>회원가입</button>
    </>
  )
}

export default Login;