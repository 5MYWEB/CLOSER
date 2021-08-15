import React from 'react';
import PropTypes from 'prop-types';

import BoardGlobalItem from './BoardGlobalItem';
import BoardLocalItem from './BoardLocalItem';
import NewsfeedItem from '../newsfeed/NewsfeedItem';

const BoardItem = React.forwardRef(({ board, name }, ref) => {
  if (board.kind_pk > 0 && board.kind_pk < 4){
    return <BoardGlobalItem board={board}/>
  } else if (board.kind_pk < 7){
    return <BoardLocalItem board={board}/>
  } else if (board.kind_pk === 7){
    return <NewsfeedItem board={board} name={name} ref={ref}/>
  }
})

BoardItem.propTypes = {
  board: PropTypes.shape({
    board_pk: PropTypes.number,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default BoardItem;