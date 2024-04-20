import * as Joi from '@hapi/joi';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';
import { DatabaseTypeEnum } from 'src/shared/models/database';

// - Constants - //
import {
  HTTPS_PROTOCOL,
  HTTP_PROTOCOL,
} from 'src/shared/constants/constant-network';

/**
 * Represents the validation schema for the application env.
 */
export const envFileValidationSchema = Joi.object({
  // - Application - //
  [EnvEnum.appPort]: Joi.number().default(3000).required(),
  [EnvEnum.appStage]: Joi.string().required(),
  [EnvEnum.appHost]: Joi.string().required(),
  [EnvEnum.appHttpProtocol]: Joi.string()
    .valid(HTTPS_PROTOCOL, HTTP_PROTOCOL)
    .required(),
  [EnvEnum.jwtAccessTokenSecret]: Joi.string().required().min(8).max(64),
  [EnvEnum.jwtRefreshTokenSecret]: Joi.string().required().min(8).max(64),
  [EnvEnum.jwtAccessTokenExpiration]: Joi.string().required(),
  [EnvEnum.jwtRefreshTokenExpiration]: Joi.string().required(),
  // - Database - //
  [EnvEnum.dataBaseType]: Joi.string()
    .valid(...Object.values(DatabaseTypeEnum))
    .required(),
  [EnvEnum.dataBaseHost]: Joi.string().required(),
  [EnvEnum.dataBasePort]: Joi.number().default(5432).required(),
  [EnvEnum.dataBaseUsername]: Joi.string().required(),
  [EnvEnum.dataBasePassword]: Joi.string().required(),
  [EnvEnum.database]: Joi.string().required(),
});
