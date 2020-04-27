import express from 'express';
import moment from 'moment';
import applyReactSupport from 'server/applyReactSupport';


const expressApp = () => {
  const startedDate = new Date();
  const app = express();
  app.get('/health', (req, res) => {
    res.json({
      status: 'UP',
      startedDate: moment(startedDate).tz('Asia/Seoul').format('YYYY/MM/DD HH:mm:ss'),
    });
  });
  app.get('/api/hello-world', (req, res) => {
    res.json({
      message: 'hello!!',
    });
  });

  // 맨 아래 있어야 함
  applyReactSupport(app);
  return app;
};

export default expressApp;
