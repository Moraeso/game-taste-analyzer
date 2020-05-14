import express from 'express';
import GameDataService from 'server/service/gameDataService';

const gamesRouter = express.Router();

gamesRouter.get('/', async (req, res) => {
  const { id } = req.query;
  const original = await GameDataService.getGameData(id);
  // console.log(original);

  const result = await GameDataService.getRegularGameData(original);
  console.log(result);

  res.send(result);
});

export default gamesRouter;
