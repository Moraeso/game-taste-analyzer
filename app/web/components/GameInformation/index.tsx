import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import GameInformationHeader from 'web/components/GameInformation/GameInformationHeader';
import GameDetailInformation from 'web/components/GameInformation/GameDetailInformation';
import { GameProvider } from 'web/components/GameInformation/GameContext';
import axios from 'axios';
import { API_URL } from 'shared/API_INFO';
import APIS from 'shared/APIS';
import {
  Game,
  SimpleGame,
} from 'web/model/game';
import { SimilarGamesProvider } from 'web/components/GameInformation/SimilarGamesContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameInformation = ({ gameId }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [similarGames, setSimilarGames] = useState<SimpleGame[] | null>(null);

  const getGame = async () => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.game}`,
      params: {
        id: gameId,
      },
    });
    return result;
  };

  // eslint-disable-next-line no-shadow
  const getSimpleGame = async (gameId) => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.simpleGame}`,
      params: {
        id: gameId,
      },
    });
    return result;
  };

  useEffect(() => {
    getGame()
      .then((res) => {
        setGame(() => res.data);
        return res.data.similarGames;
      })
      // eslint-disable-next-line no-shadow
      .then((similarGames: number[]) => {
        const promises = [];
        similarGames.forEach((similarGame) => {
          promises.push(getSimpleGame(similarGame));
        });
        return promises;
      })
      .then((promises) => Promise.all(promises))
      // eslint-disable-next-line no-shadow
      .then((results) => {
        setSimilarGames(results.map((res) => res.data));
      });
  }, []);

  return (
    <Wrapper>
      <GameProvider value={game}>
        <SimilarGamesProvider value={similarGames}>
          <GameInformationHeader />
          <GameDetailInformation />
        </SimilarGamesProvider>
      </GameProvider>
    </Wrapper>
  );
};

export default GameInformation;
