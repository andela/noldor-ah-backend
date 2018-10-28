import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: '5432',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false
  },
  test: {
<<<<<<< HEAD:server/src/db/config/config.js
    use_env_variable: 'DATABASE_URL',
=======
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.HOST,
>>>>>>> feat(Authentication):user receive token on registration:server/src/net/config/config.js
    port: '5432',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    port: '5432',
    dialect: 'postgres'
  }
};

export default config;
