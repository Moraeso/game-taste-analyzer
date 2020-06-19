import express from 'express';
import callGameApi from 'server/utils/callGameApi';
import {
  getSimpleGame,
} from 'server/services/game.service/game.service';

const gamesApi = express.Router();

gamesApi.get('/', async (req, res) => {
  const { ordering, page }: { ordering?: string; page?: number } = req.query;

  const games = await callGameApi(`/games?ordering=${ordering}&page=${page}`);
  const ret = games.results.map((v) => getSimpleGame(v));
  res.send(ret);
});

export default gamesApi;
