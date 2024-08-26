# Pokedex

A Pokedex App

## App Description

A CRUD Pokedex for trainers, pokemon, and types. Create and read actions are open for all, while update and delete actions are password protected. Media uploads are available for pokemon and trainers. Image download and database population scripts are available for personal deployments.

## Technical Description

Built using:

- Node.js
- Express
- PostgreSQL
- Cloudinary
- Tailwind

## Population Instructions

To populate, first set the CLOUDINARY_URL enviroment variable to your personal connection string.

Run populate/downloadImages.js from the main project folder. This will create the folder if necessary and download all pokemon images.

After script completes, run populate/populate.js from the main project folder with your PostgreSQL connection string as an argument.

Both scripts can be run with DEBUG=pokedex:\* to log the progress.
