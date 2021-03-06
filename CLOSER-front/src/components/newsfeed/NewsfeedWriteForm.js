import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AWS from 'aws-sdk';
import { RippleButton } from '../../styles/index';
import { createBoard } from '../../modules/board';
import { InputGroup, Container } from 'react-bootstrap';
import swal from 'sweetalert';

const NewsfeedWriteForm = () => {
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


  const dispatch = useDispatch();

  const history = useHistory();

  // 리덕스 user에서 userId 받아옴 
  const {userId} = useSelector((state) => state.user.userInfo);

  const [text, setText] = useState('');
  const [check,setcheck] = useState(false); // 이미지가 있는지 확인

  // 사용자가 피드 내용을 입력할때 작동하는 함수
  const onChangeText = (e) => {
    setText(e.target.value)
  }

  // 텍스트가 빈 값인지 검사하는 함수
  const nullCheck = () => {
    if (text === '') {
      // alert('내용을 입력해주세요!')
      swal('내용을 입력해주세요!', "", "info");
      return false
    }
    return true
  }

  // 피드를 제출할때 작동하는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    if(check===true) {
      handleFileInput();
      
    }
    else go();
  };

  // 백에 저장하는 메소드
  const go=() => {
    if (nullCheck()) {
      axios.post('http://localhost:8080/board/', {
        kind_pk: 7,
        userId: userId,
        title: null,
        content: text,
        imgUrls : Urls,
      })
          .then(() => {
            dispatch(createBoard())
            history.push(`/newsfeed/near`)
          })
          .catch((err) => {
            console.log(err)
          })
      setText('')
      setUrls([])
      setcheck(false)
      setUrl('')
      setFiles([])
      setSelectedFiles([])
    }
  }

  const [ Files, setFiles] = useState([]);
  const [ selectedFiles, setSelectedFiles ] = useState([]);
 // 이미지 미리보기
  const handleImageChange = (e) => {
    setSelectedFiles([]) // 이미지 초기화
    setcheck(true)
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      setFiles((fileArray));
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
          (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo}/>;
    });
  };

  function handleFileInput() {
    let lng;
    s3.listObjects({ Prefix: userId}, function (err, data) {
      lng = this.data.Contents.length;
    });

    setTimeout(function () {
      for (let i = 0; i < Files.length; i++) {
        handleUpload(Files[i], i,lng);
      }
    }, 1000);

  };

  const[Urls,setUrls] = useState([]);
  const[Url,setUrl] = useState("");
  function handleUpload (file, i, lng) {
    return new Promise(function(resolve, reject) {
      var albumPhotosKey = encodeURIComponent(userId) + "/";
      const photoKey = albumPhotosKey + userId + "_" + (lng + i);

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
            setUrl(data.Location);
          },
          function (err) {
            return console.log("There was an error uploading your photo: ", err.message);
          }
      );
    });
  }
  useEffect(() => {
    if (Url !== "") {
      setUrls((Urls) => [...Urls, Url]);
      }}, [Url]);

  useEffect(()=>{
    if(Urls.length!==0 && Urls.length===Files.length) go()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Urls])



  return (
      <>
        <div className="mx-5 mt-4 mb-3">
          <form encType="multipart/form-data" onSubmit={onSubmit}>
            <Container>
              <label htmlFor="content" className="form-label fw-bolder" style={{color: "#5552FF"}}>Content</label>
              <InputGroup className="mb-4">
                  <textarea className="form-control my-0 d-flex justify-content-center " 
                  value={text}
                  maxLength={500}
                  onChange={onChangeText}
                  id="content" 
                  style={{ height: "200px"}}
                  placeholder="무슨 생각을 하고 계신가요?"
                  />
              </InputGroup>
              <div className="mb-3 g-0">
                <div><label htmlFor="formFileMultiple" className="form-label fw-bolder mb-0" style={{color: "#5552FF"}}>Image</label></div>
                <div className="result d-flex justify-content-center row row-cols-4 mb-1">{renderPhotos(selectedFiles)}</div>
                <div className="d-flex justify-content-center">
                  <input className="form-control" type="file" id="formFileMultiple" multiple onChange={handleImageChange} />
                </div>
              </div>
            </Container>
            <div className="d-flex justify-content-center">
              <RippleButton type="submit" cclass="cbtn cbtn-primary cbtn-lg" children="업로드"/>
            </div>
          </form>
        </div>
      </>
  )
}


export default NewsfeedWriteForm;