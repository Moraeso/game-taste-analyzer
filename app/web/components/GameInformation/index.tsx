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
import { Game } from 'shared/model/game';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameInformation = ({ id, history }: { id: number; history: any }) => {
  const [game, setGame] = useState<Game>(null);
  const [similarGames, setSimilarGames] = useState(null);

  const getGame = async () => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.game}`,
      params: {
        id,
      },
    });
    return result;
  };

  useEffect(() => {
    try {
      getGame()
        .then((res) => {
          console.log(res.data);
          setGame(() => res.data);
        });
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }, [id]);

  return (
    <GameProvider value={game}>
      <Wrapper>
        <GameInformationHeader />
        <GameDetailInformation />
      </Wrapper>
    </GameProvider>
  );
};

export default GameInformation;
