import express from 'express';
import { getGamesOrderByRating } from 'server/services/game.service/games.service';

const gamesApi = express.Router();

gamesApi.get('/', async (req, res) => {
  const { ordering, limit }: { ordering?: string; limit?: number } = req.query;

  const games = await getGamesOrderByRating(ordering, limit);
  res.send(games);
});

export default gamesApi;
