import React from 'react';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import { useLocation } from 'react-router';
import GameListForm from 'web/components/Games/GameListForm';


const ThisYearGames = ({ name }: { name: string }) => {
  const location = useLocation();

  const getGamesThisYear = async (initial) => {
    const ordering = location.search.split('=')[1] || '-added';
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.gamesThisYear}`,
      params: {
        initial,
        ordering,
      },
    });
    return result;
  };

  return (
    <GameListForm title="올해의 게임" name={name} callGameList={getGamesThisYear} />
  );
};

export default ThisYearGames;
