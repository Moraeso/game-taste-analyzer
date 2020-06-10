import express from 'express';
import {
  getGameRegularFromDb,
} from 'server/services/game.service/gameDbInit.service';
import {
  Game,
} from 'server/model/game';
import {
  ONLY_SIMPLE_GAME_DATA,
} from 'server/constants';

const gameCollect = express.Router();

gameCollect.get('/', async (req, res) => {
  const { id }: { id?: number } = req.query;
  const game: Game | number = await getGameRegularFromDb(id);
  if (game === ONLY_SIMPLE_GAME_DATA) {
    console.log(false);
    res.send(false);
  }
  console.log(true);
  res.send(true);
});

export default gameCollect;
