import React, {
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import styled from 'styled-components';
import GamesGridView from 'web/components/Games/GamesGridView';
import EmptySpace from 'web/components/shared/EmptySpace';
import InfiniteScroll from 'react-infinite-scroller';
import { useLocation } from 'react-router';
import DropdownMenu from 'web/components/Games/DropdownMenu';

const Wrapper = styled.div`
  margin: 20px 0;
`;

const Text = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const ORDER = [
  {
    name: `점수 순`,
    link: `${API_URL}/games?ordering=total_rating`,
  },
  {
    name: `인기 순`,
    link: `${API_URL}/games?ordering=popularity`,
  },
  {
    name: `최신발매 순`,
    link: `${API_URL}/games?ordering=first_release_date`,
  },
];

const Games = () => {
  const [games, setGames] = useState(null);
  const [showNum, setShowNum] = useState(20);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const getGamesOrderByRating = async (limit: number) => {
    const ordering = location.search.split('=')[1] || 'total_rating';
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.games}`,
      params: {
        limit,
        ordering,
      },
    });
    return result;
  };

  useEffect(() => {
    getGamesOrderByRating(showNum)
      .then((res) => {
        setGames(res.data);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [showNum]);

  const loadFunc = () => {
    if (loading) return;
    setLoading(() => true);
    setShowNum(showNum + 20);
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
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <GamesGridView games={games} />
        </InfiniteScroll>
      )}
    </Wrapper>
  );
};

export default Games;
