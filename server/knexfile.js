module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/shared/infra/knex/database/db.sqlite',
    },
    migrations: {
      directory: './src/shared/infra/knex/migrations',
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/shared/infra/knex/database/test.sqlite',
    },
    migrations: {
      directory: './src/shared/infra/knex/migrations',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
