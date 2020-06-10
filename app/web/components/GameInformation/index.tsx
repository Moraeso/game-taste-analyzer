import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import GameInformationHeader from 'web/components/GameInformation/GameInformationHeader';
import GameDetailInformation from 'web/components/GameInformation/GameDetailInformation';
import { GameProvider } from 'web/components/GameInformation/GameContext';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import {
  Game,
  SimpleGame,
} from 'web/model/game';
import { SimilarGamesProvider } from 'web/components/GameInformation/SimilarGamesContext';
import callGameApi from 'server/utils/callGameApi';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameInformation = ({ gameId, history }: { gameId: number; history: any }) => {
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

  // eslint-disable-next-line no-shadow
  const isCompleteGameData = async (gameId) => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.gameCollect}`,
      params: {
        id: gameId,
      },
    });
    return result.data;
  };

  useEffect(() => {
    if (!similarGames) return;
    async function getCompleteGameDataList() {
      const promises = [];
      similarGames.forEach((g) => {
        promises.push(isCompleteGameData(g.id));
      });
      return Promise.all(promises);
    }
    getCompleteGameDataList()
      .then((games) => {
        console.log(games);
        let i;
        for (i = 0; i < games.length; i += 1) {
          if (games[i] === false) break;
        }
        return similarGames[i];
      })
      .then((g) => {
        console.log(g.name);
        history.push(`/game/${g.id}`);
      });
  }, [similarGames]);

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
  }, [gameId]);

  return (
    <GameProvider value={game}>
      <SimilarGamesProvider value={similarGames}>
        <Wrapper>
          <GameInformationHeader />
          <GameDetailInformation />
        </Wrapper>
      </SimilarGamesProvider>
    </GameProvider>
  );
};

export default GameInformation;
