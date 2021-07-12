# my-notepad-api 📒

A simple api that helps you manage and pen down your thoughts

## Features

- Add New Note: `POST /api/v1/notes`
- Edit a Note: `PATCH /api/v1/notes/:id`
- View All Notes : `GET /api/v1/notes`
- View single Note : `GET /api/v1/notes/:id`
- Delete single Note : `DELETE /api/v1/notes/:id`
- Delete All Notes : `DELETE /api/v1/notes`
- Documentation `GET /api-docs/`

## Getting Started

- Install NodeJS and yarn on your computer
- Use the .env.sample file to setup your environmental variables and rename the file to .env
- Run `npm install` or `yarn install` to install all dependencies
- Run `npm run start-dev` or `yarn start-dev` to start the server locally
- Run `npm run build` or `yarn build` to build the project for production
- Run `npm start` or `yarn start` to start the server after build
- Interact with localhost:[PORT] in POSTMAN to access the application

## Testing

- Open your `.env` ensure to add `NODE_ENV=test` so the test will be run using the test database
- run `npm test` or `yarn test`, This will run test with code coverage

## Using the Live App

- The live application is hosted at `https://my-notepad-api.herokuapp.com/api/v1/` (note: don't for get to include `/api/v1/` when a request to an endpoint)

## Documentation

- Find app documentation at `https://my-notepad-api.herokuapp.com/api-docs`

## Technologies

- Node Js
- Express JS
- Babel
- Mocha & Chai
- Chai
- Nodemon
- Joi
- Morgan
- Mongodb
- Mongoose
- Swagger

## Author

- [Odumah Solomon](https://github.com/slimsolz)
