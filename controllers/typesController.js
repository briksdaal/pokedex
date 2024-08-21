import asyncHandler from 'express-async-handler';
import { getAllTypesQuery } from '../db/queries.js';

export const getAllTypes = [
  asyncHandler(async (req, res) => {
    const types = await getAllTypesQuery();
    const locals = { title: 'Types', types };
    res.render('types_list', locals);
  })
];

export const createType = [
  asyncHandler((req, res) => {
    res.send(`Create new type`);
  })
];

export const getSpecificType = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Get type ${id} details`);
  })
];

export const updateSpecificType = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Update type ${id} details`);
  })
];

export const deleteSpecificType = [
  asyncHandler((req, res) => {
    const { id } = req.params;
    res.send(`Delete type ${id} details`);
  })
];
