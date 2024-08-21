import pool from './pool.js';
import format from 'pg-format';

function getAllQuery(table) {
  return pool.query(format('SELECT * FROM %I ORDER BY id', table));
}

function getSingleByIdQuery(table, id) {
  return pool.query(format('SELECT * FROM %I WHERE id = %L', table, id));
}

export const getAllTypesQuery = async () => {
  const { rows } = await getAllQuery('types');
  return rows;
};

export const getAllPokemonQuery = async () => {
  const { rows } = await getAllQuery('pokemon');
  return rows;
};

export const getAllTrainersQuery = async () => {
  const { rows } = await getAllQuery('trainers');
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

export const getPokemonByIdQuery = async (id) => {
  const { rows } = await pool.query(
    format(
      'SELECT pokemon.id, index, name, entry, image, types_a.id AS type1id, types_a.type AS type1type, types_a.color AS type1color, types_b.id AS type2id, types_b.type AS type2type, types_b.color AS type2color FROM pokemon LEFT JOIN types types_a ON (pokemon.type1 = types_a.id) LEFT JOIN types types_b ON (pokemon.type2 = types_b.id) WHERE pokemon.id = %L',
      id
    )
  );
  return rows[0];
};

export const getTrainerByIdQuery = async (id) => {
  const { rows } = await pool.query(
    format(
      'SELECT trainers.id AS trainer_id, trainers.name AS trainer_name, trainers.image AS trainer_image, pokemon.id, pokemon.name, pokemon.image FROM trainers LEFT JOIN pokemon_trainers ON (trainers.id = pokemon_trainers.trainer_id) LEFT JOIN pokemon ON (pokemon.id = pokemon_trainers.pokemon_id) WHERE trainers.id = %L',
      id
    )
  );
  return rows;
};
