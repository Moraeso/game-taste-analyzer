import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import GameInformationHeader from 'web/components/GameInformation/GameInformationHeader';
import GameDetailInformation from 'web/components/GameInformation/GameDetailInformation';
import { GameProvider } from 'web/components/GameInformation/Context';
import axios from 'axios';
import { API_URL } from 'shared/API_INFO';
import APIS from 'shared/APIS';
import { Game } from 'shared/model/game';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameInformation = () => {
  const [game, setGame] = useState<Game | null>(null);

  const getGame = async (gameId: number) => {
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
    getGame(1279)
      .then((res) => {
        setGame(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <Wrapper>
      <GameProvider value={game}>
        <GameInformationHeader />
        <GameDetailInformation />
      </GameProvider>
    </Wrapper>
  );
};

export default GameInformation;
