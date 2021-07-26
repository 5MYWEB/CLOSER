import { combineReducers } from 'redux';
import user from './user';
import newsfeed from './newsfeed';
import gboard from './gboard';
import lboard from './lboard';


const rootReducer = combineReducers({
  user, // 유저
  newsfeed, // 뉴스피드
  gboard, // 자취게시판
  lboard, // 지역게시판
});

export default rootReducer;