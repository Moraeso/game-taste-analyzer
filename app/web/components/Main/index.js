import React, { useEffect } from 'react';
import { API_URL } from 'shared/API_INFO';
import APIS from 'shared/APIS';
import axios from 'axios';
import apicalypse from 'apicalypse';


const requestOptions = {
  queryMethod: 'url',
  method: 'post',
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com',
  headers: {
    'user-key': '147c4544cb254d68a3f41e3c994c04c8',
    'Content-Type': 'text/plain',
  },
  responseType: 'json',
};

const Main = () => {
  // const getGames = async () => {
  //   return apicalypse(requestOptions)
  //     .request('/games');
  // };

  // const getGames = async () => {
  //   return axios({
  //     method: 'get',
  //     url: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games',
  //     headers: {
  //       'user-key': '147c4544cb254d68a3f41e3c994c04c8',
  //       'Content-Type' : 'text/plain',
  //     },
  //   });
  // };

  const getGames = async () => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.games}`,
    });
    return result;
  };

  useEffect(() => {
    getGames()
      .then((res) => console.log(res.data));
  }, []);
  return (
    <div>
      Main Page
    </div>
  );
};

export default Main;
