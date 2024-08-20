import asyncHandler from 'express-async-handler';

export const getAllPokemon = [
  asyncHandler((req, res) => {
    res.send('Get all pokemons');
  })
];

export const createPokemon = [
  asyncHandler((req, res) => {
    res.send(`Create new pokemon`);
  })
];

export const getSpecificPokemon = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Get pokemon ${id} details`);
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
