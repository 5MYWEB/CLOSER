import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NaverItem.css';
import naver from '../../assets/search/naver.png';

function NaverItem({ board }) {

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ postDate, setPostDate ] = useState('')

  useEffect(() => {
    if(board !== null) {
      if(board.title.length <= 30){
        setTitle(board.title)
      } else {
        setTitle(board.title.slice(0, 30) + "...")
      }

      if(board.description.length <= 60){
        setDescription(board.description)
      } else {
        setDescription(board.description.slice(0, 60) + "...")
      }

      setPostDate(board.postdate.slice(0,4) + "년 " + board.postdate.slice(4,6) + "월 " + board.postdate.slice(6,8) + "일")
    }
  }, [board])

  return (
    <div>
      <a href={board.link}>
        <div className="naver-item">
          {/* 제목 */}
          <div className="row mx-0 naver-title">
            <div className="col-1 px-0 naver-logo">
              <img src={naver} alt="네이버로고" style={{width: "50%"}}/>
            </div>
            <div className="col-11 px-0">
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </div>
          </div>
          {/* 내용 */}
          <div className="row mx-0 naver-desc">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          {/* 글쓴이, 날짜 */}
          <div className="row mx-0">
            <div className="col-8 px-0 naver-blogger">
              by {board.bloggername}
            </div>
            <div className="col-4 px-0 naver-postdate">
              {postDate}
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

NaverItem.propTypes = {
  board: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    bloggername: PropTypes.string,
    bloggerlink: PropTypes.string,
    postdate: PropTypes.string,
  }),
};

export default NaverItem;