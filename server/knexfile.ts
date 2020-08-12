import path from 'path';

const dbConfig = process.env.NODE_BD === 'test' ? 'test.sqlite' : 'db.sqlite';

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(
        __dirname,
        'src',
        'shared',
        'infra',
        'knex',
        'database',
        dbConfig,
      ),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'shared',
        'infra',
        'knex',
        'migrations',
      ),
    },
    useNullAsDefault: true,
  },
};
