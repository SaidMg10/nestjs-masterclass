const {
  NODE_ENV: environment = 'dev',
  DB_PASSWORD: dbPassword,
  DB_NAME: dbName,
  DB_HOST: dbHost = 'localhost',
  DB_PORT: dbPort = 5432,
  DB_USERNAME: dbUser = 'postgres',
  PORT: port = 3000,
  HOST_API: hostApi = 'http://localhost:3000/api',
  LOGGER_LEVEL: loggerLevel = 'log',
  CLD_CLOUD_NAME: cloudName,
  CLD_API_KEY: apiKey,
  CLD_API_SECRET: apiSecret,
} = process.env;

export const EnvConfiguration = () => ({
  environment,
  dbPassword,
  dbName,
  dbHost,
  dbPort,
  dbUser,
  port,
  hostApi,
  loggerLevel,
  cloudName,
  apiKey,
  apiSecret,
});
