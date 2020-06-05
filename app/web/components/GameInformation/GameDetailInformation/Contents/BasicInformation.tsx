import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/Context';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';

const Wrapper = styled.div`
  padding: 0 22px;
`;

const TitleText = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.gray9};
`;

const Text = styled.div`
  margin-top: 6px;
  font-size: 16px;
  color: ${Colors.gray9};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background-color: ${Colors.gray2};
`;

const BasicInformation = () => {
  const toConcat = useCallback(
    (stringArray: string[]): string => stringArray.join(' ・ '), []);

  const game = useGameInformationContext();
  if (!game) return null;
  return (
    <Wrapper>
      <TitleText>
        기본 정보
      </TitleText>
      <EmptySpace marginTop="10px" />
      <Text>{game.name}</Text>
      <Text>{`${game.firstReleaseDate.split('-')[0]} ・ ${game.developer}`}</Text>
      <Text>{`플랫폼 : ${toConcat(game.platforms)}`}</Text>
      <Text>{`장르 : ${toConcat(game.genres)}`}</Text>
      <Text>{`테마 : ${toConcat(game.themes)}`}</Text>
      <Text>{`시점 : ${toConcat(game.playerPerspectives)}`}</Text>
      <Text>{`지원 모드 : ${toConcat(game.gameModes)}`}</Text>
      <Line />
    </Wrapper>
  );
}

export default BasicInformation;
