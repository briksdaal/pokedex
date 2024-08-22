import express from 'express';
import {
  getAllPokemon,
  createPokemon,
  getSpecificPokemon,
  updateSpecificPokemon,
  deleteSpecificPokemon,
  getCreateNewPokemon,
  getUpdatePokemon
} from '../controllers/pokemonController.js';

const pokemonRouter = express.Router();

pokemonRouter.get('/', getAllPokemon);

pokemonRouter.get('/new', getCreateNewPokemon);

pokemonRouter.post('/new', createPokemon);

pokemonRouter.get('/:id', getSpecificPokemon);

pokemonRouter.get('/:id/edit', getUpdatePokemon);

pokemonRouter.post('/:id/edit', updateSpecificPokemon);

pokemonRouter.delete('/:id', deleteSpecificPokemon);

export default pokemonRouter;
