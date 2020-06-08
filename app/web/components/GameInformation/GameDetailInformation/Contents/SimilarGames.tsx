import React from 'react';
import styled from 'styled-components';
import { Colors } from 'shared/assets/color';
import { useSimilarGamesContext } from 'web/components/GameInformation/SimilarGamesContext';
import ImageSlider from 'web/components/GameInformation/GameDetailInformation/Contents/ImageSlider';
import { SimpleGame } from 'web/model/game';
import EmptySpace from 'web/components/shared/EmptySpace';

const Wrapper = styled.div`
`;

const Text = styled.div`
  padding: 0 22px;
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.gray9};
`;

const Line = styled.div`
  width: auto;
  height: 1px;
  margin: 20px 22px;
  background-color: ${Colors.gray2};
`;

const SimilarGames = () => {
  const similarGames = useSimilarGamesContext();
  if (!similarGames) return null;

  return (
    <Wrapper>
      <Text>
        비슷한 게임
      </Text>
      <EmptySpace marginTop="10px" />
      <ImageSlider imgList={similarGames.map((game: SimpleGame) => game.cover)} defaultWidth={140} />
      <Line />
    </Wrapper>
  );
}

export default SimilarGames;
