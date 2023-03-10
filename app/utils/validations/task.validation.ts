import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import baseValidator from '.';

export const createTask = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      name: Joi.string().required(),
      phaseId: Joi.number().required(),
    });
    baseValidator(schema, req, res, next, 'body');
  };

  export const phaseTaskParams = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      phaseId: Joi.number().required(),
      taskId: Joi.number().required(),
    });
    baseValidator(schema, req, res, next, 'params');
  };