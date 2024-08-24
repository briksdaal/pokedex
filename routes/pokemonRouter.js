import express from 'express';
import {
  getAllPokemon,
  createPokemon,
  getSpecificPokemon,
  updateSpecificPokemon,
  deleteSpecificPokemon,
  getCreateNewPokemon,
  getUpdatePokemon,
  getDeletePokemon
} from '../controllers/pokemonController.js';

const pokemonRouter = express.Router();

pokemonRouter.get('/', getAllPokemon);

pokemonRouter.get('/new', getCreateNewPokemon);

pokemonRouter.post('/new', createPokemon);

pokemonRouter.get('/:id', getSpecificPokemon);

pokemonRouter.get('/:id/edit', getUpdatePokemon);

pokemonRouter.post('/:id/edit', updateSpecificPokemon);

pokemonRouter.get('/:id/delete', getDeletePokemon);

pokemonRouter.post('/:id/delete', deleteSpecificPokemon);

export default pokemonRouter;
