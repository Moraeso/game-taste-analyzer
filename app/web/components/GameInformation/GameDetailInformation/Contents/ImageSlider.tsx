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
import { MOBILE_WIDTH, Z_INDEX } from 'web/constants';
import { Colors } from 'shared/assets/color';
import { isMobile } from 'react-device-detect';
import useMedia from 'web/hooks/useMedia';

type ImageSliderProps = {
  imgList: string[];
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

const ImgList = styled.div(({
  index,
  isMobileSize,
  interval,
  defaultWidth,
}: { index: number; isMobileSize: boolean; interval: number; defaultWidth: number }) => css`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 0 15px;
  transition: 0.175s all ease-in;
  transform: ${isMobileSize
    ? `translateX(${index * -(interval / 2) + (index * 15)}px)`
    : `translateX(${index * -(defaultWidth + 10)}px)`};
`);
// transform 1번 조건 : (restLeft 10 / margin 5) / (margin 5 / img1 / margin 5) / (margin 5 / img2 / margin 5) / (margin 5 / restRight 10)

const Img = styled.img(({
  isMobileSize,
  mobileViews,
  defaultWidth,
}: { isMobileSize: number; mobileViews: number; defaultWidth: number }) => css`
  width: ${isMobileSize ? `calc(50% - 25px)` : `${defaultWidth}px`};
  height: auto;
  margin: 0 5px;
  border: 1px solid ${Colors.gray3};
  border-radius: 3px;
  box-sizing: border-box;
`);

const ImageSlider = ({ imgList, defaultWidth }: ImageSliderProps) => {
  const sliderEl = useRef(null);
  const isMobileSize = useMedia(MOBILE_WIDTH);
  const [index, setIndex] = useState(0);
  const [interval, setInterval] = useState(0);

  const maxIndex = imgList.length - 1;

  const onClickPrev = useCallback((): void => {
    setInterval(sliderEl.current.offsetWidth);
    const unit = isMobileSize ? 2 : Math.floor(sliderEl.current.offsetWidth / (defaultWidth + 10));
    if (index - unit >= 0) {
      setIndex(index - unit);
    } else {
      setIndex(0);
    }
  }, [index]);

  const onClickNext = useCallback((): void => {
    setInterval(sliderEl.current.offsetWidth);
    const unit = isMobileSize ? 2 : Math.floor(sliderEl.current.offsetWidth / (defaultWidth + 10));
    if (index + unit <= maxIndex) {
      setIndex(index + unit);
    } else {
      setIndex(maxIndex);
    }
  }, [index]);

  return (
    <Wrapper ref={sliderEl} frameOverflow={isMobile ? 'scroll' : 'hidden'}>
      <ImgList isMobileSize={isMobileSize} defaultWidth={defaultWidth} interval={interval} index={index}>
        {imgList.map((img) => (
          <Img
            isMobileSize={isMobileSize}
            mobileViews={3}
            defaultWidth={defaultWidth}
            key={img}
            src={img}
            alt={img}
          />
        ))}
      </ImgList>
      {!isMobile && (
        <>
          <ArrowWrapper visibility={(index !== 0) ? 'flex' : 'none'} direction="back">
            <ArrowButton onClick={onClickPrev}>
              <IoIosArrowBack />
            </ArrowButton>
          </ArrowWrapper>
          <ArrowWrapper visibility={(index !== maxIndex) ? 'flex' : 'none'} direction="forward">
            <ArrowButton onClick={onClickNext}>
              <IoIosArrowForward />
            </ArrowButton>
          </ArrowWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default ImageSlider;
