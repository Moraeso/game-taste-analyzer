import React from 'react';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import { useLocation } from 'react-router';
import GameListForm from 'web/components/Games/GameListForm';


const MetacriticGames = ({ name }: { name: string }) => {
  const location = useLocation();

  const getGamesMetacritic = async (initial) => {
    const ordering = location.search.split('=')[1] || '-added';
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.gamesMetacritic}`,
      params: {
        initial,
        ordering,
      },
    });
    return result;
  };

  return (
    <GameListForm title="메타크리틱 90" name={name} callGameList={getGamesMetacritic} />
  );
};

export default MetacriticGames;
