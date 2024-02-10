import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import classes from './KakaoMap.module.css';
import { weatherActions } from 'store/weatherReducer';
import { dfsXyConv } from 'utils/xyConverter';
import { makeBaseTime } from 'utils/getBaseTime';
import { groupByFcstTime } from 'utils/getData';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const KakaoMap = () => {
  const state = useSelector((state:any) => state.region);
  const dispatch = useDispatch();
  const container = useRef(null);
  const [map, setMap] = useState<any>(null);

  // 날씨정보를 받는 함수
  const getWeatherData = async (lat:any, long:any) => {
    try {
      const { baseDate, baseTime } = makeBaseTime();
      const serviceKey = process.env.REACT_APP_WEATHER_KEY;
      const numOfRows = 60;
      const pageNo = 1;
      const { x: nx, y: ny } = dfsXyConv('toXY', lat, long);

      const url =
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` +
        `?serviceKey=${serviceKey}` +
        `&numOfRows=${numOfRows}&pageNo=${pageNo}` +
        `&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
      const res = await axios.get(url);
      const data = await res.data.response.body.items.item;
      const filteredData = groupByFcstTime(data);
      
      dispatch(weatherActions.changeChartWeather(filteredData));
    } catch (error) {
      alert('다시 입력해주세요');
    }
    dispatch(weatherActions.initialRegion({ lat, long }));
  };

  function addMarker(position:any) {
    let marker = new kakao.maps.Marker({
      position: position,
    });

    marker.setMap(map);
  }

  // 지도에 표시하는 함수
  const createMap = async (position:any) => {
    try {
      const coords = position.coords;
      const { latitude, longitude } = coords;

      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 5,
      };

      if (!map) {
        const newMap = new kakao.maps.Map(container.current, options);
        setMap(newMap);
      }

      // 검색한 값이 있을 경우
      if (state !== '') {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(state, function (result:any, status:any) {
          // 1. 유효하지 않은 주소일 경우 => 기본 위경도 보내기
          if (status === 'ZERO_RESULT') {
            alert('주소지를 확인해주세요');
            dispatch(weatherActions.regionChange(''));
            getWeatherData(latitude, longitude);
          }

          // 2. 유효한 주소의 경우 => 바뀐 위경도 보내기
          if (status === kakao.maps.services.Status.OK) {
            // setMap(newMap);
            
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            map.setCenter(coords);
            map.setLevel(5);

            addMarker(coords);

            let { La, Ma } = coords;
            getWeatherData(Ma, La);
          }
        });
      } else {
        // 검색값이 없는 경우 => 기본 위경도 보내기
        getWeatherData(latitude, longitude);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function onGeoError() {
    dispatch(weatherActions.isLocationPermissionGranted(false));
  }

  useEffect(() => {
    const position = navigator.geolocation.getCurrentPosition(
      createMap,
      onGeoError
    );
  }, [state]);

  return (
    <>
      <div ref={container} className={classes.container}></div>
    </>
  );
};

export default KakaoMap;
