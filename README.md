# CLOSER
> 프론트 담당: 김지윤, 서민수
>
> 백엔드 담당: 김호영, 이민지, 조혜인

## 1. 목표

- 웹 큐레이션 SNS 서비스 개발

- 커뮤니티 서비스 구성
- HTML, CSS, JavaScript, React.js, Sprint boot, REST API, MySQL 등을 활용한 실제 서비스 설계
- 서비스 관리 및 유지보수



## 2. 서비스 목적

**자취, 비혼 등 1인가구 비율이 증가하고 있습니다.**

**하지만, 배달, 물품구매부터 시작해서 많은 부분이 다인가구에 맞춰져 있습니다.**  

**1인가구 플랫폼 CLOSER를 통해 1인 가구의 편의성을 증가시키고자 서비스를 만들었습니다.**

> **We are alone but together**
>
> **Shall We Share?**

**CLOSER**

**에서 함께 살아봅시다**



## 3. 준비사항

### A. 아키텍처

#### 1. Back-End

- Spring boot
- MySql

#### 2. Front-End

- React.js

#### 3. 배포

- AWS



## 4. 요구사항

### A. 프로젝트 구조

> 여기서는 폴더 구조 보여주면 돼요! (폴더 구조 캡쳐 등으로 하면 될듯)

#### 1. Back-End
<img src="/uploads/1e09506c9adf5a3aa40a37539ebba594/스크린샷_2021-08-18_오후_10.21.30.png" width="400" hegiht="400"/>

#### 2. Front-End
<img src="/uploads/6a01128cf88d6da8140d41d073f7e6c9/스크린샷_2021-08-18_오후_10.21.57.png" width="400" hegiht="400"/>

### B. Model

> 데이터베이스에서 모델의 ERD는 아래와 같습니다.
<img src="/uploads/b2f4e04638ccc71bbcb4b4e05f471ab9/스크린샷_2021-08-18_오후_11.09.20.png" width="400" hegiht="400"/>




### C. URL

#### 1. Back-End

> 스웨거에 있는 친구들!!! 
>
> 웬만하면 관련있는 애들끼리 같이 묶어서 해주세요!!
>
> 회원가입 다 쓰고, 그 다음 로그인 관련된 애들 쓰고. 그 다음 로그아웃 관련된 애들 쓰고 이런식으로??
>
> board 같은 경우는 리스트 조회 쓰고, 상세 조회 쓰고, U D 이런 순으로

##### a. User

>- User 컨트롤러의 모든 URL 패턴은 /user 로 시작합니다.
>- 회원가입, 로그인, 프로필 등 계정과 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|  DELETE   | /user    | 회원탈퇴                           |
| GET          | /user/board/{userId}         |     프로필 페이지 포스트                       |
| GET          | /user/bookmark/{userId}         |     프로필 페이지 북마크                     |
| PUT          | /user/change-location         |     주소 변경                    |
| GET          | /user/feed/{userId}         |     프로필 페이지 피드                    |
| GET/POST          | /user/login         |     로그인 화면으로 이동                   |
| GET          | /user/logout         |     로그아웃                   |
| PUT          | /user/mypage         |     개인정보 수정                   |
| POST          | /user/profileinfo         |     프로필 페이지 정보(내 프로필, 다른 사람 프로필 모두 사용)                   |
| POST          | /user/regist         |  회원가입                 |
| GET          | /user/totalBoard/{userId}         |     해당 유저가 쓴 글 갯수                   |
| POST          | /user/userIdCheck         |     아이디 중복 확인                   |
| POST          | /user/userNicknameCheck     |     닉네임 중복확인       |

##### b. Follow

> - Follow 컨트롤러의 모든 URL 패턴은 /follow 로 시작합니다.
> - 0000000000000 등 계정 팔로우와 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|   POST    | /follow/{id}/follow  | 팔로우 or 언팔로우 |
|  POST         |     /follow/{id}/follower   |          팔로워 리스트                  |
|      POST     |     /follow/{id}/following     |          팔로잉 리스트                  |

##### c. Alarm

