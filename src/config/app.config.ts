const {
  NODE_ENV: environment = 'development',
  PORT: port = 3000,
  HOST_API: hostApi = 'http://localhost:3000/api',
  LOGGER_LEVEL: loggerLevel = 'log',
  CLD_CLOUD_NAME: cloudName,
  CLD_API_KEY: apiKey,
  CLD_API_SECRET: apiSecret,
  S3_BUCKET: s3Bucket,
  API_VERSION: apiVersion,
} = process.env;

export const AppConfiguration = () => ({
  environment,
  port,
  hostApi,
  loggerLevel,
  cloudName,
  apiKey,
  apiSecret,
  s3Bucket,
  apiVersion,
});
