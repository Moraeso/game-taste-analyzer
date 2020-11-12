import express from 'express';
import callGameApi from 'server/utils/callGameApi';
import {
  getSimpleGame,
} from 'server/services/game.service/game.service';
import { page, setPage } from 'server/apis/games/page';

const gamesAllApi = express.Router();

gamesAllApi.get('/', async (req, res) => {
  const { ordering, initial }: { ordering?: string; initial?: string } = req.query;
  let dateOption = '';
  if (initial === 'true') {
    setPage(1);
  }
  if (ordering === '-released') {
    const datetime = new Date();
    dateOption = `dates=1900-01-01,${datetime.toISOString().slice(0, 10)}&`;
  }
  const games = await callGameApi(`/games?${dateOption}ordering=${ordering}&page=${page}`);
  const ret = games.results.map((v) => getSimpleGame(v));

  setPage(page + 1);
  res.send(ret);
});

export default gamesAllApi;
