const {
  DB_PASSWORD: dbPassword,
  DB_NAME: dbName,
  DB_HOST: dbHost = 'localhost',
  DB_PORT: dbPort = 5432,
  DB_USERNAME: dbUser = 'postgres',
  //DATABASE_SYNC: synchronize === 'true' ? true : false,
  //DATABASE_AUTOLOAD: autoLoadEntities === 'true' ? true : false,
} = process.env;

export const DbConfiguration = () => ({
  dbPassword,
  dbName,
  dbHost,
  dbPort,
  dbUser,
  //synchronize,
  //autoLoadEntities,
});
