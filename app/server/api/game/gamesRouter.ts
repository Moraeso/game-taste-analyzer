import express from 'express';
import {
  convertGameApiFormatToRegular,
  getGameFromApi,
} from 'server/service/gameInitApiService';
import {
  getGameRegularFromDb,
  getSimilarGameFromDb,
  insertGameIntoDb,
  insertSimilarGamesIntoDb,
} from 'server/service/gameInitDbService';
import {
  Game,
  GameApiFormat,
} from 'shared/interfaces/game';

const gamesRouter = express.Router();

gamesRouter.get('/', async (req, res) => {
  const { id }: { id?: number } = req.query;
  let game: Game = await getGameRegularFromDb(id);
  if (!game) {
    const gameApiFormat: GameApiFormat = await getGameFromApi(id);
    game = await convertGameApiFormatToRegular(gameApiFormat);
    await insertGameIntoDb(game);
    await insertSimilarGamesIntoDb(id, gameApiFormat.similar_games);
  }
  game.similarGame = await getSimilarGameFromDb(id);
  // console.log(game);
  res.send(game);
});

export default gamesRouter;
