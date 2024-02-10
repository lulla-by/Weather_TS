interface ForecastData {
  fcstTime: string;
  fcstDate: string;
}

interface GroupedData {
  [key: string]: ForecastData[];
}

export function groupByFcstTime(data: ForecastData[]): GroupedData {
  const groupedData: GroupedData = {};

  if (!data) {
    return groupedData;
  }

  data.forEach((item) => {
    const fcstTime = item.fcstTime;
    const fcstDate = item.fcstDate;
    const key = fcstDate + fcstTime;

    if (!groupedData[key]) {
      groupedData[key] = [];
    }

    groupedData[key].push(item);
  });

  return groupedData;
}