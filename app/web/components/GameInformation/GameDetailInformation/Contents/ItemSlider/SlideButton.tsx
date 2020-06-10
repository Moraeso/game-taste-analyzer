import React from 'react';
import ButtonPrev from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ButtonPrev';
import ButtonNext from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ButtonNext';
import styled from 'styled-components';

type SlideButtonProps = {
  index: number;
  unit: number;
  isHovering: boolean;
  onClickPrev: Function;
  onClickNext: Function;
}

const Wrapper = styled.div`
`;

const SlideButton = ({ index, unit, isHovering, onClickPrev, onClickNext }: SlideButtonProps) => {
  return (
    <>
      {isHovering && (
        <Wrapper>
          <ButtonPrev index={index} onClickPrev={onClickPrev} />
          <ButtonNext index={index} unit={unit} onClickNext={onClickNext} />
        </Wrapper>
      )}
    </>
  );
};

export default SlideButton;
