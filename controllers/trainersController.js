import asyncHandler from 'express-async-handler';
import {
  getAllTrainersQuery,
  getTrainerByIdQuery,
  getAllPokemonQuery,
  createPokemonTrainersQuery,
  getSingleTrainerQuery,
  deletePokemonTrainersByTrainerIdQuery,
  getSingleTrainerByNameQuery,
  transactionWrapper,
  createTrainerAndSetPokemon,
  deleteTrainerByIdQuery,
  updateTrainerQuery
} from '../db/queries.js';
import {
  imageLocalUploadAndValidation,
  handleFileUpload,
  handleFileUpdate,
  handleFileDelete
} from './helpers.js';
import createHttpError from 'http-errors';
import { body, checkExact, validationResult } from 'express-validator';

export const getAllTrainers = [
  asyncHandler(async (req, res) => {
    const trainers = await getAllTrainersQuery();
    const locals = { title: 'Trainers', trainers };
    res.render('trainers_list', locals);
  })
];

export const getCreateNewTrainer = [
  asyncHandler(async (req, res) => {
    const pokemon = await getAllPokemonQuery();
    const locals = { title: 'Create New Trainer', pokemon };
    res.render('create_update_trainer', locals);
  })
];

export const getUpdateTrainer = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const pokemon = await getAllPokemonQuery();
    const queryRes = await getSingleTrainerQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const trainer = {
      name: queryRes[0].name,
      image: queryRes[0].image,
      caughtPokemon: queryRes
        .map((p) => ({
          pokemon_id: p.pokemon_id
        }))
        .filter((p) => p.pokemon_id)
    };

    const locals = { title: 'Update Trainer', trainer, id, pokemon };
    res.render('create_update_trainer', locals);
  })
];

export const createTrainer = [
  imageLocalUploadAndValidation,
  (req, res, next) => {
    req.body.pokemon = Array.isArray(req.body.pokemon)
      ? req.body.pokemon.filter((p) => p)
      : [];
    next();
  },
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .custom(async (value) => {
      const { rows } = await getSingleTrainerByNameQuery(value);

      if (rows.length) {
        throw new Error('Trainer name must be unique');
      }
    })
    .escape(),
  body('pokemon.*').trim().escape(),
  checkExact([], { message: 'Unknown fields in request' }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      return next();
    }

    let trainer = { name: req.body.name };
    const pokemon = req.body.pokemon;

    if (req.file) {
      trainer = await handleFileUpload(trainer, req, res);
      if (!trainer) {
        return next();
      }
    }

    await createTrainerAndSetPokemon(trainer, pokemon);

    return res.redirect(`/trainers`);
  }),
  // on errors, render form again
  asyncHandler(async (req, res) => {
    const pokemon = await getAllPokemonQuery();
    const locals = {
      title: 'Create New Trainer',
      pokemon,
      trainer: {
        name: req.body.name,
        caughtPokemon: req.body.pokemon.map((p) => ({
          pokemon_id: Number(p)
        }))
      },
      errors: res.locals.errors
    };

    return res.render('create_update_trainer', locals);
  })
];

export const getSpecificTrainer = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getTrainerByIdQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const trainer = {
      id: queryRes[0].trainer_id,
      name: queryRes[0].trainer_name,
      image: queryRes[0].trainer_image
    };

    const pokemon = queryRes.filter((p) => p.id);

    const locals = {
      title: `Trainer ${trainer.name}`,
      trainer,
      pokemon: pokemon
    };

    res.render('single_trainer', locals);
  })
];

export const updateSpecificTrainer = [
  imageLocalUploadAndValidation,
  (req, res, next) => {
    req.body.pokemon = Array.isArray(req.body.pokemon)
      ? req.body.pokemon.filter((p) => p)
      : [];
    next();
  },
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const { rows } = await getSingleTrainerByNameQuery(value);

      if (rows.length && rows[0].id !== Number(id)) {
        throw new Error('Trainer name must be unique');
      }
    })
    .escape(),
  body('pokemon.*').trim().escape(),
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
    const queryRes = await getSingleTrainerQuery(id);

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

    let trainer = { name: req.body.name };
    const pairs = req.body.pokemon.map((p) => [Number(id), Number(p)]);

    if (req.file || req.body?.['remove-image']) {
      trainer = await handleFileUpdate(trainer, req, res);
      if (!trainer) {
        return next();
      }
    }

    await transactionWrapper([
      {
        query: updateTrainerQuery,
        args: [trainer, id]
      },
      {
        query: deletePokemonTrainersByTrainerIdQuery,
        args: [id]
      },
      {
        query: createPokemonTrainersQuery,
        args: [pairs]
      }
    ]);

    return res.redirect(`/trainers/${id}`);
  }),
  // on errors, render form again
  asyncHandler(async (req, res) => {
    const pokemon = await getAllPokemonQuery();

    const locals = {
      title: 'Update Trainer',
      pokemon,
      trainer: {
        name: req.body.name,
        image: res.locals?.imagePath,
        caughtPokemon: req.body.pokemon.map((p) => ({
          pokemon_id: Number(p)
        }))
      },
      id: res.locals.id,
      errors: res.locals.errors
    };

    return res.render('create_update_trainer', locals);
  })
];

export const getDeleteTrainer = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getSingleTrainerQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const trainerName = queryRes[0].name;

    const locals = {
      title: `Delete Trainer "${trainerName}"`,
      id,
      name: trainerName
    };

    res.render('delete_trainer', locals);
  })
];

export const deleteSpecificTrainer = [
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
    const queryRes = await getSingleTrainerQuery(id);

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

    await deleteTrainerByIdQuery(id);
    return res.redirect('/trainers');
  }),
  // on errors, render form again
  asyncHandler(async (req, res) => {
    const locals = {
      title: `Delete Trainer "${res.locals.name}"`,
      id: res.locals.id,
      name: res.locals.name,
      errors: res.locals.errors
    };

    return res.render('delete_trainer', locals);
  })
];
