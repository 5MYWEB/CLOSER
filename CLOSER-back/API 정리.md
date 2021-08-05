# API 정리

## User

### 1. 회원가입

#### A. [POST] /user/regist : 회원가입

#### B. [POST] /user/userIdCheck : 아이디 중복 확인

#### C. [POST] /user/userNicknameCheck : 닉네임 중복 확인



### 2. 로그인



### 3. 로그아웃



### 4. 프로필 페이지 정보

#### A. [POST] /user/profileinfo : 프로필 페이지 정보

- output

  ```
  {
    "userId": "hyein",
    "nickname": "hyein1",
    "password": "hyein",
    "email": "hyein@ssafy.com",
    "addr": "인천광역시 연수구",
    "homeAlone": 2018,
    "intro": null,
    "profileImg": "2",
    "phone": "010-1234-5678",
    "badge": [
      null
    ]
  }
  ```

#### B. [GET] /user/board/{userId} : 내 포스트

- output

  ```
  [
    {
      "board_pk": 23,
      "userId": "ssafy",
      "kind_pk": 1,
      "title": "aaaa",
      "content": "bbbbbbbbbbbbbbbb",
      "created_at": "2021-08-02T15:20:19",
      "updated_at": "2021-08-02T15:20:19",
      "totalNum": 0,
      "gatherNum": 0,
      "location": null,
      "cnt": 0,
      "badge": 0,
      "nickname": "ssafy1"
    },
    # 생략
  ]
  ```

#### C. [GET] /user/feed/{userId} : 내 피드

- output

  ```
  [
    {
      "board_pk": 26,
      "userId": "minji",
      "kind_pk": 7,
      "title": null,
      "content": "시간 순삭",
      "created_at": "2021-08-05T15:03:13",
      "updated_at": null,
      "totalNum": 0,
      "gatherNum": 0,
      "location": "서울시 동작구 염리동",
      "cnt": 0,
      "badge": 0,
      "nickname": "minji"
    }
  ]
  ```

#### D. [GET] /user/bookmark/{userId} : 내 북마크

- output

  ```
  [
    {
      "board_pk": 20,
      "userId": "admin",
      "kind_pk": 2,
      "title": "checkkkkkkkkkkkk",
      "content": "뺑ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
      "created_at": "2021-08-02T15:02:19",
      "updated_at": "2021-08-02T15:02:19",
      "totalNum": 0,
      "gatherNum": 0,
      "location": null,
      "cnt": 0,
      "badge": 0,
      "nickname": "admin1"
    },
    # 생략
  ]
  ```

  





## Board

### 1. 게시글 리스트 조회 (POST)

#### A. Gboard

##### 1. /board/gBoard/all : 자취 게시판 cnt 많은 순(스크랩+좋아요)

##### 2. /board/gBoard/deco/best : 자취 게시판 - 홈데코 인기글

##### 3. /board/gBoard/deco/new : 자취 게시판 - 홈데코 최신글

##### 4. /board/gBoard/deco/weekbest : 자취 게시판 - 홈데코 한주 인기글

##### 5. /board/gBoard/recipe/best : 자취 게시판 - 한끼레시피 인기글

##### 6. /board/gBoard/recipe/new : 자취 게시판 - 한끼레시피최신글

##### 7. /board/gBoard/recipe/weekbest : 자취 게시판 - 한끼레시피 한주 인기글

##### 8. /board/gBoard/tip/best : 자취 게시판 - 자취팁 인기글

##### 9. /board/gBoard/tip/new : 자취 게시판 - 자취팁 최신글

##### 10. /board/gBoard/tip/weekbest : 자취 게시판 - 자취팁 한주 인기글



#### B.Lboard

##### 1. /board/lboard/getter : 지역 게시판 - 클로저모임 최신글

##### 2. /board/lboard/purchase : 지역 게시판 - 공동구매 최신글

##### 3. /board/lboard/sos : 지역 게시판 - 도와주세요 최신글



#### C. Feed

> 아직 코드에 없어서 안씀



### 2. [POST] /board : 게시글 작성

#### A. Gboard

