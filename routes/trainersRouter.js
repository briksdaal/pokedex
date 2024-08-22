import express from 'express';
import {
  getAllTrainers,
  createTrainer,
  getSpecificTrainer,
  updateSpecificTrainer,
  deleteSpecificTrainer,
  getCreateNewTrainer,
  getUpdateTrainer
} from '../controllers/trainersController.js';

const trainersRouter = express.Router();

trainersRouter.get('/', getAllTrainers);

trainersRouter.get('/new', getCreateNewTrainer);

trainersRouter.post('/', createTrainer);

trainersRouter.get('/:id', getSpecificTrainer);

trainersRouter.get('/:id/edit', getUpdateTrainer);

trainersRouter.post('/:id', updateSpecificTrainer);

trainersRouter.delete('/:id', deleteSpecificTrainer);

export default trainersRouter;
