import { combineReducers } from 'redux';
import user from './user';
import newsfeed from './newsfeed';
import board from './board';


const rootReducer = combineReducers({
  user, // 유저
  newsfeed, // 뉴스피드
  board, // 게시판
});

export default rootReducer;