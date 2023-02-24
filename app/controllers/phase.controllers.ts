import { Request, Response, NextFunction } from 'express';
import * as service from '../services/phase.services';
import { successResponse } from '../utils/helpers/response.helpers';

export const fetchPhases = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = service.fetchPhases();
    
    return successResponse(res, 'Phases fetched successfully', 200, data);
  } catch (error) {
    return next(error);
  }
};

export const fetchSinglePhase = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { phaseId } } = req;
    const data = service.fetchSinglePhase(Number(phaseId));

    return successResponse(res, 'Phase fetched successfully', 200, data);
  } catch (error) {
    return next(error);
  }
};

export const createPhase = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { name } } = req;
    const data = service.createPhase(name);

    return successResponse(res, 'Phase created successfully', 201, data);
  } catch (error) {
    return next(error);
  }
};