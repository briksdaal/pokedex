import asyncHandler from 'express-async-handler';
import { getAllTypesQuery, getTypeByIdAndPokemonQuery } from '../db/queries.js';

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
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const queryRes = await getTypeByIdAndPokemonQuery(id);

    const type = {
      id: queryRes[0].type_id,
      type: queryRes[0].type,
      color: queryRes[0].color
    };

    const locals = { title: `${type.type} Type`, type, pokemon: queryRes };
    res.render('single_type', locals);
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
