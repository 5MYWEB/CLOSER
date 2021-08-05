import { combineReducers } from 'redux';
import user from './user';
import board from './board';
import comment from './comment';


const rootReducer = combineReducers({
  user, // 유저
  board, // 게시판
  comment, // 댓글
});

export default rootReducer;