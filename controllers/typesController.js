import asyncHandler from 'express-async-handler';

export const getAllTypes = [
  asyncHandler((req, res) => {
    res.send('Get all types');
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
