import React from 'react';
import styled from 'styled-components';
import GameCard from 'web/components/Games/GamesGridView/GameCard';
import {
  SimpleGame,
} from 'shared/model/game';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GamesGridColumn = ({ g }: { g: SimpleGame[] }) => {
  return (
    <Wrapper>
      {g.map((v) => <GameCard key={v.id} g={v} />)}
    </Wrapper>
  );
};

export default GamesGridColumn;
