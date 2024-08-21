import pool from './pool.js';
import format from 'pg-format';

function getAllQuery(table) {
  return pool.query(format('SELECT * FROM %I', table));
}

function getSingleByIdQuery(table, id) {
  return pool.query(format('SELECT * FROM %I WHERE id = %L', table, id));
}

export const getAllTypesQuery = async () => {
  const { rows } = await getAllQuery('types');
  return rows;
};

export const getTypeByIdAndPokemonQuery = async (id) => {
  const { rows } = await pool.query(
    format(
      'SELECT types.id AS type_id, type, color, pokemon.id, name, image FROM types JOIN pokemon ON (pokemon.type1 = types.id OR pokemon.type2 = types.id) WHERE types.id = %L',
      id
    )
  );
  return rows;
};
