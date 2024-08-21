import pg from 'pg';
const { Client } = pg;
import debug from 'debug';
import types from './types.js';
import pokemon from './pokemon.js';
import trainers from './trainers.js';
import pokemon_trainers from './pokemon_trainers.js';

const populateDebugger = debug('pokedex:populate');
const DB_URL = process.argv[2];

const SQL_SETUP = `
DROP TABLE IF EXISTS pokemon_trainers;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS types;

CREATE TABLE types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type VARCHAR(20) NOT NULL,
    color VARCHAR(8) DEFAULT 'aaaa99'
);

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    index INTEGER NOT NULL,
    name TEXT NOT NULL,
    type1 INTEGER REFERENCES types ON DELETE SET NULL,
    type2 INTEGER REFERENCES types ON DELETE SET NULL,
    entry TEXT,
    image TEXT
);

CREATE TABLE trainers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    image TEXT
);

CREATE TABLE pokemon_trainers (
    trainer_id INTEGER REFERENCES trainers ON DELETE CASCADE,
    pokemon_id INTEGER REFERENCES pokemon ON DELETE CASCADE
);
`;

function insertFn(client, object, table) {
  const keys = Object.keys(object).join();
  const values = Object.values(object);
  const placeholders = values.map((k, i) => `$${i + 1}`).join();

  return client.query(
    `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`,
    values
  );
}

async function getIdFn(client, table, byField, byFieldValue) {
  const queryString = `SELECT id FROM ${table} WHERE ${byField} = $1`;
  const query = await client.query(queryString, [byFieldValue]);
  return query.rows[0].id;
}

async function seedTypes(client, types) {
  const typesQueries = types.map((t) => {
    populateDebugger(`Populating type ${t.type}`);
    return insertFn(client, t, 'types');
  });
  return Promise.all(typesQueries);
}

async function seedPokemon(client, pokemon) {
  const pokemonPopulatedWithTypes = await Promise.all(
    pokemon.map(async (p) => {
      populateDebugger(`Fetching type ids for ${p.name}`);
      const newP = { ...p };

      newP.type1 = await getIdFn(client, 'types', 'type', p.type1);

      if (p.type2) {
        newP.type2 = await getIdFn(client, 'types', 'type', p.type2);
      }

      return newP;
    })
  );

  const pokemonQueries = pokemonPopulatedWithTypes.map((p) => {
    populateDebugger(`Populating pokemon ${p.name}`);
    return insertFn(client, p, 'pokemon');
  });
  return Promise.all(pokemonQueries);
}

async function seedTrainers(client, trainers) {
  const trainersQueries = trainers.map((t) => {
    populateDebugger(`Populating trainer ${t.name}`);
    return insertFn(client, t, 'trainers');
  });
  return Promise.all(trainersQueries);
}

async function seedPokemonTrainers(client, pokemonTrainers) {
  const pairingsPopulated = await Promise.all(
    pokemonTrainers.map(async (pt) => {
      populateDebugger(
        `Fetching ids for ${pt.trainer} and ${pt.pokemon.join(', ')}`
      );
      const newPt = {};

      newPt.trainer_id = await getIdFn(client, 'trainers', 'name', pt.trainer);

      newPt.pokemon_ids = await Promise.all(
        pt.pokemon.map(async (p) => {
          return getIdFn(client, 'pokemon', 'name', p);
        })
      );

      return newPt;
    })
  );

  const pokemonTrainerQueries = pairingsPopulated.map((pairing, i) => {
    populateDebugger(`Populating pairing ${i + 1}/${pairingsPopulated.length}`);
    return Promise.all(
      pairing.pokemon_ids.map((p) => {
        const object = { trainer_id: pairing.trainer_id, pokemon_id: p };
        return insertFn(client, object, 'pokemon_trainers');
      })
    );
  });
  return Promise.all(pokemonTrainerQueries);
}

async function main() {
  populateDebugger('Seeding...');
  const client = new Client({
    connectionString: DB_URL
  });
  await client.connect();
  await client.query(SQL_SETUP);
  populateDebugger('Populating types');
  await seedTypes(client, types);
  populateDebugger('Finished populating types, starting pokemon');
  await seedPokemon(client, pokemon);
  populateDebugger('Finished populating pokemon, starting trainers');
  await seedTrainers(client, trainers);
  populateDebugger('Finished populating trainers, starting pokemon / trainers');
  await seedPokemonTrainers(client, pokemon_trainers);
  populateDebugger('Finished pokemon / trainers');
  await client.end();
  populateDebugger('Done');
}

main();
