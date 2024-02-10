import { ReactNode } from "react";

export interface WeatherItem {
  LGT: string;
  PTY: string;
  REH: string;
  RN1: string;
  SKY: string;
  T1H: string;
  UUU: string;
  VEC: string;
  VVV: string;
  WSD: string;
}

export interface ContentsWeatherItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface WeatherData<T> {
  [datetime: string]: T[];
}

export interface StoreInitialType<T> {
  current: {
    lat: number;
    long: number;
  };
  chartWeather: T;
  region: string;
  isLoading: boolean;
  isLocationPermission: boolean;
}

export interface ContentsPropsType {
  props: {
    temperature: string;
    precipitation: string;
    humidity: string;
    precipitationType: string;
    skyCondition: string;
  };
}


export interface ChildrenProps {
  children:ReactNode;
}
