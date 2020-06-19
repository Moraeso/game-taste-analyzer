import express from 'express';
import { getGameFromApi } from 'server/services/game.service/game.service';
import { Game } from 'shared/model/game';

const gameApi = express.Router();

gameApi.get('/', async (req, res) => {
  const { id }: { id?: number } = req.query;
  const game: Game = await getGameFromApi(id);
  res.send(game);
});

export default gameApi;
