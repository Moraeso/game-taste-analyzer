import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/Context';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';

const Wrapper = styled.div`
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
    </Wrapper>
  );
}

export default BasicInformation;
