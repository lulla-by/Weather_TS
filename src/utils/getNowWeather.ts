export const getNowWeather = (
  precipitationType: string,
  skyCondition: string
): string[] => {
  let answer = ['sunny', '맑음'];

  if (precipitationType === '없음' || precipitationType === null) {
    if (skyCondition === '구름 많음') {
      answer = ['cloudy', '구름 많음'];
    } else if (skyCondition === '흐림') {
      answer = ['gloomy', '흐림'];
    }
  } else if (precipitationType === '눈' || precipitationType === '비/눈') {
    answer = ['snow', '눈'];
  } else if (precipitationType === '비') {
    answer = ['rain', '비'];
  }
  return answer;
};

