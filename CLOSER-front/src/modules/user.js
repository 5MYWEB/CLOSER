import { StreamChat } from 'stream-chat';

/* 초기 상태 선언 */
const initialState = {
  isLoggedIn: false,
  userToken: null,
  decodedToken: {
    sub: null,
    exp: null,
    user_id: null,
  },
  userInfo: {
    userId: '',
    nickname: '',
    password: '',
    email:  '',
    addr: '',
    homeAlone: null,
    intro: '',
    profileImg: null,
    phone: null,
    badge: [],
    following: 0,
    follower: 0,
    chattoken:'',
  },
  following: false,
  postCount: 0,
  changedAddr: '',
  alarmList: null,
};

/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_MY_INFO = 'GET_MY_INFO';
const GET_POST_COUNT = 'GET_POST_COUNT';
const FOLLOW = 'FOLLOW';
const GET_FOLLOW_INFO = 'GET_FOLLOW_INFO';
const CHANGE_ADDR = 'CHANGE_ADDR';
const GET_ALARM_LIST = 'GET_ALARM_LIST';
const REFRESH_INFO = 'REFRESH_INFO';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const loginAction = (data) => ({
  type: LOGIN,
  data,
});
  
export const logoutAction = () => ({
  type: LOGOUT 
});

export const getMyInfoAction = (data) => ({
  type: GET_MY_INFO,
  data,
});

export const getPostCount = (data) => ({
  type: GET_POST_COUNT,
  data,
});

export const followAction = () => ({
  type: FOLLOW,
});

export const getFollowInfoAction = () => ({
  type: GET_FOLLOW_INFO,
});

export const changeAddr = (data) => ({
  type: CHANGE_ADDR,
  data,
});

export const getAlarmList = (data) => ({
  type: GET_ALARM_LIST,
  data,
});

export const refreshInfo = () => ({
  type: REFRESH_INFO,
})



/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
  const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let jwt = require('jsonwebtoken');
      let decodedToken = jwt.decode(action.data.jwtAuthToken)
      localStorage.setItem("userToken", action.data.jwtAuthToken);
      localStorage.setItem("decodedToken", decodedToken);
      localStorage.setItem("isLoggedIn", true);

      return {
        ...state,
        isLoggedIn: true,
        userToken: action.data.jwtAuthToken,
        decodedToken: decodedToken,
      };
    case LOGOUT:
      const client = StreamChat.getInstance('5gan2md896h2');
      const disconnect = client.disconnectUser();
      localStorage.removeItem("userToken");
      localStorage.removeItem("decodedToken");
      localStorage.removeItem("isLoggedIn");
      return {
        disconnect,
        ...state,
        isLoggedIn: false,
        userToken: null,
        decodedToken: null,
        userInfo: {
          userId: '',
          nickname: '',
          password: '',
          email:  '',
          addr: '',
          homeAlone: null,
          intro: '',
          profileImg: null,
          phone: null,
          badge: [],
          following: 0,
          follower: 0,
          chattoken:'',
        },
      };
    case GET_MY_INFO:
      return {
        ...state,
        userInfo: action.data
      };
    case GET_POST_COUNT:
      return {
        ...state,
        postCount: action.data
      };
    case FOLLOW:
      return {
        ...state,
        following: true,
      };
    case GET_FOLLOW_INFO:
      return {
        ...state,
        following: false,
      };
    case CHANGE_ADDR:
      return {
        ...state,
        changedAddr: action.data,
      };
    case GET_ALARM_LIST:
      return {
        ...state,
        alarmList: action.data,
      };
    case REFRESH_INFO:
      const refreshedUserToken = localStorage.getItem("userToken");
      const refreshedJwt = require('jsonwebtoken');
      const refreshedDecodedToken = refreshedJwt.decode(refreshedUserToken)
      return {
        ...state,
        isLoggedIn: true,
        userToken: localStorage.getItem("userToken"),
        decodedToken: refreshedDecodedToken,
      }
    default:
      return state;
  }
}

export default reducer;