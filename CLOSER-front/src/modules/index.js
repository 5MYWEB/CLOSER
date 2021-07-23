import { combineReducers } from 'redux';
import user from './user';
import newsfeed from './newsfeed';

const rootReducer = combineReducers({
  user,
  newsfeed,
});

export default rootReducer;