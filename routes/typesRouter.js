import express from 'express';
import {
  getAllTypes,
  createType,
  getSpecificType,
  updateSpecificType,
  deleteSpecificType
} from '../controllers/typesController.js';

const typesRouter = express.Router();

typesRouter.get('/', getAllTypes);

typesRouter.post('/', createType);

typesRouter.get('/:id', getSpecificType);

typesRouter.put('/:id', updateSpecificType);

typesRouter.delete('/:id', deleteSpecificType);

export default typesRouter;
