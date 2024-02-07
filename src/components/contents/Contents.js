import React from 'react';
import Information from './Information';
import Clothes from './Clothes';
import { useSelector } from 'react-redux';
import classes from './Contents.module.css';
import Loading from '../../ui/Loading';

const Contents = () => {
  const weatherData = useSelector((state) => state.chartWeather);
  const isLoading = useSelector((state) => state.isLoading);
  const filteredData = Object.entries(weatherData).map(([key, value]) => {
    return value[key];
  });
  const data = filteredData[0];

  let temperature, precipitation, humidity, PTY, SKY;

  // temperature:기온, 강수량:precipitation, 습도:humidity
  if (data) {
    ({ T1H: temperature, RN1: precipitation, REH: humidity, PTY, SKY } = data);
  }

  //강수형태 - 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
  let precipitationType;

  switch (PTY) {
    case "0":
      console.log("없음");
      precipitationType = '없음';
      break;
    case "1":
      precipitationType = '비';
      break;
    case "2":
      precipitationType = '비/눈';
      break;
    case "3":
      precipitationType = '눈';
      break;
    case "4":
      precipitationType = '소나기';
      break;
    default:
      precipitationType = '없음';
  }


  //하늘상태 - 맑음(1), 구름많음(3), 흐림(4)
  let skyCondition;

  switch (SKY) {
    case "1":
      skyCondition = '맑음';
      break;
    case "3":
      skyCondition = '구름 많음';
      break;
    case "4":
      skyCondition = '흐림';
      break;
    default:
      skyCondition = '맑음';
  }

  const weatherObj = {
    temperature,
    precipitation,
    humidity,
    precipitationType,
    skyCondition,
  };

  if (isLoading === true || data === undefined) {
    return <Loading />;
  }

  return (
    <div className={classes.container}>
      <Information props={weatherObj} data={data} />
      <Clothes props={weatherObj} data={data} />
    </div>
  );
};

export default Contents;
