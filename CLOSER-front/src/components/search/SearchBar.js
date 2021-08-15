import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, getSearchedList, naverCheck, getSearchedNaverList } from '../../modules/search';
import { Collapse, FormSelect } from 'react-bootstrap';
import './SearchBar.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// 검색창 컴포넌트
const SearchBar = () => {

  const dispatch = useDispatch();

  const { categoryName, categorySearchUrl, naverChecked } = useSelector((state) => state.search)

  // 검색 조건
  const [choice, setChoice] = useState(1);
  // 검색창 입력값
  const [text, setText] = useState('');
  // 검색 카테고리 열고 닫음
  const [open, setOpen] = useState(false);
  // 검색 카테고리
  const [value, setValue] = useState("0");

  // 검색창에 입력 시
  const onChangeInput = (e) => {
    setText(e.target.value)
  }

  // 검색 조건 선택 시( 제목 + 내용 / 닉네임)
  const onChangeChoice = (e) => {
    setChoice(e.target.value)
  }

  // 카테고리 선택시 리덕스에 저장
  const onChangeCategory = (e) => {
    dispatch(setCategory(e.target.value))
    setValue(e.target.value)
  }

  // 네이버 체크 시
  const onClickChecked = () => {
    dispatch(naverCheck())
  }

  // 검색 버튼 클릭 시
  const onClickSearch = () => {
    // 빈값인지 검사
    if(text === '') {
      alert('내용을 입력하세요')
      return false
    }

    // 두글자 이상인지 검사
    if(text.length < 2){
      alert('2글자 이상 입력하세요')
      return false
    }

    // 검색 실행
    axios.get(`http://localhost:8080/search${categorySearchUrl}`, {
      params: {
        choice: choice,
        keyword: text,
      }
    })
    .then((res) => {
      dispatch(getSearchedList(res.data))
      setText('')
    })
    .catch((err) => {
      console.log(err)
    })
    
    if (naverChecked === true) {
      axios.get(`http://localhost:8080/search`, {
        params: {
          keyword: text,
        }
      })
      .then((res) => {
        dispatch(getSearchedNaverList(res.data.items))
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <div>

      <div className="row mx-0 search-category">
        {/* 카테고리 선택 버튼 */}
        <div className="col-7 offset-1 px-0">
          {categoryName}에서 검색하기
        </div>
        <div className="col-4 px-0">
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="search-category-collapse"
          >
            카테고리 선택
          </button>
        </div>

        {/* 카테고리들 */}
        <Collapse in={open}>
          <div id="example-collapse-text" className="search-category-button">
            {/* row1: 전체게시판, 뉴스피드, 네이버검색 */}
            <div className="row mx-0">
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "0" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}} 
                  type="button" 
                  value={0}
                >게시판 전체
                </button> 
              </div>
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "9" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={9}
                >뉴스피드
                </button> 
              </div>
              <div className="col-2 px-0">
              </div>
              <div className="col-4 px-0 d-flex">
                <input type="checkbox" id="scales" name="scales" defaultChecked={naverChecked} onClick={onClickChecked} />
                <label htmlFor="scales">네이버검색 포함</label>
              </div>
            </div>

            {/* row2: 자취게시판 */}
            <div className="row mx-0 d-flex">
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "1" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={1}
                >자취게시판 전체
                </button> 
              </div>  
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "2" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={2}
                >한끼레시피
                </button> 
              </div>
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "3" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={3}
                >자취꿀팁
                </button>
              </div>
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "4" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={4}
                >홈데코
                </button>
              </div>
            </div>

            {/* row3: 지역게시판 */}
            <div className="row mx-0">
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "5" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={5}
                >동네게시판 전체
                </button>
              </div>
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "6" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={6}
                >공동구매
                </button>
              </div>
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "7" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={7}
                >클로저 모임
                </button>
              </div>
              <div className="col px-0">
                <button
                  className={"search-category-select" + (value === "8" ? "-selected" : "")}
                  onClick={(e) => {setOpen(!open); onChangeCategory(e);}}
                  type="button" 
                  value={8}
                >도와주세요
                </button>
              </div>
            </div>
          </div>
        </Collapse>
      </div>

      <div className="row mx-0">
        <div className="col-4 px-0">
          <FormSelect id="kind" name="kind" value={choice} onChange={onChangeChoice}>
            <option value={1}>제목 + 내용</option>
            <option value={2}>닉네임</option>
          </FormSelect>
        </div>
        <div className="col-6 px-0">
          <input 
            type="text" 
            className="searchbar-input"
            value={text}
            placeholder="검색어를 입력하세요"
            onChange={onChangeInput}/>
        </div>
        <div className="col-1 px-0">
          <button onClick={onClickSearch} className="searchbar-button">
            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;