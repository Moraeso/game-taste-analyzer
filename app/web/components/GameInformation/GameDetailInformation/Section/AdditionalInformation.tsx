import React from 'react';
import styled from 'styled-components';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import { MOBILE_BIG_WIDTH, MOBILE_WIDTH } from 'web/constants';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 8px;
  @media (max-width: ${MOBILE_BIG_WIDTH}) {
    margin: 8px;
    width: 640px;
  }
  @media (max-width: ${MOBILE_WIDTH}) {
    width: 100%;
    margin: 8px 0;
  }
`;

const AdditionalInformation = () => {
  return (
    <Wrapper>
      <Box>
      </Box>
    </Wrapper>
  );
}

export default AdditionalInformation;
