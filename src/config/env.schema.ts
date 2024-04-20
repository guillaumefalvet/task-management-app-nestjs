import * as Joi from '@hapi/joi';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

// - Constants - //
import {
  HTTPS_PROTOCOL,
  HTTP_PROTOCOL,
} from 'src/shared/constants/constant-network';
import { DatabaseTypeEnum } from 'src/shared/models/database';

/**
 * Represents the validation schema for the application env.
 */
export const envFileValidationSchema = Joi.object({
  [EnvEnum.appPort]: Joi.number().default(3000).required(),
  [EnvEnum.appStage]: Joi.string().required(),
  [EnvEnum.appHost]: Joi.string().required(),
  [EnvEnum.appHttpProtocol]: Joi.string()
    .valid(HTTPS_PROTOCOL, HTTP_PROTOCOL)
    .required(),
  [EnvEnum.dataBaseType]: Joi.string()
    .required()
    .valid(...Object.values(DatabaseTypeEnum)),
  [EnvEnum.dataBaseHost]: Joi.string().required(),
  [EnvEnum.dataBasePort]: Joi.number().default(5432).required(),
  [EnvEnum.dataBaseUsername]: Joi.string()
    .default(EnvEnum.dataBaseType)
    .required(),
  [EnvEnum.dataBasePassword]: Joi.string()
    .default(EnvEnum.dataBaseType)
    .required(),
  [EnvEnum.database]: Joi.string().required(),
  [EnvEnum.jwtAccessTokenSecret]: Joi.string().required().min(8).max(64),
  [EnvEnum.jwtRefreshTokenSecret]: Joi.string().required().min(8).max(64),
  [EnvEnum.jwtAccessTokenExpiration]: Joi.string().required(),
  [EnvEnum.jwtRefreshTokenExpiration]: Joi.string().required(),
});
