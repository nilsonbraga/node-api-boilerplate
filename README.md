# Node API Boilerplate

This is a template project created by [Nilson Braga](http://nilsonbraga.com/)

[Eslint](https://www.npmjs.com/package/eslint) , [Prettier](https://www.npmjs.com/package/prettier), [Sequelize](https://www.npmjs.com/package/sequelize), [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli), [Nodemon](https://www.npmjs.com/package/nodemon) configured.

## Include

- User Model and Controller with Yup schema validation;
- Session Controller with Yup schema validation and JWT;
- Auth Middleware;
- Basics database configurations with postgres;

## Configuration

### Database

src/config/database.js
Configure here your database credentials.

### JWT

src/config/auth.js
Configure here a secret key (md5) and a period to expire the session token.

## Run

### Install dependencies

`yarn install`

### Sequelize

Execute the Migrations (User table) and Seeds (Admin user: admin@admin.com / 123456)

- `yarn sequelize db:migrate`
- `yarn sequelize db:seed:all`

### Run the Project

`yarn dev`
