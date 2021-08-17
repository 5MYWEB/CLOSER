import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import { useSelector, useDispatch } from 'react-redux';
import { changeAddr } from '../../modules/user';
import { Container, Row, Col } from 'react-bootstrap';
import { getMyInfoAction } from '../../modules/user';
import { RippleButton } from '../../styles/index';


function NaverMapAPI() {
  const dispatch = useDispatch();

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
        dispatch(changeAddr(address))
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
    </Container>
  );
}

const UserLocation = ({ history }) => {
  const { isLoggedIn, userInfo, changedAddr } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 수정할 정보의 초기값은 기존 정보와 동일하다.
  const [changedUserinfo, setChangedUserInfo] = useState({
    userId: "",
    addr: ""
  })

  useEffect(()=>{
    if(isLoggedIn === true){
      setChangedUserInfo({
        userId: userInfo.userId,
        addr: changedAddr
      })
    }else{
      setChangedUserInfo({
        addr: changedAddr
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 저장
  const onClickSave = () => {
    axios.put('http://localhost:8080/user/change-location', {userId:changedUserinfo.userId, addr:changedUserinfo.addr})
      .then((res) => {
        console.log(res)
        // 정보다시 받아오는 요청
        axios.post(`http://localhost:8080/user/profileinfo?userId=${userInfo.userId}`)
        .then((res) => {
          dispatch(getMyInfoAction(res.data))
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 취소 시 홈으로 돌아가기
  const goHome = () => {
    setTimeout( function () {
      history.push('/signup')
    }, 350);
  }
  

  return (
    <Container className="px-0">
      <RenderAfterNavermapsLoaded	   // Render후 Navermap로드
        ncpClientId={'6md51fbo47'} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
        submodules={["geocoder"]}
      >
        <NaverMapAPI/>
      </RenderAfterNavermapsLoaded>
      
      { isLoggedIn === true &&
        <div>
          <h5 className="m-2">현재 나의 위치</h5>
          <Row className="justify-content-center m-2">
            <Col>
              <div>{ changedAddr }</div>
            </Col>
          </Row>
          <br />
          {/* Row-6 : 취소, 저장 */}
          <Row className="justify-content-center mx-0">
            <Col xs={6} className="text-center px-0">
              <RippleButton onClick={goHome} cclass="cbtn cbtn-lg cbtn-secondary" children="취소"/>
            </Col>
            <Col xs={6} className="text-center px-0">
              <RippleButton onClick={onClickSave} cclass="cbtn cbtn-lg cbtn-primary" children="저장"/>
            </Col>
          </Row>
        </div>
      }
      
    </Container>
  )
};
  
  export default UserLocation;