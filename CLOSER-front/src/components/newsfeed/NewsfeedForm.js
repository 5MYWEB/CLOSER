import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createFeed } from '../../modules/newsfeed';

const NewsfeedForm = () => {
  // const { imagePaths } = useSelector((state) => state.post);
  // const imageInput = useRef();
  // Redux store 접근 시 사용
  const dispatch = useDispatch();

  // 입력창에 입력할 텍스트 state
  const [text, setText] = useState('');

  // 함수
  const onChangeText = (e) => {
    setText(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createFeed);
    setText('');
  };

  // const onClickImageUpload = useCallback(() => {
  //   imageInput.current.click();
  // }, [imageInput.current]);

  return (
    <form encType="multipart/form-data" onSubmit={onSubmit}>
      <input 
        type="text" 
        value={text} 
        maxLength={200} 
        placeholder="무슨 생각을 하고 계신가요?"
        onChange={onChangeText} />
      <div>
        <input type="file" hidden />
        {/* <button onclick={onClickImageUpload}>이미지 업로드</button> */}
        <button type="submit">올리기</button>
      </div>

    </form>
  )
}

export default NewsfeedForm;