import knex from 'knex';
import path from 'path';

const dbConfig = process.env.NODE_BD === 'test' ? 'test.sqlite' : 'db.sqlite';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database', dbConfig),
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
});

export default connection;
