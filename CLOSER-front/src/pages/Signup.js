import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios'
import AWS from "aws-sdk";
import { RippleButton, ShakeButton } from '../styles/index';
import UserLocation from '../components/profile/UserLocation';
import { useSelector } from 'react-redux';
import { FormSelect, InputGroup } from 'react-bootstrap';
import '../styles/theme.css'
import './Signup.css';

function SignUp( {history} ) {

  const [userInfo, setUserInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
    email: '',
    addr: '',
    phone: '',
    homeAlone: '',
  });

  const [ passwordCheck , setPasswordCheck ] = useState('')

  // 중복확인이 성공했으면 true
  const [userIdChecked, setUserIdChecked] = useState(false)
  const [nicknameChecked, setNicknameChecked] = useState(false)
  
  const { changedAddr } = useSelector((state) => state.user)

  // 구조분해 할당
  let { userId, nickname, password, email, addr, phone, homeAlone } = userInfo;

  // 주소 전체응
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      addr: changedAddr
    })
    // console.log(addr)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[changedAddr])

  // DOM 선택
  const radioBtn = useRef();
  const selectInputs = useRef();

  // 정보 입력 시
  const onChange=useCallback(
    e => {
      // select를 누르면 radio가 초기화
      if (e.target.type === 'select-one') {
        radioBtn.current.checked = false;
      };

      const { name, value } = e.target;

        setUserInfo({
          ...userInfo,
          [name]: value
        });
      // }
    },
    [userInfo]
  );

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value)
  }
  
  // 데이터 빈 값 검사
  const checkExistData = (value, name) => {
    // console.log(value)
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

  // 아이디 중복체크
  const userIdCheck = () => {
    axios.post(`http://localhost:8080/user/userIdCheck?userId=${userId}`)
      .then((res) => {
        if(res.status === 200){
          alert(res.data)
          setUserIdChecked(true)
          return true
        } else {
          alert(res.data)
          setUserIdChecked(false)
          return false
        }
      })
      .catch((err) => {
        alert(err.response.data)
        setUserIdChecked(false)
        return false
      })
  }

  // 아이디 바뀌면 중복체크 다시
  const onChangeUserId = () => {
    setUserIdChecked(false)
  }

  // 닉네임 중복체크
  const nicknameCheck = () => {
    axios.post(`http://localhost:8080/user/userNicknameCheck?nickname=${nickname}`)
      .then((res) => {
        if(res.status === 200){
          alert(res.data)
          setNicknameChecked(true)
          return true
        } else {
          alert(res.data)
          setNicknameChecked(false)
          return false
        }
      })
      .catch((err) => {
        alert(err.response.data)
        setNicknameChecked(false)
        return false
      })
  }

  // 닉네임 바뀌면 중복체크 다시
  const onChangeNickname = () => {
    setNicknameChecked(false)
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
    if (password !== passwordCheck){
      alert('비밀번호 확인이 일치하지 않습니다')
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
  // const checkAddr = (addr) => {
  //   if(!checkExistData(addr, '주소를')) {
  //     return false
  //   }
  //   return true
  // }

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
    // } else if (!checkAddr(addr)) {
    //   return false;
    } else if (!checkPhone(phone)) {
      return false;
    } else if (!checkHomeAlone(homeAlone)) {
      return false;
    } else if (!userIdChecked){
      alert('아이디 중복확인을 해주세요')
      return false;
    } else if (!nicknameChecked){
      alert('닉네임 중복확인을 해주세요')
      return false;
    }
    return true;
  }

  // 회원가입 함수
  const signup = (userInfo) => {
    axios.post('http://localhost:8080/user/regist', userInfo )
      .then((response) =>{
        // console.log(response);
        history.push('/login', 'singed')
      })
    return null
  };

  // AWS 앨범 생성
  var albumBucketName = "photo-album-hy";
  var bucketRegion = "ap-northeast-2";
  var IdentityPoolId = "ap-northeast-2:00a0ab54-d07b-4fbc-9601-4362640e9362";

  AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId,
      }),
  });

  var s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: albumBucketName },
  });
  const createAlbum = (albumName) => {
      // 앨범 생성
      albumName = albumName.trim();
      if (!albumName) {
          return alert("Album names must contain at least one non-space character.");
      }
      if (albumName.indexOf("/") !== -1) {
          return alert("Album names cannot contain slashes.");
      }
      var albumKey = encodeURIComponent(albumName);
      s3.headObject({ Key: albumKey }, function (err) {
          if (!err) {
              return console.log("Album already exists.");
          }
          if (err.code !== "NotFound") {
              return console.log("There was an error creating your album: " + err.message);
          }
          s3.putObject({ Key: albumKey }, function (err, data) {
              if (err) {
                  return console.log("There was an error creating your album: " + err.message);
              }
              // alert("Successfully created album.");
          });
      });
  };


  // 제출버튼 클릭 시 실행되는 함수
  const onSubmit=(
    e => {
      e.preventDefault();
      
      if (checkAll() === true) {
        // 자취 n년차 int 형변환
        userInfo.homeAlone *= 1

        // console.log(userInfo)

        // 앨범 생성
        createAlbum(userInfo.userId);

        // 회원가입 함수 실행
        signup(userInfo);


      }
    }
  )

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        {/* 아이디 */}
        <div>
          <div className="mt-2">
            <span className="input-label">아이디</span>
            <span className="necessary unfollow">*</span>
          </div>
          <div className="row mx-0">
            <div className="col-8 px-0">
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
                defaultValue={userId}
                onChange={(e) => {onChange(e); onChangeUserId(e);}}
              />
            </div>
            <div className="col-4 px-0">
              {userIdChecked ? 
                <RippleButton disabled onClick={userIdCheck} type="button" cclass="cbtn cbtn-sm cbtn-green" children="확인완료"/>
                :
                <RippleButton onClick={userIdCheck} type="button" cclass="cbtn cbtn-sm cbtn-primary" children="중복확인"/>
              }
            </div>
          </div>
        </div>


        {/* 닉네임 */}
        <div>
          <div>
            <span className="input-label">닉네임</span>
            <span className="necessary unfollow">*</span>
          </div>
          <div className="row mx-0">
            <div className="col-8 px-0">
              <input
                placeholder="닉네임을 입력하세요"
                onFocus={(e) => {
                  e.target.placeholder='';
                }}
                onBlur={(e) => {
                  e.target.placeholder='닉네임을 입력하세요';
                }}
                type="text"
                name="nickname"
                defaultValue={nickname}
                onChange={(e) => {onChange(e); onChangeNickname(e);}}
              />
            </div>
            <div className="col-4 px-0">
              {nicknameChecked ? 
                <RippleButton disabled onClick={nicknameCheck} type="button" cclass="cbtn cbtn-sm cbtn-green" children="확인완료"/>
                :
                <RippleButton onClick={nicknameCheck} type="button" cclass="cbtn cbtn-sm cbtn-primary" children="중복확인"/>
              }
            </div>
          </div>
        </div>


        {/* 비밀번호 */}
        <div>
          <div>
            <span className="input-label">비밀번호</span>
            <span className="necessary unfollow">*</span>
          </div>
          <div>
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
              defaultValue={password}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <div>
            <span className="input-label">비밀번호 확인</span>
            <span className="necessary unfollow">*</span>
          </div>
          <div>
            <input
              placeholder="비밀번호 확인"
              onFocus={(e) => {
                e.target.placeholder='';
              }}
              onBlur={(e) => {
                e.target.placeholder='비밀번호 확인';
              }}
              type="password"
              name="passwordCheck"
              defaultValue={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
        </div>


        {/* 이메일 */}
        <div>
          <div>
            <span className="input-label">이메일</span>
            <span className="necessary unfollow">*</span>
          </div>
          <div>
            <input
              placeholder="이메일을 입력하세요"
              onFocus={(e) => {
                e.target.placeholder='';
              }}
              onBlur={(e) => {
                e.target.placeholder='이메일을 입력하세요';
              }}
              type="text"
              name="email"
              defaultValue={email}
              onChange={onChange}
            />
          </div>
        </div>

        {/* 위치 */}
        <div className="user-location">
          <div className="input-label d-flex align-items-center" name="addr">
            저는&nbsp;&nbsp;<input type="text" defaultValue={changedAddr} readOnly className="user-location-input"/>&nbsp;&nbsp;주민입니다!
          </div>
          <div className="user-location-map">
            <UserLocation></UserLocation>
          </div>
        </div>
        <br />
        
        {/* 전화번호 */}
        <div>
          <div>
            <span className="input-label">휴대전화 번호( - 없이)</span>
            <span className="necessary unfollow"> *</span>
          </div>
          <div>
            <input
              placeholder="휴대전화 번호를 입력하세요( - 없이)"
              onFocus={(e) => {
                e.target.placeholder='';
              }}
              onBlur={(e) => {
                e.target.placeholder='핸드폰 번호를 입력하세요( - 없이)';
              }}
              type="text"
              name="phone"
              defaultValue={phone}
              onChange={onChange}
            />
          </div>
        </div>

        {/* 자취기간 */}
        <div>
          <div>
            <span className="input-label">자취 경력</span>
            <span className="necessary unfollow">*</span>
          </div>
          <div>
            <div>
              <div className="d-flex align-items-center">
                <span className="homealone-no">&gt;&gt; 자취해본 적 없음!</span>
                <input
                  className="homealone-radio"
                  type='radio' 
                  name='homeAlone' 
                  defaultValue="null" 
                  onChange={onChange}
                  ref={radioBtn}
                /> 
              </div>
              <div className="d-flex align-items-center">
                <span className="homealone-yes">&gt;&gt; </span>
                <div>
                  <InputGroup className="input-group">
                    <FormSelect id="homeAlone" name="homeAlone" value={homeAlone} onChange={onChange} ref={selectInputs}>
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
                    </FormSelect>
                  </InputGroup>
                </div>
                <span>부터 자취하는 중</span>
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <div className=" button-group">
            { userId === '' || nickname === '' || password === '' || passwordCheck === '' 
              || email === '' || addr === '' || phone === '' || homeAlone === ''
              ? <ShakeButton cclass="cbtn cbtn-lg cbtn-secondary" children="회원가입"/>
              : <RippleButton type="submit" cclass="cbtn cbtn-lg cbtn-primary" children="회원가입"/>
            } 
        </div>
      </form>
    </div>
  )
  
}

export default SignUp;