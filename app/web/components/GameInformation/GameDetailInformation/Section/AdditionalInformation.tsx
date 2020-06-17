import React from 'react';
import styled from 'styled-components';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import {
  DESKTOP_SMALL,
  MOBILE_BIG_WIDTH,
  MOBILE_WIDTH,
} from 'web/constants';
import Artworks from 'web/components/GameInformation/GameDetailInformation/Contents/Artworks';
import Screenshots from 'web/components/GameInformation/GameDetailInformation/Contents/Screenshots';

const Wrapper = styled.div`
  width: 480px;
  margin: 0 8px;
  @media (max-width: ${DESKTOP_SMALL}) {
    margin: 8px;
    width: 720px;
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
        <Artworks />
        <Screenshots />
      </Box>
    </Wrapper>
  );
}

export default AdditionalInformation;
