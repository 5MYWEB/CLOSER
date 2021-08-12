import React from 'react';
import { Link } from 'react-router-dom';
import './BoardNavbar.css';

function BoardNavbar() {
  return (
    <div className="container">
      <div className="">
        <ul class ="tab nav">
          <li>
            <Link to={ "/board/subnav1/" }>자취 피플</Link>
          </li>
          <li>
            <Link to={"/board/subnav2/" }>지역 게시판</Link>
          </li>
        </ul>

        <Link to={ "/board-create-form/" }>글 작성</Link> 
      </div>
      </div>
    // <div className="container">
    //   <div className="tabs">
    //     <input type="radio" id="radio-1" name="tabs" checked />
    //     <label class="tab1" for="radio-1" onClick= {"/board/subnav1/"}>자취 게시판</label>
    //     <input type="radio" id="radio-2" name="tabs" />
    //     <label class="tab2" for="radio-2" onClick= {"/board/subnav2/"}>지역 게시판</label>
    //     <span class="glider"></span>
    //   </div>

    // </div>
  );
}

export default BoardNavbar;