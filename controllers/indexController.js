import asyncHandler from 'express-async-handler';

export const getIndex = [
  asyncHandler((req, res) => {
    const locals = { title: 'Index' };
    res.render('index', locals);
  })
];
