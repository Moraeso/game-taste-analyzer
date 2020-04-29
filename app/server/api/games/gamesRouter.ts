import express from 'express';
import apicalypse from 'apicalypse';
import axios from 'axios';

const gamesRouter = express.Router();

// const requestOptions = {
//   queryMethod: 'url',
//   method: 'get',
//   baseURL: 'https://api-v3.igdb.com',
//   headers: {
//     'Accept': 'application/json',
//     'user-key': '147c4544cb254d68a3f41e3c994c04c8',
//   },
//   responseType: 'json',
//   timeout: 1000, // 1 second timeout
// };

gamesRouter.get('/', async (req, res) => {
  const games = await axios({
    method: 'post',
    url: 'https://api-v3.igdb.com/games',
    headers: {
      'user-key': '147c4544cb254d68a3f41e3c994c04c8',
      'Content-Type': 'text/plain',
    },
  });
  console.log(games.data);
  res.send(games.data);
});

export default gamesRouter;
