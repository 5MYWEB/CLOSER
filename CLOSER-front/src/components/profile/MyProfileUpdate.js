import React, {useState, useRef} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AWS from 'aws-sdk';
import { getMyInfoAction } from '../../modules/user';
import defaultProfile from '../../assets/profile-user-demo.png'

const MyProfileUpdate = () => {

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
  const [changedUserinfo, setChangedUserInfo] = useState({
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
        console. log(err)
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
           <img src={fileUrl} alt="프로필사진" onError={handleImgError}></img>
          <div>
          <label className="input-file-button" htmlFor="input-file" >
            파일 선택
          </label>
          <input type="file" id="input-file" style={{display:"none"}} onChange={processImage}/>
          <button onClick={removeFile}>파일삭제</button>
          </div>
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