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
  deleteTrainerByIdQuery
} from '../db/queries.js';
import createHttpError from 'http-errors';
import { body, validationResult } from 'express-validator';

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
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
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
        errors: errors.array()
      };

      return res.render('create_update_trainer', locals);
    }

    const trainer = { name: req.body.name };
    const pokemon = req.body.pokemon;

    await createTrainerAndSetPokemon(trainer, pokemon);

    res.redirect(`/trainers`);
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
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const pokemon = await getAllPokemonQuery();
      const locals = {
        title: 'Update Trainer',
        pokemon,
        trainer: {
          name: req.body.name,
          caughtPokemon: req.body.pokemon.map((p) => ({
            pokemon_id: Number(p)
          }))
        },
        id,
        errors: errors.array()
      };

      return res.render('create_update_trainer', locals);
    }

    const pairs = req.body.pokemon.map((p) => [Number(id), Number(p)]);

    await transactionWrapper([
      {
        query: deletePokemonTrainersByTrainerIdQuery,
        args: [id]
      },
      {
        query: createPokemonTrainersQuery,
        args: [pairs]
      }
    ]);

    res.redirect(`/trainers/${id}`);
  })
];

export const getDeleteTrainer = [
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const queryRes = await getSingleTrainerQuery(id);
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
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await deleteTrainerByIdQuery(id);
    res.redirect('/trainers');
  })
];
