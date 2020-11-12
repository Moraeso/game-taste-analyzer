import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  DESKTOP_NORMAL,
  MOBILE_BIG_WIDTH,
} from 'web/constants';
import useMedia from 'web/hooks/useMedia';
import GamesGridColumn from 'web/components/Games/GamesGridView/GamesGridColumn';
import { SimpleGame } from 'shared/model/game';

const Wrapper = styled.div`
  padding: 0;
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

const GamesGridView = ({ games }: { games: SimpleGame[] }) => {
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
      newItems.push(<GamesGridColumn key={i} g={columnItems} />);
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
