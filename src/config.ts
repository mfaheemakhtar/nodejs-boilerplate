import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';
import { DEVELOPMENT, PRODUCTION } from './constants/environments.constants';

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    CORS_ORIGIN: Joi.string().required().description('CORS Origin'),
    NODE_ENV: Joi.string().valid(PRODUCTION, DEVELOPMENT).required().description('Node Env'),
    PORT: Joi.number().default(3000).description('Port'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const ENVIRONMENT = envVars.NODE_ENV;

export const PORT = envVars.PORT;

export const CORS = { ORIGIN: envVars.CORS_ORIGIN };