> kind_pk
>
> - 1은 한끼 레시피
> - 2는 자취팁
> - 3은 홈데코

- input

  ```
  {
    "kind_pk": int,
    "userId": "string",
    "title": "string",
    "content": "string"
  }
  ```

- output

  ```
  {
    "board_pk": 25
  }
  ```
  
  

#### B. Lboard

> kind_pk
>
> - 4는 공동구매
> - 5는 모임
> - 6은 응급상황

- input

  ```
  {
    "kind_pk": int,
    "userId": "string",
    "title": "string",
    "content": "string",
  }
  ```
  
- output

  ```
  {
    "board_pk": 25
  }
  ```



#### C. Newfeed

> kind_pk
>
> - 7은 뉴스피드

- input

  ```
  {
    "kind_pk": 7,
    "userId": "string",
    "content": "string"
  }
  ```

- output

  ```
  {
    "board_pk": 25
  }
  ```



### 3. [GET] /board/{board_pk} : 게시글 상세조회

> kind_pk 
>
> - 1은 한끼 레시피
> - 2는 자취팁
> - 3은 홈데코
> - 4는 공동구매
> - 5는 모임
> - 6은 응급상황
> - 7은 뉴스피드
>
> board_pk : 해당 게시글 번호

#### Gboard, Lboard, Newsfeed

> 상황에 맞게 나옴

- output

  ```
  {
    "board_pk": 16,
    "userId": "hyein",
    "kind_pk": 1,
    "title": "Gboard",
    "content": "Gboard 테스트 중",
    "created_at": "2021-07-30T22:59:13",
    "updated_at": "2021-07-30T22:59:13",
    "totalNum": 0,
    "gatherNum": 0,
    "location": null,
    "cnt": 0,
    "nickname": "hyein1"
  }
  ```



### 4. [PUT] /board/{board_pk} : 게시글 수정

#### A. Gboard

> kind_pk
>
> - 1은 한끼 레시피
> - 2는 자취팁
> - 3은 홈데코

- input

  ```
  {
    "userId": "string", // 로그인한 유저 아이디 (중요)
    "kind_pk": int, // 확인용이라 게시판 이동하면 안됨
    "title": "string",
    "content": "string"
  }
  ```

- output

  ```
  success
  ```

  

#### B. Lboard

> kind_pk
>
> - 4는 공동구매
> - 5는 모임
> - 6은 응급상황

- input

  ```
  {
    "userId": "string", // 로그인한 유저 아이디 (중요)
    "kind_pk": int, // 확인용이라 게시판 이동하면 안됨
    "title": "string",
    "content": "string",
    "totalNum": int
  }
  ```

- output

  ```
  success
  ```



### 5. [DELETE] /board/{board_pk} : 게시글 삭제

#### Gboard, Lboard, Newsfeed

- input

  ```
  "로그인한 유저아이디"
  ```

- output

  ```
  success
  ```



### 6. 게시글 좋아요, 북마크, 댓글

#### A. [POST] /board/{board_pk}/info-cnt : 댓글, 좋아요, 북마크 갯수만

> 로그인하지 않았을 때, 해당 갯수를 볼 수 있음

- output

  ```
  {
    "countComment": 0,
    "countLike": 0,
    "countBookmark": 0
  }
  ```



#### B. [POST] /board/{board_pk}/info : 좋아요, 북마크 클릭 및 정보

> 로그인 했을 경우에, 내가 현재 해당 글을 좋아요 / 북마크 했는지 알 수 있고 버튼클릭도 가능

> kind_pk
>
> - 좋아요면 2
> - 북마크면 3
>
> flag
>
> - 로드시 "false"
> - 클릭시 "true"

- input

  ```
  {
    "kind_pk": int,
    "userId": "String", // 로그인한 유저 아이디
    "flag": String // false 또는 true로 써야함!
  }
  ```

- output

  ```
  {
    "clicked": false,
    "countInfo": 0
  }
  ```



#### C. [GET] /board/{board_pk}/comment : 댓글 리스트

