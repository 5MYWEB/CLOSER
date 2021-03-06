import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, FormSelect, InputGroup} from 'react-bootstrap';
import { updateBoard } from '../../modules/board';
import { RippleButton } from '../../styles/index';
import AWS from "aws-sdk";

const BoardUpdateForm = ({match}) => {
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
    params: {Bucket: albumBucketName},
  });

  const pk = match.params.id;

  const dispatch = useDispatch();

  const history = useHistory();

  // 리덕스 user에서 userId 받아옴 
  const {userId} = useSelector((state) => state.user.userInfo);

  // 게시물 정보
  const [kind, setKind] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [totalNum, setTotalNum] = useState(null)
  const [imgUrl, setImgUrl] = useState([]); // 기존의 이미지
  const [check, setcheck] = useState(false) // 이미지 수정했는지 체크
  // const [deletecheck, setdeletecheck] = useState(false) // 이미지 삭제했는지 체크

  // 원래 내용을 state에 담아줌
  useEffect(() => {
    axios.get(`http://localhost:8080/board/${pk}`)
        .then((res) => {
          setKind(res.data.kind_pk)
          setTitle(res.data.title)
          setContent(res.data.content)
          setTotalNum(res.data.totalNum)
          setImgUrl(res.data.imgUrls)
        })
        .catch((err) => {
          console.log(err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 사용자가 게시물 내용을 입력할때 작동하는 함수
  const onChangeKind = (e) => {
    setKind(e.target.value)
  }
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }
  // 모집인원 바꿀때
  const onChangeTotalNum = (e) => {
    setTotalNum(e.target.value)
  }

  // 게시물을 제출할때 작동하는 함수
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    // if(deletecheck){
    //   await deleteimg();
    //   nchangedimg();
    // }
    if(kind <= 3){
      if(check) { // 파일선택을 누른경우 (사진 수정하는 경우)
        setSelectedFiles([])
        await deleteimg();
      }else{ // 사진 수정안하는 경우
        setUrls([])
        changedimg()
      }
    }else if(kind <= 6){
      changedimg()
    }
    
    // changedimg()
    // if(!deletecheck && !check) nchangedimg()
  });

  async function deleteimg() { // 이미지 삭제
    axios.delete(`http://localhost:8080/board/${pk}/delete-image`)
        .then(() => {
          handleFileInput(); // 새로 들어온 파일을 넣어줌
        })
        .catch((err) => {
          console.log(err)
        })
  }

  // const nchangedimg =() =>{ // 게시판 수정 []
  //   axios.put(`http://localhost:8080/board/${pk}`, {
  //     kind_pk: Number(kind),
  //     userId: userId,
  //     title: title,
  //     content: content,
  //     totalNum: totalNum,
  //     imgUrls : [],
  //   })
  //       .then(() => {
  //         dispatch(updateBoard())
  //         history.push(`/board-detail/${pk}/`)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })

  //   // setKind('')
  //   // setTitle('')
  //   // setContent('')
  // }

  const changedimg =() =>{ // 게시판 수정
    axios.put(`http://localhost:8080/board/${pk}`, {
      kind_pk: Number(kind),
      userId: userId,
      title: title,
      content: content,
      totalNum: Number(totalNum),
      imgUrls : Urls,
    })
        .then(() => {
          dispatch(updateBoard())
          setTimeout( function () {
            history.replace(`/board-detail/${pk}/`)
          }, 350);

        })
        .catch((err) => {
          console.log(err)
        })

    // setKind('')
    // setTitle('')
    // setContent('')
  }

  const [Files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
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
    s3.listObjects({Prefix: userId}, function (err, data) {
      lng = this.data.Contents.length;
    });

    setTimeout(function () {
      for (let i = 0; i < Files.length; i++) {
        handleUpload(Files[i], i, lng);
      }
    }, 1000);
  };

  const [Urls, setUrls] = useState([]);
  const [Url, setUrl] = useState("");

  function handleUpload(file, i, lng) {
    return new Promise(function (resolve, reject) {
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

  // const removeImgs=(e)=>{
  //   console.log(e)
  //   // setSelectedFiles([])
  //   // setdeletecheck(true)
  // }

  useEffect(() => {
    if (Url !== "") {
      setUrls((Urls) => [...Urls, Url]);
    }
  }, [Url]);

  useEffect(() => {
    if (check && Urls.length === Files.length) changedimg()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Urls])

  // 이미지 링크 세팅
  useEffect(() => {
    if (imgUrl !== []) {
      setSelectedFiles(imgUrl)
    }
  }, [imgUrl])

  // 취소 버튼
  const onClickCancel = () => {
    setTimeout( function () {
      history.push(`/board-detail/${pk}/`)
    }, 350);
  }



  return (
      <>
        <Container>
          <form encType="multipart/form-data" onSubmit={onSubmit} className="m-5">
            <InputGroup className="mb-3">
              <label className="input-group-text fw-bolder" htmlFor="kind"
                style={{color: "#FFFFFF", backgroundColor: "#5552FF"}}>카테고리</label>
              {0 < kind && kind < 4
                  ?
                  <FormSelect id="kind" name="kind" value={kind} onChange={onChangeKind}>
                    <option defaultValue={1 === kind} value={1}>한끼 레시피</option>
                    <option defaultValue={2 === kind} value={2}>자취 팁</option>
                    <option defaultValue={3 === kind} value={3}>홈 데코</option>
                  </FormSelect>
                  :
                  <FormSelect id="kind" name="kind" value={kind} onChange={onChangeKind}>
                    <option defaultValue={4 === kind} value={4}>공동구매</option>
                    <option defaultValue={5 === kind} value={5}>모임</option>
                    <option defaultValue={6 === kind} value={6}>응급상황</option>
                  </FormSelect>
              }
            </InputGroup>

            <label htmlFor="title" className="form-label fw-bolder" style={{color: "#5552FF"}}>Title</label>
            <InputGroup className="mb-4">
              <input type="text" className="form-control m-0"
                     value={title}
                     maxLength={200}
                     onChange={onChangeTitle}
                     required/>
            </InputGroup>

            <label htmlFor="content" className="form-label fw-bolder" style={{color: "#5552FF"}}>Content</label>
            <InputGroup className="mb-4">
          <textarea className="form-control"
                    value={content}
                    maxLength={1000}
                    onChange={onChangeContent}
                    required
                    id="content"
                    style={{height: "200px"}}/>
            </InputGroup>

            {3 < Number(kind) && Number(kind) < 7
                ?
                <div>
                  <label htmlFor="totalNum" className="form-label fw-bolder" style={{color: "#5552FF"}}>모집인원 (2명 이상 5명
                    이하)</label>
                  <InputGroup className="mb-3 d-flex justify-content-between">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio2" value={2}
                        onChange={onChangeTotalNum} checked={2 === Number(totalNum)}/>
                      <label className="form-check-label mx-1" htmlFor="inlineRadio2">2명</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio3" value={3}
                        onChange={onChangeTotalNum} checked={3 === Number(totalNum)}/>
                      <label className="form-check-label mx-1" htmlFor="inlineRadio3">3명</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio4" value={4}
                        onChange={onChangeTotalNum} checked={4 === Number(totalNum)}/>
                      <label className="form-check-label mx-1" htmlFor="inlineRadio4">4명</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="totalNum" id="inlineRadio5" value={5}
                        onChange={onChangeTotalNum} checked={5 === Number(totalNum)}/>
                      <label className="form-check-label mx-1" htmlFor="inlineRadio5">5명</label>
                    </div>
                  </InputGroup>
                </div>
                :
                <div>        
                  {/* <label htmlFor="image-upload" className="form-label fw-bolder" style={{color: "#5552FF"}}>Image</label> */}
                  <InputGroup className="mb-0">
                    {/* <div className="result">{renderPhotos(selectedFiles)}</div> */}
                    {/* <label>
                      <input type="file" id="file" multiple onChange={handleImageChange} className="form-control" style={{color: "#5552FF"}} />
                    </label> */}
                    <div className="mb-3">
                      <div><label htmlFor="formFileMultiple" className="form-label fw-bolder mb-0" style={{color: "#5552FF"}}>Image</label></div>
                      <div className="result d-flex justify-content-center row row-cols-4 mb-1">{renderPhotos(selectedFiles)}</div>
                      <div className="d-flex justify-content-center">
                        <input className="form-control" type="file" id="formFileMultiple" multiple onChange={handleImageChange}/>
                      </div>
                    </div>
                  </InputGroup>
                </div>
                // <div>
                //   <label htmlFor="image-upload" className="form-label fw-bolder"
                //          style={{color: "#5552FF"}}>Image</label>
                //   <InputGroup className="mb-4">
                //     <div className="result">{renderPhotos(selectedFiles)}</div>
                //     <label>
                //       <input type="file" id="file" multiple onChange={handleImageChange}/>
                //     </label>
                //   </InputGroup>
                //   <button onChange={removeImgs}>사진 삭제</button>
                // </div>
            }

            <div className="button-group mt-0">
              <RippleButton type="submit" cclass="cbtn cbtn-lg cbtn-primary" children="수정"/>
              <RippleButton type="button" cclass="cbtn cbtn-secondary cbtn-lg " onClick={onClickCancel} children="취소"/>
            </div>
          </form>

        </Container>
      </>
  )
}

export default BoardUpdateForm;