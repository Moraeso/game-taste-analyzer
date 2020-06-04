import React from 'react';
import Poster from 'web/components/GameInformation/GameBasicInformation/Section/Poster';
import BasicInformation from 'web/components/GameInformation/GameBasicInformation/Section/BasicInformation';
import styled from 'styled-components';
import { Colors } from 'shared/assets/color';

const Wrapper = styled.div`
`;

const Line = styled.div`
  height: 1px;
  margin-top: 58px;
  background-color: ${Colors.gray2};
`;

const GameBasicInformation = () => {
  return (
    <Wrapper>
      <Poster />
      <BasicInformation />
      <Line />
    </Wrapper>
  );
};

export default GameBasicInformation;
