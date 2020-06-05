import React from 'react';
import styled from 'styled-components';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import BasicInformation from 'web/components/GameInformation/GameDetailInformation/Contents/BasicInformation';
import { Colors } from 'shared/assets/color';
import { MOBILE_WIDTH } from 'web/constants';

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
      </Box>
    </Wrapper>
  );
}

export default PrimaryInformation;
