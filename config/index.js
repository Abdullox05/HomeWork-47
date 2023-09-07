require("dotenv/config");

const {env} = process;

const config = {
  PORT: env.PORT,
  JWT_SECRET_KEY: env.JWT_SECRET_KEY,
  DB_URL: env.DB_URL,
};

module.exports = config;
