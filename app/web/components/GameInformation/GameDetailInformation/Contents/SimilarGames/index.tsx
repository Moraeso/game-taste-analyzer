import React from 'react';
import styled from 'styled-components';
import { Colors } from 'shared/assets/color';
import { useSimilarGamesContext } from 'web/components/GameInformation/SimilarGamesContext';
import EmptySpace from 'web/components/shared/EmptySpace';
import SimilarGamesItems
  from 'web/components/GameInformation/GameDetailInformation/Contents/SimilarGames/SimilarGamesItems';
import ItemSlider from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider';

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
      <ItemSlider
        mobileViews={2}
        defaultWidth={220}
        length={similarGames.length}
      >
        <SimilarGamesItems itemList={similarGames} />
      </ItemSlider>
      <Line />
    </Wrapper>
  );
};

export default SimilarGames;
