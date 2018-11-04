import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    port: '5432',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    port: '5432',
    dialect: 'postgres',
  }
};

export default config;
