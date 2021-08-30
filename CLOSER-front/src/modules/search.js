const initialState = {
  categorySet: {
    0: '게시판 전체',
    1: '자취게시판(전체)',
    2: '한끼레시피',
    3: '자취꿀팁',
    4: '홈데코',
    5: '지역게시판(전체)',
    6: '공동구매',
    7: '클로저 모임',
    8: '도와주세요',
    9: '뉴스피드',
  },
  categorySearchUrlSet: {
    0: '/recent',
    1: '/gboard/recent',
    2: '/1/recent',
    3: '/2/recent',
    4: '/3/recent',
    5: '/lboard/recent',
    6: '/4/recent',
    7: '/5/recent',
    8: '/6/recent',
    9: '/feed/recent',
  },
  categoryName: '게시판 전체',
  categorySearchUrl: '/recent',
  selected: false,
  searchedList: null,
  searchedNaverList: null,
  naverChecked: false,
};

/* 액션 타입 만들기 */
const SET_CATEGORY = 'SET_CATEGORY';
const GET_SEARCHED_LIST = 'GET_SEARCHED_LIST';
const NAVER_CHECK = 'NAVER_CHECK';
const GET_SEARCHED_NAVER_LIST = 'GET_SEARCHED_NAVER_LIST';

/* 액션 생성함수 만들기 */
export const setCategory = (data) => ({
  type: SET_CATEGORY,
  data,
});

export const getSearchedList = (data) => ({
  type: GET_SEARCHED_LIST,
  data,
});

export const naverCheck = () => ({
  type: NAVER_CHECK,
});

export const getSearchedNaverList = (data) => ({
  type: GET_SEARCHED_NAVER_LIST,
  data,
});


/* 리듀서 선언 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        categoryName: state.categorySet[action.data],
        categorySearchUrl: state.categorySearchUrlSet[action.data],
        selected: !state.selected,
      };
    case GET_SEARCHED_LIST:
      return {
        ...state,
        searchedList: action.data
      };
    case NAVER_CHECK:
      return {
        ...state,
        naverChecked: !state.naverChecked
      };
    case GET_SEARCHED_NAVER_LIST:
      return {
        ...state,
        searchedNaverList: action.data
      };
    default:
      return state;
  }
}

export default reducer;