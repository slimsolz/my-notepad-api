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
- download`
- Use the .env.sample file to setup your environmental variables and rename the file to .env
- Run `npm install` or `yarn install` to install all dependencies
- Run `npm run start-dev` or `yarn start-dev` to start the server locally
- Run `npm run build` or `yarn build` to build the project for production
- Run `npm start` or `yarn start` to start the server after build
- Interact with localhost:[PORT] in POSTMAN to access the application

## Testing

- run `npm test` or `yarn test`, This will run test with code coverage

## Documentation

- Find app documentation at `/api-docs`

## Technologies

- Node Js
- Express JS
- Body-Parser
- Coveralls
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
