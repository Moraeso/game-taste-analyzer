import React, {
  useCallback,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import {
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io';
import { Z_INDEX } from 'web/constants';
import { Colors } from 'shared/assets/color';
import { isMobile } from 'react-device-detect';

type ImageSliderProps = {
  imgList: string[];
  widthSize: number;
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
  width: 34px;
  height: 34px;
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
  widthSize,
  index,
}: { widthSize: number; index: number }) => css`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  transition: 0.125s all ease-in;
  transform: translateX(${index * -(widthSize + 8)}px);
`);

const Img = styled.img(({
  widthSize,
}: { widthSize: number }) => css`
  width: ${widthSize}px;
  height: auto;
  margin: 0 4px;
`);

const ImageSlider = ({ imgList, widthSize }: ImageSliderProps) => {
  const [index, setIndex] = useState(0);

  const maxIndex = imgList.length - 1;
  const onClickPrev = useCallback((): void => {
    console.log(`onClickPrev`);
    if (index !== 0) {
      setIndex(index - 1);
    }
  }, [index]);

  const onClickNext = useCallback((): void => {
    console.log(`onClickNext`);

    if (index !== maxIndex) {
      setIndex(index + 1);
    }
  }, [index]);

  return (
    <Wrapper frameOverflow={isMobile ? 'scroll' : 'hidden'}>
      <ImgList widthSize={widthSize} index={index}>
        {imgList.map((img) => (
          <Img widthSize={widthSize} key={img} src={img} alt={img} />
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
