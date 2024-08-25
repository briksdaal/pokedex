import asyncHandler from 'express-async-handler';
import { body, checkExact, validationResult } from 'express-validator';
import {
  getAllTypesQuery,
  getSingleTypeQuery,
  getSingleTypeByTypeQuery,
  getTypeByIdAndPokemonQuery,
  createTypeQuery,
  updateTypeQuery,
  deleteTypeByIdQuery
} from '../db/queries.js';
import createHttpError from 'http-errors';
import 'dotenv/config';

export const getAllTypes = [
  asyncHandler(async (req, res) => {
    const types = await getAllTypesQuery();
    const locals = { title: 'Types', types };
    res.render('types_list', locals);
  })
];

export const getCreateNewType = [
  asyncHandler((req, res) => {
    const locals = { title: 'Create New Type' };
    res.render('create_update_type', locals);
  })
];

export const getUpdateType = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getSingleTypeQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const type = queryRes[0];

    const locals = { title: 'Update Type', type, id };
    res.render('create_update_type', locals);
  })
];

export const createType = [
  body('type')
    .trim()
    .notEmpty()
    .withMessage('Type must not be empty')
    .isAlpha()
    .withMessage('Type must contain only letters and no spaces')
    .custom(async (value) => {
      const { rows } = await getSingleTypeByTypeQuery(value);
      if (rows.length) {
        throw new Error('Types must be unique');
      }
    })
    .escape(),
  body('color')
    .trim()
    .isHexColor()
    .withMessage('Color must be hexadecimal value')
    .escape(),
  checkExact([], { message: 'Unknown fields in request' }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    req.body.color = req.body.color && req.body.color.replace('#', '');

    if (!errors.isEmpty()) {
      const locals = {
        title: 'Create New Type',
        type: req.body,
        errors: errors.array()
      };
      return res.render('create_update_type', locals);
    }
    await createTypeQuery(req.body);
    return res.redirect('/types');
  })
];

export const getSpecificType = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getTypeByIdAndPokemonQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const type = {
      id: queryRes[0].type_id,
      type: queryRes[0].type,
      color: queryRes[0].color
    };

    const pokemon = queryRes.filter((p) => p.id);

    const locals = { title: `${type.type} Type`, type, pokemon };
    res.render('single_type', locals);
  })
];

export const updateSpecificType = [
  body('type')
    .trim()
    .notEmpty()
    .withMessage('Type must not be empty')
    .isAlpha()
    .withMessage('Type must contain only letters and no spaces')
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const { rows } = await getSingleTypeByTypeQuery(value);

      if (rows.length && rows[0].id !== Number(id)) {
        throw new Error('Types must be unique');
      }
    })
    .escape(),
  body('color')
    .trim()
    .isHexColor()
    .withMessage('Color must be hexadecimal value')
    .escape(),
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
    const queryRes = await getSingleTypeQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const errors = validationResult(req);

    req.body.color = req.body.color && req.body.color.replace('#', '');

    if (!errors.isEmpty()) {
      const locals = {
        title: 'Update Type',
        type: req.body,
        id,
        errors: errors.array()
      };
      return res.render('create_update_type', locals);
    }

    await updateTypeQuery(req.body, id);
    return res.redirect(`/types/${id}`);
  })
];

export const getDeleteType = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const queryRes = await getSingleTypeQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const typeName = queryRes[0].type;

    const locals = { title: `Delete Type "${typeName}"`, id, type: typeName };

    res.render('delete_type', locals);
  })
];

export const deleteSpecificType = [
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
    const queryRes = await getSingleTypeQuery(id);

    if (!queryRes.length) {
      return next(createHttpError(404));
    }

    const typeName = queryRes[0].type;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const locals = {
        title: `Delete Type "${typeName}"`,
        id,
        type: typeName,
        errors: errors.array()
      };

      return res.render('delete_type', locals);
    }

    await deleteTypeByIdQuery(id);
    res.redirect('/types');
  })
];
