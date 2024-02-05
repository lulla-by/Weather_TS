import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import Loading from '../../ui/Loading';

const Chart = () => {
  const weatherData = useSelector((state) => state.chartWeather);
  const isLoading = useSelector((state) => state.isLoading);
  const [chartShowStata, setChartShowData] = useState(true);
  const chartName = chartShowStata ? 'Close Chart' : 'Show Chart';

  function convertDateTime(dateTime) {
    const year = dateTime.slice(2, 4);
    const month = dateTime.slice(4, 6);
    const day = dateTime.slice(6, 8);
    const hour = dateTime.slice(8, 10);

    return `${year}.${month}.${day} ${hour}시`;
  }

  const filteredData = Object.entries(weatherData).map(([key, value]) => {
    return value;
  });

  console.log(filteredData);

  const makeSeries = (data) => {
    let temperatureData = [];
    let precipitationData = [];
    let nowArr = [];

    for (let i = 0; i < data.length; i++) {
      for (let key in data[i]) {
        let temperature = data[i][key].T1H;
        let precipitation =
          data[i][key].RN1 === '강수없음'
            ? 0
            : parseFloat(data[i][key].RN1.replace('mm', ''));
        let now = convertDateTime(key);
        nowArr.push(now);
        temperatureData.push(temperature);

        precipitationData.push(precipitation);
      }
    }

    return [
      {
        name: '강수량',
        data: precipitationData,
        type: 'column', // 막대 차트로 설정
      },
      {
        name: '기온',
        data: temperatureData,
        type: 'line', // 꺾은선 차트로 설정
        nowArr,
      },
    ];
  };

  const makedSeries = makeSeries(filteredData);

  const minMax = (array) => {
    return { max: Math.max(...array), min: Math.min(...array) };
  };

  const precipitationData = minMax(makedSeries[0].data);
  const temperatureData = minMax(makedSeries[1].data);

  let options = {
    series: makedSeries,
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
      colors: ['#fcc419'],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1],
      formatter: function (val, { seriesIndex }) {
        if (seriesIndex === 0) {
          return val.toFixed(2) + 'mm';
        } else if (seriesIndex === 1) {
          return val.toFixed(1) + '℃';
        }
        return val;
      },
    },
    labels: makedSeries[1].nowArr,
    yaxis: [
      {
        title: {
          text: '강수량',
        },
        max: precipitationData.max + 5, // 강수량 세로축 최댓값
        min: 0,
      },
      {
        opposite: true,
        title: {
          text: '온도',
        },
        max: temperatureData.max + 5, // 온도 세로축 최댓값
        min: temperatureData.min - 5,
      },
    ],
  };

  if ((isLoading === true || weatherData === '') && chartShowStata === true) {
    return <Loading />;
  }

  return (
    <div>
      {chartShowStata && (
        <ApexCharts options={options} series={makedSeries} height={350} />
      )}
      <Button
        onClick={() => {
          setChartShowData(!chartShowStata);
        }}
      >
        {chartName}
      </Button>
    </div>
  );
};

export default Chart;
