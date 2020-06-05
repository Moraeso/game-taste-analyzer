import React from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/Context';
import { Colors } from 'shared/assets/color';
import {
  DESKTOP_NORMAL,
  DESKTOP_SMALL,
  MOBILE_WIDTH,
} from 'web/constants';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import EmptySpace from 'web/components/shared/EmptySpace';
import ImageSlider from 'web/components/GameInformation/GameDetailInformation/Contents/ImageSlider';

const Wrapper = styled.div`
`;

const Img = styled.img`
  width: 300px;
  height: auto;
`;

const Text = styled.div`
  padding: 0 22px;
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.gray9};
`;
const Line = styled.div`
  width: 100%;
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
      <ImageSlider imgList={game.artworks} defaultWidth={160} />
      <Line />
    </Wrapper>
  );
}

export default Artworks;
