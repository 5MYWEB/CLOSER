import React from 'react';
// import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
// import $ from 'jquery';
// import ScriptTag from 'react-script-tag';

const UserLocation = () => {
    // <RenderAfterNavermapsLoaded
    //   ncpClientId={"6md51fbo47"} // 자신의 네이버 계정에서 발급받은 Client ID
    //   error={<p>Maps Load Error</p>}
    //   loading={<p>Maps Loading...</p>}
    // >
    //   <NaverMap
    //     mapDivId={"map"} // default: react-naver-map
    //     style={{
    //       width: 800, // 네이버지도 가로 길이
    //       height: 800 // 네이버지도 세로 길이
    //     }}
    //     defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
    //     zoom={props.zoom}
    //   >
    //     {props.address !== null
    //       ? props.test.map((ele, idx) => {
    //           return (
    //             <Marker
    //               // icon={""}
    //               key={idx}
    //               position={{ lat: ele.lat, lng: ele.lng }}
    //               animation={2}
    //               onClick={() => {
    //                 alert('hello');
    //               }}
    //             />
    //           );
    //         })
    //       : null}
    //   </NaverMap>
    // </RenderAfterNavermapsLoaded>
    // let curtBtn = '<img src="https://media.discordapp.net/attachments/861279386740064306/871983067219243078/Asset_1.png" alt="현재위치로 이동" width="50px">';

    // // 현재 위치 위도, 경도 좌표를 담을 변수
    // let curtLoca = "";

    // // 싸피 서울캠퍼스 위/경도 좌표 객체
    // let ssafy = new naver.maps.LatLng(37.5012901, 127.0396125);

    // // Map 초기화
    // let map = new naver.maps.Map('map', {
    //     center: ssafy, // x,y 값 설정
    //     scaleControl: false, // 우측 하단 scale 표시
    //     mapDataControl: false, // 좌측 하단 @Naver Corp 표시
    //     mapTypeControl: true,
    //     zoom: 17
    // });

    // // 싸피 마커 설정
    // let marker = new naver.maps.Marker({
    //     position: ssafy,
    //     map: map,
    //     // icon: { url: "https://media.discordapp.net/attachments/861279386740064306/871983067219243078/Asset_1.png" }
    // });


    // let onSuccessGeolocation = function (position) {
    //     curtLoca = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //     map.setCenter(curtLoca);
    //     map.setZoom(17);

    //     new naver.maps.Marker({
    //         position: curtLoca,
    //         map: map
    //     })
    // }

    // let onErrorGeolocation = function () {
    //     let agent = navigator.userAgent.toLowerCase();
    //     let name = navigator.appName;

    //     if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1 ){
    //         alert("지원하지 않는 브라우저입니다.");
    //     }else{
    //         console.log("현재 위치를 가져오는데 에러가 발생했습니다.")
    //     }
    // }

    // if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
    // }else{
    //     console.log("Geolocation Not supported Required");
    // }


    // return (
    //   <div>
    //     <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6md51fbo47" />
    //     <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=6md51fbo47&submodules=geocoder" />
    //     <div id="map" style="width:100%;"></div>
    //   </div>
    // );
  };
  
  export default UserLocation;