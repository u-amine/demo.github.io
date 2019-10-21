import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  Bar,
} from 'react-chartjs-2';

import { errorServer, loadingMessage } from '../../constants/content.json';

const StackedBarChart = (props) => {
  const { data, error, loading } = useQuery(props.query);
  const labels = [];
  const dataMin = [];
  const dataMed = [];
  const dataMax = [];
  let title = '';
  if (error) title = errorServer;
  if (loading) title = loadingMessage;
  if (data && data.getDashboard) {
    title = props.title;
    const { getDashboard: { dataByDays } } = data;
    dataByDays.forEach((item) => {
      labels.push(item.date);
      dataMin.push(item.min);
      dataMed.push(item.med);
      dataMax.push(item.max);
    })
  }
    const dataa = {
      labels,
      datasets: [
        {
          label: 'Minimum (Min)',
          backgroundColor: 'rgba(41, 67, 78,1,0.9)',
          borderColor: 'rgba(41, 67, 78,1,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(41, 67, 78,1,0.4)',
          hoverBorderColor: 'rgba(41, 67, 78,1,1)',
          data: dataMin
        },
        {
          label: 'Medium (Med)',
          backgroundColor: 'rgba(84, 110, 122,0.9)',
          borderColor: 'rgba(84, 110, 122,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(84, 110, 122,0.4)',
          hoverBorderColor: 'rgba(84, 110, 122,1)',
          data: dataMed
        },
        {
          label: 'Maximum (Max)',
          backgroundColor: 'rgba(129, 156, 169,0.9)',
          borderColor: 'rgba(129, 156, 169,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(129, 156, 169,0.4)',
          hoverBorderColor: 'rgba(129, 156, 169,1)',
          data: dataMax
        }
      ]
    };
  return(
    <Bar
      data={dataa}
      width={100}
      height={500}
      options={
        { scales: {
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


export default StackedBarChart;
