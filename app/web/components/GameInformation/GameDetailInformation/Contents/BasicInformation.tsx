import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/GameContext';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';

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
  const g = useGameInformationContext();
  if (!g) return null;

  const released: string = !(g.tba) ? g.released : '출시 예정';
  const platforms = g.platforms.map((v) => <div key={v.id}>{v.name}</div>);
  const genres = g.genres.map((v) => <div key={v.id}>{v.name}</div>);

  return (
    <Wrapper>
      <TitleText>
        기본 정보
      </TitleText>
      <EmptySpace marginTop="10px" />
      <Text>{`${g.name} (${released})`}</Text>
      <Text>{`${g.developers[0].name || ''}`}</Text>
      <Text>{`플랫폼 : `}</Text>
      {platforms}
      <Text>{`장르 : `}</Text>
      {genres}
      {/* <Text>{`테마 : ${toConcat(game.themes)}`}</Text> */}
      {/* <Text>{`시점 : ${toConcat(game.playerPerspectives)}`}</Text> */}
      {/* <Text>{`지원 모드 : ${toConcat(game.gameModes)}`}</Text> */}
      <Line />
    </Wrapper>
  );
};

export default BasicInformation;
