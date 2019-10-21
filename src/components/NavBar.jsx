import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink
} from 'react-router-dom';
import styled from 'styled-components';

const StyledNavBar = styled.nav`
  background-color: ${props => props.theme.mainColor};
  .is-active{
    background-color: ${props => props.theme.mainColorLight};
  }
`;

const StyledCompany = styled.a`
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  :hover {
    background-color: ${props => props.theme.mainColorLight} !important;
    color: #fff !important;
  }
  :focus {
    background-color: ${props => props.theme.mainColorLight} !important;
    color: #fff !important;
  }
`;

const StyledText = styled.p`
  color: #fff;
  cursor: pointer;
  position: relative;
  top: 15%;
  :hover {
    background-color: ${props => props.theme.mainColorLight};
  }
`;


const NavBar = () => {
  const [mobile, enableMobile] = useState(false);
  return (
    <StyledNavBar className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand is-right">
          <a role="button" className={`navbar-burger ${mobile && "is-active"}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => {enableMobile(!mobile)}}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${mobile && "is-active"}`}>
          <div className="navbar-start">
            <NavLink activeClassName="navLinkIsActive" to="turnUp-dashboard">
              <StyledText className="navbar-item">
                TurnUp Dashboard
              </StyledText>
            </NavLink>
            <NavLink activeClassName="navLinkIsActive" to="/invoices">
              <StyledText className="navbar-item">
                Invoice
              </StyledText>
            </NavLink>

            <NavLink activeClassName="navLinkIsActive" to="/smart-contract">
              <StyledText className="navbar-item">
                Smart Contract
              </StyledText>
            </NavLink>

            <NavLink activeClassName="navLinkIsActive" to="/transactions">
              <StyledText className="navbar-item">
                Transaction
              </StyledText>
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <StyledCompany className="navbar-item" href="https://zksystems.io/"  target="_blank">
                ZkSystems
              </StyledCompany>
            </div>
          </div>
        </div>
      </div>
    </StyledNavBar>

  )
}

export default NavBar;
