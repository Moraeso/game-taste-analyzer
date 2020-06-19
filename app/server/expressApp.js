import express from 'express';
import gameApi from 'server/apis/game/game.api';
import gamesApi from 'server/apis/game/games.api';
import applyReactSupport from 'server/applyReactSupport';
import { APIS } from 'shared/constants';

const expressApp = () => {
  // const startedDate = new Date();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(APIS.game, gameApi);
  app.use(APIS.games, gamesApi);
  // app.get('/health', (req, res) => {
  //   res.json({
  //     status: 'UP',
  //     startedDate: moment(startedDate).tz('Asia/Seoul').format('YYYY/MM/DD HH:mm:ss'),
  //   });
  // });
  // app.get('/api/hello-world', (req, res) => {
  //   res.json({
  //     message: 'server working now!',
  //   });
  // });

  // 맨 아래 있어야 함
  applyReactSupport(app);
  return app;
};

export default expressApp;
