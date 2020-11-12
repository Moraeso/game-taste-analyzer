import React from 'react';
import axios from 'axios';
import { API_URL } from 'shared/constants';
import APIS from 'shared/constants/APIS';
import { useLocation } from 'react-router';
import GameListForm from 'web/components/Games/GameListForm';


const AllGames = ({ name }: { name: string }) => {
  const location = useLocation();

  const getAllGames = async (initial) => {
    const ordering = location.search.split('=')[1] || '-added';
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.gamesAll}`,
      params: {
        initial,
        ordering,
      },
    });
    return result;
  };

  return (
    <GameListForm title="모든 게임" name={name} callGameList={getAllGames} />
  );
};

export default AllGames;
