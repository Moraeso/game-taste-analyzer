import React from 'react';
import styled from 'styled-components';
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

const Text = styled.div`
  margin-top: 4px;
  font-weight: bold;
  font-size: 20px;
  color: ${Colors.gray9};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 8px auto;
  background-color: ${Colors.gray2};
`;

const GameSummary = () => {
  const game = useGameInformationContext();
  if (!game) return null;

  const firstReleaseDate: string = game.firstReleaseDate ? game.firstReleaseDate.split('-')[0] : '출시 예정';
  const scoreString: string = game.totalRatingCount ? `${Math.round(game.totalRating * 100) / 100}(${game.totalRatingCount}명)` : '집계 안됨';
  const developerString: string = game.developer ? ` ・ ${game.developer}` : '';
  return (
    <Wrapper>
      <InnerWrapper>
        <TitleText>{game.name}</TitleText>
        <SubText>
          {`${firstReleaseDate}${developerString}`}
        </SubText>
        <Line />
        <Text>
          {`IGDB 점수 : ${scoreString}`}
        </Text>
        <Line />
      </InnerWrapper>
    </Wrapper>
  );
};

export default GameSummary;
