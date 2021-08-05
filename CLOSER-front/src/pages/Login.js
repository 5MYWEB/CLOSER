import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getMyInfoAction, loginAction } from '../modules/user'
import { RippleButton } from '../styles/index';
import '../styles/theme.css'

function Login({ history }) {
  // Redux store 접근 시 사용
  const dispatch = useDispatch();
  
  const [userInputs, setUserInputs] = useState({
    userId: '',
    password: ''
  });
  
  const { userId, password } = userInputs;

  const { decodedToken } = useSelector((state) => state.user);

  const onChange=useCallback(
    e => {
      const { name, value } = e.target;
      // console.log(name, value);
      setUserInputs({
        ...userInputs,
        [name]: value
      });
    },
    [userInputs]
  );

  // 데이터 빈 값 검사
  const checkExistData = (value, name) => {
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

    
  // 제출 시 검사 함수 실행 후 로그인 함수 실행
  const onSubmit=(
    e => {
      e.preventDefault();
      // 검사 함수로 확인,
      if (checkAll() === true) {
        // 로그인 요청
        axios.post('http://localhost:8080/user/login', userInputs )
          .then((response) => {
            const jwtAuthToken = response.headers["jwt-auth-token"]
            // response에 유저정보 들어있음
            dispatch(loginAction({ jwtAuthToken }));
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  )

  // 로그인에 성공했으면 로그인 유저 정보 가져오기
  useEffect(() => {
    if (decodedToken.UserId !== null){
      console.log('로그인했을때만')
        axios.post(`http://localhost:8080/user/profileinfo?userId=${decodedToken.UserId}`)
          .then((response) => {
            dispatch(getMyInfoAction(response.data))
            history.push('/')
          })
          .catch((error) => {
            console.log(error)
          })
        }
      }, [decodedToken, dispatch, history])
        
  return (
    <> 
      <h2 className="phrase">클로저에서 자취<br></br>200퍼센트 즐기기</h2>
      <span>아이디</span>
      <span className="necessary unfollow">*</span>
      <form onSubmit={onSubmit}>
        <div>
          <input
            placeholder="아이디를 입력하세요"
            onFocus={(e) => {
              e.target.placeholder='';
            }}
            onBlur={(e) => {
              e.target.placeholder='아이디를 입력하세요';
            }}
            type="text"
            name="userId"
            value={userId}
            onChange={onChange}
          />
          <RippleButton type="button" cclass="cbtn cbtn-sm cbtn-primary" children="중복확인"/>
        </div>
        <input
          placeholder="비밀번호를 입력하세요"
          onFocus={(e) => {
            e.target.placeholder='';
          }}
          onBlur={(e) => {
            e.target.placeholder='비밀번호를 입력하세요';
          }}
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <RippleButton type="submit" cclass="cbtn cbtn-lg cbtn-primary" children="로그인"/>
      </form>
      <div>
        <RippleButton type="button" cclass="cbtn cbtn-lg cbtn-secondary" children="회원가입"/>
        <RippleButton type="button" cclass="cbtn cbtn-checked" children="!"/>
      </div>
    </>
  )
}

export default Login;