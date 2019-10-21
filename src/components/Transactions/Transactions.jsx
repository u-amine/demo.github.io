import React from 'react';
import styled from 'styled-components';

import gql from 'graphql-tag';

import TransactionsTable from './Table';

const TRANSACTIONS_QUERY = gql`
  query {
    getTransactions {
      Date,
      Category,
      Duration,
      Price,
    }
  }
`;

const KeyFigureTitle = styled.div`
  margin-top: 5%;
  margin-left: 2%;
  margin-right: 2%;
`;

const StyledTitle = styled.div`
  font-size: ${props => props.theme.title.font};
  font-weight: ${props => props.theme.title.weight};
  margin-bottom: 5%;
`;


const Dashboard = () => {
  return (
    <KeyFigureTitle className="columns box animated fadeIn">
      <div className="column is-12">
        <StyledTitle>
          Verified Transactions
        </StyledTitle>
        <TransactionsTable query={TRANSACTIONS_QUERY} />
      </div>
    </KeyFigureTitle>
  )
}

export default Dashboard;
