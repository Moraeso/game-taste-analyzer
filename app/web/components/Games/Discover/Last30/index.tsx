import React from 'react';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import { useLocation } from 'react-router';
import GameListForm from 'web/components/Games/GameListForm';


const Last30Games = ({ name }: { name: string }) => {
  const location = useLocation();

  console.log('in')
  const getGamesLast30Games = async (initial) => {
    const ordering = location.search.split('=')[1] || '-added';
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.gamesLast30}`,
      params: {
        initial,
        ordering,
      },
    });
    return result;
  };

  return (
    <GameListForm title="지난 30일" name={name} callGameList={getGamesLast30Games} />
  );
};

export default Last30Games;
