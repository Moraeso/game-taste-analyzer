/* eslint-disable global-require */
import compression from 'compression';
import express from 'express';
import fileSystem from 'fs';
import path, { resolve } from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    publicPath,
    stats: 'minimal',
  });
}

const loadIndexHtml = async (fs, clientHomePath) => {
  try {
    return fs.readFileSync(path.join(clientHomePath, 'index.html'), 'utf8');
  } catch (e) {
    return new Promise((r, j) => {
      setTimeout(() => {
        try {
          r(fs.readFileSync(path.join(clientHomePath, 'index.html'), 'utf8'));
        } catch (ee) {
          j(ee);
        }
      }, 500);
    });
  }
};


const applyReactSupport = (app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use('/static', express.static(resolve(process.cwd(), 'build/web'), {
      cacheControl: true,
      maxAge: '1y',
    }));
    let indexHtml;
    app.use(async (req, res) => {
      if (!indexHtml) {
        indexHtml = await loadIndexHtml(fileSystem, resolve(process.cwd(), 'build/web'));
      }

      res.send(indexHtml);
    });
  } else {
    // dev only now
    const webpackConfig = require(`../../env/webpack/webpack.web.dev`);

    const compiler = webpack(webpackConfig);
    const webpackMiddleware = createWebpackMiddleware(compiler, '/static');

    const hotLoadMiddleware = webpackHotMiddleware(compiler);

    app.use(webpackMiddleware);
    app.use(hotLoadMiddleware);
    let indexHtml;
    app.use(async (req, res) => {
      if (!indexHtml) {
        indexHtml = await loadIndexHtml(webpackMiddleware.fileSystem, resolve(process.cwd(), 'build/web'));
      }
      res.send(indexHtml);
    });
  }
};


export default applyReactSupport;
