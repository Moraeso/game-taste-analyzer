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
`;

const Title = styled.p`
  font-size: 1.3em;
`;

const Developer = styled.p`
  font-size: 0.8em;
`;

const Summary = styled.p`
  font-size: 0.8em;
`;

const Genres = styled.p`
  font-size: 0.8em;
`;

const Platforms = styled.p`
  font-size: 0.8em;
`;

const Line = styled.hr`
  backgroundColor: 'black';
  height: 2;
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
      });
    // setGame({
    //   id: 115,
    //   artworks: [
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/ar6di.jpg',
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/ar6dj.jpg',
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/ar6dk.jpg',
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/ar6dl.jpg',
    //   ],
    //   cover: 'http://images.igdb.com/igdb/image/upload/t_1080p/co254s.jpg',
    //   genres: ['MOBA'],
    //   name: 'League of Legends',
    //   platforms: ['PC (Microsoft Windows)', 'Mac'],
    //   screenshots: [
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/aujhj4buodogepfhpovb.jpg',
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/dg0yrobaqpnlgmypujaw.jpg',
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/mxijcstlc25nv8vfhidl.jpg',
    //     'http://images.igdb.com/igdb/image/upload/t_1080p/gedd5lz7856ynljzsgbi.jpg',
    //   ],
    //   summary: 'League of Legends is a fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements. Two teams of powerful champions, each with a unique design and playstyle, battle head-to-head across multiple battlefields and game modes. With an ever-expanding roster of champions, frequent updates and a thriving tournament scene, League of Legends offers endless replayability for players of every skill level.',
    //   themes: ['Action', 'Fantasy'],
    //   videos: [
    //     {
    //       name: 'Trailer',
    //       url: 'https://www.youtube.com/watch?v=aR-KAldshAE',
    //     },
    //     {
    //       name: 'Trailer',
    //       url: 'https://www.youtube.com/watch?v=tEnsqpThaFg',
    //     },
    //     {
    //       name: 'Teaser',
    //       url: 'https://www.youtube.com/watch?v=IzMnCv_lPxI',
    //     },
    //     {
    //       name: 'Trailer',
    //       url: 'https://www.youtube.com/watch?v=vzHrjOMfHPY',
    //     },
    //     {
    //       name: 'Trailer',
    //       url: 'https://www.youtube.com/watch?v=BGtROJeMPeE',
    //     },
    //     {
    //       name: 'Trailer',
    //       url: 'https://www.youtube.com/watch?v=zF5Ddo9JdpY',
    //     },
    //   ],
    //   websites: [
    //     'http://www.leagueoflegends.com',
    //     'https://twitter.com/LeagueOfLegends',
    //     'https://www.facebook.com/leagueoflegends',
    //     'https://www.reddit.com/r/leagueoflegends',
    //     'https://www.twitch.tv/riotgames',
    //     'https://leagueoflegends.fandom.com/wiki/League_of_Legends_Wiki',
    //     'https://en.wikipedia.org/wiki/League_of_Legends',
    //     'https://www.instagram.com/leagueoflegends',
    //     'https://www.youtube.com/user/RiotGamesInc',
    //   ],
    //   firstReleaseDate: 1256601600,
    //   similarGames: [
    //     660, 2963, 3222,
    //     5570, 7313, 11800,
    //     19560, 25076, 27209,
    //     55199,
    //   ],
    //   developer: 'Riot Games',
    //   playerPerspectives: ['Bird view / Isometric'],
    //   gameModes: ['Single player', 'Multiplayer', 'Co-operative'],
    // });
  }, []);

  return (
    game ? (
      <Container>
        <PosterContainer>
          <Poster src={game.cover} alt={`${game.name}-cover`} />
        </PosterContainer>
        <MetaDataContainer>
          <Title>{game.name}</Title>
          <Developer>{game.developer}</Developer>
          <Summary>{game.summary}</Summary>
          <Line />
          <Platforms>{game.platforms}</Platforms>
          <Genres>{game.genres}</Genres>

        </MetaDataContainer>
      </Container>
    ) : <div>Game data loading...</div>
  );
};

GameCardDetail.propTypes = {
  id: PropTypes.number,
};

export default GameCardDetail;
