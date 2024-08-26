require('dotenv').config();

// knexfile.js
module.exports = {
  development: {
    client: "mssql",
    connection: {
      server : process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    },
  },
  production: {
    client: "mssql",
    connection: {
      server : process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};
