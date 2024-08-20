import express from 'express';
import {
  getAllTrainers,
  createTrainer,
  getSpecificTrainer,
  updateSpecificTrainer,
  deleteSpecificTrainer
} from '../controllers/trainersController.js';

const trainersRouter = express.Router();

trainersRouter.get('/', getAllTrainers);

trainersRouter.post('/', createTrainer);

trainersRouter.get('/:id', getSpecificTrainer);

trainersRouter.put('/:id', updateSpecificTrainer);

trainersRouter.delete('/:id', deleteSpecificTrainer);

export default trainersRouter;
