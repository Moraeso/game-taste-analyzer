import React from 'react';
import styled from 'styled-components';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import BasicInformation from 'web/components/GameInformation/GameDetailInformation/Contents/BasicInformation';
import { MOBILE_WIDTH } from 'web/constants';
import SimilarGames from 'web/components/GameInformation/GameDetailInformation/Contents/SimilarGames';

const Wrapper = styled.div`
  width: 640px;
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
      </Box>
    </Wrapper>
  );
};

export default PrimaryInformation;
