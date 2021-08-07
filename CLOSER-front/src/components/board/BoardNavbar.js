import React from 'react';
import { Link } from 'react-router-dom';

function BoardNavbar() {
  return (
      <div>
        <ul>
          <li>
            <Link to={ "/board/subnav1/" }>자취 피플</Link>
          </li>
          <li>
            <Link to={"/board/subnav2/" }>지역 게시판</Link>
          </li>
        </ul>
        <Link to={ "/board-create-form/" }>글 작성</Link>
      </div>
  );
}

export default BoardNavbar;