import express from 'express';
import callGameApi from 'server/utils/callGameApi';
import { getSimpleGame } from 'server/services/game.service/game.service';
import { page, setPage } from 'server/apis/games/page';

const gamesMetacriticApi = express.Router();

gamesMetacriticApi.get('/', async (req, res) => {
  const { ordering, initial }: { ordering?: string; initial?: string } = req.query;
  let dateOption = '';
  if (initial === 'true') {
    setPage(1);
  }
  if (ordering === '-released') {
    const datetime = new Date();
    dateOption = `dates=1900-01-01,${datetime.toISOString().slice(0, 10)}&`;
  }
  let games = [];
  let tmp = [];
  do {
    tmp = await callGameApi(`/games?${dateOption}ordering=${ordering}&page=${page}`);
    // @ts-ignore
    games = games.concat(tmp.results.filter((v) => v.metacritic >= 90));
    console.log(games.length);
    setPage(page + 1);
  } while (games.length < 15);
  const ret = games.map((v) => getSimpleGame(v));
  res.send(ret);
});

export default gamesMetacriticApi;
