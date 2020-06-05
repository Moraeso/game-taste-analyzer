import React from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/Context';
import { Colors } from 'shared/assets/color';
import Artworks from 'web/components/GameInformation/GameDetailInformation/Contents/Artworks';
import Box from 'web/components/GameInformation/GameDetailInformation/Box';
import EmptySpace from 'web/components/shared/EmptySpace';

const Wrapper = styled.div`
`;

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.gray9};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px auto;
  background-color: ${Colors.gray2};
`;

const Videos = () => {
  const game = useGameInformationContext();
  if (!game) return null;
  if (!game.video) return null;

  return (
    <Wrapper>
      <Text>
        동영상
      </Text>
      <EmptySpace marginTop="10px" />
      <Line />
    </Wrapper>
  );
}

export default Videos;
