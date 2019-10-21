import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  Line
  } from 'react-chartjs-2';

import { errorServer, loadingMessage } from '../../constants/content.json';


const StackedAreaChart = (props) => {
  const { data, error, loading } = useQuery(props.query);
  const { data: dataM } = useQuery(props.queryMarket);
  const labels = [];
  const marketData = [];
  const deviceData = [];
  let title = '';
  if (error) title = errorServer;
  if (loading) title = loadingMessage;
  if (dataM && dataM.getStockMarket) {
    const { getStockMarket } = dataM;
    getStockMarket.forEach((item) => {
      labels.push(item.date);
      marketData.push(item.price)
    })
  }
  if (data && data.getDashboard) {
    const { getDashboard: { dataByDays } } = data;;
    dataByDays.forEach((item) => {
      deviceData.push(item.price)
    })
  }
    const dataa = {
      labels,
      datasets: [
        {
          label: 'Custumer\'s price',
          backgroundColor: 'rgba(129, 156, 169,0.9)',
          borderColor: 'rgba(129, 156, 169,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(129, 156, 169,0.4)',
          hoverBorderColor: 'rgba(129, 156, 169,1)',
          data: deviceData
        },
        {
          label: 'Market Price',
          backgroundColor: 'rgba(84, 110, 122,0.9)',
          borderColor: 'rgba(84, 110, 122,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(84, 110, 122,0.4)',
          hoverBorderColor: 'rgba(84, 110, 122,1)',
          data: marketData
        }
      ]
    };
  return(
    <Line
      data={dataa}
      width={100}
      height={500}
      options={{ scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        },
        maintainAspectRatio : false,
        legend: {
          position: 'bottom'
        },
      title: {
        display: true,
        text: title
      } }}
    />
  )
}


export default StackedAreaChart;
