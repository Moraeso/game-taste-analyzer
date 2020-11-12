import React from 'react';
import styled from 'styled-components';
import { API_URL } from 'shared/constants';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  min-width: 180px;
  padding: 100px 20px 0 0;
  background: ${Colors.white};
`;

const Text = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 20px;
  color: ${Colors.gray9};
`;

const Link = styled.a`
  font-size: 32px;
  font-weight: 700;
  margin-top: 20px;
  text-decoration: none;
  color: ${Colors.gray9};
  transition: all .2s ease-out;
  &:hover {
    color: ${Colors.gray5};
  }
`;

const SubLink = styled(Link)`
  font-size: 22px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 5px;
`;

const Navigation = () => (
  <Wrapper>
    <Link href={`${API_URL}/games/all`}>모든 게임</Link>
    <EmptySpace marginTop="15px" />
    <Text>명예의 전당</Text>
    {/* <SubLink href={`${API_URL}/games`}>All Time Legend</SubLink> */}
    <SubLink href={`${API_URL}/games/thisyear`}>올해의 게임</SubLink>
    <SubLink href={`${API_URL}/games/classic`}>고전 게임</SubLink>
    <SubLink href={`${API_URL}/games/metacritic`}>메타크리틱 90</SubLink>
    <EmptySpace marginTop="15px" />
    <Text>새로운 게임</Text>
    <SubLink href={`${API_URL}/games/last30`}>지난 30일</SubLink>
    {/* <SubLink href={`${API_URL}/games`}>다가오는 게임</SubLink> */}
  </Wrapper>
);

export default Navigation;
