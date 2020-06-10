import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'shared/assets/color';
import { useItemSliderContext } from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ItemSliderContext';
import useMedia from 'web/hooks/useMedia';
import { MOBILE_WIDTH } from 'web/constants';
import { API_URL } from 'shared/constants';

type SimilarGamesProps = {
  itemList: any;
}

const Img = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.gray3};
  border-radius: 3px;
  box-sizing: border-box;
  object-fit: cover;
`;

const Text = styled.div`
  display: none;
  position: absolute;
  width: auto;
  height: auto;
  bottom: 0;
  margin: 10px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.blueGray0};
`;

const HoverDarker = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  &:hover {
    background: ${Colors.gray8};
    opacity: 0.4;
  }
`;

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
    ${Text} {
      display: initial;
    }
    ${HoverDarker} {
      background: ${Colors.gray8};
      opacity: 0.4;
    }
  }
`);

const SimilarGamesItems = ({ itemList }: SimilarGamesProps) => {
  const isMobileSize = useMedia(MOBILE_WIDTH);
  const { mobileViews, defaultWidth } = useItemSliderContext();

  return (
    <>
      {itemList.map((v, i) => (
        <Wrapper
          isMobileSize={isMobileSize}
          mobileViews={mobileViews}
          defaultWidth={defaultWidth}
          href={`${API_URL}/game/${v.id}`}
          key={i.toString()}
        >
          <HoverDarker />
          <Text>{`${v.name} (${v.firstReleaseDate ? v.firstReleaseDate.split('-')[0] : '출시 예정'})`}</Text>
          <Img src={v.cover} />
        </Wrapper>
      ))}
    </>
  );
};

export default SimilarGamesItems;
