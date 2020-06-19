import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'shared/assets/color';

import {
  MOBILE_BIG_WIDTH,
  MOBILE_WIDTH,
} from 'web/constants';
import { useGameInformationContext } from 'web/components/GameInformation/GameContext';

const Wrapper = styled.div`
  width: 960px;
  margin: 20px auto 0;
  
  @media (max-width: ${MOBILE_BIG_WIDTH}) {
    width: 640px;
  }
  @media (max-width: ${MOBILE_WIDTH}) {
    width: 100%;
  }
`;

const InnerWrapper = styled.div`
  width: auto;
  margin: 0 0 0 200px;
  @media (max-width: ${MOBILE_WIDTH}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
`;

const TitleText = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${Colors.gray9};
`;

const SubText = styled.div`
  margin-top: 4px;
  font-size: 18px;
  color: ${Colors.gray5};
`;

const Score = styled.div(({
  color,
}: {
  color: string;
}) => css`
  margin-top: 4px;
  font-weight: bold;
  font-size: 20px;
  color: ${color};
`);

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 8px auto;
  background-color: ${Colors.gray2};
`;

const GameSummary = () => {
  const g = useGameInformationContext();
  if (!g) return null;

  let scoreColor = Colors.green;
  if (Math.round(g.metacritic) === 0) {
    scoreColor = Colors.gray7;
  } else if (g.metacritic < 50) {
    scoreColor = Colors.red;
  } else if (g.metacritic < 85) {
    scoreColor = Colors.mango;
  }

  const released: string = !(g.tba) ? g.released : '출시 예정';
  const metacritic: string = `${g.metacritic}점` || '집계 안됨';
  const developerString: string = g.developers ? ` ・ ${g.developers[0].name}` : '';
  return (
    <Wrapper>
      <InnerWrapper>
        <TitleText>{g.name}</TitleText>
        <SubText>
          {`${released}${developerString}`}
        </SubText>
        <Line />
        <Score color={scoreColor}>
          {`Metacritic : ${metacritic}`}
        </Score>
        <Line />
      </InnerWrapper>
    </Wrapper>
  );
};

export default GameSummary;
