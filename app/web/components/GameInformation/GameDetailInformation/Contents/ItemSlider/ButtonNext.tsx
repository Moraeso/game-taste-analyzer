import React, { useMemo } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { Colors } from 'shared/assets/color';
import {
  MOBILE_WIDTH,
  Z_INDEX,
} from 'web/constants';
import { useItemSliderContext } from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ItemSliderContext';
import useMedia from 'web/hooks/useMedia';

type NextButtonProps = {
  index: number;
  onClickNext: Function;
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 34px;
  height: 100%;
  top: 0;
  right: 0;
`;

const ArrowButton = styled.div`
  // display: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-color: ${Colors.gray6};
  opacity: 0.8;
  border-radius: 50%;
  //z-index: ${Z_INDEX.SIMPLE_TOP};
`;

const ButtonNext = ({ index, onClickNext }: NextButtonProps) => {
  const isMobileSize = useMedia(MOBILE_WIDTH);
  const { mobileViews, maxIndex } = useItemSliderContext();

  const isLastPage = useMemo(() => (
    isMobileSize && (index > maxIndex - mobileViews)) || (!isMobileSize && (index === maxIndex)),
  [index, isMobileSize]);

  return (
    <>
      {!isLastPage && (
        <Wrapper>
          <ArrowButton onClick={onClickNext}>
            <IoIosArrowForward />
          </ArrowButton>
        </Wrapper>
      )}
    </>
  );
};

export default ButtonNext;
