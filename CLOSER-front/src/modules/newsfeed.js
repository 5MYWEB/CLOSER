/* 초기 상태 선언 */
const initialState = {
  mainFeeds: [{
    feedPk: 0,
    userId: '이니셜유저',
    content: '이니셜피드입니다.',
    created_at: '어제',
    updated_at: '오늘',
    location: '서울',
  }]
  // feedPk: null,
  // userId: '',
  // title: '',
  // content: '',
  // created_at: '',
  // updated_at: '',
  // location: '',
  // Comments, 
};

/* 액션 타입 만들기 */
const CREATE_FEED = 'CREATE_FEED';

/* 액션 생성함수 만들기 */
export const createFeed = {
  type: CREATE_FEED,
};

// 더미 피드
const dummyFeed = {
  feedPk: 2,
  userId: '더미유저',
  content: '더미피드입니다.',
  created_at: '어제',
  updated_at: '오늘',
  location: '대전',
}

/* 리듀서 선언 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEED:
      return {
        ...state,
        mainFeeds: [dummyFeed, ...state.mainFeeds]
      }
    default:
      return state;
  }
};

export default reducer;