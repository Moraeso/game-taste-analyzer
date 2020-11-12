import express from 'express';
import callGameApi from 'server/utils/callGameApi';
import { getSimpleGame } from 'server/services/game.service/game.service';
import { page, setPage } from 'server/apis/games/page';

const gamesLast30Api = express.Router();

gamesLast30Api.get('/', async (req, res) => {
  const { ordering, initial }: { ordering?: string; initial?: string } = req.query;
  let dateOption = '';
  if (initial === 'true') {
    setPage(1);
  }
  const curDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(curDate.getMonth() - 1);
  dateOption = `dates=${lastMonthDate.toISOString().slice(0, 10)},${curDate.toISOString().slice(0, 10)}&`;

  const games = await callGameApi(`/games?${dateOption}ordering=${ordering}&page=${page}`);
  const ret = games.results.map((v) => getSimpleGame(v));
  setPage(page + 1);
  res.send(ret);
});

export default gamesLast30Api;
