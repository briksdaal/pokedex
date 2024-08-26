import 'dotenv/config';
import pg from 'pg';
import { v2 as cloudinary } from 'cloudinary';
const { Client } = pg;
import path from 'path';
import { fileURLToPath } from 'url';
import debug from 'debug';
import types from './types.js';
import pokemon from './pokemon.js';
import trainers from './trainers.js';
import pokemon_trainers from './pokemon_trainers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const populateDebugger = debug('pokedex:populate');
const DB_URL = process.argv[2];

const SQL_SETUP = `
DROP TABLE IF EXISTS pokemon_trainers;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS types;

CREATE TABLE types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(8) DEFAULT 'aaaa99'
);

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    index INTEGER NOT NULL,
    name TEXT NOT NULL,
    type1 INTEGER REFERENCES types ON DELETE SET NULL,
    type2 INTEGER REFERENCES types ON DELETE SET NULL,
    entry TEXT,
    image TEXT,
    image_public_id TEXT
);

CREATE TABLE trainers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    image TEXT,
    image_public_id TEXT
);

CREATE TABLE pokemon_trainers (
    trainer_id INTEGER REFERENCES trainers ON DELETE CASCADE,
    pokemon_id INTEGER REFERENCES pokemon ON DELETE CASCADE
);
`;

function getLocalPath(filename, dir = 'downloaded_images') {
  return path.join(__dirname, dir, filename);
}

async function emptyCloudinaryFolder() {
  async function destoryImages() {
    let res;
    try {
      res = await cloudinary.api.resources_by_asset_folder('pokedex');
    } catch (e) {
      if (e.error.http_code === 404) {
        return;
      }
    }

    if (res.total_count === 0) {
      return;
    }

    await Promise.all(
      res.resources.map((r) => cloudinary.uploader.destroy(r.public_id))
    );

    await destoryImages();
  }
  return destoryImages();
}

async function uploadImageToCloundinary(imagePath) {
  cloudinary.config({
    secure: true
  });

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'pokedex'
  };

  return cloudinary.uploader.upload(imagePath, options);
}

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

  for (let p of pokemonPopulatedWithTypes) {
    if (p.image) {
      populateDebugger(`Uploading image for ${p.name}`);
      const filename = p.image.split('/').pop();

      const cloudinaryRes = await uploadImageToCloundinary(
        getLocalPath(filename)
      );
      p.image = cloudinaryRes.secure_url;
      p.image_public_id = cloudinaryRes.public_id;
      populateDebugger(`Finished image upload for ${p.name}`);
    }

    populateDebugger(`Populating pokemon ${p.name}`);
    await insertFn(client, p, 'pokemon');
  }

  return;
}

async function seedTrainers(client, trainers) {
  const trainersQueries = trainers.map(async (t) => {
    if (t.image) {
      populateDebugger(`Uploading image for ${t.name}`);
      const cloudinaryRes = await uploadImageToCloundinary(
        getLocalPath(t.image, 'local_images')
      );
      t.image = cloudinaryRes.secure_url;
      t.image_public_id = cloudinaryRes.public_id;
      populateDebugger(`Finished image upload for ${t.name}`);
    }

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

async function uploadDefaultImages() {
  return Promise.all([
    uploadImageToCloundinary(getLocalPath('/pokeball.png', 'local_images')),
    uploadImageToCloundinary(getLocalPath('/trainer.png', 'local_images'))
  ]);
}

async function main() {
  try {
    populateDebugger('Emptying remote image bucket...');
    await emptyCloudinaryFolder();
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
    populateDebugger(
      'Finished populating trainers, starting pokemon / trainers'
    );
    await seedPokemonTrainers(client, pokemon_trainers);
    populateDebugger('Finished pokemon / trainers');
    populateDebugger('Uploading default images');
    await uploadDefaultImages();
    populateDebugger('Finished default images upload');
    await client.end();
    populateDebugger('Done');
  } catch (e) {
    populateDebugger(e);
  }
}

main();
