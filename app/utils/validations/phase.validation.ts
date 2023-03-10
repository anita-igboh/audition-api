import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import baseValidator from '.';

export const phaseParams = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    phaseId: Joi.number().required(),
  });
  baseValidator(schema, req, res, next, 'params');
};

export const createPhase = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};