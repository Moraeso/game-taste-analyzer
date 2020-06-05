import React from 'react';
import styled from 'styled-components';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import BasicInformation from 'web/components/GameInformation/GameDetailInformation/Contents/BasicInformation';
import { Colors } from 'shared/assets/color';
import { MOBILE_WIDTH } from 'web/constants';
import Artworks from 'web/components/GameInformation/GameDetailInformation/Contents/Artworks';
import Screenshots from 'web/components/GameInformation/GameDetailInformation/Contents/Screenshots';
import Videos from 'web/components/GameInformation/GameDetailInformation/Contents/Video';

const Wrapper = styled.div`
  width: 640px;
  margin: 0 8px;
  @media (max-width: ${MOBILE_WIDTH}) {
    width: 100%;  
    margin: 8px 0;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px auto;
  background-color: ${Colors.gray2};
`;

const PrimaryInformation = () => {
  return (
    <Wrapper>
      <Box>
        <BasicInformation />
        <Line />
        <Artworks />
        <Screenshots />
        <Videos />
      </Box>
    </Wrapper>
  );
}

export default PrimaryInformation;
