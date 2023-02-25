import { Request, Response, NextFunction } from 'express';
import * as service from '../services/task.services';
import { successResponse } from '../utils/helpers/response.helpers';


export const createTask = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {  body: { name, phaseId } } = req;
        const data = service.createTask(name, Number(phaseId));
        
        return successResponse(res, 'Task added successfully to phase', 201, data);
    } catch (error) {
        return next(error);
    }
};

export const fetchPhaseTask = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params: { taskId, phaseId } } = req;
      const data = service.fetchPhaseTask(Number(taskId), Number(phaseId));
      
      return successResponse(res, 'Task fetched successfully', 200, data);
    } catch (error) {
      return next(error);
    }
  };

  export const updateTaskStatus = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params: { phaseId, taskId } } = req;
      const data = service.updateTaskStatus(Number(phaseId), Number(taskId));
      
      return successResponse(res, 'Task updated successfully', 200, data);
    } catch (error) {
      return next(error);
    }
  };