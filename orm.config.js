const currentEnv = process.env.NODE_ENV || 'development';
const dbConnection = {
  ssl: true,
  type: 'postgres',
  entities: ['src/**/**/*.entity{.ts,.js}'],
  migrations: ['src/core/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/core/database/migrations',
  },
  schema: process.env.DB_SCHEMA,
  port: 5432,
  extra: {
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false,
    },
  },
};
if (currentEnv == 'production') {
  dbConnection.ssl = true;
  dbConnection.url = process.env.DATABASE_URL;
} else {
  dbConnection.ssl = false;
  dbConnection.host = process.env.DB_HOST;
  dbConnection.username = process.env.DB_USER;
  dbConnection.password = process.env.DB_PWD;
  dbConnection.database = process.env.DB_NAME;
  delete dbConnection.extra;
}
module.exports = dbConnection;
synchronize: true;
