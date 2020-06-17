import React, {
  useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { Game } from 'web/model/game';
import GameCard from 'web/components/Games/GameCard';
import { Colors } from 'shared/assets/color';
import {
  DESKTOP_NORMAL,
  MOBILE_BIG_WIDTH,
} from 'web/constants';
import useMedia from 'web/hooks/useMedia';

const Wrapper = styled.div`
  background-color: ${Colors.gray1};
  padding: 0 20px;
`;

const Gird = styled.div`
  display: grid;
  width: auto;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: ${DESKTOP_NORMAL}) {
  grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${MOBILE_BIG_WIDTH}) {
  grid-template-columns: repeat(2, 1fr);
  }
`;

const GirdColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GamesGridView = ({ games }: { games: Game[] }) => {
  const isDesktopNormal = useMedia(DESKTOP_NORMAL);
  const isMobileBig = useMedia(MOBILE_BIG_WIDTH);
  const [columns, setColumns] = useState(4);
  const [gridItems, setGridItems] = useState([]);

  useEffect(() => {
    if (isMobileBig) {
      setColumns(2);
    } else if (isDesktopNormal) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  }, [isDesktopNormal, isMobileBig]);

  useEffect(() => {
    const newItems = [];
    for (let i = 0; i < columns; i += 1) {
      const columnItems = games.filter((v, index) => (index % columns) === i);
      newItems.push(<GirdColumn key={i}>{columnItems.map((v) => <GameCard key={v.id} g={v} />)}</GirdColumn>);
    }
    setGridItems(newItems);
  }, [columns, games]);

  return (
    <Wrapper>
      <Gird columns={columns}>
        {gridItems}
      </Gird>
    </Wrapper>
  );
};

export default GamesGridView;
