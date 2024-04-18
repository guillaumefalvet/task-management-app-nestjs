import * as Joi from '@hapi/joi';
import { Env } from '../shared/models/env';

export const configValidationSchema = Joi.object({
  [Env.appPort]: Joi.number().default(3000).required(),
  [Env.appStage]: Joi.string().required(),
  [Env.appHost]: Joi.string().required(),
  [Env.dataBaseHost]: Joi.string().required(),
  [Env.dataBasePort]: Joi.number().default(5432).required(),
  [Env.dataBaseUsername]: Joi.string().required(),
  [Env.dataBasePassword]: Joi.string().required(),
  [Env.database]: Joi.string().required(),
  [Env.jwtAccessTokenSecret]: Joi.string().required(),
  [Env.jwtRefreshTokenSecret]: Joi.string().required(),
  [Env.jwtAccessTokenExpiration]: Joi.string().required(),
  [Env.jwtRefreshTokenExpiration]: Joi.string().required(),
});
