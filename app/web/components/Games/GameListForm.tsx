import React, {
  useEffect,
  useState,
} from 'react';
import { API_URL } from 'shared/constants';
import styled from 'styled-components';
import GamesGridView from 'web/components/Games/GamesGridView/index';
import EmptySpace from 'web/components/shared/EmptySpace';
import InfiniteScroll from 'react-infinite-scroller';
import DropdownMenu from 'web/components/Games/DropdownMenu';
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
// 여기 링크 바꾸기
const ORDER = (name) => [
  {
    name: `인기 순`,
    link: `${API_URL}/games/${name}?ordering=-added`,
  },
  {
    name: `점수 순`,
    link: `${API_URL}/games/${name}?ordering=-rating`,
  },
  {
    name: `최신발매 순`,
    link: `${API_URL}/games/${name}?ordering=-released`,
  },
];

const GameListForm = ({ title, name, callGameList }: { title: string; name: string; callGameList: Function }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const loadFunc = () => {
    if (!(games.length) || loading) return;
    setTrigger(!trigger);
  };

  useEffect(() => {
    const initial = !games.length;
    setLoading(() => true);
    callGameList(initial)
      .then((res) => {
        setGames(games.concat(res.data));
      })
      .then(() => {
        setLoading(() => false);
      });
  }, [trigger]);

  return (
    <Wrapper>
      <Text>
        {title}
      </Text>
      <EmptySpace marginTop="10px" />
      <DropdownMenu items={ORDER(name)} />
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

export default GameListForm;
