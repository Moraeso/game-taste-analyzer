import React from 'react';
import styled, { css } from 'styled-components';
import { useItemSliderContext } from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ItemSliderContext';
import useMedia from 'web/hooks/useMedia';
import { MOBILE_WIDTH } from 'web/constants';

type ItemListProps = {
  children: any;
  index: number;
}

const Wrapper = styled.div(({
  index,
  isMobileSize,
  mobileViews,
  defaultWidth,
}: { index: number; isMobileSize: boolean; mobileViews: number; interval: number; defaultWidth: number }) => css`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 0 15px;
  transition: 0.175s all ease-in;
  transform: ${isMobileSize
    ? `translateX(${-100 * Math.floor(index / mobileViews)}%) translateX(${60 * Math.floor(index / mobileViews)}px)`
    : `translateX(${-(defaultWidth + 10) * index}px)`};
`);
// transform 1번 조건 : (restLeft 10 / margin 5) / (margin 5 / img1 / margin 5) / (margin 5 / img2 / margin 5) / (margin 5 / restRight 10)


const ItemList = ({ children, index }: ItemListProps) => {
  const { mobileViews, defaultWidth } = useItemSliderContext();
  const isMobileSize = useMedia(MOBILE_WIDTH);

  return (
    <Wrapper
      index={index}
      mobileViews={mobileViews}
      isMobileSize={isMobileSize}
      defaultWidth={defaultWidth}
    >
      {children}
    </Wrapper>
  );
};

export default ItemList;
