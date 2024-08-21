import pool from './pool.js';
import format from 'pg-format';

function getAllQuery(table) {
  return pool.query(format('SELECT * FROM %I', table));
}

export const getAllTypesQuery = async () => {
  const { rows } = await getAllQuery('types');
  return rows;
};