- output

  ```
  [
    {
      "info_pk": 8,
      "board_pk": 17,
      "kind_pk": 1,
      "userId": "admin",
      "reply": "주말 순삭",
      "imgUrl": null
    },
    {
      "info_pk": 7,
      "board_pk": 17,
      "kind_pk": 1,
      "userId": "ssafy",
      "reply": "댓글 만들기",
      "imgUrl": null
    }
  ]
  ```



#### D. [POST] /board/{board_pk}/comment : 댓글 생성

- input

  ```
  {
    "reply": "string",
    "userId": "string" // 로그인한 유저 아이디
  }
  ```

- output

  ```
  success
  ```



#### E. [DELETE] /board/{board_pk}/comment/{info_pk} : 댓글 삭제

- input

  ```
  로그인한 유저 아이디
  ```

- output

  ```
  success
  ```




### 7. [POST] /board/{board_pk}/join : 지역게시판 참여

> - 로그인한 사람과 글 쓴 사람이 같으면 참가 취소같은거 못함
>
> - flag
>   - 로드시 true
>   - 클릭시 false
> - 참가할 때, 모집인원보다 작은 경우만 업데이트를 하긴했지만, 프론트에서 맨 첨에 막아주는게 best

- input

  ```
  {  
    "userId": "String", // 로그인한 유저 아이디  
    "flag": String // false 또는 true로 써야함!
  }
  ```

- output

  ```
  {
    "joined": true, // 참가 여부
    "countJoin": 1 // 참가한 사람 수
  }
  ```



## Follow

### 1. [POST] /follow/{id}/follow : 팔로우 or 언팔로우

> id는 내가 팔로우 누른 상대방 아이디
>
> flag
>
> - 로드시 true
> - 클릭시 false

- input

  ```
  {
    "userId": "String", // 로그인한 유저 아이디
    "flag": String // false 또는 true로 써야함!
  }
  ```

- output

  ```
  {
    "followed": true, // 팔로우 유무
    "following": 0, // 상대방의 팔로잉 수
    "follower": 1 // 상대방의 팔로워 수
  }
  ```



### 2. [POST] /follow/{id}/follower : 팔로워 리스트

> id는 내가 팔로우 누른 상대방 아이디
>
> activeUser이 팔로워들

- output

  ```
  [
    {
      "follow_pk": 2,
      "activeUser": "ssafy",
      "passiveUser": "hyein",
      "nickname": "ssafy1",
      "profileImg": "3"
    },
    {
      "follow_pk": 1,
      "activeUser": "admin",
      "passiveUser": "hyein",
      "nickname": "admin1",
      "profileImg": "1"
    }
  ]
  ```



### 3. [POST] /follow/{id}/following : 팔로잉 리스트

> id는 내가 팔로우 누른 상대방 아이디
>
> passiveUser이 {id}가 팔로잉하는 사람들

- output

  ```
  [
    {
      "follow_pk": 3,
      "activeUser": "ssafy",
      "passiveUser": "admin",
      "nickname": "admin1",
      "profileImg": "1"
    },
    {
      "follow_pk": 2,
      "activeUser": "ssafy",
      "passiveUser": "hyein",
      "nickname": "hyein1",
      "profileImg": "2"
    }
  ]
  ```



## Alarm

> 1. 댓글
> 2. 좋아요
> 3. 북마크
> 4. 팔로우
> 5. 클로저봇

### 1. [POST] /alarm : 알람 리스트

- input

  ```
  {
    "userId": "hyein"
  }
  ```

- output

  ```
  [
    {
      "alarm_pk": 1,
      "userId": "ssafy",
      "category_pk": 4,
      "otherUserId": "admin",
      "content": "admin1님이 팔로우를 시작했습니다.",
      "visited": false,
      "kind_pk": 0,
      "board_pk": 0,
      "bot_pk": 0,
      "created_at": "2021-08-02"
    },
    {
      "alarm_pk": 3,
      "userId": "ssafy",
      "category_pk": 1,
      "otherUserId": "hyein",
      "content": "hyein1님이 댓글을 남겼습니다.",
      "visited": false,
      "kind_pk": 2,
      "board_pk": 22,
      "bot_pk": 0,
      "created_at": "2021-08-02"
    }
  ]
  ```

  

