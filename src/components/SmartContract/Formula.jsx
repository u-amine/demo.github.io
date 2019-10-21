import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  width: 90px;
  :hover {
    background-color: ${props => props.theme.mainColorLight};
    color: #fff;
  };
  :focus {
    outline: 0;
    color: #fff;
  }
`;


const KeyFigureTitle = styled.p`
  margin-top: ${props => props.theme.marginTop};;
`;

const StyledTitle = styled.p`
  font-size: ${props => props.theme.title.font};
  font-weight: ${props => props.theme.title.weight};
`;

const StyledSubTitle = styled.p`
  color: ${props => props.theme.greyColor};
  margin-top: 2%;
  font-size: 13px;
`;

const StyledInput = styled.input`
  color: ${props => props.theme.mainColor};
  font-size: 15px;
  font-weight: ${props => props.theme.number.weight};
  margin-top: 5%;
  width: 50%
`;

const Formula = (props) => {
  const [formula, setNewFormula] = useState(props.formula);
  const [notification, enableNotification] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      enableNotification(false);
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <KeyFigureTitle className="box">
      {
        notification ? (
          <div className="notification notificationStyle animated fadeIn">New payment formula has been saved</div>
        ) : null
      }
      <StyledTitle>
        {props.title}
        <StyledSubTitle> {props.subTitle}</StyledSubTitle>
      </StyledTitle>
      <StyledTitle>
        {props.subtitle}
      </StyledTitle>
      <StyledInput className="input" value={formula} onChange={(e) => { setNewFormula(e.target.value)}} />
      <hr />
      <div>
        <StyledButton className="button" onClick={() => {
            enableNotification(true);
            const timer = setTimeout(() => {
              enableNotification(false);
            }, 500);
            clearTimeout(timer);
          }}>SAVE</StyledButton>
      </div>
    </KeyFigureTitle>
  )
};

export default Formula;
