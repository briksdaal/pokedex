import express from 'express';
import {
  getAllPokemon,
  createPokemon,
  getSpecificPokemon,
  updateSpecificPokemon,
  deleteSpecificPokemon
} from '../controllers/pokemonController.js';

const pokemonRouter = express.Router();

pokemonRouter.get('/', getAllPokemon);

pokemonRouter.post('/', createPokemon);

pokemonRouter.get('/:id', getSpecificPokemon);

pokemonRouter.put('/:id', updateSpecificPokemon);

pokemonRouter.delete('/:id', deleteSpecificPokemon);

export default pokemonRouter;
