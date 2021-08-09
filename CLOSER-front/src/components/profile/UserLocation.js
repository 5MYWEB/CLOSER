import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeAddr } from '../../modules/user';
import { Container, Row, Col } from 'react-bootstrap';

function NaverMapAPI({addr}) {
  const dispatch = useDispatch();

  // let changedAddr = "";
  const navermaps = window.naver.maps

  // 싸피 주소
  const [myLocation, setMyLocation] = useState({ 
    latitude: 37.5012901, 
    longitude: 127.0396125
  })

  // get current position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, [])

  useEffect(() => {
    const latlng = new navermaps.LatLng(myLocation.latitude, myLocation.longitude);
  
    navermaps.Service.reverseGeocode({
      coords: latlng,
      orders: [
        navermaps.Service.OrderType.ADDR,
        navermaps.Service.OrderType.ROAD_ADDR
      ].join(',')
    }, function(status, response) {
      if (status === navermaps.Service.Status.ERROR) {
        if (!latlng) {
          return alert('ReverseGeocode Error, Please check latlng');
        }
        if (latlng.toString) {
          return alert('ReverseGeocode Error, latlng:' + latlng.toString());
        }
        if (latlng.x && latlng.y) {
          return alert('ReverseGeocode Error, x:' + latlng.x + ', y:' + latlng.y);
        }
        return alert('ReverseGeocode Error, Please check latlng');
      }
  
      let tmp = response.v2.results[0].region;
      let address = tmp.area1.name + ' ' + tmp.area2.name + ' ' + tmp.area3.name
      
      if(address !== ''){
        console.log(address)
        // changedAddr = address
        dispatch(changeAddr(address))
        // axios
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation]);

  return (
    <Container className="px-0">
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%', // 네이버지도 가로 길이
          height: '50vh' // 네이버지도 세로 길이
        }}
        center={{ lat: myLocation.latitude, lng: myLocation.longitude}}  // 지도 위치
        // defaultCenter={{ lat: 37.5012901, lng: 127.0396125 }} // 지도 초기 위치
        defaultZoom={16} // 지도 초기 확대 배율
        zoomControl={false}
      >
        <Marker
          key={1} 
          position={new navermaps.LatLng(myLocation.latitude, myLocation.longitude)}
          animation={1}
        />
      </NaverMap>
      
      {/* <button onClick={getCurrentLocation}>현재 위치 불러오기</button> */}
    </Container>
  );
}

const UserLocation = () => {
  const { userInfo, changedAddr } = useSelector((state) => state.user);
  console.log(userInfo.userId)
  console.log(changedAddr)
  // 저장
  const onClickSave = () => {
    if (changedAddr !== ""){
      axios.put('http://localhost:8080/user/mypage', changedAddr)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    } else{
      alert('닉네임 중복체크를 해주세요!')
    }
  }

  return (
    <Container className="px-0 mt-3">
      <RenderAfterNavermapsLoaded	   // Render후 Navermap로드
        ncpClientId={'6md51fbo47'} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
        submodules={["geocoder"]}
      >
        <NaverMapAPI/>
      </RenderAfterNavermapsLoaded>

      <h5 className="my-2">현재 위치</h5>
      <Row className="justify-content-center">
        <Col>
          <div>{ changedAddr }</div>
        </Col>
      </Row>
      <br />
      {/* Row-6 : 취소, 저장 */}
      <Row className="justify-content-center">
        <Col >
          <Link to={`/`}><button>취소</button></Link>
        </Col>
        <Col>
        <button onClick={onClickSave}>저장</button>
          
        </Col>
      </Row>
    </Container>
  )
};
  
  export default UserLocation;