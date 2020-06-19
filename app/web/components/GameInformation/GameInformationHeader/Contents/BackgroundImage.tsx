import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'shared/assets/color';
import { useGameInformationContext } from 'web/components/GameInformation/GameContext';
import {
  DESKTOP_NORMAL,
  DESKTOP_SMALL,
  MOBILE_WIDTH,
} from 'web/constants';

const Wrapper = styled.div`
  position: relative;
  width: 1024px;
  height: 100%;
  overflow: hidden;

  @media (max-width: ${DESKTOP_NORMAL}) {
    width: 910px;
  }

  @media (max-width: ${DESKTOP_SMALL}) {
    width: 768px;
  }
`;

const Img = styled.img(({
  show,
}: { show: boolean }) => css`
  display: ${show ? 'flex' : 'none'};
  position: absolute;
  top: -50%;
  width: 1024px;
  @media (max-width: ${DESKTOP_NORMAL}) {
    width: 910px;
  }

  @media (max-width: ${DESKTOP_SMALL}) {
    width: 768px;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    filter: blur(5px);
  }
`);

const LeftGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  background: ${Colors.blackBrown};
  background: linear-gradient(90deg, ${Colors.blackBrown} 0%, rgba(255,255,255,0) 100%);
  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

const RightGradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: ${Colors.blackBrown};
  background: linear-gradient(270deg, ${Colors.blackBrown} 0%, rgba(255,255,255,0) 100%);
  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

const BackgroundImage = () => {
  const g = useGameInformationContext();
  if (!g) return null;
  const show = !!(g.backgroundImage);
  return (
    <Wrapper>
      <Img show={show} src={g.backgroundImage} alt={`${g.name}-background`} />
      <LeftGradient />
      <RightGradient />
    </Wrapper>
  );
};

export default BackgroundImage;
