/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const compression = require('compression');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (pkg.dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '');
      res.sendFile(path.join(process.cwd(), pkg.dllPlugin.path, filename));
    });
  }

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

};

function editorStateToString(editorState) {
  let text = '';

  for (let i = 0; i < editorState.count(); i += 1) {
    text += editorState.get(i).get('text');
    if (i > 0) {
      text += '\n';
    }
  }
  return text;
}

function isEditorStateEmpty(editorState) {
  return (editorState.count() === 1 && editorState.first().get('text').length === 0);
}

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const fs = require('fs');
  const cheerio = require('cheerio');
  const fetch = require('node-fetch');
  const { fromJS } = require('immutable');

  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('/sw.js', (req, res) => {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(path.resolve(__dirname, 'sw.js'));
  });

  app.get('*', (req, res) => {
    const questionRegex = new RegExp('\/question\/.*');
    const answerRegex = new RegExp('\/answer\/.*');
    const refererRegex = new RegExp('https:\/\/flova\.kr.*');

    if ((questionRegex.test(req.originalUrl) || answerRegex.test(req.originalUrl)) && !refererRegex.test(req.headers.referer)) {
      fs.readFile(outputPath.concat('/index.html'), 'utf8', (err, html) => {
        if (err) {
          throw err;
        }
        let params;
        let url;
        if (questionRegex.test(req.originalUrl)) {
          params = req.originalUrl.replace('/question/', '');
          url = `${process.env.API_ROOT}/contents/questions/${params}/meta_tag/`;
        } else {
          params = req.originalUrl.replace('/answer/', '');
          url = `${process.env.API_ROOT}/contents/answers/${params}/meta_tag/`;
        }

        fetch(url)
          .then((tagRes) => {
            return new Promise((resolve, reject) => {
              if (tagRes.status >= 200 && tagRes.status < 300) {
                resolve(tagRes.json());
              }
              reject();
            });
          })
          .then((body) => {
            const loadedHtml = cheerio.load(html);

            const metaUrl = `<meta property="og:url" content="https://flova.kr${req.originalUrl}">`;
            loadedHtml('.url').replaceWith(loadedHtml(metaUrl));

            const metaTitle = `<meta property="og:title" content="${body.title}" class="title">`;
            loadedHtml('.title').replaceWith(loadedHtml(metaTitle));

            const editorState = fromJS(JSON.parse(body.description));

            if (!isEditorStateEmpty(editorState)) {
              let metaDescription;
              if (questionRegex.test(req.originalUrl)) {
                metaDescription = `<meta property="og:description" content="${editorStateToString(editorState)}" class="description">`;
              } else {
                metaDescription = `<meta property="og:description" content="${body.writer}님의 답변: ${editorStateToString(editorState)}" class="description">`;
              }
              loadedHtml('.description').replaceWith(loadedHtml(metaDescription));
            } else {
              loadedHtml('.description').remove();
            }

            if (body.image) {
              const metaImage = `<meta property="og:image" content="${body.image}" class="image">`;
              loadedHtml('.image').replaceWith(loadedHtml(metaImage));
            }

            res.set('Content-Type', 'text/html');
            res.send(new Buffer(String(loadedHtml.html())));
          })
          .catch(() => res.sendFile(path.resolve(outputPath, 'index.html')));
      });
    } else {
      res.sendFile(path.resolve(outputPath, 'index.html'));
    }
  });
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
