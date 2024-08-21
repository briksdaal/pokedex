import asyncHandler from 'express-async-handler';
import { getAllPokemonQuery, getPokemonByIdQuery } from '../db/queries.js';

export const getAllPokemon = [
  asyncHandler(async (req, res) => {
    const pokemon = await getAllPokemonQuery();
    const locals = { title: 'Pokemon', pokemon };
    res.render('pokemon_list', locals);
  })
];

export const createPokemon = [
  asyncHandler((req, res) => {
    res.send(`Create new pokemon`);
  })
];

export const getSpecificPokemon = [
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pokemon = await getPokemonByIdQuery(id);
    console.log(pokemon);
    const locals = { title: pokemon.name, pokemon };
    res.render('single_pokemon', locals);
  })
];

export const updateSpecificPokemon = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Update pokemon ${id} details`);
  })
];

export const deleteSpecificPokemon = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Delete pokemon ${id} details`);
  })
];
