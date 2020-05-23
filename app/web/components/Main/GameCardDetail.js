import React, {
  useEffect,
  useState,
} from 'react';
import { API_URL } from 'shared/API_INFO';
import PropTypes from 'prop-types';
import APIS from 'shared/APIS';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const PosterContainer = styled.div`
`;

const Poster = styled.img`
  max-width: 400px;
  height: auto;
`;

const MetaDataContainer = styled.div`
  padding: 10px;
`;

const Name = styled.p`
  font-size: 1.3em;
`;

const Developer = styled.p`
  font-size: 0.8em;
`;

const Summary = styled.p`
  font-size: 0.8em;
`;

const Platforms = styled.p`
  font-size: 0.8em;
`;

const Genres = styled.p`
  font-size: 0.8em;
`;

const Themes = styled.p`
  font-size: 0.8em;
`;

const Line = styled.hr`
  backgroundColor: 'black';
  height: 2;
`;

const SimpleImg = styled.img`
  width: 320px;
  height: auto;
`;

const GameCardDetail = ({ id }) => {
  const [game, setGame] = useState(null);

  const getGame = async (gameId) => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.games}`,
      params: {
        id: gameId,
      },
    });
    return result;
  };

  useEffect(() => {
    getGame(id)
      .then((res) => {
        setGame(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    game ? (
      <Container>
        <PosterContainer>
          <Poster src={game.cover} alt={`${game.name}-cover`} />
        </PosterContainer>
        <MetaDataContainer>
          <Name>{game.name}</Name>
          <Developer>{game.developer}</Developer>
          <Summary>{game.summary}</Summary>
          <Line />
          <Platforms>{game.platforms}</Platforms>
          <Genres>{game.genres}</Genres>
          <Themes>{game.themes}</Themes>
          <Themes>{game.gameModes}</Themes>
          <Themes>{game.playerPerspectives}</Themes>
          <SimpleImg src={game.artworks[0]} alt={`${game.name}-artwork-1`} />
          <SimpleImg src={game.screenshots[0]} alt={`${game.name}-screenshot-1`} />

        </MetaDataContainer>
      </Container>
    ) : <div>Game data loading...</div>
  );
};

GameCardDetail.propTypes = {
  id: PropTypes.number,
};

export default GameCardDetail;
