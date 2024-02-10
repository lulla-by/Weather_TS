import { ContentsWeatherItem, WeatherData } from "components/types/types";


type ProcessedWeatherData = {
  [datetime: string]: {
    [category: string]: {
      [fcstDateAndTime: string]: any; // fcstValue에 대한 타입은 해당 데이터의 실제 형태에 따라 수정 필요
      // 다른 속성이 필요하다면 추가 가능
    };
  };
};

export const getDataObject = (datas: WeatherData<ContentsWeatherItem>): ProcessedWeatherData => {

  const obj: ProcessedWeatherData = {};
  for (const item in datas) {
    if (!obj[item]) {
      obj[item] = {};
    }
    for (let i = 0; i < datas[item].length; i++) {
      const fcstTime = datas[item][i].fcstTime;
      const fcstDate = datas[item][i].fcstDate;
      const category = datas[item][i].category;

      if (!obj[item][fcstDate + fcstTime]) {
        obj[item][fcstDate + fcstTime] = {};
      }

      obj[item][fcstDate + fcstTime][category] = datas[item][i].fcstValue;
    }
  }
  return obj;
};
