import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'shared/assets/color';
import { useItemSliderContext } from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ItemSliderContext';
import useMedia from 'web/hooks/useMedia';
import { MOBILE_WIDTH } from 'web/constants';
import { useHistory } from 'react-router-dom';
import { API_URL } from 'shared/API_INFO';

type SimilarGamesProps = {
  itemList: any;
}

const Wrapper = styled.a(({
  isMobileSize,
  mobileViews,
  defaultWidth,
}: { isMobileSize: number; mobileViews: number; defaultWidth: number }) => css`
  position: relative;
  min-width: ${isMobileSize ? `calc(${100 / mobileViews}% - 10px - ${30 / mobileViews}px)` : `${defaultWidth}px`};
  max-width: ${isMobileSize ? `calc(${100 / mobileViews}% - 10px - ${30 / mobileViews}px)` : `${defaultWidth}px`};  height: auto;
  margin: 0 5px;
  &:hover {
    cursor: pointer;
    background: ${Colors.gray8};
  }
`);

const Img = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.gray3};
  border-radius: 3px;
  box-sizing: border-box;
  object-fit: cover;
`;

const HoverDarker = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  &:hover {
    background: ${Colors.gray8};
    opacity: 0.4;
  }
`;

const SimilarGamesItems = ({ itemList }: SimilarGamesProps) => {
  const isMobileSize = useMedia(MOBILE_WIDTH);
  const { mobileViews, defaultWidth } = useItemSliderContext();
  const history = useHistory();

  const onClick = (gameId: number) => {
    history.push(`/game/${gameId}`);
  };

  return (
    <>
      {itemList.map((item, i) => (
        <Wrapper
          isMobileSize={isMobileSize}
          mobileViews={mobileViews}
          defaultWidth={defaultWidth}
          href={`${API_URL}/game/${item.id}`}
          key={i.toString()}
        >
          <HoverDarker />
          <Img src={item.cover} />
        </Wrapper>
      ))}
    </>
  );
};

export default SimilarGamesItems;
