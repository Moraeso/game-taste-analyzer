import express from 'express';
import {
  convertSimpleGameApiFormatToRegular,
  getSimpleGameFromApi,
  getSimpleGameRegularFromDb,
  insertSimpleGameIntoDb,
} from 'server/services/game.service/simpleGameInit.service';
import {
  SimpleGame,
  SimpleGameApiFormat,
} from 'server/model/game';

const simpleGameApi = express.Router();

simpleGameApi.get('/', async (req, res) => {
  const { id }: { id?: number } = req.query;
  let simpleGame: SimpleGame = await getSimpleGameRegularFromDb(id);
  if (!simpleGame) {
    const gameApiFormat: SimpleGameApiFormat = await getSimpleGameFromApi(id);
    simpleGame = await convertSimpleGameApiFormatToRegular(gameApiFormat);
    await insertSimpleGameIntoDb(simpleGame);
  }
  // console.log(simpleGame);
  res.send(simpleGame);
});

export default simpleGameApi;
