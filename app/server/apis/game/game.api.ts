import express from 'express';
import {
  convertGameApiFormatToRegular,
  getGameFromApi,
} from 'server/services/game.service/gameApiInit.service';
import {
  getGameRegularFromDb,
  getSimilarGamesFromDb,
  insertGameIntoDb,
  insertSimilarGamesIntoDb,
  updateGameDb,
} from 'server/services/game.service/gameDbInit.service';
import {
  Game,
  GameApiFormat,
} from 'server/model/game';
import {
  ONLY_SIMPLE_GAME_DATA,
  NO_GAME_DATA,
} from 'server/constants';

const gameApi = express.Router();

const instanceOfGame = (object: any): object is Game => 'similarGames' in object

gameApi.get('/', async (req, res) => {
  const { id }: { id?: number } = req.query;
  let game: Game | number = await getGameRegularFromDb(id);
  if (game === NO_GAME_DATA || game === ONLY_SIMPLE_GAME_DATA) {
    const state: number = game;
    const gameApiFormat: GameApiFormat = await getGameFromApi(id);
    game = await convertGameApiFormatToRegular(gameApiFormat);
    if (state === NO_GAME_DATA) {
      await insertGameIntoDb(game);
    } else {
      await updateGameDb(game);
    }
    await insertSimilarGamesIntoDb(id, gameApiFormat.similar_games);
  }
  if (instanceOfGame(game)) {
    game.similarGames = await getSimilarGamesFromDb(id);
  }
  // console.log(game);
  res.send(game);
});

export default gameApi;
