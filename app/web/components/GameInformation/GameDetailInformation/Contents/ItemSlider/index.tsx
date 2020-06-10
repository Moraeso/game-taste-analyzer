import React, {
  useCallback,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { ItemSliderProvider } from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ItemSliderContext';
import useMedia from 'web/hooks/useMedia';
import { MOBILE_WIDTH } from 'web/constants';
import SlideButton from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/SlideButton';
import ItemList from 'web/components/GameInformation/GameDetailInformation/Contents/ItemSlider/ItemList';

type ItemSliderProps = {
  children: any;
  mobileViews: number;
  defaultWidth: number;
  length: number;
}

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
    }
  }
`);

const ItemSlider = ({ children, mobileViews, defaultWidth, length }: ItemSliderProps) => {
  const isMobileSize = useMedia(MOBILE_WIDTH);
  const [index, setIndex] = useState(0);
  const maxIndex = length - 1;

  const onClickPrev = useCallback(() => {
    // setInterval(itemSliderRef.current.offsetWidth);
    const unit = isMobileSize ? mobileViews : 1;
    if (index - unit >= 0) {
      setIndex(index - unit);
    } else {
      setIndex(0);
    }
  }, [index]);

  const onClickNext = useCallback((): void => {
    // setInterval(sliderEl.current.offsetWidth);
    const unit = isMobileSize ? mobileViews : 1;
    if (index + unit <= maxIndex) {
      setIndex(index + unit);
    } else {
      setIndex(maxIndex);
    }
  }, [index]);

  return (
    <ItemSliderProvider
      value={{
        maxIndex,
        mobileViews,
        defaultWidth,
      }}
    >
      <Wrapper frameOverflow={isMobile ? 'scroll' : 'hidden'}>
        <ItemList index={index}>
          {children}
        </ItemList>
        {!isMobile && (
          <SlideButton index={index} onClickPrev={onClickPrev} onClickNext={onClickNext} />
        )}
      </Wrapper>
    </ItemSliderProvider>
  );
};

export default ItemSlider;
