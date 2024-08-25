import asyncHandler from 'express-async-handler';
import {
  getAllPokemonQuery,
  getPokemonByIdQuery,
  getAllTypesQuery,
  createPokemonQuery,
  updatePokemonQuery,
  getSinglePokemonQuery,
  getSinglePokemonByNameQuery,
  getSinglePokemonByIndexQuery,
  deletePokemonByIdQuery
} from '../db/queries.js';
import { body, validationResult, checkExact } from 'express-validator';
import createHttpError from 'http-errors';
import { processEmptyStringsBody } from './helpers.js';

export const getAllPokemon = [
  asyncHandler(async (req, res) => {
    const pokemon = await getAllPokemonQuery();
    const locals = { title: 'Pokemon', pokemon };
    res.render('pokemon_list', locals);
  })
];

export const getCreateNewPokemon = [
  asyncHandler(async (req, res) => {
    const types = await getAllTypesQuery();
    const locals = { title: 'Create New Pokemon', types };
    res.render('create_update_pokemon', locals);
  })
];

export const getUpdatePokemon = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getSinglePokemonQuery(id);
    const types = await getAllTypesQuery();

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const pokemon = queryRes[0];

    const locals = { title: 'Update Pokemon', pokemon, id, types };
    res.render('create_update_pokemon', locals);
  })
];

export const createPokemon = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .isAlpha()
    .withMessage('Name must contain only letters and no spaces')
    .custom(async (value) => {
      const { rows } = await getSinglePokemonByNameQuery(value);

      if (rows.length) {
        throw new Error('Pokemon name must be unique');
      }
    })
    .escape(),
  body('index')
    .trim()
    .isNumeric()
    .withMessage('National index # must be a number')
    .custom(async (value) => {
      if (!value) {
        return;
      }

      const { rows } = await getSinglePokemonByIndexQuery(value);

      if (rows.length) {
        throw new Error('National index # must be unique');
      }
    })
    .escape(),
  body('entry').optional().trim().escape(),
  body('type1').optional().trim().escape(),
  body('type2')
    .optional()
    .custom((value, { req }) => {
      return (!value && !req.body.type1) || value !== req.body.type1;
    })
    .withMessage('Type 1 and type 2 must be different')
    .trim()
    .escape(),
  checkExact([], { message: 'Unknown fields in request' }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const types = await getAllTypesQuery();
      const locals = {
        title: 'Create New Pokemon',
        types,
        pokemon: req.body,
        errors: errors.array()
      };
      return res.render('create_update_pokemon', locals);
    }

    await createPokemonQuery(processEmptyStringsBody(req.body));
    return res.redirect('/pokemon');
  })
];

export const getSpecificPokemon = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getPokemonByIdQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const pokemon = queryRes[0];

    const locals = { title: pokemon.name, pokemon };
    res.render('single_pokemon', locals);
  })
];

export const updateSpecificPokemon = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .isAlpha()
    .withMessage('Name must contain only letters and no spaces')
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const { rows } = await getSinglePokemonByNameQuery(value);

      if (rows.length && rows[0].id !== Number(id)) {
        throw new Error('Pokemon name must be unique');
      }
    })
    .escape(),
  body('index')
    .trim()
    .isNumeric()
    .withMessage('National index # must be a number')
    .custom(async (value, { req }) => {
      if (!value) {
        return;
      }

      const { id } = req.params;
      const { rows } = await getSinglePokemonByIndexQuery(value);

      if (rows.length && rows[0].id !== Number(id)) {
        throw new Error('Pokedex index # must be unique');
      }
    })
    .escape(),
  body('entry').optional().trim().escape(),
  body('type1').optional().trim().escape(),
  body('type2')
    .optional()
    .custom((value, { req }) => {
      return (!value && !req.body.type1) || value !== req.body.type1;
    })
    .withMessage('Type 1 and type 2 must be different')
    .trim()
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .custom((value) => {
      return value === process.env.ADMIN_PW;
    })
    .withMessage('Password is incorrect')
    .escape(),
  checkExact([], { message: 'Unknown fields in request' }),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getSinglePokemonQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const types = await getAllTypesQuery();
      const locals = {
        title: 'Update Pokemon',
        types,
        pokemon: req.body,
        id,
        errors: errors.array()
      };
      return res.render('create_update_pokemon', locals);
    }

    await updatePokemonQuery(processEmptyStringsBody(req.body), id);
    return res.redirect(`/pokemon/${id}`);
  })
];

export const getDeletePokemon = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getSinglePokemonQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const pokemonName = queryRes[0].name;

    const locals = {
      title: `Delete Pokemon "${pokemonName}"`,
      id,
      name: pokemonName
    };

    res.render('delete_pokemon', locals);
  })
];

export const deleteSpecificPokemon = [
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .custom((value) => {
      return value === process.env.ADMIN_PW;
    })
    .withMessage('Password is incorrect')
    .escape(),
  checkExact([], { message: 'Unknown fields in request' }),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getSinglePokemonQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const queryRes = await getSinglePokemonQuery(id);
      const name = queryRes[0].name;

      const locals = {
        title: `Delete Pokemon "${name}"`,
        id,
        name,
        errors: errors.array()
      };

      return res.render('delete_pokemon', locals);
    }

    await deletePokemonByIdQuery(id);
    res.redirect('/pokemon');
  })
];
