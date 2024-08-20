import asyncHandler from 'express-async-handler';

export const getIndex = [
  asyncHandler((req, res) => {
    res.send('Get index');
  })
];
