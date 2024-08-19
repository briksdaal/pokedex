import express from 'express';
import logger from 'morgan';
import debug from 'debug';

const appDebugger = debug('pokedex:app');

const app = express();

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send("We're up and running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => appDebugger(`Listening on port ${PORT}`));
