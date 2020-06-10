import React, {
  useCallback,
  useRef,
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
  const itemSliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [unit, setUnit] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const maxIndex = length - 1;

  const onClickPrev = useCallback(() => {
    const newUnit = isMobileSize ? mobileViews : Math.floor(itemSliderRef.current.offsetWidth / (defaultWidth + 10));
    if (index - newUnit >= 0) {
      setIndex(index - newUnit);
    } else {
      setIndex(0);
    }
    setUnit(newUnit);
  }, [index, unit]);

  const onClickNext = useCallback((): void => {
    const newUnit = isMobileSize ? mobileViews : Math.floor(itemSliderRef.current.offsetWidth / (defaultWidth + 10));
    if (index + newUnit <= maxIndex) {
      setIndex(index + newUnit);
    } else {
      setIndex(maxIndex);
    }
    setUnit(newUnit);
  }, [index, unit]);

  return (
    <ItemSliderProvider
      value={{
        maxIndex,
        mobileViews,
        defaultWidth,
      }}
    >
      <Wrapper
        ref={itemSliderRef}
        frameOverflow={isMobile ? 'scroll' : 'hidden'}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ItemList index={index}>
          {children}
        </ItemList>
        {!isMobile && (
          <SlideButton index={index} unit={unit} isHovering={isHovering} onClickPrev={onClickPrev} onClickNext={onClickNext} />
        )}
      </Wrapper>
    </ItemSliderProvider>
  );
};

export default ItemSlider;
