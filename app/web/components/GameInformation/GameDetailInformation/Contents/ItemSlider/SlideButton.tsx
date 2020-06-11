import React from 'react';
import ButtonPrev from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ButtonPrev';
import ButtonNext from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ButtonNext';
import styled from 'styled-components';

type SlideButtonProps = {
  show: boolean;
  index: number;
  unit: number;
  onClickPrev: Function;
  onClickNext: Function;
}

const Wrapper = styled.div`
`;

const SlideButton = ({ show, index, unit, onClickPrev, onClickNext }: SlideButtonProps) => {
  return (
    <Wrapper show={show}>
      <ButtonPrev index={index} onClickPrev={onClickPrev} />
      <ButtonNext index={index} unit={unit} onClickNext={onClickNext} />
    </Wrapper>
  );
};

export default SlideButton;
