import * as Joi from '@hapi/joi';

// - Models - //
import { Env } from 'src/shared/models/env';

// - Constants - //
import {
  HTTPS_PROTOCOL,
  HTTP_PROTOCOL,
} from 'src/shared/constants/constant-network';
import { DatabaseTypeEnum } from 'src/shared/models/databaseType.enum';

/**
 * Represents the validation schema for the application env.
 */
export const envFileValidationSchema = Joi.object({
  [Env.appPort]: Joi.number().default(3000).required(),
  [Env.appStage]: Joi.string().required(),
  [Env.appHost]: Joi.string().required(),
  [Env.appHttpProtocol]: Joi.string()
    .valid(HTTPS_PROTOCOL, HTTP_PROTOCOL)
    .required(),
  [Env.dataBaseType]: Joi.string()
    .required()
    .valid(...Object.values(DatabaseTypeEnum)),
  [Env.dataBaseHost]: Joi.string().required(),
  [Env.dataBasePort]: Joi.number().default(5432).required(),
  [Env.dataBaseUsername]: Joi.string().default(Env.dataBaseType).required(),
  [Env.dataBasePassword]: Joi.string().default(Env.dataBaseType).required(),
  [Env.database]: Joi.string().required(),
  [Env.jwtAccessTokenSecret]: Joi.string().required().min(8).max(64),
  [Env.jwtRefreshTokenSecret]: Joi.string().required().min(8).max(64),
  [Env.jwtAccessTokenExpiration]: Joi.string().required(),
  [Env.jwtRefreshTokenExpiration]: Joi.string().required(),
});
