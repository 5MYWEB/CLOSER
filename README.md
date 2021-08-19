<p align="center"><img src="CLOSER-front/src/assets/logo-upper.png" width="400" hegiht="400"></p>

> 프론트 담당: 김지윤, 서민수
>
> 백엔드 담당: 김호영, 이민지, 조혜인

## 배포 사이트 💻
👉 [CLOSER 사용해보기](http://i5a303.p.ssafy.io:3000/)👈

> 웹 모바일 버전이므로, 웹사이트 크기 말고 모바일 크기로 테스트 해주세요. 

> F12 눌러, 개발자 모드에서 화면 크기를 변경 / 디바이스 크기 변경하시면 됩니다. 

## 1. 목표 ❗

- 웹 큐레이션 SNS 서비스 개발

- 커뮤니티 서비스 구성
- HTML, CSS, JavaScript, React.js, Sprint boot, REST API, MySQL 등을 활용한 실제 서비스 설계
- 서비스 관리 및 유지보수



## 2. 서비스 목적 👀

**자취, 비혼 등 1인가구 비율이 증가하고 있습니다.**

**하지만, 배달, 물품구매부터 시작해서 많은 부분이 다인가구에 맞춰져 있습니다.**  

**1인가구 플랫폼 CLOSER를 통해 1인 가구의 편의성을 증가시키고자 서비스를 만들었습니다.**

> **We are alone but together**
>
> **Shall We Share?**

**CLOSER**

**에서 함께 살아봅시다**



## 3. 준비사항 ⭐

### A. 아키텍처

#### 1. Back-End

- Spring boot
- MySql

#### 2. Front-End

- React.js

#### 3. 배포

- AWS



## 4. 요구사항 🔨

### A. 프로젝트 구조

#### 1. Back-End
<img src="assets/closer_back.png" width="700" hegiht="700"/>

#### 2. Front-End
<img src="assets/closer_front.png" width="700" hegiht="700"/>

### B. Model

> 데이터베이스에서 모델의 ERD는 아래와 같습니다.
<img src="assets/closer_erd.png" width="700" hegiht="700"/>




### C. URL 🔗

#### 1. Back-End

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
> - 팔로잉, 팔로워와 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|   POST    | /follow/{id}/follow  | 팔로우 or 언팔로우 |
|  POST         |     /follow/{id}/follower   |          팔로워 리스트                  |
|      POST     |     /follow/{id}/following     |          팔로잉 리스트                  |

##### c. Alarm

> - Alarm컨트롤러의 모든 URL 패턴은 /alarm로 시작합니다.
> - 클로저 봇, 팔로우/댓글/좋아요 알림 등 알람 기능과 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|   POST    | /alarm  | 알람 리스트 |
|POST|    /alarm/read-all      |   모두 읽음 표시                         |
|POST|   /alarm/unreadCount       |              안읽은 알람 갯수              |
|POST|     /alarm/user_bot/{id}/create     |               봇 알림 생성             |

##### d. Board

> - Board컨트롤러의 모든 URL 패턴은 /board로 시작합니다.
> - 게시글 CRUD, 댓글 CRD 등 게시판 기능과 관련된 url입니다.

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
> - 네이버 검색,  게시판 검색  등 검색 기능과 관련된 url입니다.

| HTTP verb | URL 패턴 |            설명            |
| :-------: | :------: | :------------------------: |
|   GET    | /search  | 신규 사용자 생성(회원가입) |
|GET| /search/{kind_pk}/popular         | [인기순] 게시판(GBoard, LBoard) 중 한개 선택 시|
|GET|/search/{kind_pk}/recent          | [최신순] 게시판(GBoard, LBoard) 중 한개 선택 시                           |
|GET|/search/feed/popular | [인기순] 뉴스피드 선택 시 |
|GET|/search/feed/recent | [최신순] 뉴스피드 선택 시 |
|GET|/search/gboard/popular | [인기순] 자취게시판(GBoard) 선택 시 |
|GET|/search/gboard/recent | [최신순] 자취게시판(GBoard) 선택 시 |
|GET|/search/lboard/popular | [인기순] 지역게시판(LBoard) 선택 시 |
|GET|/search/lBoard/recent | [최신순] 지역게시판(LBoard) 선택 시 |
|GET|/search/popular | [인기순] 전체게시판 선택 시 |
|GET|/search/recent | [최신순] 전체게시판 선택 시 |


#### 2. Front-End

> - 사용자에게 보여지는 URL입니다.
> - /src/App.js에서 정의합니다.

##### a. User 

> 유저 관련 페이지입니다.

|    Component    |            URL             |        설명        |
| :-------------: | :------------------------: | :----------------: |
|      Login      |           /login           |       로그인       |
|     SignUp      |          /signup           |      회원가입      |
|     Profile     |        /profile/:id        |       프로필       |
|  FollowingList  |    /following-list/:id     |   팔로잉 리스트    |
|  FollowerList   |     /follower-list/:id     |   팔로워 리스트    |
| MyProfileUpdate |      /profile-update       |  유저 프로필 수정  |
|    UserFeed     |   /profile/:id/user-feed   |  유저 피드 리스트  |
|    UserBoard    |  /profile/:id/user-board   | 유저 게시물 리스트 |
|  UserBookmark   | /profile/:id/user-bookmark | 유저 북마크 리스트 |
|  UserLocation   |      /change-location      |   유저 위치 수정   |



##### b. Board

> 피드, 게시물 관련 페이지입니다. 

|     Component     |          URL           |           설명           |
| :---------------: | :--------------------: | :----------------------: |
|     Newsfeed      |       /newsfeed        |         뉴스피드         |
|   NewsfeedList    |    /newsfeed/:name     |    피드 항목별 리스트    |
| NewsfeedWriteForm |   /feed-create-form    |        피드 작성         |
|       Board       |         /board         |          게시판          |
|  BoardSubNavbar1  |    /board/subnav1/     |        자취게시판        |
|  BoardSubNavbar2  |    /board/subnav2/     |        지역게시판        |
|    BoardGlobal    |  /board/subnav1/:name  | 자취게시판 항목별 리스트 |
|    BoardLocal     |  /board/subnav2/:name  | 지역게시판 항목별 리스트 |
|     BoardForm     |  /board-create-form/   |       게시물 작성        |
|  BoardUpdateForm  | /board-update-form/:id |       게시물 수정        |
|    BoardDetail    |   /board-detail/:id    |       게시물 상세        |



##### c. Alarm

> 알림 관련 페이지입니다.

| Component |     URL      |        설명        |
| :-------: | :----------: | :----------------: |
|   Alarm   |    /alarm    |    알림 리스트     |
| AlarmList | /alarm/:type | 알림 항목별 리스트 |
| BotAlarm  |     /bot     | 클로저봇 알림 설정 |



##### d. Search

> 검색 관련 페이지입니다.

| Component |   URL   | 설명 |
| :-------: | :-----: | :--: |
|  Search   | /search | 검색 |



##### e. Message

> 검색 관련 페이지입니다.

|   Component   |         URL         |  설명   |
| :-----------: | :-----------------: | :-----: |
|   Messages    |      /messages      |   DM    |
| OtherMessages |   /Omessages/:id    | 1대1 DM |
| GroupMessages | /messages/:board_pk | 그룹 DM |



##### f. Other

> 검색 관련 페이지입니다.

| Component |  URL   |                 설명                 |
| :-------: | :----: | :----------------------------------: |
|   About   | /about | 비회원 제한 기능 사용 시 연결 페이지 |



## 5. 세부사항

### A. 뉴스피드 기능 📘

#### 1. 피드 목록 

|   종류   |               설명               |                             예시                             |
| :------: | :------------------------------: | :----------------------------------------------------------: |
|   NEAR   |   나와 같은 동네 유저가 쓴 글    |  <img src="assets/feed_near.png" width="300" hegiht="300"/>  |
| FAVORITE |   내가 좋아요 한 유저가 쓴 글    | <img src="assets/feed_favorite.png" width="300" hegiht="300"/> |
|   ALL    | 동네 구분 없이 모든 유저가 쓴 글 |  <img src="assets/feed_all.png" width="300" hegiht="300"/>   |

#### 2. 피드 작성 

|         순서         |                             예시                             |
| :------------------: | :----------------------------------------------------------: |
|   1. 피드 글 작성    | <img src="assets/feed_write.png" width="300" hegiht="300"/>  |
| 2. 피드 글 작성 완료 | <img src="assets/feed_write_after.png" width="300" hegiht="300"/> |

---

### B. 게시판 기능  

#### 1. 자취 게시판 : 자취 꿀팁을 서로 공유할 수 있는 게시판 🗒

> - 좋아요 + 댓글이 많은 순서대로 인기 게시물
> - 최신순 / 인기순 게시물 보기

|    종류    |                             설명                             |                             예시                             |
| :--------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 한끼레시피 |       혼밥, 혼술 등 레시피를 공유하는 정보 공유게시판        | <img src="README.assets/gBoard_recipe.png" alt="gBoard_recipe"  width="300" hegiht="300" /> |
|   자취팁   |           자취하면서 유용한 정보를 공유하는 게시판           | <img src="README.assets/gBoard_tip.png" alt="gBoard_tip"  width="300" hegiht="300" /> |
|   홈데코   | 자취방 인테리어, 이쁜 가구 등에 대해 정보를 주고 받는 게시판 | <img src="README.assets/gBoard_deco.png" alt="gBoard_deco"  width="300" hegiht="300" /> |



#### 2. 지역 게시판 : 우리 지역 내에서 모임을 모집할 수 있는 게시판 🗒

|    종류    |                             설명                             |                             예시                             |
| :--------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|  공동구매  | 1인 가구가 사용하기엔 많은 물건을 같은 동네 자취생들과 나눌 수 있는 공동구매 게시판 | <img src="assets/lBoard_purchase.png" width="300" hegiht="300"/> |
| 클로저모임 | 같은 동네 자취생들끼리 원하는 모임을 개설하고 인원을 모집할 수 있는 클로저모임 게시판 | <img src="assets/lBoard_group.png" width="300" hegiht="300"/> |
| 도와주세요 | 급하게 필요한 게 있거나 위험한 상황일 때 주변의 자취생들에게 부탁을 요청할 수 있는 도와주세요 게시판 | <img src="assets/lBoard_sos.png" width="300" hegiht="300"/>  |

---

### C. 게시물 검색 기능 + 네이버 검색 활용 🔍

|       기능       |                        설명                        |                             예시                             |
| :--------------: | :------------------------------------------------: | :----------------------------------------------------------: |
|   네이버 검색    | 네이버 블로그 검색 기능으로, 포함/미포함 선택 가능 | <img src="assets/search_naver.png" width="300" hegiht="300"/> |
| 제목 + 내용 검색 | (네이버 검색 기능 미포함) 클로저 게시물 검색 기능  | <img src="assets/search_nonaver.png" width="300" hegiht="300"/> |
|   닉네임 검색    |      유저 닉네임 검색을 통한 게시물 검색 기능      | <img src="assets/search_nickname.png" width="300" hegiht="300"/> |



---
### D. 프로필 기능 👤

|             기능             |                             설명                             |                             예시                             |
| :--------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 내 피드 / 내 포스트 / 북마크 | 내 프로필에서 나의 정보와 내가 쓴 글, 북마크 한 글 확인 가능 |  <img src="assets/myprofile.png" width="300" hegiht="300"/>  |
|          뱃지 기능           | **매달 각 자취게시판별로 좋아요 + 댓글을 많이 받은 사람 n명에게 뱃지 제공** <br />- 글 개수가 일정 수준 도달 하지 못하면, 뱃지 부여 X<br />- 글 개수 일정 수준 도달하면, 뱃지 부여 O | <img src="README.assets/badge_no.png" width="300" hegiht="300"/><img src="README.assets/badge_yes.png" width="300" hegiht="300"/> |



---
### E. 네이버 지도 API를 활용한 위치 변경 🌏

>동네가 변경되었을 때, 현재 위치를 기반으로 위치 변경 가능 

<img src="assets/location_change.png" width="300" hegiht="300"/>



---
### F. 팔로우/언팔로우 기능 👫 

|               순서               |                             예시                             |
| :------------------------------: | :----------------------------------------------------------: |
| 1. 다른 유저 팔로우 하기 전 모습 | <img src="assets/follow_before.png" width="300" hegiht="300"/> |
|          2. 팔로우 시작          | <img src="assets/follow_after.png" width="300" hegiht="300"/> |
|   3. 팔로워 리스트에도 추가됨    | <img src="assets/follower_list.png" width="300" hegiht="300"/> |



---
### G. 알림 기능  🔔

>다른 유저가 나의 글을 좋아요, 북마크를 하거나 댓글을 달면 알림 수신  

<img src="assets/alarm_my.png" width="300" hegiht="300"/>


---

### H. 클로저봇 알림 기능 🔔

> 공과금 내는 날, 분리수거 하는 날 등 혼자 살면 까먹을 수 있는 내용을 클로저봇에 입력해 해당 날마다 알림이 온다

|                            순서                            |                             예시                             |
| :--------------------------------------------------------: | :----------------------------------------------------------: |
| 1. 클로저봇 알림을 통해 매주, 매월 해야 하는 일정을 적는다 | <img src="assets/botAlarm_day.png" width="300" hegiht="300"/><img src="README.assets/botAlarm_date.png" width="300" hegiht="300"/> |
|               2. 해당 날이 되면 알림이 온다                |  <img src="assets/botAlarm.png" width="300" hegiht="300"/>   |

---

### I. DM 기능 💬 

|    기능    |                             설명                             |                             예시                             |
| :--------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 1 : 1 대화 | 상대방 프로필에서 DM 버튼 눌렀을 때,<br /> 해당 유저와 1:1 대화 기능 | <img src="README.assets/dm_otherprofile.png" width="300" hegiht="300"/><img src="assets/dm_one.png" width="300" hegiht="300"/> |
| 단체 대화  | 지역게시판 클로저모임 참여시, <br />대화 입장하여 모집 인원들과 대화 가능 | <img src="README.assets/lBoard_groupboard-1629380960966.png" width="300" hegiht="300"/><img src="README.assets/dm_group.png" width="300" hegiht="300"/> |



## 6. 발전방향 🔥🔥
#### A. 공개 / 비공개 설정 

> 유저 계정의 공개 / 비공개 설정을 통해 더욱 private 한 소통 가능 



#### B. 지역 전체 채팅 기능

> 1:1, 1:多 DM 기능과 더불어 지역 전체 유저들이 한 번에 채팅할 수 있도록 기능 추가 



#### C. 키워드 알림 설정 

> 유저가 원하는 키워드의 글만 신속하게 받아볼 수 있도록 키워드 알림 설정 기능 추가 



#### D. 더 다양한 뱃지 기능

> 정보 제공의 신뢰성을 위해 사용자의 서비스 활동에 대해 더 많은 뱃지 기준 부여.
>
> - ex) 요리 레시피 글 10개 이상 = 요리왕 OOO 
> - ex) 홈데코 글 10개 이상 = 인테리어 강좌 OO 

>뱃지를 모아두는 페이지
>
>- 본인이 여태것 모아놓은 뱃지를 볼 수 있는 페이지 추가



#### E. 조회수 기능

> 해당 게시글을 조회한 사람이 몇 명인지 알려주는 기능 추가
