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
import {
  imageLocalUploadAndValidation,
  handleFileUpload,
  handleFileUpdate,
  handleFileDelete
} from './helpers.js';
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
  imageLocalUploadAndValidation,
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
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
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      return next();
    }

    let pokemon = req.body;

    if (req.file) {
      pokemon = await handleFileUpload(pokemon, req, res);
      if (!pokemon) {
        return next();
      }
    }

    await createPokemonQuery(processEmptyStringsBody(req.body));

    return res.redirect('/pokemon');
  }),
  // on errors, render form again
  asyncHandler(async (req, res) => {
    const types = await getAllTypesQuery();
    const locals = {
      title: 'Create New Pokemon',
      types,
      pokemon: req.body,
      errors: res.locals.errors
    };
    return res.render('create_update_pokemon', locals);
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
  imageLocalUploadAndValidation,
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
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
  body('remove-image').trim().escape(),
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

    res.locals.id = id;
    res.locals.imagePath = queryRes[0].image;
    res.locals.imagePublicId = queryRes[0].image_public_id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      return next();
    }

    let pokemon = processEmptyStringsBody(req.body);

    if (req.file || req.body?.['remove-image']) {
      pokemon = await handleFileUpdate(pokemon, req, res);
      if (!pokemon) {
        return next();
      }
    }

    await updatePokemonQuery(pokemon, id);
    return res.redirect(`/pokemon/${id}`);
  }),
  // on errors, render form again
  asyncHandler(async (req, res) => {
    const types = await getAllTypesQuery();
    const locals = {
      title: 'Update Pokemon',
      types,
      pokemon: { ...req.body, image: res.locals?.imagePath },
      id: res.locals.id,
      errors: res.locals.errors
    };
    return res.render('create_update_pokemon', locals);
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

    res.locals.id = id;
    res.locals.name = queryRes[0].name;
    const imagePublicId = queryRes[0].image_public_id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      return next();
    }

    if (imagePublicId) {
      const deleteResult = await handleFileDelete(imagePublicId, res);
      if (!deleteResult) {
        return next();
      }
    }

    await deletePokemonByIdQuery(id);
    return res.redirect('/pokemon');
  }),
  // on errors, render form again
  asyncHandler(async (req, res) => {
    const locals = {
      title: `Delete Pokemon "${res.locals.name}"`,
      id: res.locals.id,
      name: res.locals.name,
      errors: res.locals.errors
    };

    return res.render('delete_pokemon', locals);
  })
];