### 2. [POST] /alarm/unreadCount : 안읽은 알람 갯수

- input

  ```
  {
    "userId": "hyein"
  }
  ```

- output

  ```
  {
    "countAlarm": 2
  }
  ```



### 3. [POST] /alarm/read-all : 모두 읽음 표시

- input

  ```
  {
    "userId": "hyein"
  }
  ```

- output

  ```
  SUCCESS
  ```




## Search

> choice_pk
>
> - 1: 제목 + 내용
> - 2: 닉네임

### 1. 전체(Gboard + Lboard) 조회

#### A. 최신순

##### [GET] /search/recent?keyword={keyword}&choice={choice_pk}

- output

  ```
  [
    {
      "board_pk": 23,
      "userId": "ssafy",
      "kind_pk": 1,
      "title": "aaaa",
      "content": "bbbbbbbbbbbbbbbb",
      "created_at": "2021-08-02T15:20:19",
      "updated_at": "2021-08-02T15:20:19",
      "totalNum": 0,
      "gatherNum": 0,
      "location": null,
      "cnt": 0,
      "badge": 0,
      "nickname": "ssafy1"
    },
    # 생략
  ]
  ```

  

#### B. 인기순

##### [GET] /search/popular?keyword={keyword}&choice={choice_pk}

- output

  ```
  [
    {
      "board_pk": 23,
      "userId": "ssafy",
      "kind_pk": 1,
      "title": "aaaa",
      "content": "bbbbbbbbbbbbbbbb",
      "created_at": "2021-08-02T15:20:19",
      "updated_at": "2021-08-02T15:20:19",
      "totalNum": 0,
      "gatherNum": 0,
      "location": null,
      "cnt": 0,
      "badge": 0,
      "nickname": "ssafy1"
    },
    # 생략
  ]
  ```

  

### 2. GBoard 전체 조회

#### A. 최신순

##### [GET] /search/gboard/recent?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)

  

#### B. 인기순

##### [GET] /search/gboard/popular?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)

  

### 3. LBoard 전체 조회

#### A. 최신순

##### [GET] /search/lboard/recent?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)

  

#### B. 인기순

##### [GET] /search/lboard/popular?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)




### 4. Feed 전체 조회

#### A. 최신순

##### [GET] /search/feed/recent?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)

  

#### B. 인기순

##### [GET] /search/feed/popular?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)




### 5. 특정 하나의 카테고리 조회

> kind_pk
>
> - 1은 한끼 레시피
> - 2는 자취팁
> - 3은 홈데코
> - 4는 공동구매
> - 5는 모임
> - 6은 응급상황

#### A. 최신순

##### [GET] /search/{kind_pk}/recent?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)

  

#### B. 인기순

##### [GET] /search/{kind_pk}/popular?keyword={keyword}&choice={choice_pk}

- output (위 결과들과 같음)



### 6. 네이버 검색

##### [GET] /search?keyword={keyword}

> - 결과는 items 안에 있음
> - 블로그 기준으로 상위 5개
> - title(제목), link(해당 블로그 링크), description(미리보여지는 글 내용), bloggername(블로그 이름), bloggerlink(해당 블로거의 링크인데 쓸일 없을듯), postdate(글 작성일)

- output

  ```
  {
  lastBuildDate: "Wed, 04 Aug 2021 10:35:28 +0900",
  total: 2282093,
  start: 1,
  display: 5,
  items: [
  {
  	title: "신생아영아산통 개선하는 <b>꿀팁</b>",
  	link: "https://blog.naver.com/yjhyjh5369?Redirect=Log&logNo=222442764922",
  	description: "신생아 영아산통이 어떤 증상인지, 그리고 개선하는 <b>꿀팁</b>까지 전수해드릴게요. 보통 생후 4개월 이하의... 저도 신생아영아산통 개선하는 <b>꿀팁</b>으로 유산균을 들고 왔어요. 그렇지만 그냥 유산균이 아닌 신생아... ",
  	bloggername: "노루궁뎅이의 블로그",
  	bloggerlink: "https://blog.naver.com/yjhyjh5369",
  	postdate: "20210723"
  },
  # 생략
  ]
  }
  ```

  



