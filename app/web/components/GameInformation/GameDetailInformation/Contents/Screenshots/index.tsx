import React from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/GameContext';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';
import ItemSlider from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider';
import ScreenshotItems
  from 'web/components/GameInformation/GameDetailInformation/Contents/Screenshots/ScreenshotsItems';

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

const Index = () => {
  const game = useGameInformationContext();
  if (!game) return null;
  if (!game.screenshots) return null;

  return (
    <Wrapper>
      <Text>
        스크린샷
      </Text>
      <EmptySpace marginTop="10px" />
      <ItemSlider
        mobileViews={2}
        defaultWidth={160}
        length={game.screenshots.length}
      >
        <ScreenshotItems itemList={game.screenshots} />
      </ItemSlider>
      <Line />
    </Wrapper>
  );
};

export default Index;
