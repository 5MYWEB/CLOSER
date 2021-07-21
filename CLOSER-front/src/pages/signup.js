import React, { useState, useCallback } from 'react';

function SignUp(props) {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
    email: '',
    address: {
      city: '',
      gu: '',
      dong: ''
    },
    // 번호만 입력받기
    phoneNumber: '',
    //HowLongLiveAlone
    livingAloneNthYears: ''
  });

  const { userId, nickname, password, email, address, phoneNumber, livingAloneNthYears } = userInfo;

  const onChange=useCallback(
    e => {
      const { name, value } = e.target;
      console.log(name, value);
      setUserInfo({
        ...userInfo,
        [name]: value
      });
    },
    [userInfo]
  );

  const onSubmit=(
    e => {
      e.preventDefault();
      console.log(userInfo);
      props.setIsSignedUp(true);
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
      <select id="city" name="city" value={address.city} onChange={onChange}>
        <option value="서울">서울</option>
        <option value="경기">경기</option>
        <option value="인천">인천</option>
        <option value="부산">부산</option>
      </select>
      <label htmlFor="cars">Choose a car:</label>
      <select id="cars" name="cars" value={address.gu} onChange={onChange}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
      <label htmlFor="cars">Choose a car:</label>
      <select id="cars" name="cars" value={address.dong} onChange={onChange}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
      <p>휴대전화 번호를 입력하세요</p>
      <input
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={onChange}
      />
      <p>자취 몇년차이신가요?</p>
      <input
        type="number"
        name="livingAloneNthYears"
        value={livingAloneNthYears}
        onChange={onChange}
      />
      <button type="submit">
        Signup
      </button>
    </form>
  )
  
}

export default SignUp;