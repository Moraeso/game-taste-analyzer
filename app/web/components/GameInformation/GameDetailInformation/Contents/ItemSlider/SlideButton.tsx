import React from 'react';
import ButtonPrev from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ButtonPrev';
import ButtonNext from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ButtonNext';
import styled from 'styled-components';

type SlideButtonProps = {
  index: number;
  onClickPrev: Function;
  onClickNext: Function;
}

const Wrapper = styled.div`
`;

const SlideButton = ({ index, onClickPrev, onClickNext }: SlideButtonProps) => {
  return (
    <Wrapper>
      <ButtonPrev index={index} onClickPrev={onClickPrev} />
      <ButtonNext index={index} onClickNext={onClickNext} />
    </Wrapper>
  );
};

export default SlideButton;
