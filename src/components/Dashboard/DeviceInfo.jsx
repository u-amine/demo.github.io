import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import devideGif from '../../media/device.gif';

const KeyFigureTitle = styled.p`
  margin-top: 10%;
`;
const StyledTitle = styled.p`
  font-size: ${props => props.theme.title.font};
  font-weight: ${props => props.theme.title.weight};
`;

const StyledSubTitle = styled.span`
  color: ${props => props.theme.greyColor}
`;

const StyledImage = styled.img`
  max-width: 93%;
`;

const StyledValue = styled.p`
  color: ${props => props.theme.mainColor};
  font-size: 15px;
  font-weight: ${props => props.theme.number.weight};
  margin-top: 5%;
`;

const DeviceInfo = (props) => {
  return (
    <KeyFigureTitle className="box">
      <div className="columns">
        <div className="column is-8">
          <StyledTitle>
            {props.title}
            <StyledSubTitle> {props.subTitle}</StyledSubTitle>
          </StyledTitle>
          <StyledTitle>
            01.06.2019 - 30.06.2019
          </StyledTitle>
          <StyledValue>
            Online 2 units running
          </StyledValue>
        </div>
        <div className="column is-4">
          <StyledImage alt="" src={devideGif} />
        </div>
      </div>
    </KeyFigureTitle>
  )
};

export default DeviceInfo;
