import express from 'express';
import logger from 'morgan';
import debug from 'debug';
import createHttpError from 'http-errors';
import path from 'path';
import { fileURLToPath } from 'url';
import expressEjsLayouts from 'express-ejs-layouts';
import 'dotenv/config';

import indexRouter from './routes/indexRouter.js';
import typesRouter from './routes/typesRouter.js';
import pokemonRouter from './routes/pokemonRouter.js';
import trainersRouter from './routes/trainersRouter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const appDebugger = debug('pokedex:app');

const app = express();

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

app.use('/', indexRouter);
app.use('/types', typesRouter);
app.use('/pokemon', pokemonRouter);
app.use('/trainers', trainersRouter);

app.use((req, res, next) => {
  next(createHttpError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ errors: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => appDebugger(`Listening on port ${PORT}`));
