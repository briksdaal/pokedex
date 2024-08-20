import asyncHandler from 'express-async-handler';

export const getAllTrainers = [
  asyncHandler((req, res) => {
    res.send('Get all trainers');
  })
];

export const createTrainer = [
  asyncHandler((req, res) => {
    res.send(`Create new trainer`);
  })
];

export const getSpecificTrainer = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Get trainer ${id} details`);
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
