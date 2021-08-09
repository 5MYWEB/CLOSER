import { combineReducers } from 'redux';
import user from './user';
import board from './board';
import comment from './comment';
import search from './search';


const rootReducer = combineReducers({
  user, // 유저
  board, // 게시판
  comment, // 댓글
  search, //검색
});

export default rootReducer;