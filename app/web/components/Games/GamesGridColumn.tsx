import React from 'react';
import styled from 'styled-components';
import GameCard from 'web/components/Games/GameCard';
import { Game } from 'web/model/game';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GamesGridColumn = ({ games }: { games: Game[] }) => {
  return (
    <Wrapper>
      {games.map((v) => <GameCard key={v.id} g={v} />)}
    </Wrapper>
  );
};

export default GamesGridColumn;
