import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import { errorServer } from '../../constants/content.json';


const KeyFigureTitle = styled.p`
  margin-top: 10%;
`;
const StyledTitle = styled.p`
  font-size: ${props => props.theme.title.font};
  font-weight: ${props => props.theme.title.weight};
`;
const StyledValue = styled.p`
  color: ${props => props.theme.mainColor};
  font-size: ${props => props.theme.number.font};
  font-weight: ${props => props.theme.number.weight};
  margin-top: 5%;
`;

const KeyFigures = (props) => {
  const { data, error, loading } = useQuery(props.query);
  return (
    <KeyFigureTitle className="box">
      <StyledTitle>
        {props.title}
      </StyledTitle>
      {
        (() => {
          if (error) return <p>{errorServer}</p>;
          if (loading) return <p className="animated-background textLoading" />;
          const { getDashboard: { turnUpMw, turnUpEuro } } = data;
          const display = props.price ? turnUpEuro : turnUpMw;
          return (
            <StyledValue>
              {`
              ${props.leftSign || ''}
              ${display}
              ${props.rightSign || ''}
              `}
            </StyledValue>
          )
        })()
      }
    </KeyFigureTitle>
  )
};

export default KeyFigures;
