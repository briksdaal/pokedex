import asyncHandler from 'express-async-handler';
import { getAllTrainersQuery, getTrainerByIdQuery } from '../db/queries.js';

export const getAllTrainers = [
  asyncHandler(async (req, res) => {
    const trainers = await getAllTrainersQuery();
    const locals = { title: 'Trainers', trainers };
    res.render('trainers_list', locals);
  })
];

export const createTrainer = [
  asyncHandler((req, res) => {
    res.send(`Create new trainer`);
  })
];

export const getSpecificTrainer = [
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const queryRes = await getTrainerByIdQuery(id);

    const trainer = {
      id: queryRes[0].trainer_id,
      name: queryRes[0].trainer_name,
      image: queryRes[0].trainer_image
    };

    const locals = {
      title: `Trainer ${trainer.name}`,
      trainer,
      pokemon: queryRes
    };
    res.render('single_trainer', locals);
  })
];

export const updateSpecificTrainer = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Update trainer ${id} details`);
  })
];

export const deleteSpecificTrainer = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Delete trainer ${id} details`);
  })
];
