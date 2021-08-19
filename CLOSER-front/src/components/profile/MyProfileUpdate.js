import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AWS from 'aws-sdk';
import { getMyInfoAction } from '../../modules/user';
import defaultProfile from '../../assets/user-on.svg';
import { RippleButton, ShakeButton } from '../../styles/index';
import '../../styles/theme.css'

const MyProfileUpdate = ({history}) => {
  // S3 기본 정보
  var albumBucketName = "photo-album-hy";
  var bucketRegion = "ap-northeast-2";
  var IdentityPoolId = "ap-northeast-2:00a0ab54-d07b-4fbc-9601-4362640e9362";

  // Cognito 연동으로 S3 접근 권한을 얻는 부분
  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId
    }),
  })

  var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName },
  });

  const dispatch = useDispatch();
  // DOM 선택
  const selectInputs = useRef();

  // 자취 년차 표기용
  const date = new Date();

  // 기존 정보
  const { userInfo } = useSelector((state) => state.user);

  let img = `https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/${userInfo.userId}/${userInfo.userId}_profile.jpg`

  // 수정할 정보의 초기값은 기존 정보와 동일하다.
  const [changedUserInfo, setChangedUserInfo] = useState({
    userId: userInfo.userId,
    nickname: userInfo.nickname,
    password: userInfo.password,
    email: userInfo.email,
    homeAlone: userInfo.homeAlone,
    intro: userInfo.intro,
    profileImg: img,
    phone: userInfo.phone,
    badge: userInfo.badge,
    addr: userInfo.addr,
  })

  // 중복확인이 성공했으면 true
  const [doubleChecked, setDoubleChecked] = useState(true)

  // 값이 바뀌었으면 true
  const [changed, setChanged] = useState(false)

  // 프로필 사진을 변경했으면 true
  const [changedimg,setChangedimg] = useState(false)

  // 프로필 사진 삭제한 경우 true
  const [deleteimg,setdeleteimg] = useState(false)

  // 닉네임 변경
  const onChangeNickname = (e) => {
    setChangedUserInfo({
      ...changedUserInfo,
      nickname: e.target.value
    })
    setDoubleChecked(false)
    setChanged(true)
  }

  // 닉네임 중복체크
  const onDoubleCheck = () => {
    axios.post(`http://localhost:8080/user/userNicknameCheck?nickname=${changedUserInfo.nickname}`)
      .then((res) => {
        // console.log(res.data)
        setDoubleChecked(true)
      })
      .catch((err) => {
        alert(err.response.data)
      })
  }

  // 자취기간 변경
  const onChangeHomeAlone = (e) => {
    setChangedUserInfo({
      ...changedUserInfo,
      homeAlone: Number(e.target.value)
    })
    setChanged(true)
  }

  // 한줄소개, 위치 변경
  const onChange = (e) => {
    const { name, value } = e.target;
    setChangedUserInfo({
      ...changedUserInfo,
      [name]: value
    })
    setChanged(true)
  }

  // 이미지 미리보기
  const [fileUrl, setFileUrl] = useState(img);
  const [file, setFile] = useState('');

  function processImage(event){
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setFileUrl(reader.result);
    }
    if(file)
      reader.readAsDataURL(file);
    setChanged(true);
    setChangedimg(true);
  }

  // 이미지 S3에 업로드
  const userid = userInfo.userId;
  let albumPhotosKey = encodeURIComponent(userid) + "/";
  let photoKey = albumPhotosKey + userid + "_profile.jpg";

  async function handleFileInput() {
    // AWS sdk에 포함된 함수로 파일을 업로드하는 부분
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file,
      },
    })

    const promise = upload.promise();

    promise.then(
        function (data) {
          console.log("Successfully uploaded photo.");
        },
        function (err) {
          return console.log("There was an error uploading your photo: ", err.message);
        }
    );
  }

  // 이미지 없을 시 기본 이미지 생성
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

  // 이미지 파일 삭제
  const removeFile = (e) =>{
    e.target.files = ''
    setFile('')
    setFileUrl('')
    setChanged(true)
    setdeleteimg(true)
  }

  //s3에 파일 삭제
  const deletePhoto = (photoKey) => {
    // 파일 삭제
    s3.deleteObject({ Key: photoKey }, function (err, data) {});
  };

  // 저장
  const onClickSave = () => {
    if(changedimg === true) handleFileInput();
    if(deleteimg === true) deletePhoto(photoKey);
    if (doubleChecked === true){
      // 수정 요청
      axios.put('http://localhost:8080/user/mypage', changedUserInfo)
        .then((res) => {
          // 정보다시 받아오는 요청
          axios.post(`http://localhost:8080/user/profileinfo?userId=${userInfo.userId}`)
            .then((res) => {
              dispatch(getMyInfoAction(res.data))
              // s3에 사진이 업로드 되기까지 기다리는 시간
              setTimeout( function () {
                history.goBack();
              }, 750);
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

  // 취소
  const onClickBack = ( ) => {
    setTimeout( function() {
      history.goBack();
    }, 350);}

  return (
    <div className="page-wrapper">
      {/* 1. 닉네임 */}
      <div>
        <span className="input-label">닉네임</span>
        <span className="necessary unfollow">*</span>
      </div>
      <div className="row mx-0 mt-3 justify-content-start align-items-start">
        <input
          placeholder="닉네임을 입력하세요"
          onFocus={(e) => {
            e.target.placeholder='';
          }}
          onBlur={(e) => {
            e.target.placeholder='닉네임을 입력하세요';
          }}
          type="text"
          // value가 null이 되지 않게 처리
          value={changedUserInfo.nickname? changedUserInfo.nickname:''}
          name="nickname"
          onChange={onChangeNickname}
          className="col-7 px-0 me-0"
        />
        <div className="col-3 mt-1">
          {doubleChecked ? 
            <RippleButton disabled onClick={onDoubleCheck} type="button" cclass="cbtn cbtn-sm cbtn-green m-0" children="확인완료"/>
            :
            <RippleButton onClick={onDoubleCheck} type="button" cclass="cbtn cbtn-sm cbtn-primary m-0" children="중복확인"/>
          }
        </div>
      </div>

      
      {/* 2. 프로필 사진 */}
      <div className="paragraph">
        <span className="input-label">프로필 사진</span>
        <div className="ml-1_5rem my-3 pb-4 d-flex justify-content-around align-items-center my-3">
          <div className="col-6 profile-img-wrapper">
            {fileUrl
            ?
            <img src={fileUrl} alt="프로필사진" onError={handleImgError} className="profile-img"></img>
            :
            <label className="input-placeholder-style">
              파일을 선택하세요
            </label>
            }
          </div>
          
          <div className="col-6">
          {/* 사진 받아오는 input(label의 형태) */}
          <label className="cbtn-sm cbtn-primary" htmlFor="input-file" >
            업로드
          </label>
            <input type="file" id="input-file" style={{display:"none"}} onChange={processImage}/>
            <RippleButton onClick={removeFile} cclass="cbtn-sm cbtn-secondary" children="파일삭제"/>
          </div>
        </div>

      </div>
      {/* <img src={fileUrl} alt="프로필사진"></img> */}
      {/* <input type="file" onChange={processImage}></input> */}
      {/* <RippleButton type="button" cclass="cbtn cbtn-sm cbtn-primary" children="무언가 확인버튼"/> */}

      {/* 3. 자취기간 */}
      <div className="paragraph">
        <span className="input-label">자취기간: </span>
        {changedUserInfo.homeAlone === 0
        ? <span> 0년차<span className="ps-2 input-placeholder-style"> "자취 희망러"로 표시됩니다 </span></span>
        : <span> {date.getFullYear()-changedUserInfo.homeAlone+1} 년차 </span>}
      </div>
      <div className="input-role input-bolder ml-2rem pb-1">
        <h4 className="ps-3">"저는 자취를</h4>
        <select id="homeAlone" name="homeAlone" value={changedUserInfo.homeAlone} onChange={onChangeHomeAlone} ref={selectInputs} className="mx-auto py-0 form-select">
          <option defaultValue hidden> -- 년도 -- </option>
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
          <option value="0">자취경험없음</option>
        </select>
        <h4 className="pe-3 text-end">부터 했어요!"</h4>
      </div>

      {/* 4. .한줄 소개 */}
      <div className="paragraph">
        <span className="input-label">한줄 소개</span>
      </div>
      <input
        placeholder="한줄로 자신을 소개해보세요"
        onFocus={(e) => {
          e.target.placeholder='';
        }}
        onBlur={(e) => {
          e.target.placeholder='한줄로 자신을 소개해보세요';
        }}
        type="text"
        value={changedUserInfo.intro}
        name="intro"
        onChange={onChange}
      />

      {/* 5. 제출 버튼 */}
      <div className="button-group">
        {changed 
        ? <RippleButton onClick={onClickSave} cclass="cbtn cbtn-lg cbtn-primary" children="저장"/>
        : <ShakeButton cclass="cbtn cbtn-lg cbtn-secondary" children="저장"/>
        }
        <RippleButton onClick={onClickBack} cclass="cbtn cbtn-lg cbtn-secondary" children="취소"/>
      </div>   
    </div>  
  )
}

export default MyProfileUpdate;