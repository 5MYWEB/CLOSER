import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function BoardRecipe() {

  const dispatch = useDispatch();

  const { boardList, boardCreated, boardDeleted, boardUpdated } = useSelector((state) => state.gboard);

  return (
    <div>
      레시피 게시물을 올리는 페이지입니다
    </div>
  )
}

export default BoardRecipe;