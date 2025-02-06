import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  HOST_API: Joi.string().uri().default('http://localhost:3000/api'),
  LOGGER_LEVEL: Joi.string()
    .valid('log', 'error', 'warn', 'debug')
    .default('log'),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
  API_VERSION: Joi.string().required(),
  AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_CLOUDFRONT_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
  SMTP_USERNAME: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
});
