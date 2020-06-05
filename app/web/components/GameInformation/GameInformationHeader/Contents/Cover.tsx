import React from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/Context';
import { Colors } from 'shared/assets/color';
import {
  MOBILE_BIG_WIDTH,
  MOBILE_WIDTH,
  Z_INDEX,
} from 'web/constants';

const Wrapper = styled.div`
  position: relative;
  width: 960px;
  height: 0px;
  margin: 0 auto;
  z-index: ${Z_INDEX.SIMPLE_TOP};
  
  @media (max-width: ${MOBILE_BIG_WIDTH}) {
    width: 640px;
  }
  @media (max-width: ${MOBILE_WIDTH}) {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    top: 50px;
  }
`;

const Img = styled.img`
  max-width: 175px;
  max-height: 235px;
  border: 2px solid ${Colors.white};
  box-sizing: border-box;

  margin: -20px 0 0 0;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    max-width: 140px;
    max-height: 188px;
    margin: 0;
  }
`;

const Cover = () => {
  const game = useGameInformationContext();
  if (!game) return null;
  return (
    <Wrapper>
      <Img src={game.cover} alt={`${game.name}-cover`} />
    </Wrapper>
  );
};

export default Cover;
