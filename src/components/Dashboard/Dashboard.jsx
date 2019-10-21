import React from 'react';
import gql from 'graphql-tag';

import KeyFigures from './KeyFigures';
import StackedBarChart from './StackedBarChart.jsx';
import StackedAreaChart from './StackedAreaChart';
import DeviceInfo from './DeviceInfo';

const DASHBOAR_QUERY = gql`
  query {
    getDashboard {
      turnUpMw,
      turnUpEuro,
      dataByDays {
        date,
        mw,
        price,
        min,
        med,
        max,
      }
    }
  }
`;

const MARKET_QUERY = gql`
  query {
    getStockMarket {
      date,
      price,
    }
  }
`;

const Dashboard = () => {
  return (
    <div className="columns is-multiline">
      <div className="column is-4 animated fadeIn">
         <KeyFigures
          title="TurnUp in MWH (current month)"
          value=''
          query={DASHBOAR_QUERY}
          left
           />
      </div>
      <div className="column is-4 animated fadeIn">
        <KeyFigures
          title="TurnUp in Euro (current month)"
          value="678354"
          leftSign="€"
          price
          query={DASHBOAR_QUERY}
           />
      </div>

      <div className="column is-4 animated fadeIn">
        <DeviceInfo
          title='SGT5-4000F I GT10'
          
           />
      </div>

      <div className="column is-6 animated fadeIn">
        <div className="box">
          <StackedBarChart title='TurnUp in MWh' query={DASHBOAR_QUERY} />
        </div>
      </div>

      <div className="column is-6 animated fadeIn">
        <div className="box">
          <StackedAreaChart title='TurnUp in Euro' query={DASHBOAR_QUERY} queryMarket={MARKET_QUERY} />
        </div>
      </div>

    </div>
  )
}

export default Dashboard;
