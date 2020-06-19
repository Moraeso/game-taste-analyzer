import React from 'react';
import styled, {
  css,
  keyframes,
} from 'styled-components';
import { Colors } from 'shared/assets/color';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 42px;
  height: 42px;
`;

const Rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Child = styled.div(({
  delay,
}: {
  delay: string;
}) => css`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 42px;
  height: 42px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: ${Rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation-delay: ${delay};
  border-color: ${Colors.gray6} transparent transparent transparent;
`);

const Loading = () => (
  <Wrapper>
    <Child delay="-0.45s"></Child>
    <Child delay="-0.3s"></Child>
    <Child delay="-0.15s"></Child>
    <Child></Child>
  </Wrapper>
);

export default Loading;
