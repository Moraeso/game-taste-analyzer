import React from 'react';
import styled from 'styled-components';
import { API_URL } from 'shared/constants';
import { Colors } from 'shared/assets/color';

const Wrapper = styled.div`
   position: sticky;
   width: 350px;
   padding: 100px 20px 0 0;
   background: ${Colors.white};
`;

const Link = styled.a`
  font-size: 32px;
  font-weight: 700;
  text-decoration: none;
  color: ${Colors.gray9};
  transition: all .2s ease-out;
  &:hover {
    color: ${Colors.gray5};
  }
`;

const Navigation = () => {
  return (
    <Wrapper>
      <Link href={`${API_URL}/games`}>모든 게임</Link>
    </Wrapper>
  );
};

export default Navigation;
