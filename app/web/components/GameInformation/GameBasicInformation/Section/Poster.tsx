import React from 'react';
import styled from 'styled-components';
import {
  DESKTOP_NORMAL,
  DESKTOP_SMALL,
} from 'web/constants';
import Background from 'web/components/GameInformation/GameBasicInformation/Contents/Background';
import Cover from 'web/components/GameInformation/GameBasicInformation/Contents/Cover';

const Wrapper = styled.div`
  max-height: 360px;
  position: relative;

  @media (max-width: ${DESKTOP_NORMAL}) {
    max-height: 320px;
  }

  @media (max-width: ${DESKTOP_SMALL}) {
    max-height: 270px;
  }
`;

const Poster = () => {
  return (
    <Wrapper>
      <Background />
      <Cover />
    </Wrapper>
  );
};

export default Poster;
