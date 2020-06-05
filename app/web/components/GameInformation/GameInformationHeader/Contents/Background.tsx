import React from 'react';
import styled from 'styled-components';
import { Colors } from 'shared/assets/color';
import {
  DESKTOP_NORMAL,
  DESKTOP_SMALL,
} from 'web/constants';
import BackgroundImage from 'web/components/GameInformation/GameInformationHeader/Contents/BackgroundImage';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 360px;

  @media (max-width: ${DESKTOP_NORMAL}) {
    height: 320px;
  }

  @media (max-width: ${DESKTOP_SMALL}) {
    height: 270px;
  }
`;

const LeftBackground = styled.div`
  flex: 1;
  background-color: ${Colors.blackBrown};
`;

const RightBackground = styled.div`
  flex: 1;
  background: ${Colors.blackBrown};
`;

const Background = () => {
  return (
    <Wrapper>
      <LeftBackground />
      <BackgroundImage />
      <RightBackground />
    </Wrapper>
  );
};

export default Background;
