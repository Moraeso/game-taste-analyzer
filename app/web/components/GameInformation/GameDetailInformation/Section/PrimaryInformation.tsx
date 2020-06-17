import React from 'react';
import styled from 'styled-components';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import BasicInformation from 'web/components/GameInformation/GameDetailInformation/Contents/BasicInformation';
import { MOBILE_WIDTH } from 'web/constants';
import SimilarGames from 'web/components/GameInformation/GameDetailInformation/Contents/SimilarGames';
import Videos from 'web/components/GameInformation/GameDetailInformation/Contents/Video';

const Wrapper = styled.div`
  width: 720px;
  margin: 0 8px;
  @media (max-width: ${MOBILE_WIDTH}) {
    width: 100%;  
    margin: 8px 0;
  }
`;

const PrimaryInformation = () => {
  return (
    <Wrapper>
      <Box>
        <BasicInformation />
        <SimilarGames />
        <Videos />
      </Box>
    </Wrapper>
  );
};

export default PrimaryInformation;
