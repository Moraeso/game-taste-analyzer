import React from 'react';
import GamePoster from 'web/components/GameInformation/GameInformationHeader/Section/GamePoster';
import GameSummary from 'web/components/GameInformation/GameInformationHeader/Section/GameSummary';
import styled from 'styled-components';
import { Colors } from 'shared/assets/color';

const Wrapper = styled.div`
`;

const Line = styled.div`
  height: 1px;
  margin-top: 58px;
  background-color: ${Colors.gray2};
`;

const GameInformationHeader = () => {
  return (
    <Wrapper>
      <GamePoster />
      <GameSummary />
      <Line />
    </Wrapper>
  );
};

export default GameInformationHeader;
