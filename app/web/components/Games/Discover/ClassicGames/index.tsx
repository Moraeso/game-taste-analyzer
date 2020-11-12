import React from 'react';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import { useLocation } from 'react-router';
import GameListForm from 'web/components/Games/GameListForm';


const ClassicGames = ({ name }: { name: string }) => {
  const location = useLocation();

  const getGamesClassic = async (initial) => {
    const ordering = location.search.split('=')[1] || '-added';
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.gamesClassic}`,
      params: {
        initial,
        ordering,
      },
    });
    return result;
  };

  return (
    <GameListForm title="고전 게임(~2000)" name={name} callGameList={getGamesClassic} />
  );
};

export default ClassicGames;