> - Alarm컨트롤러의 모든 URL 패턴은 /alarm로 시작합니다.
> - 0000000000000 등 알람 기능과 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|   POST    | /alarm  | 알람 리스트 |
|POST|    /alarm/read-all      |   모두 읽음 표시                         |
|POST|   /alarm/unreadCount       |              안읽은 알람 갯수              |
|POST|     /alarm/user_bot/{id}/create     |               봇 알림 생성             |

##### d. Board

> - Board컨트롤러의 모든 URL 패턴은 /board로 시작합니다.
> - 0000000000000 등 게시판 기능과 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|   POST    | /board  | 신규 사용자 생성(회원가입) |
|     GET/PUT/DELETE      |   /board/{board_pk}       |     게시글 상세 보기, 해당 게시글 수정, 해당 게시글 삭제                      |
|        GET/POST   |   /board/{board_pk}/comment        |      댓글 리스트, 댓글 생성                      |
|        DELETE   |     /board/{board_pk}/comment/{info_pk}     |     특정 댓글 삭제                       |
|        DELETE   |    /board/{board_pk}/delete-image      |        게시판 수정 시 이미지 delete                   |
|        POST   |     /board/{board_pk}/info     |          좋아요, 북마크 클릭 및 정보                  |
|        POST   |     /board/{board_pk}/info-cnt     |         댓글, 좋아요, 북마크 수                   |
|        POST   |    /board/{board_pk}/join      |           지역게시판 모임 참가                 |
|        GET   |     /board/comment/{board_pk}      |                   댓글이 속한 게시판 종류         |
|        GET   |   /board/feed/follow/{page}        |팔로우 한 유저들의 피드글 정보를 반환한다                         |
|        GET   |    /board/feed/near/{page}       |         같은 동네 유저들의 피드글 정보를 반환한다                   |
|        GET   |    /board/feed/total/{page}       |       모든 유저들의 피드글 정보를 반환한다                     |
|        POST   |     /board/gBoard/all      |       자취 게시판 cnt 많은 순으로 게시글 보여줌                     |
|        POST   |     /board/gBoard/deco/best      |      자취게시판 - 홈데코 인기글                     |
|        POST   |     /board/gBoard/deco/new      |       자취 게시판 - 홈데코 최신글                     |
|        POST   |     /board/gBoard/deco/weekbest      |       자취 게시판 - 홈데코 한주 인기글                     |
|        POST   |     /board/gBoard/recipe/best      |       자취 게시판 - 한끼레시피 인기글                     |
|        POST   |     /board/gBoard/recipe/new      |       자취 게시판 - 한끼레시피 최신글                     |
|        POST   |     /board/gBoard/recipe/weekbest      |       자취 게시판 - 한끼레시피 한주 인기글 |
|        POST   |     /board/gBoard/tip/best      |       자취 게시판 - 자취팁 인기글                  |
|        POST   |     /board/gBoard/tip/new      |       자취 게시판 - 자취팁 최신글                     |
|        POST   |     /board/gBoard/tip/weekbest      |       자취 게시판 - 자취팁 한주 인기글                     |
|        POST   |     /board/lBoard/getter      |       자취 게시판 - 클로저모임 최신글                     |
|        POST   |     /board/lBoard/purchase      |       자취 게시판 - 공동구매 최신글                     |
|        POST   |     /board/lBoard/sos      |       자취 게시판 - 도와주세요 최신글                     |

##### e. Search

> - Search컨트롤러의 모든 URL 패턴은 /search로 시작합니다.
> - 0000000000000 등 게시판 검색 기능과 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|   GET    | /search  | 신규 사용자 생성(회원가입) |
|GET| /search/{kind_pk}/popular         | [인기순] 게시판(GBoard, LBoard) 중 한개 선택 시|
|GET|/search/{kind_pk}/recent          | [최신순] 게시판(GBoard, LBoard) 중 한개 선택 시                           |
|GET|  /search/feed/popular                         |[인기순] 뉴스피드 선택 시 
|GET|    /search/feed/recent                  |[최신순] 뉴스피드 선택 시
|GET|/search/gboard/popular|[인기순] 자취게시판(GBoard) 선택 시
|GET|/search/gboard/recent          | [최신순] 자취게시판(GBoard) 선택 시
|GET|/search/lboard/popular          |[인기순] 지역게시판(LBoard) 선택 시
|GET|/search/lBoard/recent          | [최신순] 지역게시판(LBoard) 선택 시
|GET|/search/popular          | [인기순] 전체게시판 선택 시
|GET|/search/recent          | [최신순] 전체게시판 선택 시



