import express from 'express';
import {
  getAllTypes,
  getCreateNewType,
  getUpdateType,
  createType,
  getSpecificType,
  updateSpecificType,
  getDeleteType,
  deleteSpecificType
} from '../controllers/typesController.js';

const typesRouter = express.Router();

typesRouter.get('/', getAllTypes);

typesRouter.get('/new', getCreateNewType);

typesRouter.post('/new', createType);

typesRouter.get('/:id', getSpecificType);

typesRouter.get('/:id/edit', getUpdateType);

typesRouter.post('/:id/edit', updateSpecificType);

typesRouter.get('/:id/delete', getDeleteType);

typesRouter.post('/:id/delete', deleteSpecificType);

export default typesRouter;
