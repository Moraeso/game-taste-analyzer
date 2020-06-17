import React from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/GameContext';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';
import ItemSlider from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider';
import ArtworksItems from 'web/components/GameInformation/GameDetailInformation/Contents/Artworks/ArtworksItems';

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

const Artworks = () => {
  const game = useGameInformationContext();
  if (!game) return null;
  if (!game.artworks) return null;
  return (
    <Wrapper>
      <Text>
        아트웍
      </Text>
      <EmptySpace marginTop="10px" />
      <ItemSlider
        mobileViews={2}
        defaultWidth={240}
        length={game.artworks.length}
      >
        <ArtworksItems itemList={game.artworks} />
      </ItemSlider>
      <Line />
    </Wrapper>
  );
};

export default Artworks;
