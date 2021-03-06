import React from 'react';
import styled, { css } from 'styled-components';
import {
  IoIosArrowBack,
} from 'react-icons/io';
import { Colors } from 'shared/assets/color';
import {
  Z_INDEX,
} from 'web/constants';

type PrevButtonProps = {
  index: number;
  onClickPrev: Function;
}

const Wrapper = styled.div(({
  show,
}: { show: number }) => css`
  position: absolute;
  display: ${show ? 'flex' : 'none'};
  flex-direction: row;
  align-items: center;
  width: 34px;
  height: 100%;
  top: 0;
  left: 0;
`);

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

const ButtonPrev = ({ index, onClickPrev }: PrevButtonProps) => {
  return (
    <Wrapper show={index !== 0}>
      <ArrowButton onClick={onClickPrev}>
        <IoIosArrowBack />
      </ArrowButton>
    </Wrapper>
  );
};

export default ButtonPrev;