#### 2. Front-End

> - 사용자에게 보여지는 URL입니다.
> - /src/App.js에서 정의합니다.
> - (흠 이건 어떻게 나눠야할지 잘 모르겠어서...!!! 기능별로 묶어서 진행해주세요!!!!)

##### a. User 

> 유저 페이지입니다.

| Component |  URL   |     설명      |
| :-------: | :----: | :-----------: |
|   Login   | /login | 로그인 페이지 |
|           |        |               |
|           |        |               |

##### b. ?!??!?!





## 5. 세부사항

> 구현한 기능들 특징을 설명하면 좋은데 어케 할지 지금 살짝 고민중입니다.
>
> 예를 들어 검색 기능은 네이버 검색이랑 제목+내용 검색 / 유저 아이디 검색, 게시판 별, 게시판 전체 검색 이런식으로 되어있잖아여?
>
> 그런 거에 대해 우린 이것저것 했다!!!
>
> 이런걸 하고 싶거든여??
>
> 근데 이걸 어떻게 나눠야할지가 너무 애매하네요....
>
> 어 그리고!!!! 시연시나리오는 exec 폴더 밑에서 진행할거에요!! 어차피 같은 깃안에 있으니까 굳이 여기 다시 안넣어도 될거 같긴합니다. 그러나 뭔가 지금 세부사항할때 사진있으면 좋을거 같다 하면 여기에 기능에 관련된 사진은 넣으면 좋을거 같아요!!!!!

>기능들 여기서 대충 나눌게요 일단!! 추가할거 추가하고 바꿀꺼 바꿔주세요
>
>- 프로필 기능
>    - 뱃지 (한달에 한번 업데이트)
>    - 팔로우 / 언팔로우
>    - 내 북마크 / 내 피드 / 내 포스트
>    - 프로필 url 공유
>    - 네이버 지도 api를 통한 현재 위치 정보 가져오기
>- 게시판
>  - 덤프 데이터
>  - 자취 게시판
>    - 베스트 게시판 (좋아요 + 댓글 기반)
>  - 지역 게시판
>  - 뉴스피드
>
>- 검색 기능
>  - 네이버 검색
>  - 제목+내용 / 유저 검색
>  - 전체 게시판 검색 / 세부 게시판 검색
>- 알림(클로저봇) 기능
>  - 매주 알림 기능 (분리수거 하는 날)
>  - 한 달에 한 번 알림 기능 (공과금 내는 날)
>- DM 기능
>  - 1대1 대화
>  - 다대다 대화는 지금 될지 안될지 모름
>- 


### A. 뉴스피드 기능 

### B. 게시판 기능 

### C. 프로필 기능
<img src="(/uploads/0f3c91d0660a2b5d4cada4e013e19286/스크린샷_2021-08-18_오후_4.32.36.png" width="300" hegiht="300"/>
> 내 프로필에서 나의 정보와 내가 쓴 글, 북마크 한 글 확인 가능

### D. 팔로우/언팔로우 기능 


### E. 알림 기능 
<img src="(/uploads/6f7e318eace5de84949cb3446504d861/스크린샷_2021-08-18_오후_3.10.39.png" width="300" hegiht="300"/>
> 다른 유저가 나의 글을 좋아요, 북마크를 하거나 댓글을 달면 알림 수신 

### F. 클로저봇 알림 기능 
<img src="/uploads/1aa71ce8bdbcd8a8ca16f4a9f4322507/클로저봇알림_매주.png" width="300" hegiht="300"/>
<img src="/uploads/5f61cfe3a2e61f05dc2884eebf707c53/클로저봇알림_매월.png" width="300" hegiht="300"/>
> 클로저봇 알림을 통해 매주, 매월 해야 하는 일정을 적어 

<img src="/uploads/360d6591dd9557abd4d74369861f4681/클로저봇알림.png" width="300" hegiht="300"/>
> 알림 수신 가능 

### G. DM 기능 







## 6. 발전방향

> 여기에는 저희가 하지 못했거나, 이런 걸 더 추가하면 좋겠다! 하는 기능들을 넣으면 좋을거 같아요



