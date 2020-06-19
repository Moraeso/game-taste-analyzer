import React, {
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import styled, { css } from 'styled-components';
import GamesGridView from 'web/components/Games/GamesGridView';
import EmptySpace from 'web/components/shared/EmptySpace';
import InfiniteScroll from 'react-infinite-scroller';
import { useLocation } from 'react-router';
import DropdownMenu from 'web/components/Games/DropdownMenu';
import { Colors } from 'shared/assets/color';
import Loading from 'web/components/shared/Loading';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 0;
`;

const Text = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const LoadingBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin: 70px 0 50px 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 500;
`;

const ORDER = [
  {
    name: `인기 순`,
    link: `${API_URL}/games?ordering=-added`,
  },
  {
    name: `점수 순`,
    link: `${API_URL}/games?ordering=-rating`,
  },
  {
    name: `최신발매 순`,
    link: `${API_URL}/games?ordering=-released`,
  },
];

const Games = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const getGamesOrderByRating = async () => {
    const ordering = location.search.split('=')[1] || '-added';
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.games}`,
      params: {
        page,
        ordering,
      },
    });
    return result;
  };

  useEffect(() => {
    getGamesOrderByRating()
      .then((res) => {
        setGames(games.concat(res.data));
      })
      .then(() => {
        setLoading(false);
      });
  }, [page]);

  const loadFunc = () => {
    if (!(games.length) || loading) return;
    setLoading(() => true);
    setPage(page + 1);
  };

  return (
    <Wrapper>
      <Text>
        모든 게임
      </Text>
      <EmptySpace marginTop="10px" />
      <DropdownMenu items={ORDER} />
      <EmptySpace marginTop="10px" />
      {games
      && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore
        >
          <GamesGridView games={games} />
        </InfiniteScroll>
      )}
      <LoadingBox>
        {(loading || !(games.length))
          ? <Loading />
          : <>Load More</>}
      </LoadingBox>
    </Wrapper>
  );
};

export default Games;
