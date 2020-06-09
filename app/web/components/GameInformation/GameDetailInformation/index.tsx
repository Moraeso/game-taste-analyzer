import React from 'react';
import styled from 'styled-components';
import { Colors } from 'shared/assets/color';
import PrimaryInformation from 'web/components/GameInformation/GameDetailInformation/Section/PrimaryInformation';
import AdditionalInformation from 'web/components/GameInformation/GameDetailInformation/Section/AdditionalInformation';
import {
  MOBILE_BIG_WIDTH,
} from 'web/constants';

const Wrapper = styled.div`
  display: flex;
  height: auto;
  flex-direction: row;
  justify-content: center;
  background-color: ${Colors.gray1};
  padding: 28px 0;
  @media (max-width: ${MOBILE_BIG_WIDTH}) {
    flex-direction: column;
    align-items: center;
  }
`;

const GameDetailInformation = () => {
  return (
    <Wrapper>
      <PrimaryInformation />
      <AdditionalInformation />
    </Wrapper>
  );
};

export default GameDetailInformation;
