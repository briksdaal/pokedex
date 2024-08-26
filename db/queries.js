import pool from './pool.js';
import format from 'pg-format';

function getAllQuery(table, orderBy = 'id') {
  return pool.query(format('SELECT * FROM %I ORDER BY %s', table, orderBy));
}

function getSingleByColVal(table, col = 'id', val) {
  const q = format('SELECT * FROM %I WHERE %s = %L', table, col, val);

  return pool.query(q);
}

function getSingleByNameQuery(table, name) {
  return getSingleByColVal(table, 'name', name);
}

function getSingleByIdQuery(table, id) {
  return getSingleByColVal(table, 'id', id);
}

function insertQuery(object, table) {
  const keys = Object.keys(object).join();
  const values = Object.values(object);

  const q = format(
    `INSERT INTO %I (%s) VALUES (%L) RETURNING id`,
    table,
    keys,
    values
  );

  return pool.query(q);
}

function deleteSingleByIdQuery(table, id) {
  const q = format('DELETE FROM %I WHERE id = %L', table, id);

  return pool.query(q);
}

export const getAllTypesQuery = async () => {
  const { rows } = await getAllQuery('types');
  return rows;
};

export const getAllPokemonQuery = async () => {
  const { rows } = await getAllQuery('pokemon', 'index');
  return rows;
};

export const getAllTrainersQuery = async () => {
  const { rows } = await getAllQuery('trainers', 'name');
  return rows;
};

export const getSingleTypeQuery = async (id) => {
  const { rows } = await getSingleByIdQuery('types', id);
  return rows;
};

export const getSingleTypeByTypeQuery = async (type) => {
  return getSingleByColVal('types', 'type', type);
};

export const getSingleTrainerByNameQuery = (name) => {
  return getSingleByNameQuery('trainers', name);
};

export const getSinglePokemonByNameQuery = (name) => {
  return getSingleByNameQuery('pokemon', name);
};

export const getSinglePokemonByIndexQuery = (index) => {
  return getSingleByColVal('pokemon', 'index', index);
};

export const getSinglePokemonQuery = async (id) => {
  const { rows } = await getSingleByIdQuery('pokemon', id);
  return rows;
};

export const getSingleTrainerQuery = async (id) => {
  const q = format(
    'SELECT * FROM trainers LEFT JOIN pokemon_trainers ON (trainers.id = pokemon_trainers.trainer_id) WHERE id = %L',
    id
  );
  const { rows } = await pool.query(q);
  return rows;
};

export const getTypeByIdAndPokemonQuery = async (id) => {
  const { rows } = await pool.query(
    format(
      'SELECT types.id AS type_id, type, color, pokemon.id, name, image FROM types LEFT JOIN pokemon ON (pokemon.type1 = types.id OR pokemon.type2 = types.id) WHERE types.id = %L ORDER BY pokemon.index',
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
  return rows;
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

export const createTypeQuery = async (body) => {
  return insertQuery(body, 'types');
};

export function updateTypeQuery(type, id) {
  const q = format(
    `UPDATE types SET type = %L, color = %L WHERE id = %L`,
    type.type,
    type.color,
    id
  );

  return pool.query(q);
}

export const createPokemonQuery = async (body) => {
  return insertQuery(body, 'pokemon');
};

export function updatePokemonQuery(pokemon, id) {
  let q;
  if (pokemon.image === '') {
    q = format(
      `UPDATE pokemon SET index = %L, name = %L, type1 = %L, type2 = %L, entry = %L, image = NULL, image_public_id = NULL WHERE id = %L`,
      pokemon.index,
      pokemon.name,
      pokemon.type1,
      pokemon.type2,
      pokemon.entry,
      id
    );
  } else {
    q = format(
      `UPDATE pokemon SET index = %L, name = %L, type1 = %L, type2 = %L, entry = %L, image = COALESCE(%L, image), image_public_id = COALESCE(%L, image_public_id) WHERE id = %L`,
      pokemon.index,
      pokemon.name,
      pokemon.type1,
      pokemon.type2,
      pokemon.entry,
      pokemon.image,
      pokemon.image_public_id,
      id
    );
  }
  return pool.query(q);
}

export function updateTrainerQuery(trainer, id) {
  let q;
  if (trainer.image === '') {
    q = format(
      `UPDATE trainers SET name = %L, image = NULL, image_public_id = NULL WHERE id = %L`,
      trainer.name,
      id
    );
  } else {
    q = format(
      `UPDATE trainers SET name = %L, image = COALESCE(%L, image), image_public_id = COALESCE(%L, image_public_id) WHERE id = %L`,
      trainer.name,
      trainer.image,
      trainer.image_public_id,
      id
    );
  }

  return pool.query(q);
}

export const createTrainerQuery = async (body) => {
  return insertQuery(body, 'trainers');
};

export const createPokemonTrainersQuery = async (pairs) => {
  if (!pairs.length) {
    return;
  }

  const q = format(
    `INSERT INTO pokemon_trainers (trainer_id, pokemon_id) VALUES %L`,
    pairs
  );

  return pool.query(q);
};

export const deletePokemonTrainersByTrainerIdQuery = async (id) => {
  const q = format(`DELETE FROM pokemon_trainers WHERE trainer_id = %L`, id);

  return pool.query(q);
};

export const transactionWrapper = async (queries) => {
  try {
    await pool.query('BEGIN');

    for (const obj of queries) {
      await obj.query(...obj.args);
    }

    await pool.query('COMMIT');
  } catch (e) {
    await pool.query('ROLLBACK');
    throw e;
  }
};

export const createTrainerAndSetPokemon = async (trainer, pokemonids) => {
  try {
    await pool.query('BEGIN');

    const { rows } = await createTrainerQuery(trainer);
    const trainerid = rows[0].id;
    const pairs = pokemonids.map((p) => [trainerid, Number(p)]);
    await createPokemonTrainersQuery(pairs);

    await pool.query('COMMIT');
  } catch (e) {
    await pool.query('ROLLBACK');
    throw e;
  }
};

export const deleteTypeByIdQuery = (id) => {
  return deleteSingleByIdQuery('types', id);
};

export const deletePokemonByIdQuery = (id) => {
  return deleteSingleByIdQuery('pokemon', id);
};

export const deleteTrainerByIdQuery = (id) => {
  return deleteSingleByIdQuery('trainers', id);
};
