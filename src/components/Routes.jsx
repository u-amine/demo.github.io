import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from './NavBar';
import Dashboard from './Dashboard/Dashboard';
import SmartContract from './SmartContract/SmartContract';
import Transactions from './Transactions/Transactions';
import Invoices from './Invoices/Invoices';

function Routes() {
  return (
    <div>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/turnUp-dashboard" >
              <Dashboard />
            </Route>
            <Route path="/smart-contract" >
              <SmartContract />
            </Route>
            <Route path="/transactions" >
              <Transactions />
            </Route>
            <Route path="/invoices" >
              <Invoices />
            </Route>
            <Redirect from="/" to="turnUp-dashboard" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Routes;
