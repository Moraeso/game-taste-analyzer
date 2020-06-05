import React from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/Context';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';
import ImageSlider from 'web/components/GameInformation/GameDetailInformation/Contents/ImageSlider';

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

const Screenshots = () => {
  const game = useGameInformationContext();
  if (!game) return null;
  if (!game.screenshots) return null;

  return (
    <Wrapper>
      <Text>
        스크린샷
      </Text>
      <EmptySpace marginTop="10px" />
      <ImageSlider imgList={game.screenshots} widthSize={320} />
      <Line />
    </Wrapper>
  );
}

export default Screenshots;
