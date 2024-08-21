import express from 'express';
import {
  getAllTypes,
  getCreateNewType,
  getUpdateType,
  createType,
  getSpecificType,
  updateSpecificType,
  deleteSpecificType
} from '../controllers/typesController.js';

const typesRouter = express.Router();

typesRouter.get('/', getAllTypes);

typesRouter.get('/new', getCreateNewType);

typesRouter.post('/', createType);

typesRouter.get('/:id', getSpecificType);

typesRouter.get('/:id/edit', getUpdateType);

typesRouter.post('/:id', updateSpecificType);

typesRouter.delete('/:id', deleteSpecificType);

export default typesRouter;
