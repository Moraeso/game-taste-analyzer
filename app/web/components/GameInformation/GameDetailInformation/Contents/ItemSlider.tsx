import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import {
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io';
import {
  MOBILE_WIDTH,
  Z_INDEX,
} from 'web/constants';
import { Colors } from 'shared/assets/color';
import { isMobile } from 'react-device-detect';
import useMedia from 'web/hooks/useMedia';

type ItemSliderProps = {
  itemList: string[];
  mobileViews: number;
  defaultWidth: number;
}

const ArrowWrapper = styled.div(({
  visibility,
  direction,
}: { visibility: string; direction: string }) => css`
  position: absolute;
  display: ${visibility};
  flex-direction: row;
  align-items: center;
  width: 34px;
  height: 100%;
  top: 0;
  left: ${direction === 'back' ? 0 : 'initial'};
  right: ${direction === 'forward' ? 0 : 'initial'};
`);

const ArrowButton = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-color: ${Colors.gray6};
  opacity: 0.8;
  border-radius: 50%;
  z-index: ${Z_INDEX.SIMPLE_TOP};
`;

const Wrapper = styled.div(({
  frameOverflow,
}: { frameOverflow: string }) => css`
  width: auto;
  height: auto;
  position: relative;
  overflow: ${frameOverflow};
  ::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    ${ArrowButton} {
      display: flex;
    }
  }
`);

const ItemList = styled.div(({
  index,
  isMobileSize,
  mobileViews,
  interval,
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
    ? `translateX(${(-interval + 30) * Math.floor(index / mobileViews)}px)`
    : `translateX(${-(defaultWidth + 10) * index}px)`};
`);
// transform 1번 조건 : (restLeft 10 / margin 5) / (margin 5 / img1 / margin 5) / (margin 5 / img2 / margin 5) / (margin 5 / restRight 10)

const ItemWrapper = styled.div(({
  isMobileSize,
  mobileViews,
  defaultWidth,
}: { isMobileSize: number; mobileViews: number; defaultWidth: number }) => css`
  position: relative;
  min-width: ${isMobileSize ? `calc(${100 / mobileViews}% - 10px - ${30 / mobileViews}px)` : `${defaultWidth}px`};
  height: auto;
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

const ItemSlider = ({ itemList, mobileViews, defaultWidth }: ItemSliderProps) => {
  const sliderEl = useRef(null);
  const isMobileSize = useMedia(MOBILE_WIDTH);
  const [index, setIndex] = useState(0);
  const [interval, setInterval] = useState(0);

  const maxIndex = itemList.length - 1;

  const onClickPrev = useCallback((): void => {
    setInterval(sliderEl.current.offsetWidth);
    const unit = isMobileSize ? mobileViews : Math.floor(sliderEl.current.offsetWidth / (defaultWidth + 10));
    if (index - unit >= 0) {
      setIndex(index - unit);
    } else {
      setIndex(0);
    }
  }, [index]);

  const onClickNext = useCallback((): void => {
    setInterval(sliderEl.current.offsetWidth);
    const unit = isMobileSize ? mobileViews : Math.floor(sliderEl.current.offsetWidth / (defaultWidth + 10));
    if (index + unit <= maxIndex) {
      setIndex(index + unit);
    } else {
      setIndex(maxIndex);
    }
  }, [index]);

  return (
    <Wrapper ref={sliderEl} frameOverflow={isMobile ? 'scroll' : 'hidden'}>
      <ItemList
        isMobileSize={isMobileSize}
        mobileViews={mobileViews}
        defaultWidth={defaultWidth}
        interval={interval}
        index={index}
      >
        {itemList.map((img, i) => (
          <ItemWrapper
            isMobileSize={isMobileSize}
            mobileViews={mobileViews}
            defaultWidth={defaultWidth}
            key={i.toString()}
          >
            <HoverDarker />
            <Img src={img} alt={img} />
          </ItemWrapper>
        ))}
      </ItemList>
      {!isMobile && (
        <>
          <ArrowWrapper visibility={(index !== 0) ? 'flex' : 'none'} direction="back">
            <ArrowButton onClick={onClickPrev}>
              <IoIosArrowBack />
            </ArrowButton>
          </ArrowWrapper>
          <ArrowWrapper
            visibility={((isMobileSize && (index <= maxIndex - mobileViews))
              || (!isMobileSize && ((maxIndex - index + 1) * (defaultWidth + 10) + 30 > interval))) ? 'flex' : 'none'}
            direction="forward"
          >
            <ArrowButton onClick={onClickNext}>
              <IoIosArrowForward />
            </ArrowButton>
          </ArrowWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default ItemSlider;
