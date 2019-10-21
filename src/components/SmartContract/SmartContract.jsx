import React from 'react';
import gql from 'graphql-tag';

import Formula from './Formula';
import Code from './Code';


const MARKET_QUERY = gql`
  query {
    smartContract
  }
`;

const SmartContract = (props) => (
  <div className="columns">
    <div className="column is-6 animated fadeIn">
      <Formula
        title="Payment Formula"
        subTitle="Define Payment Formula"
        formula="[ IGV position ]*0.4*[EOH]*0.3/time"
        />
    </div>
    <div className="column is-6 animated fadeIn">
      <Code query={MARKET_QUERY} />
    </div>
  </div>
);


export default SmartContract;
